import { dbContext } from "../db/DbContext"




class TicketsService {

    async createTicket(body) {
        const ticket = await dbContext.Tickets.create(body)
        return ticket
    }
}

export const ticketsService = new TicketsService()