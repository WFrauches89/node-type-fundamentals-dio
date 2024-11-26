import chalk from "chalk";
import handlerPassword from "./handlerPassword.js";



async function createPassword() {

    console.log(chalk.green("password created"));

    const password = await handlerPassword();
    console.log(password);




}

export default createPassword;