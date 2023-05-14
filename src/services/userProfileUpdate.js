import {URL} from "../consts/url"

export const updateUserImageApi = (image) => {
    return fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')},
        body: JSON.stringify({
            query: `mutation UpdateUser($image: Base64) {
                        updateUser(image: $image) { login image name }
                }`,
            variables: {image: image}
        })
    }).then(res => (res.json()))
        .then(json => {
            let status = {}
            status.ok = true;
            if(json.hasOwnProperty("errors")) {
                status.errorsMessage = json.errors.map(error => error.message)
                    .join("; ")
                status.ok = false;
            }
            if(json.hasOwnProperty("data")) {
                status.login = json.data.updateUser.login
                status.userImage = json.data.updateUser.image
                status.userName = json.data.updateUser.name
            }
            return status
        })
}