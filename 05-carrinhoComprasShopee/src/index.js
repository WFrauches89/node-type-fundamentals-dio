import * as cartService from "./services/carrinho.js";
import {
    addItemToCart,
    addItemToWishlist,
    removeItemFromCart,
    deleteItemFromCart,
} from "./services/menuFunctions.js";
import promptSync from "prompt-sync";


const prompt = promptSync();

const myCart = [];
const myWishList = [];

console.log("Welcome to your Shopee Cart!");

async function mainMenu() {
    let exit = false;

    while (!exit) {
        console.log("\nWhat would you like to do?");
        console.log("1. Add item to Cart");
        console.log("2. Add item to Wishlist");
        console.log("3. Remove item from Cart");
        console.log("4. Delete item from Cart");
        console.log("5. Display Cart");
        console.log("6. Display Wishlist");
        console.log("7. Calculate Cart Total");
        console.log("8. Exit");

        const choice = prompt("Enter your choice: ");

        switch (choice) {
            case "1":
                await addItemToCart(myCart);
                break;
            case "2":
                await addItemToWishlist(myWishList);
                break;
            case "3":
                await removeItemFromCart(myCart);
                break;
            case "4":
                await deleteItemFromCart(myCart);
                break;
            case "5":
                await cartService.displaycart(myCart);
                break;
            case "6":
                await cartService.displaycart(myWishList);
                break;
            case "7":
                await cartService.calculateTotal(myCart);
                break;
            case "8":
                console.log("Goodbye!");
                exit = true;
                break;
            default:
                console.log("Invalid choice. Please try again.");
        }
    }
}

mainMenu();


// const item1 = await createItem("hotwheels ferrari", 20.99, 1);
// const item2 = await createItem("hotwheels lamborghini", 39.99, 3);
// const item3 = await createItem("hotwheels bugatti", 39.99, 1);

// await cartService.addItem(myCart, item1);
// await cartService.addItem(myCart, item2);
// await cartService.addItem(myWhishList, item3);


// await cartService.removeItem(myCart, item2);


// await cartService.displaycart(myCart);

// await cartService.deleteItem(myCart, item2.name);
// await cartService.deleteItem(myCart, item1.name);
// await cartService.calculateTotal(myCart);