export const signIn = (username, password, callback) => dispatch => {
    fetch("https://localhost:44330/api/auth/Login", {  //https://commpany.azurewebsites.net/
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Email: username,
            Password: password
        })
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        }
        else {
            callback(false, 'Kullanıcı / Şifre Hatalı');
        }
    }).then(data => {
        if (data) {            
            localStorage.setItem('token', data.token);
            localStorage.setItem('expiration', data.expires);
            dispatch({ type: "LOGGED_IN", isLoggedIn: true });
            callback(true, '');
        }
    }).catch(err => {
        callback(false, err);
    });
};