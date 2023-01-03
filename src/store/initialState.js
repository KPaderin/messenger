const initialState = {
    chats: {
        chatsList: [],
        selectedChatId: 'spam',
        newChat: {
            ownerLogin: '',
            messages: [],
            chatMembers: [],
            chatId: '',
            chatType: '',
            chatName: '',
            chatImage: ''
        },
    },
    users: {
        usersList: []
    }
}

export default initialState;