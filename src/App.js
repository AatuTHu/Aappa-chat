import './App.css';
import Header from './components/Header';
import AddMessage from './components/AddMessage';
import DisplayMessages from './components/DisplayMessages';
import Login from './components/Login';
import { useState } from 'react'
import Profile from './components/Profile';


function App() {

  
  const [userName, setUserName] = useState('')
  const [country, setCountry] = useState('')
  const [userID, setUserID] = useState('')
  const [city, setCity] = useState('')
  const [pictureID, setPictureID] = useState('')
  
  const [islogged, setIsLogged] = useState(false)

  const urls = [ 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Round&hairColor=Brown&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Pale',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurvy&accessoriesType=Wayfarers&hairColor=Brown&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
  'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairSides&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Squint&eyebrowType=FlatNatural&mouthType=Disbelief&skinColor=Brown',
  'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Prescription01&hairColor=Black&facialHairType=BeardMedium&facialHairColor=Brown&clotheType=Hoodie&clotheColor=Heather&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=DarkBrown',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurly&accessoriesType=Prescription01&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Pink&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=DarkBrown',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBun&accessoriesType=Round&hairColor=Red&facialHairType=Blank&clotheType=CollarSweater&clotheColor=Blue03&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light',
]

  

  const signOut = () => {
    setUserID('')
    setCity('')
    setUserName('')
    setCountry('')
    setIsLogged(!islogged)
   }

  return (
    <>
      <Header/>     
        {!islogged ? (
          <Login 
          userName={userName} 
          setUserName = {setUserName}
          country = {country}
          setCountry = {setCountry}
          city = {city}
          setCity = {setCity}
          setUserID = {setUserID}
          setIsLogged = { setIsLogged }
          setPictureID = {setPictureID}/>
        ) : (
        <div className='mainContainer'>
          <Profile 
          userName={userName} 
          country = {country}
          city = {city}
          setUserName = {setUserName}
          setCountry = {setCountry}
          setCity = {setCity}
          userID = {userID}
          signOut = {signOut}
          setIsLogged = { setIsLogged }
          pictureID = {pictureID} 
          setPictureID = {setPictureID}
          urls = {urls}/>
            <div className='columns'>  
              <AddMessage userName = {userName} userID = {userID} country = {country} city = {city} islogged = {islogged} pictureID = {pictureID}/>
              <DisplayMessages userID = {userID} urls = {urls} pictureID = {pictureID}/>
            </div>
        </div>    
        )}              
      
      </>);
}

export default App;
