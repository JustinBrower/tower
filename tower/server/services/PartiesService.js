import { dbContext } from "../db/DbContext"



class PartiesService {

    async getAllParties() {
        const parties = await dbContext.Parties.find().populate('creator')
        return parties
    }

    async getPartyById(id) {
        const party = await dbContext.Parties.findById(id).populate('creator')
        return party
    }

    async createParty(body) {
        const party = await dbContext.Parties.create(body)
        // await party.populate('creator')
        return party
    }

}

export const partiesService = new PartiesService()