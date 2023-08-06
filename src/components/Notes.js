import React, { useContext } from 'react'

import noteContext from '../context/notes/NoteContext';
import { NotesItem } from './NotesItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes} = context;
    
  return (
    <div className="row my-3">
      <AddNote />
        <h2>your notes</h2>
        {
          notes.map((note)=>{
            return <NotesItem key={note._id} note={note} />
           
          })
        }
      </div>
  )
}

export default Notes