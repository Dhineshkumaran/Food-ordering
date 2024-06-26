exports.foodOrder = async (req, res) => {
    const path = require('path');
    try {
        const fp = path.resolve('HTML','Food_ordering.html');
        res.setHeader('Content-Type','text/html')
        res.status(200).sendFile(fp);
    } catch(error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.addToCart = async (req, res) => {
    try {
        const CartFood = require('../SCHEMAS/cartSchema');
        const { name, imageURL, price } = req.body;
        let quantity = await CartFood.countDocuments({"name":name});
        if (quantity==0) {
            const addFoods = new CartFood({'name':name, 'imageURL':imageURL, 'price':price, 'quantity':1});
            await addFoods.save();
        } else {
            await CartFood.updateOne({'name':name}, {$inc:{'quantity':1}});
        }
        let cartItems = await CartFood.find();
        console.log(cartItems);
        res.json({ success: true, cartItems });
    } catch(error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};
