export default class HttpError extends Error {
  constructor (status = 500, message = 'Internal Error', data = {}) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)

    this.status = status
    this.data = data
  }
}
