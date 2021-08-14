import { imageProcessing } from './../utilities/utilities';
import * as path from 'path';
import * as fs from 'fs';

const fullImagesPath = path.resolve('images/full/fjord.jpg');
const resizeImagesPath = path.resolve('images/resize/fjord.jpg');

it('should save file with resizing the image', async () => {
	const path = await imageProcessing(
		700,
		500,
		fullImagesPath,
		resizeImagesPath
	);
	expect(fs.existsSync(path)).toBeTrue();
});
