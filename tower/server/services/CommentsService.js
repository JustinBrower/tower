import { dbContext } from "../db/DbContext"




class CommentsService {

    async createComment(body) {
        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator')
        return comment
    }

    async getCommentsByParty(id) {
        const comments = await dbContext.Comments.find({ eventId: id }).populate('creator')
        return comments
    }
}

export const commentsService = new CommentsService()