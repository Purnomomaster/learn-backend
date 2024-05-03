const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with your PostgreSQL connection details
const sequelize = new Sequelize('postgres://postgres:cobapostgres@localhost:5432/postgres');

// Define a Sequelize model corresponding to your database table
const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    discountPercentage: {
        type: DataTypes.FLOAT,
        allowNull: false // Change to false if discount is always provided
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
});

// // Read the JSON file || from file to database
// const jsonData = JSON.parse(fs.readFileSync('products.json', 'utf8')).products;

// Function to insert data into the database
async function insertData(data) {
    try {
        await Product.create(data);// if you createbulk it will use array of object instead object
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}
module.exports = { insertData, Product }

// // Sync the model with the database || create table if doesnt exist
// Product.sync()
//     .then(() => {
//         console.log('Product model synchronized successfully');
//     })
//     .catch(err => {
//         console.error('Error synchronizing Product model:', err);
//     });