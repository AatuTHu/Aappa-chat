import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid'
import { firestore,collection,addDoc,USERS, onSnapshot, query, where } from '../firebase/Config';

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

export default function Login({userName, setUserName, country, setCountry, city, setCity, setUserID, setIsLogged, pictureID, setPictureID}) {

  const [password, setPassword] = useState('')
  const [userPlaceHolder, setUserPlaceholder] = useState('username *')
  const [passPlaceHolder, setPassPlaceHolder] = useState('password *')
  const [register, setRegister] = useState(false)


  const registerUser = async() => {
    if(userName.length <= 0 || password.length <= 0) {
      setUserPlaceholder('invalid username')
      setPassPlaceHolder('invalid password')
    } else {

      let uuid = uuidv4()
      setUserID(uuid)
      var hash = bcrypt.hashSync(password, salt);

      await addDoc(collection(firestore, USERS), {
        userID : uuid,
        pictureID: 1,
        userName: userName,
        password: hash,
        country: country,
        city: city,
      }).catch (error => console.log(error))
        setIsLogged(true)
        setPassPlaceHolder('')
        setUserPlaceholder('')
  }
}

const logUserIn = async() => {
  
  const q = query(collection(firestore,USERS), where("userName", "==", userName))
  let hash

     onSnapshot(q,(querySnapshot) => {
      const tempMessages = []

      querySnapshot.forEach((doc) => {
        const messageObject = {
          userName: doc.data().userName,
          password : doc.data().password,
          city : doc.data().city, 
          country: doc.data().country,
          userID: doc.data().userID,
          pictureID : doc.data().pictureID,
        }
        tempMessages.push(messageObject)
      })
       
      tempMessages.map(tempMessages => {
        setUserID(tempMessages.userID)
        setUserName(tempMessages.userName)
        hash = tempMessages.password
        setCity(tempMessages.city)
        setCountry(tempMessages.country)
        setPictureID(tempMessages.pictureID)
      })
      
        if(bcrypt.compareSync(password, hash)) {
          setIsLogged(true)
        } else {
          console.log('error')
        }
      
    })
}

  return (
    <div className='loginContainer'>
      {!register ? (
          <div className='column'>
            <div className='subTitles'>LOGIN</div>
                <input placeholder='username' className='updateInputs' value={userName} onChange={(event) => setUserName(event.target.value)} type="text"/>
              <input  placeholder='password' className='updateInputs' onChange={(event) => setPassword(event.target.value)} type="password"/>
            <button className='loginButton' onClick = { logUserIn }>Login</button>
          <button className='registerButton' onClick = { () => setRegister(!register) }>Register</button>
        </div>
            ) : ( 
            <div className='column'>
                <div className='subTitles'>REGISTER</div> 
                    <input className='updateInputs' value={userName} placeholder={userPlaceHolder} onChange={(event) => setUserName(event.target.value)} type="text"/> 
                      <input className='updateInputs' value={password} placeholder={passPlaceHolder} onChange={(event) => setPassword(event.target.value)} type="password"/>     
                        <input className='updateInputs' value={country} placeholder='country' onChange={(event) => setCountry(event.target.value)} type="text"/>
                      <input className='updateInputs' value={city} placeholder='city' onChange={(event) => setCity(event.target.value)} type="text"/>
                    <button className='loginButton' onClick = { registerUser }>Sign In</button>
                  <button className='registerButton' onClick = { () => setRegister(!register) }>Already had a user?</button>
                </div>   
              )}
            </div>
  )
}
