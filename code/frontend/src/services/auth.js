import { API_URL } from "../utils/constants"
import { setToken } from "./storage"

export async function login(email, password) {
    const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    if (response.ok) {
        const data = await response.json()
        setToken(data.access_token)
        window.location.href = '/'
        return data
    } else {
        console.log(response)
    }
}