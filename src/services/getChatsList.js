import { URL } from '../consts/url';

export const getChatsList = function()
{
    return fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')},
        body: JSON.stringify({
            query: `query {
                            chats(first: 100) {
                              id
                              image
                              name
                              type
                              messages(first: 25) {
                                id
                                createdBy { 
                                  image
                                  login 
                                  name
                                }
                                 createdAt
                                text
                              }
                              members(first: 100) {
                                image
                                login
                                name
                              }
                              owner { 
                                  image
                                  login 
                                  name
                              }
                            }
                        }`
        })
    })
        .then(response => {return response.json()})
        .then(json => json.data.chats)
}

export const getMessagesApi = function(chatOffset, messagesOffset)
{
    return fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')},
        body: JSON.stringify({
            query: `query Chats($offsetMessage: Int) {
                            chats(first: 100) {
                              id
                              messages(offset: $offsetMessage, first: 25) {
                                id
                                createdBy { 
                                  image
                                  login 
                                  name
                                }
                                 createdAt
                                text
                              }
                            }
                        }`,
            variables: {offsetMessage: messagesOffset}
        })
    })
        .then(response => {return response.json()})
        .then(json => {
            let status = {}
            if(json.hasOwnProperty("errors"))
            {
                status.errorsMessage = json.errors.map(error => error.message)
                    .join("; ")
                status.ok = false;
                return status
            }
            if(json.hasOwnProperty("data")) {
                status.messages = json.data.chats[chatOffset].messages
            }
            status.ok = true;
            return status
        })
}