import mongoose from 'mongoose'

const { Schema } = mongoose

interface UserModelType {
  user_name: string
  user_password: string
}

const userSchema = new Schema({
  user_name: String,
  user_password: String,
})

export default mongoose.models.Users || mongoose.model<UserModelType>('Users', userSchema)
