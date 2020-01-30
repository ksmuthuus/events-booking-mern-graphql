const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../model/user-model')

module.exports = {
  login: async(args) => {
    const user = await User.findOne({email:args.username})
    if(!user){
      throw new Error("Invalid User")
    }
    const isValid = await bcryptjs.compare(args.password,user.password)
    if(!isValid){
      throw new Error("Invalid User Credential")
    }
    const token = jwt.sign({userId:user.id, email:user.email},"thisismysecretsecretkeykey",{expiresIn:"1h"})
    return {userId:user.id,token:token,validUntil:1}
  },
  createUser:async(args) => {

   const userExits = await User.findOne({email:args.userInput.email})
   if(userExits){
     throw new Error('User already exists')
   }

    const hashedPwd = await bcryptjs.hash(args.userInput.password,8)
      const user = new User({
        _id: mongoose.Types.ObjectId(),
        email: args.userInput.email,
        password: hashedPwd
      })
      const result = await user.save()
      return {...result._doc,password:null}
  }
}