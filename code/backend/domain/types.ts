export type User = {
    name: string,
    email: string,
    password: string,
    birth_date: bigint,
}

export type SimpleUser = {
    name: string,
    email: string
}

export type NewUser = {
    name: string,
    email: string,
    access_token: string
}