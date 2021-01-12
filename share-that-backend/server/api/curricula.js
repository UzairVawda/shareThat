const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const { Curriculum }  = require("@db")

router.route('/')
  .get(async function (req, res) {
    const curriculum = await Curriculum.find()
    res.send(curriculum)
  })
  .post(async function (req, res) {
    const { name, description, goal, sections } = req.body
    const curriculum = new Curriculum({
      name,
      description,
      goal,
      sections
    })
    const curResponse = await curriculum.save()
    res.send(201, curResponse)
  })

router.route('/:id')
  .get(async function (req, res) {
    const curriculum = await Curriculum.findById(req.params.id)
    res.send(curriculum)
  })
  .patch(async function (req, res) {
    await Curriculum.updateOne({ _id: req.params.id }, { ...req.body } )
    res.send("Success")
  })
  .delete(async function (req, res) {
     await Curriculum.deleteOne( { _id: req.params.id } )
    res.send('Success')
  })

module.exports = router