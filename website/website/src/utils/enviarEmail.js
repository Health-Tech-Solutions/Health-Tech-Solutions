const mail = require("nodemailer");

const config = mail.createTransport({
    service: "outlook",
    auth: {
        user: "",
        pass: "",
    },
})

async function enviarEmail(email,id){
    await config.sendMail({
        from: 'Andreylrodrigues@hotmail.com', 
        to: email, 
        subject: "Recuperação de senha",
        text: `
            Acesse o link abaixo para alterar sua senha

            http://localhost:3333/usuarios/tela/alterarSenha/${id}
        `
    });
}

module.exports = enviarEmail