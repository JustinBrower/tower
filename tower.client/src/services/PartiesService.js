import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"




class PartiesService {

    async getAllParties() {
        const res = await api.get('api/events')
        logger.log("got all events...", res.data)
        AppState.parties = res.data
    }
    async createParty() {

    }

    async search(query) {
        logger.log("query is...", query)
        const res = await api.get('api/events' + '?query=' + query)
        AppState.parties = res.data
    }

}

export const partiesService = new PartiesService()