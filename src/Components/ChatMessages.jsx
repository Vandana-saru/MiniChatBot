import {useRef,useEffect} from 'react';
import { Chatbox } from './Chatbox';
export function ChatMessages({chatMessage})
{
    const chatcontainerRef=useRef();
    useEffect(()=>
    {
        const chatelement=chatcontainerRef.current;
        if(chatelement)
        {
        chatelement.scrollTop=chatelement.scrollHeight
        }
    },[chatMessage]
    );
        
    return (
    <div
    className='chat-messages-container'
    ref={chatcontainerRef}>
    {chatMessage.map((chat)=>
{
return(
    <Chatbox message={chat.message} 
    sender={chat.sender}
    key={chat.id} />
)
})}
</div>
);
}