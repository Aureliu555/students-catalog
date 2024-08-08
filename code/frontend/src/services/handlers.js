import { setToken, setUser } from "./storage"

export async function requestHandler(fetchFunction, withData = false) {
    const response = await fetchFunction()

    if (!response.ok) {
        const error = await response.json()
        console.log(response)
        window.location.href = `/error/${response.status}?message=${encodeURIComponent(error.error_message)}`
        return
    }

    return withData ? await response.json() : true
}

export async function authRequestHandler(checkFunction, fetchFunction) {
    let status = checkFunction()
    if (status !== 'success') {
        const errorMessage = getErrorMessage(status)
        return { status: 'error', message: errorMessage }
    }
    
    const response = await fetchFunction()
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
