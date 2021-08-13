import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
    it('should be successful and added the image in the resize folder', async (done) => {
        const response = await request.get('/resize-image?width=500&height=200&imageName=santamonica');
        expect(response.status).toBe(200);
        done();
    }
    );

    it('should return 400 for missing parameter', async (done) => {
        const response = await request.get('/resize-image?width=500&imageName=santamonica');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Missing parameters, Please check if you added the width, height and imageName')
        done();
    }
    );

    it('should return 400 for image does not exist', async (done) => {
        const response = await request.get('/resize-image?width=500&height=200&imageName=rawan');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('This image does not exist')
        done();
    }
    );
});
