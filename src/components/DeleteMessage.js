import { firestore, deleteDoc, MESSAGES, doc } from '../firebase/Config';
import { MdOutlineDelete } from 'react-icons/md'
import React from 'react'

export default function DeleteMessage({id}) {

    const deleteMsg = () => {
        const docRef = doc(firestore,MESSAGES,id)
        deleteDoc(docRef)
        .then(() => {
        })
        .catch ( error => {
            console.log(error)
        })
    }

  return (
    <MdOutlineDelete onClick = {deleteMsg} className = 'deleteIcon'/>
  )
}
