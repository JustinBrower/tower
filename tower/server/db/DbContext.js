import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { PartySchema } from '../models/Party';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Parties = mongoose.model('Party', PartySchema)
}

export const dbContext = new DbContext()
