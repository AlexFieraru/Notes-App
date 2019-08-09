const fs = require('fs')
const chalk = require('chalk')


const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = function (title) {
    const notes = loadNotes()
    const newNotes = notes.filter((note) => note.title !== title)

    if (notes.length > newNotes.length){
        console.log(chalk.bgGreen("Note removed!"))
    }
    else{
        console.log(chalk.bgRed("No note found!"))
    }

    saveNotes(newNotes)
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.yellow("Your notes"))
    notes.forEach((note) => console.log(note.title));
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.green(note.title))
        console.log(note.body)
    }
    else {
        console.log(chalk.red.inverse("No note found!"))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}