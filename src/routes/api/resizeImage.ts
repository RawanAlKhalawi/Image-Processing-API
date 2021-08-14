import { Router, Request, Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { imageProcessing } from '../../utilities/utilities';

const resizeImage = Router();

resizeImage.get('/', async (req: Request, res: Response): Promise<void> => {
	const width = Number(req.query.width);
	const height = Number(req.query.height);
	const imageName = req.query.imageName;

	if (!req.query.width || !req.query.height || !imageName) {
		res.status(400).json({
			message:
				'Missing parameters, Please check if you added the width, height and imageName',
		});
		return;
	}

	if (width < 1 || height < 1 || isNaN(width) || isNaN(height)) {
		res
			.status(400)
			.json({ message: 'width and height must be positive numbers' });
		return;
	}

	const fullImagesPath = path.resolve(`images/full/${imageName}.jpg`);
	const resizeImagesPath = path.resolve(
		`images/resize/${imageName}-${width}x${height}.jpg`
	);

	if (!fs.existsSync(fullImagesPath)) {
		res.status(400).json({ message: 'This image does not exist' });
		return;
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
