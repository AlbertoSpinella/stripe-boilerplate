import app from '../app.js';
import { fake } from '../libs/test/fakeHTTP.js';
import { matchers } from 'jest-json-schema';
expect.extend(matchers);

import { getIndexOpts, postIndexOpts } from '../routes/stripe/schema';

const { GET, POST } = fake(app);

beforeAll(() => {});

afterAll( async () => {
    await app.close();
});

test('GET /index', async () => {
    const response = await GET('/index', {});
    const parsedBody = JSON.parse(response.body);
    expect(parsedBody).toMatchSchema(getIndexOpts.schema?.response[200]);
    expect(response.statusCode).toBe(200);
});

test('POST /index', async () => {
    const body = {
        name: "Alberto"
    };
    expect(body).toMatchSchema(postIndexOpts.schema.body);
    const response = await POST('/index', {body});
    const parsedBody = JSON.parse(response.body);
    expect(parsedBody).toMatchSchema(postIndexOpts.schema?.response[200]);
    expect(response.statusCode).toBe(200);
});