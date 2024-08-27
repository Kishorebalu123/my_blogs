import { useState ,useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate,Link } from 'react-router-dom'

import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const navigte=useNavigate()
  const jwtToken = Cookies.get('jwt_token')

  useEffect(()=>{

  if (jwtToken !== undefined) {
    navigte('/',{replace:true})
  }  

})

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess = jwtToken => {
   
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    navigte('/',{replace:true})
  }

  const onSubmitFailure = errorMsg => {
    setShowSubmitError(true)
    setErrorMsg(errorMsg)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = { username, password }
    const url = 'http://localhost:5000/auth/login'
    const options = {
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
  //  console.log(response)
    if (response.ok) {
      
      onSubmitSuccess(data.jwtToken)
      console.log(data.jwtToken)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="password-input-field"
        value={password}
        onChange={onChangePassword}
        placeholder="Password"
      />
    </>
  )

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="username-input-field"
        value={username}
        onChange={onChangeUsername}
        placeholder="Username"
      />
    </>
  )

  
  return (
    <div className="login-form-container">
     
      <img
        src="https://res.cloudinary.com/duor2ien6/image/upload/v1724658347/images_elpfky.jpg"
        className="login-img"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
       
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
     <Link to="/register">   <button type="button" className="signup-btn">
          Sign Up
        </button>
        </Link>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default LoginForm
