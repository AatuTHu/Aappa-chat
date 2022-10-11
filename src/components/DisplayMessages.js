import DeleteMessage from './DeleteMessage';
import { firestore,collection,MESSAGES, onSnapshot, query, orderBy } from '../firebase/Config';
import { useState, useEffect } from 'react'
import { convertFirebaseTimeStampToJS } from '../helper/Functions';

export default function DisplayMessages({userID,urls}) {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    const q = query(collection(firestore,MESSAGES),orderBy('Added','desc'))

    const queryAllNotes = onSnapshot(q,(querySnapshot) => {
      const tempMessages = []

      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          userID : doc.data().userID,
          displayName : doc.data().displayName,
          country : doc.data().country,
          city : doc.data().city,
          pictureID : doc.data().pictureID,
          Added: convertFirebaseTimeStampToJS(doc.data().Added)
        }
        tempMessages.push(messageObject)
      })
      setMessages(tempMessages)
    })

    return () => {
      queryAllNotes()
    }
  }, [])

    let colorId = 0
      const colorMania = () => {       
        colorId = colorId + 1;

            if(colorId >= 5) {
                colorId = colorId - 4;
            }

        switch (colorId) {
            case 1:
                return 'generalContainer violet'      
            case 2:
                return 'generalContainer red'
            case 3:
                return 'generalContainer green'
            case 4:
                return 'generalContainer mustard'
            default:
               
        }
    }

  return (
    <div>
        {messages.map((message, key) => {
            return ( 
                <div className={colorMania()} key = { key }>
                  {message.userID === userID ? (<DeleteMessage id = { message.id }/>) : (<><img src={urls[message.pictureID]} alt="StockPhoto" className='displayImg'/></>)}    
                      <textarea disabled = 'true' className='displayText' value = {message.text}/>
                        <div className='rows'>           
                      <div>  {message.country} {message.city} {message.Added}</div>      
                    <div>{message.displayName}</div>
                </div>
            </div>
        )})}
    </div>
  )
}
