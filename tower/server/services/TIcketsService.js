import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { partiesService } from "./PartiesService"




class TicketsService {

    async createTicket(body) {
        const party = await dbContext.Parties.findById(body.eventId)
        if (party.capacity == 0) {
            throw new BadRequest("Capacity is full")
        }
        const ticket = await dbContext.Tickets.create(body)
        return ticket
    }

    async deleteTicket(id, userId) {
        const doomedTicket = await dbContext.Tickets.findById(id)
        const editParty = await partiesService.addCapacity(id)
        if (doomedTicket.accountId !== userId) {
            throw new Forbidden("You cannot delete this")
        }
        doomedTicket.delete()
    }

    async getMyTickets(id) {
        const tickets = await dbContext.Tickets.find({ accountId: id }).populate('party')

        return tickets.map(mongooseDocument => {
            const ticket = mongooseDocument.toJSON()
            return {
                ticketId: ticket.id,
                accountId: ticket.accountId,
                ...ticket.party
            }
        })

    }

    async getTicketsByParty(id) {
        const tickets = await dbContext.Tickets.find({ eventId: id }).populate('creator')
        return tickets
    }
}

export const ticketsService = new TicketsService()