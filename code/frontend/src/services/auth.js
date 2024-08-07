import { API_URL } from "../utils/constants"
import { setToken, setUser, getToken, getUser, removeToken, removeUser } from "./storage"

export async function login(email, password) {
    let loginStatus = checkLogin(email, password)
    if (loginStatus !== 'success') {
        const errorMessage = getErrorMessage(loginStatus)
        return { status: 'error', message: errorMessage }
    }

    const response = await loginRequest(email, password)
    const data = await response.json()

    if (response.ok) {
        setToken(data.access_token)
        const user = { name: data.name, email: data.email, birth_date: data.birth_date }
        setUser(user)
        window.location.href = '/students'
        return { status: 'success' }
    } else {
        return { status: 'error', message: data.error_message }
    }
}

export async function register(name, email, birth_date, password) {
    let registerStatus = checkRegister(name, email, birth_date, password)
    if (registerStatus !== 'success') {
        const errorMessage = getErrorMessage(registerStatus)
        return { status: 'error', message: errorMessage }
    }
    
    const response = await registerRequest(name, email, birth_date.getTime(), password)
    const data = await response.json()

    if (response.ok) {
        setToken(data.access_token)
        const user = { name: data.name, email: data.email, birth_date: data.birth_date }
        setUser(user)
        window.location.href = '/students'
        return { status: 'success' }
    } else {
        return { status: 'error', message: data.error_message }
    }
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

async function loginRequest(email, password) {
    return await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
}

async function registerRequest(name, email, birth_date, password) {
    return await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, birth_date, password })
    })
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

function getErrorMessage(inputError) {
    switch (inputError) {
        case 'invalidEmail':
            return 'Email needs to follow the format: example@example.com'
        case 'invalidName':
            return 'Name is invalid'
        case 'invalidBirthDate':
            return 'Birth Date not inserted'
        case 'invalidPassword':
            return 'Password needs to have at least 8 characters'
        default:
            return 'Something went wrong, try again later'
    }
}
