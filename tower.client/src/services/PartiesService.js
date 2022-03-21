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
        return res.data
    }

    async cancelParty(id) {
        const res = await api.delete('api/events/' + id)
        AppState.parties = AppState.parties.filter(p => p.id !== id)
    }

    async editParty(body, id) {
        const res = await api.put('api/events/' + id, body)
    }

    async setActive(id) {
        const res = await api.get('api/events/' + id)
        logger.log("active party is...", res.data)
        AppState.activeParty = res.data
    }

    async search(query) {
        logger.log("query is...", query)
        const res = await api.get('api/events' + '?query=' + query)
        AppState.parties = res.data
    }

}

export const partiesService = new PartiesService()