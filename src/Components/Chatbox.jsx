import roboimg from '../assets/robot.jpg'
import userimg from '../assets/user.jpg'
export function Chatbox({message, sender})
{
   return(
    <div className={
        sender==='user'?
        'chat-message-user':
        'chat-message-robo'}>
      {
        sender==='robo' && <img className='roboimage' src={roboimg} /> 
      }
      <div  className='chat-text'>
        {message}
        </div>
      {
        sender==='user' && <img className='userimage' src= {userimg} />
      }
    </div> );
}