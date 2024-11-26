
import prompt from 'prompt';
import promptMain from './prompts-schema/prompt-schema-main.js';
import chalk from 'chalk';

import createQRCode from './services/qrCodeGenerator/createQRCode.js';
import createPassword from './services/passwordGenerator/createPass.js';

const log = console.log;


async function main() {
    prompt.get(promptMain, async (err, choose) => {
        if (choose.select == 1)
            await createQRCode();
        if (choose.select == 2)
            createPassword();
    })
    prompt.start();
}

main();

