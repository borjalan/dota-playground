/* eslint-disable node/prefer-global/process */
import mongoose from 'mongoose'

let isConnected = false // Estado de la conexión

async function connectToDb() {
  if (isConnected)
    return

  const { MONGODB_URI } = process.env
  if (!MONGODB_URI)
    throw new Error('MongoDB URI is not defined')

  try {
    await mongoose.connect(MONGODB_URI)
    isConnected = true
  }
  catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw new Error('Failed to connect to MongoDB')
  }
}

export default connectToDb
