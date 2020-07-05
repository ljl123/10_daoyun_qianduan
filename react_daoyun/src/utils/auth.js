export function getToken() {
    return localStorage.getItem("token");
}

export function setToken(token) {
    return localStorage.setItem("token", token);
}

export function isLogined() {
    if (localStorage.getItem("token")) {
        return true;
    }
    return false;
}

export function clearToken() {
    localStorage.removeItem("token");
}

export function setType(type) {
    return localStorage.setItem("type", type);
}

export function isManager() {
    if (localStorage.getItem("type") == 1) {
        return true;
    }
    return false;
}

export function getEmail() {
    return localStorage.getItem("email");
}

export function setEmail(email) {
    return localStorage.setItem("email", email);
}
export function getPwd() {
    return localStorage.getItem("pwd");
}

export function setPwd(pwd) {
    return localStorage.setItem("pwd", pwd);
}

export function getUser() {
    return localStorage.getItem("username");
}

export function setUser(username) {
    return localStorage.setItem("username", username);
}