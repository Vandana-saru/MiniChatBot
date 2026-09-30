   import {useState} from 'react';
   import {Chatbot} from '../chatbot';
   export function Input({chatMessage ,setChatMessage})
            {
            
            const [inputText,setInputText]=useState(' ');

            function saveInputText(event)
            {
              setInputText(event.target.value);

            }
            function sendMessage()
            {const newchatMessage=[...chatMessage,
              {
                message:inputText,
                sender:'user',
                id:crypto.randomUUID()
              }
               ];
              setChatMessage(newchatMessage);
              const response=Chatbot.getResponse(inputText);
              
              setChatMessage([...newchatMessage,
              {
                message:response,
                sender:'robo',
                id:crypto.randomUUID()
              }
               ]);
              setInputText(' ');
            }

                return (
                    <div className='text-send-container'>
                    
                        <input placeholder="start the chat" size="40"
                        onChange={saveInputText}
                        onKeyDown={(event)=>{event.key=='Enter' && sendMessage()}}
                        className='text-box' 
                        value={inputText}/>
                        <button onClick={sendMessage}
                        className='send-button'> Send</button>
                       
                    </div>
                );
            }