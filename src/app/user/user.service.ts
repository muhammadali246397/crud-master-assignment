import { UserInfo } from './user.interface'
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

export const userService = {
  createUserIntoDB,
  getAllUsersFromDb,
  getSpecipicUser,
  updateSingleUser,
  deleteSpecipicUser,
}
