import { handleResponse } from './request-response';

let config = window.ASConfig;

export const authService = {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
};

function signOut(callback) {
    localStorage.removeItem('token');
    callback(true);
}

function signInWithEmailAndPassword(email, password, callback) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/connect/token`, requestOptions)
        .then(handleResponse)
        .then(
            (result) => {
                localStorage.setItem('token', result.token);
                callback(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                callback(null);
            }
        );
}

function onAuthStateChanged(callback) {
    const token = localStorage.getItem('token');
    if (token) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        };

        return fetch(`${config.apiUrl}/connect/state`, requestOptions)
            .then(handleResponse)
            .then(
                (result) => {
                    callback(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    localStorage.removeItem('token');
                    callback(null);
                }
            );
    } else {
        callback(null);
    }
}