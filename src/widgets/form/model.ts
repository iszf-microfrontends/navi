import { attach, createEffect, createEvent, createStore, merge, sample } from 'effector';
import { every, status, reset } from 'patronum';

import { api } from '~/shared/api';
import { errorNotified, type NotifyOptions, readFileAsArrayBufferFx, type ReadFileAsArrayBufferResult } from '~/shared/lib';

const calculateFx = attach({ effect: api.calculateCoordinatesFx });

const readFilesFx = createEffect<{ obsFile: File; navFile: File }, [ReadFileAsArrayBufferResult, ReadFileAsArrayBufferResult]>(
  async ({ obsFile, navFile }) => {
    const obs = await readFileAsArrayBufferFx(obsFile);
    const nav = await readFileAsArrayBufferFx(navFile);
    return [obs, nav];
  },
);

export const mounted = createEvent();

export const obsFileChanged = createEvent<File>();
export const navFileChanged = createEvent<File>();

export const formSubmitted = createEvent();
const formChanged = merge([obsFileChanged, navFileChanged]);

export const $obsFile = createStore<File | null>(null);
export const $obsFileError = createStore<string | null>(null);

export const $navFile = createStore<File | null>(null);
export const $navFileError = createStore<string | null>(null);

export const $result = createStore<string | null>(null);

const $calculateStatus = status({ effect: calculateFx });
export const $calculationDone = $calculateStatus.map((status) => status === 'done');
export const $calculating = calculateFx.pending;

const $formValid = every({ stores: [$obsFileError, $navFileError], predicate: null });

reset({
  clock: mounted,
  target: [$obsFile, $obsFileError, $navFile, $navFileError, $calculateStatus, $result],
});

reset({
  clock: formChanged,
  target: [$calculateStatus],
});

$obsFile.on(obsFileChanged, (_, file) => file);
$obsFileError.on(obsFileChanged, () => null);

$navFile.on(navFileChanged, (_, file) => file);
$navFileError.on(navFileChanged, () => null);

$result.on(calculateFx.doneData, (_, responder) => responder.data);

sample({
  clock: formSubmitted,
  source: $obsFile,
  fn: (file) => (file ? null : 'Obs файл обязательный'),
  target: $obsFileError,
});

sample({
  clock: formSubmitted,
  source: $navFile,
  fn: (file) => (file ? null : 'Nav файл обязательный'),
  target: $navFileError,
});

sample({
  clock: formSubmitted,
  source: { obsFile: $obsFile, navFile: $navFile },
  filter: $formValid,
  fn: (params) => params as { obsFile: File; navFile: File },
  target: readFilesFx,
});

sample({
  clock: readFilesFx.doneData,
  fn: ([obs, nav]) => {
    const obsBlob = new Blob([new Uint8Array(obs.arrayBuffer)], { type: 'application/octet-stream' });
    const navBlob = new Blob([new Uint8Array(nav.arrayBuffer)], { type: 'application/octet-stream' });
    const formData = new FormData();

    formData.append('obsfile', obsBlob, obs.file.name);
    formData.append('navfile', navBlob, nav.file.name);

    return formData;
  },
  target: calculateFx,
});

sample({
  clock: calculateFx.fail,
  fn: (): NotifyOptions => ({
    title: 'Ошибка!',
    message: 'Произошла ошибка при расчете координат',
  }),
  target: errorNotified,
});

if (__DEV__) {
  $obsFile.watch((value) => {
    console.log(`obsFile ${value?.name}`);
  });

  $obsFileError.watch((value) => {
    console.log(`obsFileError ${value}`);
  });

  $navFile.watch((value) => {
    console.log(`navFile ${value?.name}`);
  });

  $navFileError.watch((value) => {
    console.log(`navFileError ${value}`);
  });

  calculateFx.doneData.watch((payload) => {
    console.log(`calculateFx doneData ${JSON.stringify(payload)}`);
  });
}
