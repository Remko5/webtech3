export interface InvalidTokenInterface {
    isValid: boolean
    apiErrorMessage: ApiErrorMessage
}

interface ApiErrorMessage {
    code: number
    message: string
}