import React, {useState} from 'react'
import { firestore,collection,addDoc,MESSAGES, serverTimestamp } from '../firebase/Config';
import { BiMessageAdd } from 'react-icons/bi'

export default function AddMessage({userID, userName,country,city, pictureID,islogged}) {

  const [text, setText] = useState('')
  const [placeHolder, setPlaceHolder] = useState('How was your day?')

  const save = async() => {
    console.log(text.length)
    if(text.length === 0) {
      setPlaceHolder('please enter a text')
    } else {
        await addDoc(collection(firestore, MESSAGES), {
        userID: userID,
        text: text,
        Added: serverTimestamp(),
        displayName: userName,
        city: city,
        country: country,
        pictureID : pictureID,
      }).catch (error => console.log(error))
      setText('')
      setPlaceHolder('How was your day?')
    }
  }

  return (
    <div className='generalContainer'>
        <h3>Chat with others</h3>
          <div className='rows'>
            <textarea maxlength='260' placeholder={placeHolder} className='inputs' name='Text1' cols='40' rows='5' value={text} onChange={(event) => setText(event.target.value)}></textarea>
            {islogged ? (
              <BiMessageAdd className='addIcon' onClick={ save }/>
              ) : (
                <></>
              )}     
        </div>
    </div>
  )
}
