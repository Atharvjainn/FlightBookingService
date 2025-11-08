const BookingRepository = require('../repositories/booking-repository')
const { FLIGHT_PATH } = require('../config/serverConfig')
const { ServiceError } = require('../utils/errors/index')
const axios = require('axios');

class BookingService{
    constructor(){
        this.bookingRepository = new BookingRepository() 
    }


    async create(data){
        try {
            const flightId = data.flightId
            const URL = `${FLIGHT_PATH}/${flightId}`
            const fetchedflight = await axios.get(URL)
            const flight = fetchedflight.data.data
            if(data.noofSeats > flight.totalSeats){
                throw new ServiceError(
                    "cannot book this flight","not enought seats"
                )
            }
            const totalCost = flight.price * data.noofSeats
            const booking_payload = {...data , totalCost}
            console.log(booking_payload);
            const booking = await this.bookingRepository.CreateBooking(booking_payload)
            const updateURL = `${FLIGHT_PATH}/${booking_payload.flightId}`
            await axios.patch(updateURL,{totalSeats : flight.totalSeats - booking_payload.noofSeats})
            const finalBooking = await this.bookingRepository.UpdateBooking({status : "Booked"},booking.id)
            return finalBooking
            
            
            
            
            
        } catch (error) { 
            console.log(error);
            
            if(error.name == "SequelizeValidationError" || error.name == "AppError" || error.name == "ServiceError"){
                throw error;
            }
            throw new ServiceError()
        }
    }


    async update(data,bookingId){
        try {
            const response = this.bookingRepository.UpdateBooking(data,bookingId)
        } catch (error) {
            if(error.name == "SequelizeValidationError" || error.name == "AppError" || error.name == "ServiceError"){
                throw error;
            }
            throw new ServiceError()
        }
    }
}

module.exports = BookingService