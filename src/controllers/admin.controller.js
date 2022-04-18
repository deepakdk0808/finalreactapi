const express = require('express')
const router = express.Router()

const Admin = require ("../models/admin.model");

router.post('/', async (req, res) => {
    try {
        const admin = await Admin.create(req.body)
        return res.status(200).send(admin)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.get('/', async (req, res) => {
    try {
        const admin = await Admin.find().lean().exec()
        return res.status(200).send(admin)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

module.exports = router