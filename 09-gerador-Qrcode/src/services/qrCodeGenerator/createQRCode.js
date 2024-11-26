import prompt from "prompt";
import promptQRCode from "../../prompts-schema/prompt-schema-qrcode.js";
import chalk from 'chalk';
import handlerQRCode from "./handlerQRCode.js";


const log = console.log;
async function createQRCode() {
    prompt.get(promptQRCode, handlerQRCode)

    prompt.start();
}


export default createQRCode;