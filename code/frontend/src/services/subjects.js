import { API_URL } from "../utils/constants"
import { getToken } from "./storage"

export async function addSubject(student_id, name) {
    const response = await addSubjectRequest(student_id, name)

    if (!response.ok) {
        window.location.href = `/error/${response.status}`
        return
    }

    const data = await response.json()
    return data
}

export async function deleteSubject(id) {
    const response = await deleteSubjectRequest(id) 

    if (!response.ok) {
        window.location.href = `/error/${response.status}`
        return
    }

    return true
}

export async function addGrade(subject_id, grade) {
    const response = await addGradeRequest(subject_id, grade) 

    if (!response.ok) {
        window.location.href = `/error/${response.status}`
        return
    }

    return true
}

export async function removeGrade(id) {
    const response = await removeGradeRequest(id)   

    if (!response.ok) {
        window.location.href = `/error/${response.status}`
        return
    }

    return true
}

async function deleteSubjectRequest(id) {
    return await fetch(`${API_URL}/api/subject/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
}

async function addSubjectRequest(student_id, name) {
    return await fetch(`${API_URL}/api/student/${student_id}/subject`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ name })
    })
}

async function removeGradeRequest(id) {
    return await fetch(`${API_URL}/api/subject/${id}/grade`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
}

async function addGradeRequest(id, grade) {
    return await fetch(`${API_URL}/api/subject/${id}/grade`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ grade })
    })
}