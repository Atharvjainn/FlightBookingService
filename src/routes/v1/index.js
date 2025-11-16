const express = require('express')
const router = express.Router()
const  BookingController  = require('../../controllers/booking-controller')
const bookingcontroller = new BookingController()

router.post('/bookings',bookingcontroller.create)
router.post('/publish',bookingcontroller.sendMessageToQueue)


module.exports = router
