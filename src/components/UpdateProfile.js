import React, {useState} from 'react'
import { TiUserDelete } from 'react-icons/ti'
import { IoMdAddCircleOutline } from 'react-icons/io'

export default function UpdateProfile({updateCity, updateName, updateCountry, setUpdateCity,
setUpdateName, setUpdateCountry, updateProfile, deleteProfile, deleteConfirm, setDeleteConfirm,
setPictureID}) {

  const [showAlert, setShowAlert] = useState(false)

  return (
  <>
        <div className='profileTitles'>Update Profile</div>
        <div className='rows'>
            <div className='selection' onClick = { () => setPictureID(0)}>1</div>
                <div className='selection' onClick = { () => setPictureID(1)}>2</div>
                    <div className='selection' onClick = { () => setPictureID(2)}>3</div>
                    <div className='selection' onClick = { () => setPictureID(3)}>4</div>
                <div className='selection' onClick = { () => setPictureID(4)}>5</div>
            <div className='selection' onClick = { () => setPictureID(5)}>6</div>
        </div>
            <input className='updateInputs' placeholder='UserName' value = {updateName} onChange={(event) => setUpdateName(event.target.value)} type="text"/>      
                    <input className='updateInputs' placeholder='Country' value = {updateCountry} onChange={(event) => setUpdateCountry(event.target.value)} type="text"/>
                        <input className='updateInputs' placeholder='city' value = {updateCity} onChange={(event) => setUpdateCity(event.target.value)} type="text"/>
                    <div className='rows'>
                <IoMdAddCircleOutline className='avatarIcon' onClick = { updateProfile }/>
            <TiUserDelete className='deleteIcon' onClick = { () => setShowAlert(!showAlert) }/>
        </div>
        
        {!showAlert ? (<>
        <div></div>
        </> ) : (<>
            <div className='profileTitles'>write your username</div>
                <input className='updateInputs' placeholder='delete account?' value = {deleteConfirm} onChange = {(event) => setDeleteConfirm(event.target.value)}></input>
            <button className= {deleteConfirm === updateName ? ('deleteAccountButton') : ('deleteAccountButton disabled')} onClick = { deleteProfile }>Delete</button>
        </>)}
    </>   
  )
}
