/* eslint-disable import/extensions */
// src/mocks/handlers.js
// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';


const getHandler = () =>
  rest.get('/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  });

const postHandler = () =>
  rest.post('/post', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        uid: '1700641901203',
        resourceType: 'STAGE',
        message: 'Successfully added a stage',
      })
    );
  });

const handlers = [getHandler(), postHandler()];

export default handlers;
