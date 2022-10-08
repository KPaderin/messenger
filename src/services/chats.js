const URL = 'https://kilogram-api.yandex-urfu-2021.ru/query'

export const createChatAndGetStatus = (name, type, members) => {
    return fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')},
        body: JSON.stringify({
            query: `mutation CreateChat($type: ChatType!, $name: String!, $members: [String!]!) {
                        createChat(type: $type, name: $name, members: $members) { id, owner { login } }
                }`,
            variables: {type: type, name: name, members: members}
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
                status.id = json.data.createChat.id
                status.ownerLogin = json.data.createChat.owner.login
            }
            return status
        })
}
