import { useContext, useState } from 'react';
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { handleGoogleSignIn, initializeLoginFramework, handleSignOut, handleFbSignIn, createUserWithEmailandPassword, signInWithEmailAndPassword } from './loginmanager';

//

function LogIn() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true)
      })
  }

  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleResponse(res, false)
      })
  }

  const fbSignIn = () => {
    handleFbSignIn()
      .then(res => {
        handleResponse(res, true)
      })
  }


  //our own authentication
  const handleblur = (e) => {
    // console.log(e.target.value)
    // console.log(e.target.name, e.target.value);
    let isFieldValid = true;

    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+.\S+/.test(e.target.value)
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length >= 6;
      const isPasswordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && isPasswordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    // console.log(user.email)
    // console.log(user.password)
    if (newUser && user.email && user.password) {
      // console.log('sobmitting form')
      createUserWithEmailandPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true)

        })


    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true)


        })
    }
    e.preventDefault(); //handleing auto reload
  }
  const handleResponse = (res, redirect) => {
    setUser(res)
    setLoggedInUser(res)
    if (redirect) {
      history.replace(from);
    }

  }

  return (
    <div style={{ textAlign: 'center' }}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign In</button>
      }

      <button onClick={fbSignIn}>Log In using Facebook</button>

      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>User Email, {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our own Authentication</h1>
      <input onChange={() => setNewUser(!newUser)} type="checkbox" name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input onBlur={handleblur} type="text" name="name" placeholder="Your Name " />
        }   <br />     <input onBlur={handleblur} type="text" name="email" placeholder="Your email address" required /> <br />
        <input onBlur={handleblur} type="password" name="password" placeholder="Password" required /> <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
        <p style={{ color: 'red' }}>{user.error}</p>

        {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>}
      </form>

    </div>


  );
}

export default LogIn;