import mongoose from 'mongoose'
import config from 'config'

const dbUri = config.get<string>('dbUri')

const connect = async () => {
  try {
    await mongoose.connect(dbUri) 
    console.log('success to connect to db')
  } catch (error) {
    console.log(error) 
  }
}

export default connect