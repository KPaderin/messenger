import React, {useEffect, useState} from 'react';
import styles from './ChatWrap.module.css';
import ChatWrapHeader from '../ChatWrapHeader/ChatWrapHeader';
import ChatMessages from '../ChatMessages/ChatMessages';
import ChatMenu from '../ChatMenu/ChatMenu';

const ChatWrap = () => {
    const [data, setData] = useState(
        {"data": {"chats": [{"messages":[], "name":"", "image":null, "id":""}]}}
    )
    const [Messages, SetMessages] = useState(data.data.chats[0].messages)
    const [Chat, SetChat] = useState(data.data.chats[0])
    const [ChatId, SetChatId] = useState("")

    const [MenuActive, SetMenuActive] = useState(false);
    const URL = 'https://kilogram-api.yandex-urfu-2021.ru/query'

    useEffect(() => {
        const controller = new AbortController();
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
                              messages {
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
                        }`
            })
        })
            .then(response => response.json())
            .then(json => {
                setData(json);
                SetChatId("spam")
            })

        return () => controller.abort();
    }, []);

    useEffect(() => {
        // eslint-disable-next-line
        data.data.chats.map( item => {
            if(item.id === ChatId)
            {
                SetChat(item);
                SetMessages(item.messages);
            }
        })
        // eslint-disable-next-line
    }, [ChatId]);

    return (
        <div className={styles.chat__wrap}>
            <ChatWrapHeader items={Chat}
                            MenuActive={MenuActive} SetMenuActive={SetMenuActive} />
            <ChatMenu MenuActive={MenuActive} SetMenuActive={SetMenuActive}
                      SetChatId={SetChatId}
                      items={data.data.chats}/>
            <ChatMessages messages={Messages} chatId={ChatId}
                          setMessages={SetMessages}/>
        </div>
    );
};

export default ChatWrap;
