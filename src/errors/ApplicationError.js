export class ApplicationError extends Error {

    name = 'ApplicationError'

    constructor(message) {
        super(message)
    }
}

