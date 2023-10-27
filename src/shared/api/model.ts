import { createEffect } from 'effector';

import { request, type Responder } from './request';

export const uploadCoordinatesFx = createEffect<FormData, Responder<string>>(async (formData) =>
  request({
    path: 'coordinates',
    method: 'POST',
    body: formData,
    contentType: 'auto',
    responseType: 'stream',
  }),
);

export const getResultFx = createEffect<void, Responder<ArrayBuffer>>(async () =>
  request({ path: 'get_result', method: 'GET', responseType: 'arraybuffer' }),
);
