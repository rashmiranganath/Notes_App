const options = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'navgurukul',
        database: 'notesProject'
    }
}
const knex = require('knex')(options);


//to know the mysql version
// knex.raw("SELECT VERSION()").then(
//     (version) => console.log((version[0][0]))
// ).catch((err) => { console.log(err); throw err })
//     .finally(() => {
//         knex.destroy();
//     });



//to create a table in the database 
knex.schema.hasTable('bookNotes').then(function (exists) {
    if (!exists) {
        knex.schema.createTable('bookNotes', (table) => {
            table.increments('id')
            table.string('title')
            table.integer('description')
        }).then(() => console.log("table created"))
            .catch((err) => { console.log(err); throw err })
    }
    else {
        console.log("table created")
    }
})




module.exports = knex;



