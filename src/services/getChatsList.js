import { URL } from './/url';

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
                              messages(first: 100) {
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