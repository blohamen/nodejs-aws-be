import {catalogBatchProcess} from "./index";

const mockPublish = jest.fn().mockImplementation((params, callback) => {
    callback(null, {response: 'test'});
});
jest.mock('aws-sdk', () => ({
    SNS: jest.fn().mockImplementation(() => {
        return {
            publish: mockPublish,
        }
    })
}));

jest.mock('../../loaders', () => ({
    initDB: () => ({
        transaction: () => ({
            commit: () => {},
        }),

    })
}))

jest.mock('../../models/Product', () => ({

}));

jest.mock('../../models/Stock', () => ({

}));

jest.mock('../../models', () => ({
    Product: {
        create: () => ({id: 'mockId'}),
    },
    Stock: {
        create: () => ({id: 'mockId'}),
    }
}));

const mockEvent = {
    Records: [
        {
            body: JSON.stringify({title: 'test1', description: 'test', price: 1, count: 2}),
        }
    ]
}

describe('catalogBatchProcess', () => {
    it('Should process new records', async () => {
        await catalogBatchProcess(mockEvent);
        expect(mockPublish).toBeCalledTimes(1);
    });
})
