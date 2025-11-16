//bnalenge
const BookingService = require('../services/booking-service')
const bookingService = new BookingService()
const { StatusCodes } = require('http-status-codes')
const { CreateChannel, PublishMessage } = require('../utils/MessageQueue')
const { REMINDER_BINDING_KEY } = require("../config/serverConfig")

class BookingController{

    async sendMessageToQueue(req,res){
        const channel = await CreateChannel()
        const payload = { 
            data : {
                subject : "This is a ticket 3",
                content : "This is the content of the ticket 3 created using queue",
                recepientemail : "lenovoservicecenterr@gmail.com",
                notificationtime : "2025-11-15 19:00:00"
            },
            service : "CREATE_TICKET"
        }
        await PublishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload))
        return res.status(200).json({
            message : "success"
        })
    }

    async create (req,res){
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

    async update (req,res){
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
}




module.exports = BookingController