const fs = require('fs').promises
const path = require('path')
const { insertData, Product } = require('./sequelize.js')

async function getProducts(req, res) {
    let { id } = req.params
    let product = await Product.findAll({
        where: { id: id }
    });
    if (!product) return next()
    res.json(product)
}
async function listProducts(req, res) {
    // const { offset = 0, limit = 25, category } = req.query
    // // Query the database using Sequelize
    // let products = await Product.findAll({
    //     offset: parseInt(offset),
    //     limit: parseInt(limit),
    //     where: {}
    // });

    // // Filter products by category if provided
    // if (category) {
    //     products = products.filter(product => product.category && product.category.includes(category));
    // }


    // Read all data from the Product table
    let products = await Product.findAll();
    res.json(products);

    //  return products;
    // const data = await fs.readFile(path.join(__dirname, 'products.json'))
    // let products = JSON.parse(data).products
    // products = products.slice(offset, offset + limit);
    // if (category) {
    //     products = products.filter(product => product.category && product.category.includes(category));
    // }
    // res.json(products)
}
async function createProduct(req, res) {
    // Call the insertData function to start the insertion process
    await insertData(req.body);
    // Send a success response
    res.status(200).json({ message: 'Data inserted successfully' });
}
async function editProduct(req, res) {
    let ids = req.params.id
    let { id } = req.body
    await Product.update(
        { id: id },
        {
            where: {
                id: ids,
            },
        },
    );
    res.json(req.query)
}
async function deleteProduct(req, res) {
    let { id } = req.params
    await Product.destroy({
        where: {
            id: id
        },
    });
    res.json({ success: id })
}
module.exports = {
    getProducts,
    listProducts,
    createProduct,
    editProduct,
    deleteProduct
}