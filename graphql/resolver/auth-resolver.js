const bcryptjs = require('bcryptjs')
const User = require('../../model/user-model')

module.exports = {
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