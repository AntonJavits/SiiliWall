const { dataSources } = require("../../datasources")

const schema = {

    Query: {

        allColors() {
            return dataSources.boardService.getColors()
        },
    },
}

module.exports = schema
