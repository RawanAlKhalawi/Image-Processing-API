import express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { imageProcessing } from '../../utilities/utilities';

const resizeImage = express.Router();

resizeImage.get('/', async (req, res) => {
	const width = Number(req.query.width);
	const height = Number(req.query.height);
	const imageName = req.query.imageName;

	if (!req.query.width || !req.query.height || !imageName) {
		return String(
			res.status(400).json({
				message:
					'Missing parameters, Please check if you added the width, height and imageName',
			})
		);
	}

	if (width < 0 || height < 0 || isNaN(width) || isNaN(height)) {
		return String(
			res
				.status(400)
				.json({ message: 'width and height must be positive numbers' })
		);
	}

	const fullImagesPath = path.resolve(`images/full/${imageName}.jpg`);
	const resizeImagesPath = path.resolve(`images/resize/${imageName}.jpg`);

	if (!fs.existsSync(fullImagesPath)) {
		return String(
			res.status(400).json({ message: 'This image does not exist' })
		);
	}

	if (!fs.existsSync('images/resize')) {
		fs.mkdirSync('images/resize');
	}
	const imageProcessingResult: string = await imageProcessing(
		width,
		height,
		fullImagesPath,
		resizeImagesPath
	);

	res.sendFile(imageProcessingResult);
});

export default resizeImage;
