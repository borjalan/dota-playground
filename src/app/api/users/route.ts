import connectToDb from '@/helpers/mongodb/connectDb'
import UserModel from '@/models/user.model'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { client } = await connectToDb()
    const users = await client.collection('users').find({}).toArray()
    return NextResponse.json(users)
  }
  catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectToDb()
    const body = await request.json()

    const hashedPassword = await bcrypt.hash(body.user_password, 10)

    const newUser = new UserModel({
      user_name: body.user_name,
      user_password: hashedPassword,
    })

    await newUser.save()

    return NextResponse.json(newUser)
  }
  catch (error) {
    console.error('Error saving user:', error)
    return NextResponse.json({ error: 'Failed to save user' }, { status: 500 })
  }
}
