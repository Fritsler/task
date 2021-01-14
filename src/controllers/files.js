const express = require('express');
const router = new express.Router();
const File = require('../config/db.config').files;
const fileupload = require("express-fileupload");

router.use(fileupload());

// в задании не сказано куда сохранять фалы, можно и на сервер
// я буду хранить файлы в базе
// принимаем массив files c любыми файлами
// если будет не обходимость можно по mimetype ограничить виды файлов
router.post('/upload', async (req, res) => {
    if(!req.files){
        return res.status(400).json({ error: "file_not_found" });
    } else {
        try {
            //если пришел массив файлов
            if(req.files.files && req.files.files.length) {
                const promises = req.files.files.map(async (file) => {
                    await File.create({
                        name: file.name,
                        user_id: req.userData.id,
                        content_type: file.mimetype,
                        data: file.data
                    });
                    return file;
                });
                await Promise.all(promises);
            //если пришел один файл вместо массива
            } else {
                const file = req.files.files
                await File.create({
                    name: file.name,
                    user_id: req.userData.id,
                    content_type: file.mimetype,
                    data: file.data
                });
            }
            return res.status(200).json({ status:"success" });    
        } catch(err) {
            const respJson = { error: err.stack };
            return res.status(500).json(respJson);    
        }
    }
});

router.get('/getList', (req, res) => {
    File.findAll({
        where: {
            user_id: req.userData.id
        },
        attributes: ['id', 'name']
    }).then(files => {
        return res.status(200).json({ files });
    }).catch(err => {
        const respJson = { error: err.stack };
        return res.status(500).json(respJson);
    })
});

router.get('/getById', (req, res) => {
    File.findByPk(req.query.fileid).then(file => {
        file = file.dataValues;
        if (file.user_id === req.userData.id){
            res.writeHead(200, {
                'Content-Type': file.content_type,
            });
            return res.end(file.data);    
        } else {
            return res.status(403).json({
                error: 'forbidden'
            })    
        }
    }).catch(err => {
        const respJson = { error: err.stack };
        return res.status(500).json(respJson);
    })
});

module.exports = router;