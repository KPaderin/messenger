import {URL} from "../consts/url"

export const createChatAndGetStatusApi = (name, type, members) => {
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
            status.ok = true;
            if(json.hasOwnProperty("errors")) {
                status.errorsMessage = json.errors.map(error => error.message)
                    .join("; ")
                status.ok = false;
            }
            if(json.hasOwnProperty("data")) {
                status.id = json.data.createChat.id
                status.ownerLogin = json.data.createChat.owner.login
            }
            return status
        })
}

export const updateChatNameApi = (id, name) => {
    return fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')},
        body: JSON.stringify({
            query: `mutation UpdateChat($id: ID!, $name: String ) {
                        updateChat(id: $id, name: $name) { id image name }
                }`,
            variables: {id: id, name: name}
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
                status.id = json.data.updateChat.id
                status.chatImage = json.data.updateChat.image
                status.chatName = json.data.updateChat.name
            }
            return status
        })
}

export const updateChatImageApi = (id, image) => {
    return fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')},
        body: JSON.stringify({
            query: `mutation UpdateChat($id: ID!, $image: Base64 ) {
                        updateChat(id: $id, image: $image) { id image name }
                }`,
            variables: {id: id, image: image}
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
                status.id = json.data.updateChat.id
                status.chatImage = json.data.updateChat.image
                status.chatName = json.data.updateChat.name
            }
            return status
        })
}

export const kickUserApi = ( chatId, login ) => {
    return fetch(URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')},
        body: JSON.stringify({
            query: `mutation KickUser($chatId: ID!, $login: String!){
                      kickUser(chatId: $chatId, login: $login)
                    }`,
            variables: { chatId: chatId, login: login },
        }),
    })
        .then((response) => response.json())
        .then(json => {
            let status = {}
            status.ok = true;
            if(json.hasOwnProperty("errors")) {
                status.errorsMessage = json.errors.map(error => error.message)
                    .join("; ")
                status.ok = false;
            }
            return status
        })
}

export const inviteUserApi = ( chatId, user ) => {
    return fetch(URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')},
        body: JSON.stringify({
            query: `mutation inviteUser($chatId: ID!, $login: String!){
                      inviteUser(chatId: $chatId, login: $login)
                    }`,
            variables: { chatId: chatId, login: user.login },
        }),
    })
        .then((response) => response.json())
        .then(json => {
            let status = {}
            status.ok = true;
            if(json.hasOwnProperty("errors")) {
                status.errorsMessage = json.errors.map(error => error.message)
                    .join("; ")
                status.ok = false;
            }
            status.login = user.login
            status.image = user.image
            status.name = user.name
            return status
        })
}