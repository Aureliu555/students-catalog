export type User = {
    name: string,
    email: string,
    password: string,
    birth_date: bigint,
}

export type SimpleUser = {
    name: string,
    email: string,
    birth_date: bigint,
}

export type NewUser = {
    name: string,
    email: string,
    birth_date: bigint,
    access_token: string
}

export type Student = {
    id: string,
    name: string,
    subjects: Subject[],
}

export type SimpleStudent = {
    id: string,
    name: string
}

export type Subject = {
    code: number,
    name: string,
    grade: number | null,
}