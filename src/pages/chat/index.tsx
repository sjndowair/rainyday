import { useState } from 'react'
import { useChatStore } from "../../store";
import Layout from "../../layout";
import ChatArea from "../../components/ChatArea";
import UserSidebar from "../../components/sidebar";
import Theme from "../../components/theme";



const MainPage = () => {

    return (
        <Layout>
            <Theme>
                <div className={`flex`}>
                    <div  className="fixed inset-0 pointer-events-none" />
                    <UserSidebar />
                    <ChatArea />
                </div>
            </Theme>
        </Layout>
    )
}

export default MainPage