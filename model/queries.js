var knex = require('../connection/mysql')


let postdata = (data) => {
   return knex('NOTES_TABLE').insert(data)
}

let getData = () => {
   return knex.select('*').from('NOTES_TABLE')
}

let getOneData = (id) => {
   return knex.select('*').from('NOTES_TABLE').where('id', id)
}


let editNote = (data, id) => {
   return knex('NOTES_TABLE').where('id', id).update({ title: data.title, description: data.description })
}

let deleteNote = (id) => {
   return knex('NOTES_TABLE').where('id', id).del()
}

let getTime = () => {
   return knex('NOTES_TABLE').select('*')
}

let postImg = (data) => {
   return knex('NOTES_ATTACHMENTS_TABLE').insert(data)
}

let remainderNull = (data) => {
   return knex('NOTES_TABLE').update({'time' : null}).where('id' ,data.id)
}

let getAttachments = () => {
   return knex.table('NOTES_TABLE').select('*').innerJoin('NOTES_ATTACHMENTS_TABLE' ,'NOTES_TABLE.id' , '=' , 'NOTES_ATTACHMENTS_TABLE.notesId')
}

let allNotes= () => {
   return knex.select('title').from('NOTES_TABLE')
}




module.exports = {postdata ,getData ,getOneData , editNote, deleteNote , remainderNull , postImg, getTime , getAttachments ,allNotes }

