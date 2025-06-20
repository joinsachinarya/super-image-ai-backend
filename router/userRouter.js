const { Router } = require("express")
const { loginUser, registerUser } = require("../controllers/userController.js")


const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);


module.exports = userRouter;