import { API_URL } from './config'

export async function loginRequest(email, password) {
    return await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
}

export async function registerRequest(name, email, birth_date, password) {
    return await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, birth_date, password })
    })
}