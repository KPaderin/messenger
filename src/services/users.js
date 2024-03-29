import { URL } from '../consts/url';

export const getAllUsers = () => {
    return fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `query GetAllUsers{
                users(first:100){
                    name
                    login
                    image
                    meta {
                        key
                        val
                    }
                }
              }`,
        }),
    })
        .then((response) => response.json())
        .then((json) => json.data)
}