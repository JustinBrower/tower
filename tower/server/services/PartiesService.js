import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"



class PartiesService {

    async getAllParties(query = {}) {
        const parties = await dbContext.Parties.find(query).populate('creator')
        return parties
    }

    async getPartyById(id) {
        const party = await dbContext.Parties.findById(id).populate('creator')
        return party
    }

    async createParty(body) {
        let today = new Date()
        let day = new Date(body.startDate)
        if (day < today) {
            throw new BadRequest("Bro you can't plan an event in the past")
        }

        if (body == undefined || null) {
            throw new BadRequest("What the heck are you sending me")
        }
        const party = await dbContext.Parties.create(body)
        await party.populate('creator')
        return party
    }

    async editParty(body, userId) {
        const original = await dbContext.Parties.findById(body.id)
        if (original.creatorId.toString() !== userId) {
            throw new Forbidden("You cannot edit this")
        }
        if (original.isCanceled == true) {
            throw new BadRequest('You cannot edit a canceled event')
        }
        if (body.name != undefined) { original.name = body.name }
        if (body.description != undefined) { original.description = body.description }
        if (body.coverImg != undefined) { original.coverImg = body.coverImg }
        if (body.location != undefined) { original.location = body.location }
        if (body.capacity != undefined) { original.capacity = body.capacity }
        if (body.startDate != undefined) { original.startDate = body.startDate }
        if (body.type != undefined) { original.type = body.type }

        await original.save()
        return original
    }

    async minusCapacity(body) {
        const party = await dbContext.Parties.findById(body.eventId)
        party.capacity = (party.capacity - 1)
        await party.save()
        return party
    }

    async addCapacity(id) {

        const ticket = await dbContext.Tickets.findById(id)
        const party = await dbContext.Parties.findById(ticket.id)
        party.capacity = (party.capacity + 1)
        await party.save()
        return party
    }

    async cancelParty(id, userId) {

        const party = await dbContext.Parties.findById(id)
        if (party.isCanceled == true) {
            throw new BadRequest('You cannot edit a canceled event')
        }
        if (party.creatorId.toString() !== userId) {
            throw new Forbidden("You cannot cancel this")
        }
        party.isCanceled = true
        await party.save()
    }

}


export const partiesService = new PartiesService()