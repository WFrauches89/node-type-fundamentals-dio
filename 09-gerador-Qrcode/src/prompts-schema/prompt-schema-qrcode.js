import chalk from "chalk";



const promptQRCode = [
    {
        name: "link",
        description: chalk.yellow("Digite o link para gerar o QR CODE"),

    },
    {
        name: "genaratorType",
        description: chalk.yellow("Escolha entre tipo (1) - Imagem ou (2) - Terminal"),
        pattern: /^[1-2]+$/,
        message: chalk.red.italic("Escolha uma opção válida 1 ou 2"),
        required: true
    }


];

export default promptQRCode;