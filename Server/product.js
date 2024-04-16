const bodyParser = require('body-parser');
const express = require('express');
const Product = require('../Data/product/product2');
const ProductController = require('../data/product/productController');

function ProductRouter() {
    let router = express();

    router.use(bodyParser.json({limit: '100mb'}));
    router.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

    //Recebe e posta as requests para o produto
    router.route('/product')
        .get(function(req, res, next){
            console.log('get all product');
            Product.findAll()
            .then((product) => {
                res.send(product);
                next();
            })
            .catch((err) => {
                next(err); 
            });
        })
        .post(function(req, res, next){
            console.log('post');
            let body = req.body;
          
            Product.create(body)
            .then(() => {
                console.log('Product Created!');
                res.status(200).send(body);
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('product already exists!');
                err.status = err.status || 500;
                res.status(400).send('Error creating product');
                next(err); 
            });
        });

    // Define a get request para o /produto/:id
    router.get('/product/:id', function(req, res, next) {
        let id = req.params.id;
        Product.findById(id)
            .then((product) => {
                console.log('Product found!');
                res.send(product);
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Product not found');
                err.status = err.status || 500;
                res.status(400).send('Error finding product');
                next(err); 
            });
    });
    // Define a get request para o /produto/sort/:sortBy
    router.get('/product/sort/:sortBy', function(req, res, next) {
        let sortBy = req.params.sortBy;
        Product.findAllAndSort(sortBy)
            .then((product) => {
                console.log('Product found and sorted!');
                res.send(product);
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Error finding and sorting product');
                err.status = err.status || 500;
                res.status(400).send('Error finding and sorting product');
                next(err); 
            });
    });

    router.get('/product/name/:name', function(req, res, next) {
        let name = req.params.name;
        Product.findByName(name)
            .then((product) => {
                console.log('Product found!');
                res.send(product);
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Product not found');
                err.status = err.status || 500;
                res.status(400).send('Error finding product');
                next(err); 
            });
    });

    // Define o put request para o /produto/:id
    router.put('/product/:id', function(req, res, next) {
        let id = req.params.id;
        let body = req.body;
        Product.update(id, body)
            .then(() => {
                console.log('Product updated!');
                res.status(200).send('Product updated!');
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Product not found');
                err.status = err.status || 500;
                res.status(400).send('Error updating product');
                next(err); 
            });
    });
    // Define o put request para o /produto/name/:name
    router.put('/product/name/:name', function(req, res, next) {
        let body = req.body;
        let name = req.params.name;
        Product.updateByName(name, body)
            .then(() => {
                console.log('Product updated!');
                res.status(200).send(body);
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Product not found or no changes made');
                err.status = err.status || 500;
                res.status(400).send('Error updating stock');
                next(err); 
            });
    });

    // Define o delete request para o /produto/:id
    router.delete('/product/:id', function(req, res, next) {
        let id = req.params.id;
        Product.delete(id)
            .then(() => {
                console.log('Product deleted!');
                res.status(200).send('Product deleted!');
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Product not found');
                err.status = err.status || 500;
                res.status(400).send('Error deleting product');
                next(err); 
            });
    });

    router.delete('/product/name/:name', function(req, res, next) {
        let name = req.params.name;
        Product.deleteByName(name)
            .then(() => {
                console.log('Product deleted!');
                res.status(200).send('Product deleted!');
                next();
            })
            .catch((err) => {
                console.log(err);
                console.log('Product not found');
                err.status = err.status || 500;
                res.status(400).send('Error deleting product');
                next(err); 
            });
    });

    return router;
}

module.exports = ProductRouter;