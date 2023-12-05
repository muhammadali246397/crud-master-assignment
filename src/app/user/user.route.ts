import express from 'express'
import { userContoller } from './user.contoller'

const ruter = express.Router()

ruter.post('/', userContoller.createUser)

ruter.get('/', userContoller.getAllUser)

ruter.get('/:userId', userContoller.getSpecificUser)

ruter.delete('/:userId', userContoller.deleteSingleUser)

ruter.put('/:userId', userContoller.updateUser)

export default ruter
