export interface IAuthResponse {
    accessToken: string,
    refreshToken: string,
    user: IUser,
}

export interface IUser {
    id: number,
    email: string,
    name: string,
}