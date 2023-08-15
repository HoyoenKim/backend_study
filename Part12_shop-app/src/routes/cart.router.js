const express = require('express');
const router = express.Router();
const Product = require('../models/products.model');

router.post('/:product', async (req, res, next) => {
    const slug = req.params.product;
    try {
        const product = await Product.findOne({ slug: slug });

        // first cart
        if(!req.session.cart) {
            req.session.cart = [];
            req.session.cart.push({
                title: slug,
                qty: 1,
                price: product.price,
                image: '/product-images/' + product._id + '/' + product.image, 
            });
        }
        else {
            let cart = req.session.cart;
            var newItem = true;
            for(var i = 0  ; i < cart.length ; i++) {
                if(cart[i].title === slug) { 
                    cart[i].qty++;
                    newItem = false;
                    break;
                }
            }

            if(newItem) {
                cart.push({
                    title: slug,
                    qty: 1,
                    price: product.price,
                    image: '/product-images/' + product._id + '/' + product.image,
                });
            }
        }
        req.flash('success', '상품을 장바구니에 추가했습니다.');
        res.redirect('back');
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});

router.get('/checkout', (req, res, next) => {
    res.render('checkout');
});

router.get('/update/:product', (req, res, next) => {
    const slug = req.params.product;
    const action = req.query.action;
    let cart = req.session.cart;

    for(var i = 0  ; i < cart.length ; i++) {
        if(cart[i].title === slug) {
            switch(action) {
                case 'add':
                    cart[i].qty++;
                    break;
                case 'remove':
                    cart[i].qty--;
                    if(cart[i].qty < 1) {
                        cart.splice(i, 1);
                    }
                    break;
                case 'clear':
                    cart.splice(i, 1);
                    if(cart.length === 0) {
                        delete req.session.cart;
                    }
                    break;
                default:
                    console.log('invalid action');
                    break;
            }
            break;
        }
    }

    req.flash('success', '장바구니를 업데이트했습니다.');
    res.redirect('back');
});

router.delete('/', (req, res, next) => {
    delete req.session.cart;
    req.flash('success', '장바구니가 비워졌습니다.');
    res.redirect('back');
});

router.get('/complete-order', (req, res, next) => {
    delete req.session.cart;
    res.sendStatus(200);
});

module.exports = router;