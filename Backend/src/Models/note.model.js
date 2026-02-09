const mongoose = require("mongoose")


/*defining the structure and format of the data that we want to store in our database */
const noteSchema = new mongoose.Schema({
    title:String,
    description:String,
})

/*models are created to perform CRUD operations in our db */
const noteModel = mongoose.model("notes", noteSchema)

module.exports = noteModel;
