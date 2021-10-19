class apiService {

    baseUrl = "https://localhost:44330/"; //"https://commpany.azurewebsites.net/";

    post = function (url, data, callback) {
        fetch(this.baseUrl + "api/" + url, {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        })
            .catch(err => {

            })
            .then(response => {
                if (response && response.status !== 200) {
                    if (response && response.status === 401) {
                        window.location.href = "/auth";
                        return;
                    }
                    return;
                }
                return response?.json();
            })
            .then(data => {
                if (callback) {
                    callback(data);
                }
            });
    }

    get = function (url, callback) {
        fetch(this.baseUrl + "api/" + url, {
            method: 'GET',
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .catch(err => {

            })
            .then(response => {
                if (response && response.status !== 200) {
                    if (response && response.status === 401) {
                        window.location.href = "/auth";
                        return;
                    }
                    return;
                }
                return response?.json();
            })
            .then(data => {
                if (callback) {
                    callback(data);
                }
            });
    }

    getDomainPromised = function(url, secret){
        return fetch(url, { 
            method: 'GET',
            headers:
            {
                'Content-Type': 'application/json',
                'Secret': secret
            }
        });
    }

    getPromised = function (url) {
        return fetch(this.baseUrl + "api/" + url, { //https://commpany.azurewebsites.net/
            method: 'GET',
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    }

    postDomainPromised = function(url, body, secret){
        return fetch(url, { 
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
                'Secret': secret
            },
            body: JSON.stringify(body)
        });
    }
}

export default apiService;