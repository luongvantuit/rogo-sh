export class HttpRequestError extends Error {
    
    name = 'HttpRequestError'

    constructor(message) {
        super(message)
    }
}