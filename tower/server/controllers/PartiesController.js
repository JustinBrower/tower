import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import { partiesService } from "../services/PartiesService";
import { ticketsService } from "../services/TIcketsService";
import BaseController from "../utils/BaseController";
import { BadRequest } from "../utils/Errors";



export class PartiesController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllParties)
            .get('/:id', this.getPartyById)
            .get('/:id/comments', this.getCommentsByParty)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createParty)
            .put('/:id', this.editParty)
            .delete('/:id', this.cancelParty)
            .get('/:id/tickets', this.getTicketsByParty)

    }


    async getAllParties(req, res, next) {
        try {
            const parties = await partiesService.getAllParties(req.query)
            res.send(parties)
        } catch (error) {
            next(error)
        }
    }

    async getPartyById(req, res, next) {
        try {
            const party = await partiesService.getPartyById(req.params.id)
            res.send(party)
        } catch (error) {
            next(error)
        }
    }

    async createParty(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const party = await partiesService.createParty(req.body)
            await res.send(party)
        } catch (error) {
            next(error)
        }
    }

    async editParty(req, res, next) {
        try {
            req.body.id = req.params.id
            const party = await partiesService.editParty(req.body, req.userInfo.id)
            res.send(party)
        } catch (error) {
            next(error)
        }
    }

    async cancelParty(req, res, next) {
        try {
            const party = await partiesService.cancelParty(req.params.id, req.userInfo.id)
            res.send(party)
        } catch (error) {
            next(error)
        }
    }

    async getTicketsByParty(req, res, next) {
        try {
            const tickets = await ticketsService.getTicketsByParty(req.params.id)
            res.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async getCommentsByParty(req, res, next) {
        try {
            const comments = await commentsService.getCommentsByParty(req.params.id)
            res.send(comments)
        } catch (error) {
            next(error)
        }

    }

}