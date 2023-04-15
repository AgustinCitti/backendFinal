import { cartsModel } from "../models/cart.js";

class CartsManager {
    // Retorno de los carros en la coleccion
    getCarts(a) {
        if (a === undefined) {
            return cartsModel.find();
        }
        return cartsModel.find().limit(a);
    }

    //Buscar carro de la coleccion por id
    getCartById(id) {
        return cartsModel.find({ _id: id });
    }

    //Agrega carro a la coleccion
    addCart(arr) {
        return cartsModel.create(arr);
    }

    //Funciones para actualizar los productos del carro
    //Agrega el producto  por unidad
    async updateCartProducts(cid, pid) {
        let ind;
        const cart = await cartsModel.find({ _id: cid });
        const newProd = { product: pid, quantity: 1 };
        const Nproducts = cart[0].products;

        Nproducts.forEach((element, index) => {
            if (pid === element.product._id.toJSON()) {
                ind = index;
            }
        });

        if (!isNaN(ind)) {
            Nproducts[ind].quantity++;
        } else {
            Nproducts.push(newProd);
        }

        const result = cartsModel
            .find({ _id: cid })
            .updateMany({ products: Nproducts });
        return result;
    }

    //Borra carro de la coleccion
    deleteCart(id) {
        return cartsModel.deleteOne({ _id: id });
    }

    //Borra producto del carro
    async deleteCartProduct(cid, pid) {
        let ind;
        const cart = await cartsModel.find({ _id: cid });
        const Nproducts = cart[0].products;
        Nproducts.forEach((element, index) => {
            if (pid === element.product._id.toJSON()) {
                ind = index;
            }
        });

        if (!isNaN(ind)) {
            Nproducts.splice(ind, 1);
            const result = cartsModel
                .find({ _id: cid })
                .updateMany({ products: Nproducts });
            return result;
        }
    }

    //Actualiza el carro
    updateCart(cid, products) {
        const result = cartsModel
            .find({ _id: cid })
            .updateMany({ products: products });
        return result;
    }

    //Actualiza cantidad existente de producto
    async updateProductQuantity(cid, pid, qty) {
        let ind;
        const cart = await cartsModel.find({ _id: cid });
        const Nproducts = cart[0].products;
        Nproducts.forEach((element, index) => {
            if (pid === element.product._id.toJSON()) {
                ind = index;
            }
        });

        if (!isNaN(ind)) {
            Nproducts[ind].quantity = qty.quantity;
            const result = cartsModel
                .find({ _id: cid })
                .updateMany({ products: Nproducts });
            return result;
        }
    }

    //Borra los productos del carro
    deleteCartProducts(cid) {
        const result = cartsModel.find({ _id: cid }).updateMany({ products: [] });
        return result;
    }
}
export default CartsManager;