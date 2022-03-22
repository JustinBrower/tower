import { Auth0Provider } from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";
import { partiesService } from "../services/PartiesService";
import { ticketsService } from "../services/TIcketsService";
import BaseController from "../utils/BaseController";



export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:id', this.deleteTicket)
    }


    async createTicket(req, res, next) {
        try {
            // TODO MAKE THIS SEND A PUT REQUEST TO PARTY TO EDIT CAPACITY
            req.body.accountId = req.userInfo.id
            const ticket = await ticketsService.createTicket(req.body)
            const editParty = await partiesService.minusCapacity(req.body)
            res.send(ticket)
            res.send(editParty)
        } catch (error) {
            next(error)
        }
    }

    async deleteTicket(req, res, next) {
        try {
            const doomedTicket = await ticketsService.deleteTicket(req.params.id, req.userInfo.id)
            const editParty = await partiesService.addCapacity(req.params.id)
            res.send(doomedTicket)
            res.send(editParty)
        } catch (error) {
            next(error)
        }
    }
}