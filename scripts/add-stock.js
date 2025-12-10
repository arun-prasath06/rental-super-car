// Script to add random stock quantities to spare parts
// Run this once to add stock to all spare parts in products.json

const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');

// Read products
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

// Function to generate random stock between 5 and 80
function getRandomStock() {
    return Math.floor(Math.random() * (80 - 5 + 1)) + 5;
}

// Add stock to spare parts
const updatedProducts = products.map(product => {
    if (product.type === 'part' && !product.stock) {
        return {
            ...product,
            stock: getRandomStock()
        };
    }
    return product;
});

// Write back to file
fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2));

console.log('✅ Stock quantities added to all spare parts!');
console.log(`📦 Updated ${updatedProducts.filter(p => p.type === 'part').length} spare parts`);
