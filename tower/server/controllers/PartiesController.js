import { Auth0Provider } from "@bcwdev/auth0provider";
import { partiesService } from "../services/PartiesService";
import BaseController from "../utils/BaseController";



export class PartiesController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createParty)
            .get('', this.getAllParties)
            .get('', this.getPartyById)
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
            const party = await partiesService.getPartyById(req.body.id)
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

}