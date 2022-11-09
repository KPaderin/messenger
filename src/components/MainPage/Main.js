import React from 'react'
import HeaderTitle from '../Header/HeaderTitle'
import Chat from '../../pages/Chat/Chat'

export function Main() {
    return (
        <main className="main-window">
            <HeaderTitle />
            <Chat />
        </main>
    );
}


export default Main;
