export function getToken() {
    return sessionStorage.getItem('token')
}

export function setToken(token) {
    sessionStorage.setItem('token', token)
}