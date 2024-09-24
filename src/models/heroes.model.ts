import type { Types } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

mongoose.connection.useDb('web')

interface Hero extends Document {
  _id: Types.ObjectId
  heroName: string
  image: string
  atribute: Dota2Atribute
  roles: Dota2Role[]
}

const HeroSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  heroName: { type: String, required: true },
  image: { type: String, required: true },
  atribute: { type: String, required: true, enum: ['Strength', 'Agility', 'Intelligence', 'Universal'] },
  roles: {
    type: [{
      type: String,
      enum: ['Carry', 'Disabler', 'Durable', 'Escape', 'Initiator', 'Jungler', 'Nuker', 'Pusher', 'Support'],
    }],
    required: true,
    validate: {
      validator: (value: string[]) => value.length > 0 && new Set(value).size === value.length,
      message: 'At least one role is required and must not be repeated',
    },
  },
})

export default mongoose.models.Heroes || mongoose.model<Hero>('Heroes', HeroSchema)
