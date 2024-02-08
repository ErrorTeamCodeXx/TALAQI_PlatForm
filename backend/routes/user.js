const express = require("express")

const {register,login,deleteUser,updateUser} =require("../controllers/user")

const userRouter  = express()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.delete("/delete",deleteUser)
userRouter.put("/update",updateUser)



module.exports = userRouter



/*

TEST register => 

! api http://localhost:5000/users/register

!body =>
  {
    "username": "jamalbarhoom",
    "email": "jamalbarhoom@gmail.com",
    "password_hash": "123",
    "bio": "hi this is my bio",
    "profile_picture_url": "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp"
}
}

*/