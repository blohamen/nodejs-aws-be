import * as AWSMock from 'aws-sdk-mock';
import {importProductsFile} from "./index";

const mockedEvent = {
    queryStringParameters: {
        name: 'testName',
    }
};

const mockUrl = 'http://mockUrl';

describe('importProductsFile', () => {
    it('Should return mock string', async () => {
        AWSMock.mock('S3', 'getSignedUrl', (action, _params, callback) => {
            callback(null, mockUrl);
        });
        const res = await importProductsFile(mockedEvent);
        expect(res.body).toBe(JSON.stringify(mockUrl));
    });
    it('Should dont process without filename', async () => {
        const res = await importProductsFile({});
        expect(res.statusCode).toBe(400);
    })
});
