import { URL } from './/url';

export const deleteMessage = ( chatId, messageId ) => {
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
        .then((json) => json.data)
}
