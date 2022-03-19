import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { PartySchema } from '../models/Party';
import { TicketSchema } from '../models/Ticket';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Parties = mongoose.model('Party', PartySchema)
  Tickets = mongoose.model('Ticket', TicketSchema)
}

export const dbContext = new DbContext()
