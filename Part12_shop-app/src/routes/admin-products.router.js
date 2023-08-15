const express = require('express');
const router = express.Router();
const Category = require('../models/categories.model');
const Product = require('../models/products.model');
const { checkAdmin } = require('../middleware/auth');
const fs = require('fs-extra');
const Resizeimage = require('resize-img');

router.get('/', checkAdmin, async (req, res, next) => {
    try{
        const products = await Product.find();
        res.render('admin/products', { products });
        
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/add-product', checkAdmin, async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.render('admin/add-product', { categories });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/', checkAdmin, async (req, res, next) => {
    const imageFile = req.files.image.name;
    const { title, desc, price, category } = req.body;
    const slug = title.replace(/\s+/g, '-').toLowerCase();

    try {
        // db save
        const newProduct = new Product({
            title,
            desc,
            price,
            category,
            slug,
            image: imageFile,
        });

        await newProduct.save();

        // local save
        await fs.mkdirp('src/public/product-images/' + newProduct._id);
        await fs.mkdirp('src/public/product-images/' + newProduct._id + '/gallery');
        await fs.mkdirp('src/public/product-images/' + newProduct._id + '/gallery/thumbs');

        const path = 'src/public/product-images/' + newProduct._id + '/' + imageFile;
        const productImage = req.files.image;
        productImage.mv(path);

        req.flash('success_msg', '상품이 추가되었습니다.');
        res.redirect('/admin/products');
    }   
    catch (error) {
        console.log(error);
        next(error);
    }
});

router.delete('/:id', checkAdmin, async (req, res, next) => {
    const id = req.params.id;
    const path = 'src/public/product-images/' + id;
    try {
        await fs.remove(path);
        await Product.findByIdAndRemove(req.params.id);
        req.flash('success_msg', '상품이 삭제되었습니다.');
        res.redirect('/admin/products');
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/:id/edit', checkAdmin, async (req, res, next) => {
    try {
        const categories = await Category.find();
        const { _id, title, desc, category, price, image } = await Product.findById(req.params.id);

        const galleryDir = 'src/public/product-images/' + _id + '/gallery/';
        const galleryImages = await fs.readdir(galleryDir);

        res.render('admin/edit-product', { 
            category: category.replace(/\s+/g, '-').toLowerCase(),
            id: _id,
            title, desc, category, price, image, galleryImages, categories
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/product-gallery/:id', checkAdmin, async (req, res, next) => {
    // app.use(fileUpload()); <- 때문에 사용가능
    const productIamges = req.files.file;
    const id = req.params.id;
    const path = 'src/public/product-images/' + id + '/gallery/' + req.files.file.name;
    const thumbsPath = 'src/public/product-images/' + id + '/gallery/thumbs/' + req.files.file.name;
    try {
        // image save
        await productIamges.mv(path);
        // thumb of image save
        const buf = await Resizeimage(fs.readFileSync(path), { width: 100, height: 100 });
        fs.writeFileSync(thumbsPath, buf);
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

router.delete('/:id/image/:imageId', checkAdmin, async (req, res, next) => {
    const orignalImage = 'src/public/product-images/' + req.params.id + '/gallery/' + req.params.imageId;
    const thubmImage = 'src/public/product-images/' + req.params.id + '/gallery/thumbs/' + req.params.imageId;
    try {
        await fs.remove(orignalImage);
        await fs.remove(thubmImage);
        req.flash('success_msg', '이미지가 삭제되었습니다.');
        res.redirect('/admin/products/' + req.params.id + '/edit');
    }
    catch (error) {
        console.log(error);
        next(error);
    }
})

module.exports = router;