import { Auth0Provider } from "@bcwdev/auth0provider";
import { dbContext } from "../db/DbContext";
import { ticketsService } from "../services/TIcketsService";
import BaseController from "../utils/BaseController";



export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
    }


    async createTicket(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const ticket = await ticketsService.createTicket(req.body)
            res.send(ticket)
        } catch (error) {
            next(error)
        }
    }
}