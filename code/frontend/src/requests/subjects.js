import { API_URL } from './config'
import { getToken } from '../services/storage'

export async function deleteSubjectRequest(id) {
    return await fetch(`${API_URL}/subject/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
}

export async function addSubjectRequest(student_id, name) {
    return await fetch(`${API_URL}/student/${student_id}/subject`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ name })
    })
}

export async function removeGradeRequest(id) {
    return await fetch(`${API_URL}/subject/${id}/grade`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
}

export async function addGradeRequest(id, grade) {
    return await fetch(`${API_URL}/subject/${id}/grade`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ grade })
    })
}