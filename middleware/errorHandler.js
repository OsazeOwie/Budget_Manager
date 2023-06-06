const errorHandler = (err, req, res, next) => {
    const status = res.statusCode ? res.statusCode: 500;

    switch (status) {
        case 400:
            res.json({
                title:"Not Valid",
                message: err.message,
                stackTrace: err.stack
        }) 
            break;
        case 401:
            res.json({
                title:"Unauthorised",
                message: err.message,
                stackTrace: err.stack
        }) 
            break;
        case 403:
            res.json({
                title:"Forbidden access",
                message: err.message,
                stackTrace: err.stack
        }) 
            break;
            case 404:
                res.json({
                    title:"Not found",
                    message: err.message,
                    stackTrace: err.stack
            }) 
                break;
            case 409:
                res.json({
                    title:"Resource already exists",
                    message: err.message,
                    stackTrace: err.stack
            }) 
                break;
            case 500:
            res.json({
                title:"Server error",
                message: err.message,
                stackTrace: err.stack
        }) 
            break;
    
        default:
            console.log("No error")
            break;
    }
}

module.exports = errorHandler