const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const searchRouter = require("./routes/search")
const userRouter = require("./routes/user")
const mypageRouter = require("./routes/mypage")
const detailRouter = require("./routes/detail")
const cookieParser = require('cookie-parser');

const app = express();
const port = 4000

app.use(
    cors({
        origin: ["http://localhost:3000"],
        method: ["GET, POST, OPTION"],
        credentials: true,
    })
)

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

app.use("/search", searchRouter)
app.use("/user", userRouter)
app.use("/mypage", mypageRouter)
app.use("/detail", detailRouter)

app.listen(port, () => {
    console.log(`server listening on ${port} port`)
})

module.exports = app