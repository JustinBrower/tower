import { dbContext } from "../db/DbContext"




class TicketsService {

    async createTicket(body) {
        const ticket = await dbContext.Tickets.create(body)
        return ticket
    }

    async deleteTicket(id) {
        const doomedTicket = await dbContext.Tickets.findByIdAndDelete(id)
    }

    async getMyTickets(id) {
        const tickets = await dbContext.Tickets.find({ accountId: id })
        return tickets
    }
}

export const ticketsService = new TicketsService()