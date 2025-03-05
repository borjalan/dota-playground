import type { Mutant } from '@/types/mutant'
import mongoose, { Schema } from 'mongoose'

const mutantSchema = new Schema<Mutant>({
  name: { type: String, required: true },
  realName: String,
  species: { type: String, required: true, default: 'Mutant' },
  affiliation: { type: [String], required: true },
  powers: { type: [String], required: true },
  firstAppearance: { type: Number, required: true },
  isAlive: { type: Boolean, required: true, default: true },
  aliases: [String],
  creator: String,
  weaknesses: [String],
  bio: String,
}, { timestamps: true })

export const MutantModel = mongoose.models.Mutant || mongoose.model<Mutant>('Mutant', mutantSchema)
