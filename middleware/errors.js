//Cuando no encuentro un elemento
export const notFoundHandler = (req, res, next) => {
    const error = new Error(`404 ruta no encontrada`);
    res.status(404);
    next(error);
};

//Cuando se tiene un error
export const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        status: statusCode,
        msg: err.message,
        stack: process.env.NODE_ENV !== 'production' ? '' : err.stack
    });
    
}