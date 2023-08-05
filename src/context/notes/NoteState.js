
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
   const notesInitial= [
    {
        "_id": "64cbe93d996c6cfc34d3ebb5",
        "user": "64cb7f0833d82f3798db7662",
        "title": "this is the title",
        "description": "this is the description",
        "tag": "this is the tag",
        "date": "2023-08-03T17:51:57.009Z",
        "__v": 0
    },
    {
        "_id": "64cbe93e996c6cfc34d3ebb7",
        "user": "64cb7f0833d82f3798db7662",
        "title": "this is the title",
        "description": "this is the description",
        "tag": "this is the tag",
        "date": "2023-08-03T17:51:58.830Z",
        "__v": 0
    },
    {
        "_id": "64cbeaea6c38cbb8a77c2856",
        "user": "64cb7f0833d82f3798db7662",
        "title": "this is the title",
        "description": "this is the description",
        "tag": "general",
        "date": "2023-08-03T17:59:06.021Z",
        "__v": 0
    }
] 
const [notes,setNotes] = useState(notesInitial);
return (
    <NoteContext.Provider value={{notes,setNotes}} >
        {props.children}
    </NoteContext.Provider>
)
}

export default NoteState;