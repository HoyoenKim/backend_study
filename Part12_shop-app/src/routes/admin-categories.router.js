const express = require('express');
const router = express.Router();
const Category = require('../models/categories.model');

const { checkAdmin } = require('../middleware/auth');

router.get('/', checkAdmin, async (req, res) => {
    try {
        const categories = await Category.find();
        res.render('admin/categories', { categories: categories });
    } catch (err) {
        console.log(err);
        next(err);
    }
})

router.get('/add-category', checkAdmin, (req, res) => {
    res.render('admin/add-category');
});

router.post('/add-category', checkAdmin, async (req, res) => {
    try {
        const title = req.body.title;
        const slug = title.replace(/\s+/g, '-').toLowerCase();
        const category = await Category.findOne({ slug: slug });
        if(category) {
            req.flash('error', '이미 존재하는 카테고리입니다. 다른 제목을 사용해주세요.');
            res.redirect('/admin/categories/add-category');
        }
        else {
            try {
                const newCategory = await Category.create({
                    title,
                    slug
                });
                req.flash('success', '카테고리가 추가되었습니다.');
                res.redirect('/admin/categories');
            }
            catch(err) {
                req.flash('error', '카테고리를 추가하는 도중 에러가 발생했습니다.');
                res.redirect('/admin/add-category');
            }
        }
    }
    catch (err) {
        console.log(err);
        req.flash('error', '카테고리를 찾는 도중 에러가 발생했습니다.');
        res.redirect('/admin/categories/add-category');
    }
});

router.delete('/:id', checkAdmin, async (req, res) => {
    try {
        await Category.findByIdAndRemove(req.params.id)
        req.flash('success', '카테고리가 삭제되었습니다.');
        res.redirect('/admin/categories');
    }
    catch (err) {
        console.log(err);
        req.flash('error', '카테고리가 삭제 중 에러가 발생했습니다.');
        res.redirect('/admin/categories');
    }
});
module.exports = router;