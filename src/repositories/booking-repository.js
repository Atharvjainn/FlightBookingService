const { Booking } = require('../models/index')
const { StatusCodes } = require('http-status-codes')
const { ValidationError,AppError } = require('../utils/errors/index')

class BookingRepository{
    async CreateBooking(data){
        try {
            const response = await Booking.create(data)            
            return response;
        } catch (error) {
            if(error.name = "SequelizeValidationError"){
                throw new ValidationError(error)
            }
            throw new AppError()
        }
    }

    // async UpdateBooking()
}


module.exports = BookingRepository