//express
const app = express();
const port = 4000

//middle-ware
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
// const session = require("express-session")

//cors
app.use(
    cors({
        origin: ["http://localhost:3000"],
        method: ["GET, POST, PUT, OPTION"],
        credentials: true,
    })
);

//express.json()
app.use(express.json());


//morgan
app.use(morgan("dev"));

//인증방식 토큰? oAuth에서 토큰을 사용하기 때문

//routing
const searchRouter = require("./routes/search");
const userRouter = require("./routes/user");
const mypageRouter = require("./routes/mypage");

app.use("/search", searchRouter);
app.use("/user", userRouter);
app.use("/mypage", mypageRouter);



app.listen(port, () => {
    console.log(`server listening on ${port} port`)
})

module.exports = app;