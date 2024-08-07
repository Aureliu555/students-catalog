import { API_URL } from "../utils/constants"
import { getToken } from "./storage"

export async function getStudents() {
    const token = getToken()
    const response = await getStudentsRequest(token)

    if (!response.ok) {
        window.location.href = `/error/${response.status}`
        return
    }

    const data = await response.json()
    return data
}

export async function addStudent(name) {
    const token = getToken()
    const response = await addStudentRequest(token, name)

    if (!response.ok) {
        window.location.href = `/error/${response.status}`
        return
    }

    const data = await response.json()
    return data
}

export async function deleteStudent(id) {
    const token = getToken()
    const response = await deleteStudentRequest(token, id)

    if (!response.ok) {
        window.location.href = `/error/${response.status}`
        return
    }

    return true
}

export async function getStudent(id) {
    const token = getToken()
    const response = await getStudentRequest(token, id) 

    if (!response.ok) {
        window.location.href = `/error/${response.status}`
        return
    }

    const data = await response.json()
    return data
}

async function getStudentsRequest(token) {
    return fetch(`${API_URL}/students`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

async function addStudentRequest(token, name) {
    return fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: name
        })
    })
}

async function deleteStudentRequest(token, id) {
    return fetch(`${API_URL}/student/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

async function getStudentRequest(token, id) {
    return fetch(`${API_URL}/student/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}