import Joi from 'joi'

const orderValidationSchema = Joi.object().keys({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
})


const UservalidationSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }).required(),
  age: Joi.number().required(),
  email: Joi.string().required(),
  isActive: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string()).required(),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
  orders: Joi.array().items(orderValidationSchema)
  
})
const UserUpdatevalidationSchema = Joi.object({
  userId: Joi.number().optional(),
  username: Joi.string().optional(),
  password: Joi.string().optional(),
  fullName: Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
  }).required(),
  age: Joi.number().optional(),
  email: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
  hobbies: Joi.array().items(Joi.string()).optional(),
  address: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    country: Joi.string().optional(),
  }).optional(),
  
})

export {UservalidationSchema,orderValidationSchema,UserUpdatevalidationSchema
}
