export type IApplicationResponse = {
    id: number,
    status: string,
    message: string,
    comment: string,
    email: string,
    role: string,
    createdAt: string,
    updatedAt?: string,
};

export type IApplicationMessageResponse = {
    message: string,
    applications: IApplicationResponse[],
};

export type IApplicationCreateResponse = {
    id: number,
    status: string,
	user_id: number,
	message: string,
	updatedAt: string,
	createdAt: string,
};