import React from "react";

class LoginComponent extends React.Component {

    componentWillMount() {

        if (window.location.href.indexOf('id_token') > -1) {
            const url = window.location.href.slice(window.location.href.indexOf('id_token=') + 9);
            const idToken = url.slice(0, url.indexOf('&'));
            if (idToken) {
                localStorage.setItem('token', idToken);
                window.location.href = "/admin/index";
            }
        }
        else{
            if(!localStorage.getItem('token')){
                window.location.href =  "/auth"; //"https://login.microsoftonline.com/25caf713-994a-4c0a-a13b-4c4351f703f1/oauth2/v2.0/authorize?client_id=269b616a-f87b-4b41-978b-fc9b6c8a595d&response_type=id_token%20token&redirect_uri=http://localhost:3000/login&scope=openid+profile+email&state=12345&nonce=678910";
            }
        }
    }

    render() {
        return "";
    }
}

export default LoginComponent;