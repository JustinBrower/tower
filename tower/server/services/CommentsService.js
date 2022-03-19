import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"




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

    async deleteComment(id, userId) {
        const comment = await dbContext.Comments.findById(id, userId)
        if (comment.creatorId != userId) {
            throw new Forbidden("You cannot delete this")
        }
    }
}

export const commentsService = new CommentsService()