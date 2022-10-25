import { URL } from '../consts/url';

export const deleteMessageApi = ( chatId, messageId ) => {
    return fetch(URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')},
        body: JSON.stringify({
            query: `mutation DeleteMessage($chatId:ID!, $messageId:ID!){
  deleteMessage(chatId: $chatId, messageId: $messageId)
}`,
            variables: { chatId: chatId, messageId: messageId, },
        }),
    })
        .then((response) => response.json())
        .then(json => {
            let status = {}
            if(json.hasOwnProperty("errors"))
            {
                status.errorsMessage = json.errors.map(error => error.message)
                    .join("; ")
                return status
            }
            if(json.hasOwnProperty("data")) {
                status.deleteMessage = json.data.deleteMessage
            }
            return status
        })
}
