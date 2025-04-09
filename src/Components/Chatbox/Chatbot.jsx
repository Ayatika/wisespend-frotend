import "./Chatbot.css"
import ChatIcon from '../ChatIcon/ChatIcon'
import { useState } from "react"
import axios from "axios";
import { useMyContext } from "../../ContextPage";

const Chatbot = () => {
  const [prompt,setPrompt] = useState("");
  const [result,setResult] = useState("");
  const {apiUrl} = useMyContext();

  const aiTarget=async(e)=>{
    e.preventDefault();

    try {
        const response = await axios.post(`${apiUrl}/chatboat/`,{prompt});
        setResult({res:response.data})
        setPrompt("");
    } catch (error) {
        console.log(error)
    }
    
  }
  return (
    <div className="container">

      <div className="chatbot-popup"> 
        {/* header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
        </div>

        {/* body */}
        <div className="chat-body">

          <div className="message bot-message">
           <ChatIcon />
            <p className="message-text">
              Hey there <br /> How can I help you today?
            </p>
          </div>

          <div className="message bot-message">
          <ChatIcon />
            <p className="message-text">
              {result?.res}
            </p>
          </div>

        </div>

        {/* footer */}
        <div className="chat-footer">
          <form onSubmit={aiTarget} className="chat-form">
            <input value={prompt} onChange={(e)=> setPrompt(e.target.value)} type="text" placeholder="Messages..." className="message-input" required />
            <button style={{display:"flex",justifyContent:"center",alignItems:"center"}} type="submit" className="material-symbols-rounded"> arrow_upward </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Chatbot