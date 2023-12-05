import { Schema, model } from 'mongoose'
import { Order, UserInfo } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../config/config'

const orederSchema = new Schema<Order>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})

const userSchema = new Schema<UserInfo>({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    orders: orederSchema,
  },
})

userSchema.pre('save', function (next) {
  const hidePassword = bcrypt.hashSync(
    this.password,
    Number(config.bcrypt_salt_round),
  )
  this.password = hidePassword
  next()
})
userSchema.set('toJSON', {
  transform: function (doc, rec) {
    delete rec.password
  },
})

export const userModel = model<UserInfo>('user', userSchema)
