import React from 'react'
import Header from '../../components/Header/Header'
import Chat from '../../components/Chat/Chat'

export function Main() {
    return (
        <main className="main-window">
            <Header />
            <Chat />
        </main>
    );
}

export default Main;