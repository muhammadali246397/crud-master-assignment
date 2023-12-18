import { Request, Response } from 'express'
import { userService } from './user.service'
import { UserUpdatevalidationSchema, UservalidationSchema, orderValidationSchema } from './user.validator'
import { userModel } from './user.model'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body

    const { error } = UservalidationSchema.validate(user)
    const result = await userService.createUserIntoDB(user)

    if (error) {
      return res.status(500).json({
        success: false,
        message: 'joi validation error',
        error,
      })
    }

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something is worng',
      error: err,
    })
  }
}

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDb()

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'user not found!',
      error: err,
    })
  }
}
const getSpecificUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const UserId = parseInt(userId)
    const getOneUser = await userService.getSpecipicUser(UserId)

    if (!getOneUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'user not found',
        },
      })
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: getOneUser,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'user not found',
      error: err,
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const { error } = UserUpdatevalidationSchema.validate(userData)
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'joi validation error',
        error,
      })
    }
    const { userId } = req.params
    const Id = parseInt(userId)
    const user = await userModel.findOne({ userId })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'user not found',
        },
      })
    }
    const result = await userService.updateSingleUser(Id, userData)

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went worng',
      error: err,
    })
  }
}

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    const user = await userModel.findOne({ userId })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'user not found',
        },
      })
    }
    const deleteUser = await userService.deleteSpecipicUser(userId)
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went worng',
      error: err,
    })
  }
}


const createAOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    const orderInformation = req.body
    const { error } = orderValidationSchema.validate(orderInformation)
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'joi validation error',
        error,
      })
    }
    const user = await userService.getSpecipicUser(userId)

    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })

    await userService.createOrder(userId, orderInformation)
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    })
  }
}

const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId)
    const user = await userModel.findOne({userId})

    if (!user)
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })

    const result = await userService.getAllOrder(userId)
  
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: {
        orders: user.orders || []
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: error,
    })
  }
}



export const userContoller = {
  createUser,
  getAllUser,
  getSpecificUser,
  updateUser,
  deleteSingleUser,
  createAOrder,
  getOrders,

}
