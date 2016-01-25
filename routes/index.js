var express = require('express');
var router = express.Router();
var cloudinary = require('cloudinary');
//Our model AppData should not be accesed directly in the view
//only the data needed in the view should be passed in the response variables by 
//the Router/Controller
var appdata = require('../models/data.json'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  var cloudimages = {
      sample : cloudinary.image("sample.jpg", { width: 100, height: 150, crop: "fill" }),
      bio : cloudinary.image("victor-sosa-bio_b5xudi.jpg", {width: 200, height:200, crop: "fill", align:"left", class: "bio-img"})
  };
  res.render('index', { 
        title: 'Home',
        bodyClass: 'home',
    socialmedia: appdata.socialmedia,
    talleres: appdata.talleres,
    videos: appdata.videos,
    paintings: appdata.paintings,
    books: appdata.books,
    images: cloudimages
  });
});

/* GET talleres page. */
router.get('/talleres', function(req, res, next) {
  res.render('talleres', {
        title: 'Talleres',
        bodyClass: 'talleres',
    socialmedia: appdata.socialmedia,
    talleres: appdata.talleres
  });
});

/* GET taller single page. */
router.get('/talleres/:tallerLink', function(req, res, next) {
  var tallerObj = {name:'Not Found'};
  appdata.talleres.forEach(function(item){
    if(item.shortLink === req.params.tallerLink){
      tallerObj = item;
    }
  });
  res.render('talleresSingle', {
    title: 'Taller: '+tallerObj.name,
    bodyClass: 'taller-single',
    socialmedia: appdata.socialmedia,
    taller: tallerObj
  });
});

/* GET libros page. */
router.get('/libros', function(req, res, next) {
  res.render('books', {
        title: 'Libros & Publicaciones',
        bodyClass: 'books',
    socialmedia: appdata.socialmedia,
    books: appdata.books
  });
});

/* GET book single page. */
router.get('/libros/:bookLink', function(req, res, next) {
  var bookObj = {title:'Not Found'};
  appdata.books.forEach(function(item){
    if(item.shortLink === req.params.bookLink){
      bookObj = item;
    }
  });
  res.render('booksSingle', {
    title: 'Libro: '+bookObj.title,
    bodyClass: 'book-single',
    socialmedia: appdata.socialmedia,
    book: bookObj
  });
});

/* GET pinturas page. */
router.get('/pinturas', function(req, res, next) {
  var cloudimages = [];
  appdata.paintings.forEach(function(item){
    cloudimages.push( { image: cloudinary.image(item.cloudinary_id, {width: 500, height: 500, crop: "fill"}), shortLink : item.shortLink} );
  });

  res.render('paintings', {
        title: 'Pinturas',
        bodyClass: 'pinturas',
    socialmedia: appdata.socialmedia,
    paintings: cloudimages
  });
});

/* GET pinturas single page. */
router.get('/pinturas/:paintLink', function(req, res, next) {
  var paintObj = {name:'Not Found'};
  appdata.paintings.forEach(function(item){
    if(item.shortLink === req.params.paintLink){
      paintObj = item;
    }
  });
  res.render('paintingsSingle', {
    title: 'Pintura: '+paintObj.title,
    bodyClass: 'painting-single',
    socialmedia: appdata.socialmedia,
    painting: paintObj
  });
});

/* GET videos page. */
router.get('/videos', function(req, res, next) {
  res.render('videos', {
        title: 'Videos',
        bodyClass: 'videos',
    socialmedia: appdata.socialmedia,
    videos: appdata.videos
  });
});

module.exports = router;
