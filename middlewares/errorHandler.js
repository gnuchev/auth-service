function errorHandler(err, req, res, next) {
    // Log the error (for internal use)
    console.error(err.stack);

    // Respond to the client
    res.status(500).send('Something broke!');
}

module.exports = errorHandler;
