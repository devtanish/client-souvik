import Login from "@/components/main-login";
import WhatsAppChatButton from "@/components/whatsapp-chat-button";

export default function Home() {
  return (
    <div className="">
      <Login/>
      <WhatsAppChatButton phoneNumber="+918850305563" notificationCount={1} message="Hello, I'd like to chat with you!" />
    </div>
  );
}
