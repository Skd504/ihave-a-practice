let express = require('express');
let router = express.Router();
let dbCon = require('../lib/db');

// display book page
router.get('/', (req, res, next) => {
    dbCon.query('SELECT * FROM book ORDER BY id asc', (err, rows) => {
        if(err) {
            req.flash('error', err);
            res.render('books', { data: '' });
        }else{
            res.render('books', { data: rows });
        }
    })
})

// display add book page
router.get('/add', (req, res, next) => {
    res.render('books/add', {
        name: '',
        author: ''
    })
})

// add a new book
router.post('/add', (req, res, next) => {
    let name = req.body.name;
    let author = req.body.author;
    let errors = false;
    
    if(name.length === 0 || author.length === 0){
        errors = true;
        // set flash messege
        req.flash('error', 'Please Enter name and author');
        // render to add.ejs with flash message
        res.render('books/add', {
            name: name,
            author: author
        })
    }

    // if no error
    if (!errors) {
        let form_data = {
            name: name,
            author: author
        }

        // insert Query
        dbCon.query('INSERT INTO book SET ?', form_data, (err, result) => {
            if (err) {
                req.flash('error', err)
                res.render('books/add', {
                    name: form_data.name,
                    author: form_data.author
                })
            }else{
                req.flash('success', 'Book Successfully Added');
                res.redirect('/books')
            }
        })
    }
    
}) 

// display Edit Book Page
router.get('/edit/(:id)', (req, res, next) => {
    let id = req.params.id;

    dbCon.query('SELECT * FROM book WHERE id = ' + id, (err, rows, fields) => {
        if(rows.length <= 0) {
            req.flash('error', 'Book Not Found with id =' + id)
            res.redirect('/books');
        }else{
            res.render('books/edit', {
                title: 'Edit book',
                id: rows[0].id,
                name: rows[0].name,
                author: rows[0].author
            })
        }
    });
})

// Update Book Page
router.post('/update/:id', (req, res, next) => {
    let id = req.params.id;
    let name = req.body.name;
    let author = req.body.author;
    let errors = false;

    if(name.length === 0 || author.length === 0) {
        errors = true;
        req.flash('error', 'Please Enter name and Author');
        res.render('/books/edit', {
            id: req.params.id,
            name: name,
            author: author
        })
    }
    // if no err
    if(!errors) {
        let form_data = {
            name: name,
            author: author
        }
        // update query 
        dbCon.query("UPDATE book SET ? WHERE id =" + id, form_data, (err, result) => {
            if(err){
                req.flash('error', err);
                res.render('books/edit', {
                    id: req.params.id,
                    name: form_data.name,
                    author: form_data.author
                })
            }else{
                req.flash('success', 'Book Successfully Updated');
                res.redirect('/books')
            }
        })       
    }
})
// delete book
router.get('/delete/(:id)', (req, res, next) => {
    let id = req.params.id;

    dbCon.query('DELETE FROM book WHERE id = ' + id, (err, result) => {
        if(err){
            req.flash('error', err)
            res.redirect('/books')
        }else{
            req.flash('success', 'Book Succesfully Deleted ID = ' + id);
            res.redirect('/books');
        }
    })
})

module.exports = router;