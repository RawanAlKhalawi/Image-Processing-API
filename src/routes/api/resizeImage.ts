import express from 'express';
import * as path from 'path';
import sharp from 'sharp';
import * as fs from 'fs';

const resizeImage = express.Router();

resizeImage.get('/', async (req, res) => {

    const width = Number(req.query.width);
    const height = Number(req.query.height);
    const imageName = req.query.imageName;

    if (!req.query.width || !req.query.height || !imageName) {
        return res.status(400)
            .json({ message: 'Missing parameters, Please check if you added the width, height and imageName' })
    }

    if (width < 0 || height < 0 || isNaN(width) || isNaN(height)) {
        return res.status(400)
            .json({ message: 'width and height must be positive numbers' })
    }

    const fullImagesPath = path.resolve(`images/full/${imageName}.jpg`);
    const resizeImagesPath = path.resolve(`images/resize/${imageName}.jpg`);

    if (!fs.existsSync(fullImagesPath)) {
        return res.status(400)
            .json({ message: 'This image does not exist' })
    }

    if (!fs.existsSync('images/resize')) {
        fs.mkdirSync('images/resize');
    }
    const data = await sharp(fullImagesPath)
        .resize({
            width: width,
            height: height,
        }).toFile(resizeImagesPath, function (err, sharp) {
            if (err) {
                res.sendStatus(500);
                return;
            }
            console.log(sharp);
            res.sendFile(resizeImagesPath);
        });

});

export default resizeImage;