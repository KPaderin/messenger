import {URL} from '../consts/url'

export const deleteChat = (id) => {
    return fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')},
        body: JSON.stringify({
            query: `mutation DeleteChat($id: ID!) {
                        deleteChat(id: $id)
                }`,
            variables: {id: id}
        })
    }).then(res => (res.json()))
        .then(json => {
            let status = {}
            if(json.hasOwnProperty("errors"))
            {
                status.errorsMessage = json.errors.map(error => error.message)
                    .join("; ")
                return status
            }
            if(json.hasOwnProperty("data")) {
                status.deleteChat = json.data.deleteChat
            }
            return status.deleteChat
        })
}
