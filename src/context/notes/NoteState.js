
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [
        {
            "_id": "64cbe93d996c6cfc34d3ebb51",
            "user": "64cb7f0833d82f3798db7662",
            "title": "this is the title",
            "description": "this is the description",
            "tag": "this is the tag",
            "date": "2023-08-03T17:51:57.009Z",
            "__v": 0
        },
        {
            "_id": "64cbe93e996c6cfc34d3ebb72",
            "user": "64cb7f0833d82f3798db7662",
            "title": "this is the title",
            "description": "this is the description",
            "tag": "this is the tag",
            "date": "2023-08-03T17:51:58.830Z",
            "__v": 0
        },
        {
            "_id": "64cbeaea6c38cbb8a77c28563",
            "user": "64cb7f0833d82f3798db7662",
            "title": "this is the title",
            "description": "this is the description",
            "tag": "general",
            "date": "2023-08-03T17:59:06.021Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial);

    //Add a note
    const addNote = async (title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/addNotes`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjYjdmMDgzM2Q4MmYzNzk4ZGI3NjYyIn0sImlhdCI6MTY5MTA3OTQ0M30.qRFt3F9k0Gr0Ds4Db_lvNfITiBrwMKs7CijGcq1qjl4"
            },
            body: JSON.stringify(title,description,tag), // body data type must match "Content-Type" header
        });
        const json = response.json(); // parses JSON response into native JavaScript objects

        let note = {
            "_id": "64cbeaea6c38cbb8a77c28564",
            "user": "64cb7f0833d82f3798db7662",
            "title": title,
            "description": description,
            "tag": "general",
            "date": "2023-08-03T17:59:06.021Z",
            "__v": 0
        }

        setNotes(notes.concat(note));

    }

    //Delete a note
    const deleteNote = (id) => {
        console.log("deleting a note with id " + id)
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote);

    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjYjdmMDgzM2Q4MmYzNzk4ZGI3NjYyIn0sImlhdCI6MTY5MTA3OTQ0M30.qRFt3F9k0Gr0Ds4Db_lvNfITiBrwMKs7CijGcq1qjl4"
            },
            body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
        const json = response.json(); // parses JSON response into native JavaScript objects


        //logic to edite
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }

        }

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }} >
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;