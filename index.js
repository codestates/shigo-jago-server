const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const cookieParser = require('cookie-parser')


const ejs = require('ejs')
const searchRouter = require("./routes/search")
const userRouter = require("./routes/user")
const mypageRouter = require("./routes/mypage")
const detailRouter = require("./routes/detail")
const socialRouter = require("./routes/social")
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const helmet = require('helmet')
const app = express()

app.use(helmet())

const port = 4000
let nowNickName="";

app.use(
    cors({
        origin: ["http://shigojago.icu"],
        method: ["GET, POST, OPTION"],
        credentials: true,
    })
)

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended : false}))
app.use(morgan("dev"))

app.use("/search", searchRouter)
app.use("/user", userRouter)
app.use("/mypage", mypageRouter)
app.use("/detail", detailRouter)
app.use("/social", socialRouter)


app.engine('html', ejs.renderFile)
app.get('/set', function(req, res){
	res.render(__dirname+'/socket/enter.ejs')
  
	console.log('in / GET')
});

app.get('/chat', function(req, res){
	res.send('plz connect through "/"')
});

app.post('/chat', function(req,res){
    console.log('in /chat POST')

	nowNickName=req.body.nickName
    console.log('new user : '+nowNickName)
	res.render(__dirname+'/socket/index.ejs')
})
app.use(express.static(__dirname+'/socket'));
let whoIsTyping = []
let whoIsOn = []

io.on('connection', function(socket){
  console.log('connection :', socket.request.connection._peername)
	var nickName= nowNickName || ' '
    
    whoIsOn.push(nickName)
	socket.emit('selfData', {nickName:nickName})
	
	//someone who has this nickName has logged in
	//original :
	//io.emit('login', nickName);
	io.emit('login', whoIsOn);
	//basically after login, execute refreshUsers	
	//io.emit('refreshUsers', whoIsOn);
	
	if(whoIsTyping.length!=0){
		io.emit('typing', whoIsTyping);
	}
	
	socket.on('setNickName', function(_nickName){
		var pastNickName=nickName;	//past nickname
		nickName=_nickName;
		if(whoIsTyping.indexOf(pastNickName)!=-1){
			//if he was typing
			console.log('setNickName debug1');
			whoIsTyping.splice(whoIsTyping.indexOf(pastNickName),1,nickName);
			io.emit('typing', whoIsTyping);
		}
		
		if(whoIsOn.indexOf(pastNickName)!=-1){
			console.log('setNickName debug2');
			whoIsOn.splice(whoIsOn.indexOf(pastNickName), 1, nickName);
		}
		io.emit('setNickName', {past:pastNickName, current:nickName, whoIsOn:whoIsOn});
		console.log(socket.id+'  to  '+nickName);
	});
	
	socket.on('say', function(msg){
		console.log('message: ' + msg);
		//chat message to the others
		//mySaying to the speaker
		socket.broadcast.emit('chat message', nickName+'  :  '+msg);
		socket.emit('mySaying', 'ME  :  '+msg);	
  });


	socket.on('typing', function(){
		if(!whoIsTyping.includes(nickName)){
			whoIsTyping.push(nickName);
			console.log('who is typing now');
			console.log(whoIsTyping);
			io.emit('typing', whoIsTyping);	
		}
	});
	
	socket.on('quitTyping', function(){
		if(whoIsTyping.length==0){
			//if it's empty
			console.log('emit endTyping');
			io.emit('endTyping');
		}
		else{
			//if someone else is typing
			var index=whoIsTyping.indexOf(nickName);
			console.log(index);
			if(index!=-1){
				whoIsTyping.splice(index, 1);
				if(whoIsTyping.length==0){
					
					console.log('emit endTyping');
					io.emit('endTyping');
				}
				
				else{
					io.emit('typing', whoIsTyping);
					console.log('emit quitTyping');
					console.log('whoIsTyping after quit');
					console.log(whoIsTyping);
				}
				
			}
			
			
		}
	});
	
	
	//disconnect is in socket
 	socket.on('disconnect', function(){
    	console.log(nickName+' : DISCONNECTED');
		
		whoIsOn.splice(whoIsOn.indexOf(nickName), 1);
		io.emit('logout', {nickNameArr:whoIsOn, disconnected:nickName});
		
		if(whoIsTyping.length==0){
			//if it's empty
			io.emit('endTyping');
		}
		else{
			//if someone was typing
			var index=whoIsTyping.indexOf(nickName);
			if(index!=-1){
				whoIsTyping.splice(index, 1);
				
				//if no one is typing now
				if(whoIsTyping.length==0){
					io.emit('endTyping');
				}
				
				//if someone else is still typing
				else{
					io.emit('typing', whoIsTyping);
					console.log('emit popTyping');
					console.log(whoIsTyping);		
				}
			
			}
			
			
		}
  	});
	
});

http.listen(3080, function(){
  console.log('listening on *:3080');
});

app.listen(port, () => {
    console.log(`server listening on ${port} port`)
})

module.exports = app