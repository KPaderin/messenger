const URL = 'https://kilogram-api.yandex-urfu-2021.ru/query'

export const createChat = (name, type, members) => {
    fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth')},
        body: JSON.stringify({
            query: `mutation CreateChat($type: ChatType!, $name: String!, $members: [String!]!) {
                        createChat(type: $type, name: $name, members: $members) { id }
                }`,
            variables: {type: type, name: name, members: members}
        })
    })
}
