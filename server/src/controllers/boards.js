const boardsRouter = require('express').Router()

boardsRouter.get('/', (req, res) => {
    res.json({ msg: 'Working' })
})

module.exports = boardsRouter
