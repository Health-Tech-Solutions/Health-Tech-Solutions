const express = require("express")
const router = express.Router()

const hospitaisController = require("../controllers/hospitaisController")


router.get("/listarHospitais", (req,res) => {
    hospitaisController.listarHospitais(req,res)
})

module.exports = router