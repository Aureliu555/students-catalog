import { API_URL } from './config'
import { getToken } from '../services/storage'

export async function getStudentsRequest() {
    return fetch(`${API_URL}/students`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
}

export async function addStudentRequest(name) {
    return fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({
            name: name
        })
    })
}

export async function deleteStudentRequest(id) {
    return fetch(`${API_URL}/student/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
}

export async function getStudentRequest(id) {
    return fetch(`${API_URL}/student/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
}