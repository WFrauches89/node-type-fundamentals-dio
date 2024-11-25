import * as cartService from "./carrinho.js";
import createItem from "./itens.js";
import promptSync from "prompt-sync";

// Inicializa o prompt para ESM
const prompt = promptSync();

export async function addItemToCart(myCart) {
    const name = prompt("Enter item name: ");
    const price = parseFloat(prompt("Enter item price: "));
    const quantity = parseInt(prompt("Enter item quantity: "), 10);

    const newItem = await createItem(name, price, quantity);
    await cartService.addItem(myCart, newItem);

    console.log(`Item "${name}" added to Cart.`);
}

export async function addItemToWishlist(myWishList) {
    const name = prompt("Enter item name: ");
    const price = parseFloat(prompt("Enter item price: "));
    const quantity = parseInt(prompt("Enter item quantity: "), 10);

    const newItem = await createItem(name, price, quantity);
    await cartService.addItem(myWishList, newItem);

    console.log(`Item "${name}" added to Wishlist.`);
}

export async function removeItemFromCart(myCart) {
    const name = prompt("Enter the name of the item to remove: ");

    const item = myCart.find((item) => item.name === name);
    if (!item) {
        console.log("Item not found in the cart.");
        return;
    }

    await cartService.removeItem(myCart, item);
    console.log(`One unit of "${name}" removed from Cart.`);
}

export async function deleteItemFromCart(myCart) {
    const name = prompt("Enter the name of the item to delete: ");
    await cartService.deleteItem(myCart, name);

    console.log(`Item "${name}" deleted from Cart.`);
}
