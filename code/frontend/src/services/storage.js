export function getToken() {
    return sessionStorage.getItem('token')
}

export function setToken(token) {
    sessionStorage.setItem('token', token)
}

export function removeToken() {
    sessionStorage.removeItem('token')
}

export function setUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
}

export function getUser() {
    const user = sessionStorage.getItem('user')
    return user ? JSON.parse(user) : null
}

export function removeUser() {
    sessionStorage.removeItem('user')
}