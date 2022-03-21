import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"




class PartiesService {

    async getAllParties() {
        const res = await api.get('api/events')
        logger.log("got all events...", res.data)
        AppState.parties = res.data
    }
    async createParty(party) {
        logger.log("party is...", party)
        const res = await api.post('api/events', party)
        logger.log("res is...", res)
        logger.log("res.data is...", res.data)
        AppState.parties = [...AppState.parties, res.data]
    }

    async search(query) {
        logger.log("query is...", query)
        const res = await api.get('api/events' + '?query=' + query)
        AppState.parties = res.data
    }

}

export const partiesService = new PartiesService()