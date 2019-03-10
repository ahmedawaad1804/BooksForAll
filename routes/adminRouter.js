const express = require('express')
const bookModel = require('../models/book');
const categoryModel = require('../models/category');
const authorModel = require('../models/author');
const router = express.Router();

router.get('/mainPage/', (req, res) => {
    let authorResult
    let categoryResult
    categoryModel.find((err, categories) => {
        categoryResult = categories
    })
    authorModel.find((err, authors) => {
        console.log(authors);
        authorResult = authors
    })
    bookModel.find().populate('categoryId').populate('authorId').exec((err, books) => {
        console.log(books)
        res.render('pages/adminMainPage.ejs'
            , {
                categories: categoryResult,
                books: books,
                authors: authorResult
            })

    })
});

/*  get methods when clicking add to render add form */
router.get('/mainPage/addCategory', (req, res) => {
    res.render('pages/addCategory.ejs');
})
router.get('/mainPage/addBook', (req, res) => {
    let bookResult
    let categoryResult
    categoryModel.find((err, categories) => {
        categoryResult = categories
    })
    bookModel.find((err, books) => {
        bookResult = books
    })
    authorModel.find((err, authors) => {
        res.render('pages/addBook.ejs', {
            categories: categoryResult,
            books: bookResult,
            authors: authors
        })
    })
})
router.get('/mainPage/addAuthor', (req, res) => {
    res.render('pages/addAuthor.ejs');
})

/*  posts methods when clicking submit to modifiy database then refresh */
router.post('/mainPage/addCategory', (req, res) => {
    const category = new categoryModel({
        categoryName: req.body.categoryName,
    })
    category.save((err, doc) => {
        res.redirect('/admin/mainPage');
    })
})

router.post('/mainPage/addBook', (req, res) => {
    const book = new bookModel({
        bookName: req.body.bookName,
        categoryId: req.body.categorySelect,
        authorId: req.body.authorSelect,
    })
    book.save((err, doc) => {
        res.redirect('/admin/mainPage');
    })
})

router.post('/mainPage/addAuthor', (req, res) => {
    const author = new authorModel({
        authorName: {
            first: req.body.firstName,
            last: req.body.lastName
        },
        dateOfBirth: req.body.dateOfBirth,
    })
    author.save((err, doc) => {
        res.redirect('/admin/mainPage');
    })
})

/* get methods when clicking delete to render main page after deleteing*/
router.get('/mainPage/:id/deleteCategory', (req, res) => {
    var id = req.params.id;
    categoryModel.findByIdAndRemove(id, (err) => { })
    res.redirect('/admin/mainPage');
})
router.get('/mainPage/:id/deleteBook', (req, res) => {
    var id = req.params.id;
    bookModel.findByIdAndRemove(id, (err) => { })
    res.redirect('/admin/mainPage');
})
router.get('/mainPage/:id/deleteAuthor', (req, res) => {
    var id = req.params.id;
    authorModel.findByIdAndRemove(id, (err) => { })
    res.redirect('/admin/mainPage');
})

/* get methods when clicking edit to render main page after deleteing*/
router.get('/mainPage/:id/editCategory', (req, res) => {
    var id = req.params.id;
    categoryModel.findById(id,(err,categories) => {
        res.render('pages/editCategory.ejs', {
            category: categories
    })
});
})

router.post('/mainPage/:id/editCategory', (req, res) => {
    var id = req.params.id;
    categoryModel.findByIdAndUpdate(id,{'categoryName':req.body.categoryName},{new:true},(err)=>{
        res.redirect('/admin/mainPage');
    });
})

router.get('/mainPage/:id/editAuthor', (req, res) => {
    var id = req.params.id;
    authorModel.findById(id,(err,authors) => {
        res.render('pages/editAuthor.ejs', {
            author: authors
    })
});
})

router.post('/mainPage/:id/editAuthor', (req, res) => {
    var id = req.params.id;
    authorModel.findByIdAndUpdate(id,{authorName:{first: req.body.firstName,
        last: req.body.lastName},dateOfBirth: req.body.dateOfBirth,},{new:true},(err)=>{
        res.redirect('/admin/mainPage');
    });
})

router.get('/mainPage/:id/editBook', (req, res) => {
    var id = req.params.id;
    let authorResult
    let categoryResult
    categoryModel.find((err, categories) => {
        categoryResult = categories
    })
    authorModel.find((err, authors) => {
        authorResult=authors
        })
    bookModel.findById(id,(err,books) => {
        console.log(books);
        res.render('pages/editBook.ejs', {
            book: books,
            categories: categoryResult,
            authors:authorResult        
    })
});
})

router.post('/mainPage/:id/editBook', (req, res) => {
    var id = req.params.id;
    bookModel.findByIdAndUpdate(id,{bookName:req.body.bookName,categoryId:  req.body.categorySelect,authorId:req.body.authorSelect},{new:true},(err)=>{
        res.redirect('/admin/mainPage');
    });
})


module.exports = router;
