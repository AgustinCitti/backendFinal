const fs = require('fs');

class ProductManager {

    constructor(path) {
        this.id = 0;
        this.path = path;
    }
    addProduct(product) {
        let { title, beer, price, thumbnail, code, stock, quantity } = product;
        const parse = JSON.parse(fs.readFileSync(this.path))
        const validateCode = parse.find((e => e.code === code));
        if (validateCode) {
            return console.log('codigo de producto ya existe')
        } else {
            const highestId = Math.max(...parse.map(e => e.id));
            console.log('highest id: ' + highestId);
            this.id = highestId;
            this.id++;
            const product = {
                title,
                beer,
                price,
                thumbnail,
                code,
                stock,
                quantity,
                status: true,
                id: this.id,
            }
            parse.push(product);
            fs.writeFileSync(this.path, JSON.stringify(parse));
        }
    }
    getProducts() {
        const file = fs.readFileSync(this.path);
        const parseo = JSON.parse(file);
        return parseo;
    }
    getProductsById(id) {
        return this.getProducts().find(product => product.id === id);
    }
    updateProduct(id, productMod) {
        const parse = JSON.parse(fs.readFileSync(this.path));
        let updated = false;
        const updatedProducts = parse.map(product => {
            if (product.id === id) {
                updated = true;
                return {
                    ...product,
                    title: productMod.title,
                    beer: productMod.beer,
                    price: productMod.price,
                    thumbnail: productMod.thumbnail,
                    code: productMod.code,
                    stock: productMod.stock
                }
            } else {
                return product;
            }
        })
        fs.writeFileSync(this.path, JSON.stringify(updatedProducts));
        return updated;
    }
    deleteProduct(id) {
        const newProductList = this.getProducts().filter(product => product.id != id);
        console.log(newProductList);
        fs.writeFileSync(this.path, JSON.stringify(newProductList));
    }
}

module.exports = ProductManager;