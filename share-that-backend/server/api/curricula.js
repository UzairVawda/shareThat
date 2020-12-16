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
    await curriculum.save()
    res.send(201, "Success")
  })

router.route('/:id')
  .get(function (req, res) {
    res.send(req.params)
  })
  .patch(function (req, res) {
    res.send('GET request to the homepage')
  })
  .delete(function (req, res) {
    res.send('POST request to the homepage')
  })

module.exports = router