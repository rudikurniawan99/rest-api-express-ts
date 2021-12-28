import mongoose from 'mongoose'
import config from 'config'
import logger from '../utils/logger'

const dbUri = config.get<string>('dbUri')

const connect = async () => {
  try {
    await mongoose.connect(dbUri) 
    logger.info('success to connect to db')
  } catch (error) {
    logger.error(error) 
  }
}

export default connect