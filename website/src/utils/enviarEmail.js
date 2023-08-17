const mail = require("nodemailer");

const config = mail.createTransport({
    service: "outlook",
    auth: {
        user: "",
        pass: "",
    },
})

async function enviarEmail(email){
    const info = await config.sendMail({
        from: 'Andreylrodrigues@hotmail.com', 
        to: email, 
        subject: "Recuperação de senha",
        text: "Acesse o link abaixo para alterar sua senha"
    });
}

module.exports = enviarEmail