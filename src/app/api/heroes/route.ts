import Heroes from '@/models/heroes.model'
import { type NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  const PAGE_SIZE = 10
  const heroes = await Heroes.find().skip((Number.parseInt(page) - 1) * PAGE_SIZE).limit(PAGE_SIZE)

  if (!heroes)
    return NextResponse.json({ message: 'Heroes not found' }, { status: 404 })
  return NextResponse.json({ heroes }, { status: 200 })
}

export async function POST(request: NextRequest) {
  const { _id, heroName, image, atribute, roles } = await request.json()
  if (!_id) {
    const hero = new Heroes({ heroName, image, atribute, roles })
    await hero.save()
    return NextResponse.json({ hero }, { status: 201 })
  }
  else {
    const hero = await Heroes.findByIdAndUpdate(_id, { heroName, image, atribute, roles }, { new: true })
    return NextResponse.json({ hero }, { status: 200 })
  }
}
