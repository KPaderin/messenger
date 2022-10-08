const initialState = {
    chats: {
        chatsList: [],
        selectedChatId: 'spam',
        newChat: {
            ownerLogin: '',
            messages: [],
            members: [],
            chatId: '',
            chatType: '',
            chatName: '',
            chatImage: ''
        },
    }
}

export default initialState;