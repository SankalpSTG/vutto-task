export type ResponseType<T=any> = {
  code: number,
  message: string,
  data: T
}
export type ErrorResponseType = {
  statusCode: number,
  message: string,
  error: string
}
export type RequestDataType = {
    data?: any,
    query?: any
}