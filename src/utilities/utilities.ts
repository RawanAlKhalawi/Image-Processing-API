import sharp from 'sharp';
import * as fs from 'fs';

export const imageProcessing = async (
	width: number,
	height: number,
	fullImagesPath: string,
	resizeImagesPath: string
): Promise<string> => {
	if (!fs.existsSync(resizeImagesPath)) {
		await sharp(fullImagesPath)
			.resize({
				width: width,
				height: height,
			})
			.toFile(resizeImagesPath, function (err, sharp) {
				if (err) {
					return '500';
				}
				console.log(sharp);
			});
	}
	await new Promise((f) => setTimeout(f, 500));
	return resizeImagesPath;
};
