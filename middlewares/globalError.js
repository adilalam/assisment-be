

function catchError(error, req, res, next) {
    res.send("some error occured")
    next()
}

module.exports = {catchError}