import React, {useState, useEffect} from 'react'
import { BiUser } from 'react-icons/bi'
import { HiOutlineMenu } from 'react-icons/hi'
import { MdOutlineExitToApp } from 'react-icons/md'
import { firestore, USERS, doc, updateDoc,onSnapshot, query, where,collection, deleteDoc } from '../firebase/Config';
import UpdateProfile from './UpdateProfile'

export default function Profile({userName, country, city, userID, setUserName, setCountry, setCity, signOut, setIsLogged, pictureID, setPictureID, urls}) {

  const [update, setUpdate] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [id,setId] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [updateName, setUpdateName] = useState(userName)
  const [updateCity, setUpdateCity] = useState(city)
  const [updateCountry, setUpdateCountry] = useState(country)

  useEffect(() => { 
    const q = query(collection(firestore,USERS), where("userID", "==", userID))
    const queryAllNotes = onSnapshot(q,(querySnapshot) => {
      const tempMessages = []

      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
        }
        tempMessages.push(messageObject)
      })
       
      tempMessages.map(tempMessages => {
        return  setId(tempMessages.id)
      })
    })

    return () => {
      queryAllNotes()
    }
  }, [])

  const updateProfile = () => {     
    const docRef = doc(firestore,USERS,id)
      updateDoc(docRef, {
        pictureID: pictureID,
        userName: updateName,
        country: updateCountry,
        city: updateCity,
      }).then( () => {
          setUpdate(!update)
          setUserName(updateName)
          setCountry(updateCountry)
          setCity(updateCity)
      }).catch (error => console.log(error))
  }

  const deleteProfile = () => {
    if(userName === deleteConfirm) { 
      const docRef = doc(firestore,USERS,id)
        deleteDoc(docRef)
        .then(() => {
          setIsLogged(false)
          signOut()
        })
        .catch ( error => {
            console.log(error)
        })
    }
    
  }

  return ( <>
    <div className='profileContainer'>
      <div className='rows'>
        <BiUser className='avatarIcon' onClick = { () => setShowProfile(!showProfile) }/> 
        <MdOutlineExitToApp className='deleteIcon' onClick={ signOut }/>
      </div>
          { !showProfile ? (<></>) : (
            <div>
              <img src={urls[pictureID]} alt="StockPhoto" className='profileImg'/>
                <HiOutlineMenu className='avatarIcon' onClick = { () => setUpdate(!update)}/>
                  {update ? (<>
                    <UpdateProfile 
                      updateProfile={updateProfile}
                      deleteProfile= {deleteProfile}
                      updateName={updateName}
                      updateCity={updateCity}
                      updateCountry={updateCountry}
                      setUpdateCity={setUpdateCity}
                      setUpdateCountry={setUpdateCountry}
                      setUpdateName= {setUpdateName}
                      deleteConfirm={deleteConfirm}
                      setDeleteConfirm={setDeleteConfirm}
                      setPictureID = {setPictureID}
                      />
              </>
              ) : (
              <>
                <p className='profileTitles'>{userName}</p>
                  <p className='profileTitles'>{country}</p>
                <p className='profileTitles'>{city}</p>
              </>
            )}
          </div>
        )}
      </div>
    </>)
}
