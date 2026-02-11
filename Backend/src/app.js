/* Server ko create and config krna */

const express = require("express")
const mongoose = require("mongoose")
const noteModel = require("./Models/note.model")
const cors = require("cors")
const path = require("path")


const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("./public"))
/*
* - POST /api/notes
* - create new note and save data in mongodb
* - req.body = {title, description}
*/
app.post("/api/notes", async (req, res) => {
    const {title, description} = req.body;

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "Note created successfully",
        note
    })
})

app.get("/api/notes", async(req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})

/* DELETE /api/notes/:id
 delete note with the id from req.params */
app.delete("/api/notes/:id" , async (req, res) => {
    const id = req.params.id;

    console.log(id)

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully"
    })
})

/* PATCH /api/notes/:id
update the description of the note by id
req.body = {description}
*/
app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id
    const {description} = req.body
    await noteModel.findByIdAndUpdate(id, {description})
    
    res.status(200).json({
        message: "Note updated successfully" 
    })
})

//console.log(__dirname)  --dirname provides the full path of the current directory
//".." -to get out of the __diname path in middle and access the public folder
app.use('*name', (req, res) => {
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app;




