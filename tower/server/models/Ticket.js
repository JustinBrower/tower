import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TicketSchema = new Schema(
    {
        eventId: { type: Schema.Types.ObjectId, required: true },
        accountId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
)


TicketSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Profile'
})

TicketSchema.virtual('party', {
    localField: 'eventId',
    foreignField: '_id',
    justOne: true,
    ref: 'Party'
})