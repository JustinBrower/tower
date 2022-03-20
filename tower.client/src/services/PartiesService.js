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

}

export const partiesService = new PartiesService()