
import { useState } from "react"
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [onlyStarred, setOnlyStarred] = useState(false)

  const getStarredCount = () => {
    return emails.reduce((count, email) => {
      return email.starred ? count + 1 : count;
    }, 0);
  }

  const getInboxCount = () => {
    return emails.reduce((count, email) => {
      return !email.read ? count + 1 : count;
    }, 0);
  }

  const updateStarred = (emailId) => {
    setEmails((emails =>
      emails.map((email) =>
        email.id === emailId ? { ...email, starred: !email.starred } : email
      )
    ))
  }

  const updateRead = (emailId) => {
    setEmails((emails =>
      emails.map((email) =>
        email.id === emailId ? { ...email, read: !email.read } : email
      )
    ))
  }

  const RenderEmail = (emailData) => {
    return (
      <li className="email">
        <div className="select">
        <input
          className="select-checkbox"
          type="checkbox"
          onChange={() => updateRead(emailData.id)}
          checked={emailData.read}
        />
        </div>
        <div className="star">
        <input
          className="star-checkbox"
          type="checkbox"
          onChange={() => updateStarred(emailData.id)}
          checked={emailData.starred}
        />
        </div>
        <div className="sender">{emailData.sender}</div>
        <div className="title">{emailData.title}</div>
      </li>
    )
  }

  const RenderEmails = (data) => {
    return (
      <ul>
        {
          data.emails.map((email) => {
            if ((!hideRead || !email.read) && (!onlyStarred || email.starred)) {
              return <RenderEmail key={email.id} id={email.id} sender={email.sender} title={email.title} starred={email.starred} read={email.read}/>
            }
            return <></>
          })
        }        
      </ul>
    )
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={onlyStarred ? "item" : "item active"}
            onClick={() => {setOnlyStarred(false)}}
          >
            <span className="label">Inbox</span>
            <span className="count">{getInboxCount()}</span>
          </li>
          <li
            className={onlyStarred ? "item active" : "item"}
            onClick={() => {setOnlyStarred(true)}}
          >
            <span className="label">Starred</span>
            <span className="count">{getStarredCount()}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => {setHideRead(!hideRead)}}
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
