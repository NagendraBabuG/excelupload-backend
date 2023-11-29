const express = require('express')
const upload = require('../services/storageUpload')
const router = express.Router()
const uploadFile = require('../controllers/uploadExcelFile')

router.post('/upload', upload.single('file'), uploadFile)


module.exports = router