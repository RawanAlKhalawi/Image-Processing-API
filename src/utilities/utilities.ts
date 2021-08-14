import sharp from 'sharp';

export const imageProcessing = async (
	width: number,
	height: number,
	fullImagesPath: string,
	resizeImagesPath: string
): Promise<string> => {
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

	await new Promise((f) => setTimeout(f, 500));
	return resizeImagesPath;
};
