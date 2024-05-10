export default function errorHandler(error, req, res, next) {
    console.log(error)

    if (error.type === "invalidCategory") {
        return res.status(422).send(error.message)
    }

    if (error.type === "conflict") {
        return res.status(409).send(error.message)
    }
    
    res.status(500).send(error.message)
}