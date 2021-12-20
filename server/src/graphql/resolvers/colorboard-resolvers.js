const { dataSources } = require("../../datasources")

const schema = {
    Query: {
        async allEpicColors() {
            return await dataSources.boardService.allEpicColors()
        },
    },

    Mutation: {
        async addEpicColors(root, args) {
            return await dataSources.boardService.addEpicColors(args.colorId, args.boardId, args.name)
        },
    },
}

module.exports = schema
