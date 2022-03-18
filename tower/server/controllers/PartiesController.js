import { Auth0Provider } from "@bcwdev/auth0provider";
import { partiesService } from "../services/PartiesService";
import BaseController from "../utils/BaseController";
import { BadRequest } from "../utils/Errors";



export class PartiesController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllParties)
            .get('/:id', this.getPartyById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createParty)
            .put('/:id', this.editParty)
            .delete('/:id', this.cancelParty)
    }


    async getAllParties(req, res, next) {
        try {
            const parties = await partiesService.getAllParties()
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

}