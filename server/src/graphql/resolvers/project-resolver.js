/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
const { withFilter } = require('graphql-subscriptions')
const { dataSources } = require('../../datasources')
const { pubsub } = require('../subs')

const PROJECT_REMOVED = 'PROJECT_REMOVED'
const PROJECT_RESTORED = 'PROJECT_RESTORED'

const schema = {
    Query: {
        projectById(root, args) {
            return dataSources.boardService.getProjectById(args.id)
        },
        boardsByProjectId(root, args) {
            return dataSources.boardService.getBoardsByProjectId(args.id)
        },
        allProjects() {
            return dataSources.boardService.getProjects().catch((e) => console.log(e))
        },
        archivedProjects() {
            return dataSources.boardService.getArchivedProjects().catch((e) => console.log(e))
        },
    },

    Subscription: {
        projectRemoved: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(PROJECT_REMOVED),
                (payload, args) => args.projectId === payload.projectId
              && args.eventId !== payload.eventId,
            ),
        },
    },

    Mutation: {
        async addProject(root, { name }) {
            return dataSources.boardService.addProject(name)
        },
        async archiveProjectById(root, { projectId, eventId }) {
            try {
                await dataSources.boardService.archiveProjectById(projectId)
                await pubsub.publish(PROJECT_REMOVED, {
                    eventId,
                    projectRemoved: {
                        removeType: 'ARCHIVED',
                        removeInfo: { projectId },
                    },
                })
            } catch (e) {
                console.log(e)
            }

            return projectId
        },
        async restoreProjectById(root, { projectId, eventId }) {
            try {
                await dataSources.boardService.restoreProjectById(projectId)
                await pubsub.publish(PROJECT_RESTORED, {
                    eventId,
                    projectRestored: {
                        restoreType: 'RESTORED',
                        restoreInfo: { projectId },
                    },
                })
            } catch (e) {
                console.log(e)
            }

            return projectId
        },

    },
    Project: {
        boards(root) {
            return dataSources.boardService.getBoardsByProjectId(root.id)
        },
    },
}
module.exports = schema
