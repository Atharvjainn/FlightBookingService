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
            return flight
            
            
            
            
            
        } catch (error) { 
            console.log(error);
            
            if(error.name == "SequelizeValidationError" || error.name == "AppError" || error.name == "ServiceError"){
                throw error;
            }
            throw new ServiceError()
        }
    }
}

module.exports = BookingService