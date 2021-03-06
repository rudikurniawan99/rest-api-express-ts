import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface UserDocument extends mongoose.Document {
  email: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date
  comparePassword: (pass: string) => Promise<boolean>
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},{
  timestamps: true
})

userSchema.pre("save", async function(next) {
  let user = this as UserDocument

  if(!user.isModified('password')){
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hashSync(user.password, salt)
  user.password = hash
  return next()
})

userSchema.methods.comparePassword = async function (pass: string): Promise<boolean>{
  const user = this as UserDocument

  return await bcrypt.compare(pass, user.password)
    .catch((e) => false)
}

const User = mongoose.model('User', userSchema)

export default User