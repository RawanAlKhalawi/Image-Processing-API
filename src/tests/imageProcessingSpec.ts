import { imageProcessing } from './../utilities/utilities';
import * as path from 'path';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';

const fullImagesPath = path.resolve('images/full/fjord.jpg');
const resizeImagesPath = path.resolve('images/resize/fjord-700x500.jpg');

it('should save file with resizing the image', async () => {
	if (fs.existsSync(resizeImagesPath)) {
		fsPromises.unlink(resizeImagesPath);
	}
	const path = await imageProcessing(
		700,
		500,
		fullImagesPath,
		resizeImagesPath
	);
	expect(fs.existsSync(path)).toBeTrue();
});
