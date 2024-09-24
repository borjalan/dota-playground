import type { NextRequest } from 'next/server'
import connectToDb from '@/helpers/mongodb/connectDb'
import { NextResponse } from 'next/server'

export async function middleware(_request: NextRequest) {
  await connectToDb()
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}