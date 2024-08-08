import { getToken, getUser, removeToken, removeUser } from "./storage"
import { authRequestHandler } from "./handlers"
import { loginRequest, registerRequest } from "../requests/auth"

export async function login(email, password) {
    return await authRequestHandler(
        () => checkLogin(email, password), 
        () => loginRequest(email, password)
    )
}

export async function register(name, email, birth_date, password) {
    return await authRequestHandler(
        () => checkRegister(name, email, birth_date, password), 
        () => registerRequest(name, email, birth_date.getTime(), password)
    )
}

export function logout() {
    removeToken()
    removeUser()
}

export function getFullUser() {
    const token = getToken()
    const user = getUser()
    if (!token || !user) return { error: 'No user logged in' }
    else return { user: user, token: token }
}

function checkLogin(email, password) {
    if (!isEmailValid(email)) return 'invalidEmail'
    if (!isPasswordValid(password)) return 'invalidPassword'
    return 'success'
}

function checkRegister(name, email, birth_date, password) {
    if (!isEmailValid(email)) return 'invalidEmail'
    if (!isPasswordValid(password)) return 'invalidPassword'
    if (!isNameValid(name)) return 'invalidName'
    if (!isDateValid(birth_date)) return 'invalidBirthDate'
    return 'success'
}

function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

function isNameValid(name) {
    return name && name.length > 0
}

function isDateValid(date) {
    return date !== null
}

function isPasswordValid(password) {
    return password.length >= 8
}