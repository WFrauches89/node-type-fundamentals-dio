import prompt from 'prompt';
import promptMain from '../../prompts-schema/prompt-schema-main.js';
import chalk from 'chalk';


import createQRCode from '../qrCodeGenerator/createQRCode.js';
import createPassword from '../passwordGenerator/createPass.js';

const log = console.log;

async function handleMainPrompt() {
    prompt.start();

    try {
        const { select } = await prompt.get(promptMain);

        if (select == 1) {
            log(chalk.green.bold("Você escolheu: QR Code Generator"));
            await createQRCode();
        } else if (select == 2) {
            log(chalk.green.bold("Você escolheu: Password Generator"));
            createPassword();
        }
    } catch (err) {
        log(chalk.red.bold("Ocorreu um erro ao processar sua escolha: "), err.message);
    }
}

export default handleMainPrompt;