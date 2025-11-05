const { StatusCodes } = require('http-status-codes')

class ValidationError extends Error{
    constructor(error){
        this.name = "ValidationError"
        const explanation = []
        error.errors.forEach((err) => {
            explanation.push(err.message)
        });
        this.message = "Cannot Validate the data entered by the user"
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}


module.exports = ValidationError