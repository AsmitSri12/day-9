import { useState, useEffect } from 'react'
import axios from "axios"


function App() {

  const [notes, setNotes ] = useState([
    {
      title: "test title 1",
      description: "test description"
    },
    {
      title: "test title 2",
      description: "test description"
    },
    {
      title: "test title 3",
      description: "test description"
    },
    {
      title: "test title 4",
      description: "test description"
    }
  ])

/* axios is a package which helps in calling the api within the react app. Simply we need to write the apis like axios.patch,axios.delete,axios.get etc. */
function fetchNotes() {
    axios.get('http://localhost:3000/api/notes')
    .then(res => {
      setNotes(res.data.notes)  
    })
}

function handleDeleteNote(noteId){
  axios.delete("http://localhost:3000/api/notes/"+noteId)
  .then(res => {
    console.log(res.data)
    fetchNotes() 
  })

}

/*e stands for event 
preventDefault prevents the repetitive reloading of the page on form submission 
*/

function handleSubmit(e) {
  e.preventDefault()

  const {title, description} = e.target.elements

  console.log(title.value, description.value)

  axios.post("http://localhost:3000/api/notes",{
    title: title.value,
    description: description.value
  })
  .then(res => {
    console.log(res.data)

    fetchNotes()

  })
}

  useEffect(() => {
    fetchNotes()
  },[])

  return (
    <>
    <form className="note-create-form" onSubmit={handleSubmit}>

      <input name="title" type="text" placeholder="Enter title"/>
      <input name="description" type="text" placeholder="Enter description"/>     
      <button name="btn">Create Note</button>

    </form>

    <div className="notes">
      {
        notes.map(note => {
          return <div className="note">
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={()=>{handleDeleteNote(note._id)}}>DELETE</button>
          </div>
        })
      }
    </div>
    </>
  )
}

export default App
