import { createEffect } from 'effector';

import { request, type Responder } from './request';

export const calculateCoordinatesFx = createEffect<FormData, Responder<string>>(async (formData) =>
  request({
    path: 'coordinates',
    method: 'POST',
    body: formData,
    contentType: 'auto',
    responseType: 'stream',
  }),
);
