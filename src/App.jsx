import { useState } from 'react'
import {ChatMessages} from './Components/ChatMessages';
//import {Chatbox} from './Components/Chatbox';
import { Input } from './Components/Input';
import './App.css'
            
 function App()
            {
               const [chatMessage,setChatMessage]=useState(
              [/*{
              message:"hello robo",
               sender:"user",
               id:'id1'
            },
              {
                message:"hey, How can I help you?" ,
              sender:"robo",
              id:'id2'
            },
              {
                 message:"Am i a good person",
               sender:"user",
               id:'id3'
              },
              {
                 message:"not just good buddy a great frd of mine" ,
              sender:"robo",
              id:'id4'
            }*/
            ]
            ); 

            
                return (
                  <div
                  className='app-container'>
                  <Input 
                  chatMessage={chatMessage}
                  setChatMessage={setChatMessage}
                  />
             <ChatMessages 
             chatMessage={chatMessage}/>
            </div>
          );}
       

export default App
