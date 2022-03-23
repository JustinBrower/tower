import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TicketsService {

    async getMyTickets() {
        const res = await api.get('account/tickets')
        AppState.tickets = res.data
        logger.log("Your tickets are...", AppState.tickets)
    }

    async getPartyTickets(id) {
        const res = await api.get('api/events/' + id + '/tickets')
        AppState.tickets = res.data
        logger.log("This event's tickets are...", AppState.tickets)

    }

    async buyTicket(body) {
        logger.log("body is...", body)
        const res = await api.post('api/tickets/', body)
        logger.log("ticket after server...", res.data)
        AppState.tickets = [...AppState.tickets, res.data]
        return res.data
    }

    async deleteTicket(ticketId) {
        // NOTE                                       vvvvvvv use the ticketId from our params here
        const res = await api.delete('api/tickets/' + ticketId)
        // NOTE                                     vvvvvvv fileter by ticektId !== ticketId
        AppState.tickets = AppState.tickets.filter(p => p.ticketId !== ticketId)
    }
}

export const ticketsService = new TicketsService()