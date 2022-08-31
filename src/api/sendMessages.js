const URL = 'https://kilogram-api.yandex-urfu-2021.ru/query'

export const sendMessage = function(e, chatId, textareaRef, setMessages, messages) {
    if(textareaRef.current.value === "")
    {
        alert("Введите сообщение");
        return;
    }
    fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')},
        body: JSON.stringify({
            query: `mutation {
                          sendMessage(
                            chatId: "` + chatId + `"
                            text: "` + textareaRef.current.value + `"
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
                        }`
        })
    }).then(res => res.json())
        .then(json => {
            if(json.hasOwnProperty("errors"))
                alert("Произошла ошибка :(")
            else {
                setMessages([json.data.sendMessage].concat(messages))
                textareaRef.current.value = ""
            }
        })
}