var express = require('express');
var router = express.Router()
var queries = require('../model/queries')


router.post('/createNotes', function (req, res) {
    var data = {
        title: req.body.title,
        description: req.body.description,
        time: req.body.time
    }
    queries.postdata(data)
        .then((data) => {
            console.log(data)
            res.send(data)
        }).catch((err) => {
            console.log(err)
        })
});


router.get('/getNotes', function (req, res) {
    queries.getData()
        .then((res_data) => {
            res.send(res_data)
        }).catch((err) => {
            console.log(err)
        })
})


router.get('/:id/getNote', function (req, res) {
    var id = req.params.id
    queries.getOneData(id)
        .then((res_data) => {
            res.send(res_data)
        }).catch((err) => {
            console.log(err)
        })
})

router.put('/:id/editNote', function (req, res) {
    var id = req.params.id
    var data = {
        title: req.body.title,
        description: req.body.description
    }
    queries.editNote(data, id)
        .then((res_data) => {
            console.log(res_data)
            res.sendStatus(200)
        }).catch((err) => {
            console.log(err)
        })
})


router.delete('/deleteNote', function (req, res) {
    var id = req.params.id
    queries.deleteNote(id)
        .then((res_data) => {
            res.sendStatus(200)

        }).catch((err) => {
            console.log(err)
        })
})

var remainderfunc = (function remainder(req, res) {
    queries.getTime()
        .then((res_data) => {
            var i = 0;
            while (i < res_data.length) {
                var sec = (res_data[i].time)
                if (sec === null) {
                    i++
                }
                else {
                    var split = sec.split(':');
                    var seconds = (+split[0]) * 60 * 60 + (+split[1]) * 60 + (+split[2]);
                    var set = (seconds + "000")
                    let data = (res_data[i])
                    let descriptionPart = (data.description).substring(0, 15);
                    // console.log(descriptionPart)
                    setTimeout(() => {
                        console.log("remainder-")
                        console.log("title:" + data.title)
                        console.log("description:" + descriptionPart + "...")
                    }, set)
                    queries.remainderNull(data)
                        .then(() => {
                            res.send("null_done")
                        })
                    i++
                }
            }

        }).catch((err) => {
            console.log(err)
        })
})()


router.post('/storeImages', function (req, res) {
    var data = {
        photo: req.body.photo,
        notesId: req.body.notesId
    }
    queries.postImg(data)
        .then((res_data) => {
            res.send(res_data)
        }).catch((err) => {
            console.log(err)
        })
})


router.get('/getNotesWithAttachments', function (req, res) {
    queries.getAttachments()
        .then((res_data) => {
            console.log(res_data)
            res.send(res_data)
        }).catch((err) => {
            console.log(err)
        })
})


router.get('/search/:note', function (req, res) {
    var note = req.params.note
    queries.allNotes().then((res_data) => {
        var i = 0;
        while (i < res_data.length) {
            var title = res_data[i].title
            console.log(i)
            if (title.includes(note)) {
                console.log(title)
                i++
                res.send(title)
            }
            else {
                i++
            }
        }
    }).catch((err) => {
        console.log(err)
    })

})



module.exports = router;
