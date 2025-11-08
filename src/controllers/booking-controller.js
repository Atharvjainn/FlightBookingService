//bnalenge
const BookingService = require('../services/booking-service')
const bookingService = new BookingService()
const { StatusCodes } = require('http-status-codes')


const create = async (req,res) => {
    try {
        const flight = await bookingService.create(req.body)
        return res.status(StatusCodes.CREATED).json({
            data : flight,
            success : true,
            message : "Booking created successfully!",
            err : {}
        })
    } catch (error) {
        console.log("Controller error",error.statusCode);
        return res.status(error.statusCode).json({
            data : {},
            success : false,
            message : error.message,
            err : error.explanation
        })
        
    }
}


const update = async (req,res) => {
    try {
        const flight = await bookingService.update(req.body,req.params.id)
        return res.status(StatusCodes.ACCEPTED).json({
            data : flight,
            success : true,
            message : "Booking updated successfully!",
            err : {}
        })
    } catch (error) {
        console.log("Controller error",error.statusCode);
        return res.status(error.statusCode).json({
            data : {},
            success : false,
            message : error.message,
            err : error.explanation
        })
        
    }
}

module.exports = {
    create,update
}