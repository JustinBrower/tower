import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class CommentsService {

    async getPartyComments(id) {
        const res = await api.get('api/events/' + id + '/comments')
        logger.log('comments are...', res.data)
        AppState.comments = res.data
    }

    async postComment(body) {
        logger.log("body is...", body)
        const res = await api.post('api/comments', body)
        logger.log('res.data is...', res.data)
        AppState.comments = [...AppState.comments, res.data]
    }

    async deleteComment(id) {
        logger.log('id is...', id)
        const res = await api.delete('api/comments/' + id)
        AppState.comments = AppState.comments.filter(c => c.id !== id)
    }

}

export const commentsService = new CommentsService()