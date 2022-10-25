import {URL} from '../consts/url'

export const editMessageApi = (chatId, messageId, text) => {
    return fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')},
        body: JSON.stringify({
            query: `mutation EditMessage($chatId:ID!, $messageId:ID!, $text: String!){
                          editMessage(chatId: $chatId, messageId: $messageId, text: $text){
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
            variables: {
                chatId: chatId,
                messageId: messageId,
                text: text,
            },
        }),
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
                status.messageId = json.data.editMessage.id
            }
            status.ok = true;
            status.editedMessage = json.data.editMessage
            return status
        })
}