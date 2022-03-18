import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TicketSchema = new Schema(
    {
        eventId: { type: Schema.Types.ObjectId },
        accountId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
)