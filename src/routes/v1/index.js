const express = require('express')
const router = express.Router()
const  BookingController  = require('../../controllers/booking-controller')
const bookingcontroller = new BookingController()

router.post('/bookings',bookingcontroller.create)
router.post('/publish',bookingcontroller.sendMessageToQueue)
router.get('/home',(req,res) => {
    return res.status(200).json({
        message : "hogya bhai"
    })
})

module.exports = router
