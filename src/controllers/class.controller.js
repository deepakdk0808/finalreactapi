const express = require('express')
const router = express.Router()

const Class = require("../models/class.model")

router.post('', async (req, res) => {
    try {
        const classes = await Class.create(req.body)
        return res.status(200).send(classes)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.get('', async (req, res) => {
    try {
        const classes = await Class.find().lean().exec()
        res.status(200).send(classes)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const classes = await Class.findById(req.params.id).lean().exec()
        res.status(200).send(classes)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// router.delete('/:id', async (req, res) => {
//     try {
//         const classes = await Class.findByIdAndDelete(req.params.id).lean().exec()
//         res.send(classes)
//     } catch (error) {
//         res.send(error.message)
//     }
// })

module.exports = router