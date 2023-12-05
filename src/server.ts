import mongoose from 'mongoose'
import app from './app'
import config from './app/config/config'

async function main() {
  try {
    await mongoose.connect(config.DB_URL as string)
    app.listen(config.port, () => {
      console.log(`This server is running port on ${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }
}
main()