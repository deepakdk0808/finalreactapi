const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')
const Teacher = require("../models/teacher.model")


router.post('/', authenticate, async (req, res) => {
    const ADMINID = req.admin._id
    try {
        const teachers = await Teacher.create({
            name: req.body.name,
            gender: req.body.gender,
            age: req.body.age,
            class_id: req.body.class_id,
            admin_id: ADMINID
        })
        return res.status(500).send(teachers)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.get('/', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const size = req.query.size || 4;
        const operation = req.query.task;


        if (operation == "female" || operation == "Female") {
            const teacher = await Teacher.find({ $or: [{ gender: "female" }, { gender: "Female" }] }).skip((page - 1) * size).limit(size).lean().exec();
            const totalpages = Math.ceil((await Teacher.find({ $or: [{ gender: "female" }, { gender: "Female" }] }).countDocuments()) / size)
            return res.status(201).send({ teacher, totalpages, operation });
        }
        else if (operation == "male" || operation == "Male") {
            const teacher = await Teacher.find({ $or: [{ gender: "male" }, { gender: "Male" }] }).skip((page - 1) * size).limit(size).lean().exec();
            const totalpages = Math.ceil((await Teacher.find({ $or: [{ gender: "male" }, { gender: "Male" }] }).countDocuments()) / size)
            return res.status(201).send({ teacher, totalpages });
        }
        else if (operation == "asc") {
            const teacher = await Teacher.find().sort({ age: 1 }).skip((page - 1) * size).limit(size).lean().exec();
            const totalpages = Math.ceil((await Teacher.find().sort({ age: 1 }).countDocuments()) / size)
            return res.status(201).send({ teacher, totalpages });
        }
        else if (operation == "dsc") {
            const teacher = await Teacher.find().sort({ age: -1 }).skip((page - 1) * size).limit(size).lean().exec();
            const totalpages = Math.ceil((await Teacher.find().sort({ age: -1 }).countDocuments()) / size)
            return res.status(201).send({ teacher, totalpages });
        }
        const teacher = await Teacher.find().skip((page - 1) * size).limit(size).lean().exec();
        const totalpages = Math.ceil((await Teacher.find().countDocuments()) / size)
        return res.status(201).send(teacher);
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const teachers = await Teacher.findById(req.params.id).lean().exec()
        res.status(500).send(teachers)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const teachers = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();
        return res.send(teachers);
    } catch (error) {
        res.send(error.message);
    }
});

// router.delete('/:id', async (req, res) => {
//     try {
//         const teachers = await Teacher.findByIdAndDelete(req.params.id).lean().exec()
//         res.send(teachers)
//     } catch (error) {
//         res.send(error.message)
//     }
// })

module.exports = router