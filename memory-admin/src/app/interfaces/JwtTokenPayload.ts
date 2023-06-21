export interface JwtTokenPayload {
    exp: number
    iat: number
    iss: string
    roles: Array<string>
    sub: string
    username: string
}