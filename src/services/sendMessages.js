import {URL} from '../consts/url'

export const sendMessageApi = (chatId, text) => {
    return fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')},
        body: JSON.stringify({
            query: `mutation SendMessage($chatId: ID!, $text: String!){
                          sendMessage(
                            chatId: $chatId
                            text: $text
                          ) {
                            id
                            createdAt
                            text
                            createdBy{
                              image
                              login
                              name
                            }
                          }
                        }`,
            variables: { chatId: chatId, text: text },
        })
    }).then(res => res.json())
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
                status.messageId = json.data.sendMessage.id
            }
            status.ok = true;
            status.sentMessage = json.data.sendMessage
            return status
        })
}