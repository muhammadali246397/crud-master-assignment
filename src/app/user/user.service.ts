import { Order, UserInfo } from './user.interface'
import { userModel } from './user.model'

const createUserIntoDB = async (user: UserInfo) => {
  const newUser = await userModel.create(user)
  return newUser
}

const getAllUsersFromDb = async () => {
  const result = await userModel.find().select({
    _id: 0,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  })

  return result
}

const getSpecipicUser = async (userId: number) => {
  const specificUser = await userModel.findOne({ userId })
  return specificUser
}

const updateSingleUser = async (
  userId: number,
  userData: Partial<UserInfo>,
) => {
  const updatedUser = await userModel.findOneAndUpdate({ userId }, userData, {
    new: true,
    fields: '-password',
  })
  return updatedUser
}

const deleteSpecipicUser = async (userId: number) => {
  const specificUser = await userModel.deleteOne({ userId })
  return specificUser
}

const createOrder = async (userId: number, orderInformation: Order) => {
  console.log(orderInformation)
  const orders = await userModel.findOneAndUpdate(
    { userId },
    { $push: { orders: orderInformation} },
  )
  return orders
}

const getAllOrder = async (userId:number) => {
  const result =await userModel.findOne({userId}).select({
    _id:0,
  })
  return result
}

export const userService = {
  createUserIntoDB,
  getAllUsersFromDb,
  getSpecipicUser,
  updateSingleUser,
  deleteSpecipicUser,
  createOrder,
  getAllOrder,
}
