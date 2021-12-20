/* eslint-disable max-len */
const { dataSources } = require('../../datasources')

const schema = {
    Query: {
        storyById(root, args) {
            return dataSources.boardService.getStoryById(args.id)
        },
    },

    Mutation: {
        addStoryForColumn(root, {
            boardId, columnId, title, size, ownerId, membersIds, description,
        }) {
            return dataSources.boardService
                .addStoryForColumn(boardId, columnId, title, size, ownerId, membersIds, description)
        },
        editStoryById(root, {
            id, title, size, ownerId, oldMemberIds, newMemberIds, description,
        }) {
            return dataSources.boardService.editStoryById(id, title, size, ownerId, oldMemberIds, newMemberIds, description)
        },
        deleteStoryById(root, { id }) {
            return dataSources.boardService.deleteStoryById(id)
        },
        archiveStoryById(root, { id }) {
            return dataSources.boardService.archiveStoryById(id)
        },
        restoreStoryById(root, { id }) {
            return dataSources.boardService.restoreStoryById(id)
        },
        addMemberForStory(root, {
            id, userId,
        }) {
            return dataSources.boardService.addMemberForStory(id, userId)
        },
    },

    Story: {
        column(root) {
            return dataSources.boardService.getColumnById(root.columnId)
        },
        owner(root) {
            if (!root.ownerId) {
                return null
            }
            return dataSources.boardService.getOwnerById(root.ownerId)
        },
        members(root) {
            return dataSources.boardService.getMembersByStoryId(root.id)
        },
        board(root) {
            return dataSources.boardService.getBoardById(root.boardId)
        },
    },
}

module.exports = schema
