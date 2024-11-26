import qr from 'qrcode-terminal';
import chalk from 'chalk';


const log = console.log

async function handlerQRCode(err, choose) {
    if (err) {
        log("error aplication");
        return;
    }

    const isSmall = choose.type == 2;

    qr.generate(choose.link, { small: isSmall }, ((qrcode) => {
        log(chalk.green("QR CODE gerado com sucesso:\n"));
        log(qrcode);
    }));


}

export default handlerQRCode;