function handleError(err, req, res, next) {
    console.error(err)
    if (res.headersSent) return next()
    res.status(500).json({ error: 'Internal Server Error' })
}
function notFound(req, res) {
    res.status(404).json({ error: 'Not Found' })
}
module.exports = {
    handleError,
    notFound,
}