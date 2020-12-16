const express = require('express')
const router = express.Router()

router.route('/')
  .get(function (req, res) {
    res.send('app.get')
  })
  .post(function (req, res) {
    res.send('app.post')
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