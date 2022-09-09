import { URL } from './/url';

export const getMessages = function(setData, setChatId)
{
    fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')},
        body: JSON.stringify({
            query: `query {
                            chats {
                              id
                              image
                              name
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
        .then(response => response.json())
        .then(json => {
            setData(json.data);
            if(localStorage.getItem('chatId'))
                setChatId(localStorage.getItem('chatId'))
            else
                setChatId("spam")
        })
}