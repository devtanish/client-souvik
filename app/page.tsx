import Login from "@/components/main-login";
import WhatsAppChatButton from "@/components/whatsapp-chat-button";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <div className=" bg-white grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Sidebar/>
      <Login/>
      <WhatsAppChatButton phoneNumber="+918850305563" notificationCount={1} message="Hello, I'd like to chat with you!" />
    </div>
    );
  }
