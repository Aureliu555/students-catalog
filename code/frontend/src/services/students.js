import { API_URL } from "../utils/constants"

export async function getStudents(token) {
    const response = await getStudentsRequest(token)

    if (!response.ok) {
        window.location.href = `/error/${response.status}`
        return
    }

    const data = await response.json()
    return data
}

async function getStudentsRequest(token) {
    return fetch(`${API_URL}/api/students`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}