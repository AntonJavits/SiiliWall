/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
const { dataSources } = require('../../datasources')

const schema = {
    Query: {
        allUsers() {
            return dataSources.boardService.getUsers()
        },
        archivedUsers() {
            return dataSources.boardService.getArchivedUsers()
        },
        userById(root, args) {
            return dataSources.boardService.getUserById(args.id)
        },
    },

    Mutation: {
        addUser(root, args) {
            return dataSources.boardService.addUser(args.userName, args.projectId)
        },
        archiveUser(root, args) {
            return dataSources.boardService.archiveUser(args.id, args.userName)
        },
        restoreUserById(root, args) {
            return dataSources.boardService.restoreUserById(args.id)
        }
    },
}

module.exports = schema
