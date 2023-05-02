/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    if (options.method == 'GET') {
        let url = '';
        if (options.data) {
            Object.keys(options.data).forEach(key => {
                url += `${key}=${options.data[key]}&`;
            })
        }
        try {
            xhr.open('GET', `${options.url}?${url}`);
            xhr.send();
        } catch (err) {
            console.log(err);
        }
    } else {
        const formData = new FormData();
        if (options.data) {
            Object.keys(options.data).forEach(key => {
                formData.append(key, options.data[key]);
            })
        }
        try {
            xhr.open(options.method, options.url);
            xhr.send(formData);
        } catch (err) {
            console.log(err);
        }
    }
    xhr.onload = () => {
        if (options.callback !== undefined) {
            options.callback(xhr.response.error, xhr.response);
        }
    }
};
