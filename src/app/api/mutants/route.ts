import connectToDb from '@/helpers/mongodb/connectDb'
import { MutantModel } from '@/models/mutant.model'
import { type NextRequest, NextResponse } from 'next/server'

// GET all mutants!!
export async function GET(request: NextRequest) {
  try {
    await connectToDb()
    const MutantsPerPage = 10
    const searchParams = request.nextUrl.searchParams
    const pageNumber = Number(searchParams.get('query')) || 0

    const mutants = await MutantModel.find()
      .limit(MutantsPerPage)
      .skip(MutantsPerPage * pageNumber)

    return NextResponse.json(mutants)
  }
  catch (error) {
    console.error('[Mutants_GET] Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

// POST new mutant
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Required fields validation
    if (!body.name || !body.powers) {
      return NextResponse.json(
        { error: 'Name and powers are required' },
        { status: 400 },
      )
    }

    await connectToDb()

    // Handle duplicate names automatically
    const existing = await MutantModel.findOne({ name: body.name })
    if (existing) {
      return NextResponse.json(
        { error: 'Mutant name already exists' },
        { status: 409 },
      )
    }

    const newMutant = await MutantModel.create(body)
    return NextResponse.json(newMutant, { status: 201 })
  }
  catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    )
  }
}
