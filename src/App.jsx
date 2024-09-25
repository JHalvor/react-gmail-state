
import { useState } from "react"
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  const [emails, setEmails] = useState(initialEmails)
  // const [inboxCounter, setInboxCounter] = useState(0)
  // const [starredCounter, setStarredCounter] = useState(0)
  // const [selected, setSelected] = useState([])
  // Use initialEmails for state

  const updateStarred = (emailId) => {
    setEmails((emails) => emails.find((email) => email.id === emailId).starred 
                       = !emails.find((email) => email.id === emailId).starred)
  }

  const RenderEmail = (emailData) => {
    //const email = document.createElement("li")
    //email.className = "email"
  
    //email.appendChild(RenderSelect())
    return (
      <li className="email">
        <div className="select">
        <input
          className="select-checkbox"
          type="checkbox"/>
        </div>
        <div className="star">
        <input
          className="star-checkbox"
          type="checkbox"
          onClick={() => updateStarred(emailData.id)}
        />
        </div>
        <div className="sender">{emailData.sender}</div>
        <div className="title">{emailData.title}</div>
      </li>
    )
  }

  const RenderEmails = (data) => {
    const { id, sender, title } = data.emails[0]
    return (
      <RenderEmail id={id} sender={sender} title={title}/>
    )
  }

  console.log("emails")
  console.log(emails)

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <RenderEmails emails = {emails}/>
      </main>
    </div>
  )
}

export default App
