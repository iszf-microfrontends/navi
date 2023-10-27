import { FileInput, Icon, Button } from '@iszf-microfrontends/shared-ui';
import { Box, Stack } from '@mantine/core';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import {
  $calculationDone,
  $calculating,
  $navFile,
  $navFileError,
  $obsFile,
  $obsFileError,
  $result,
  formSubmitted,
  mounted,
  navFileChanged,
  obsFileChanged,
} from './model';

const ObsFileInput = (): JSX.Element => {
  const [obsFile, obsFileError] = useUnit([$obsFile, $obsFileError]);

  return (
    <FileInput
      required
      label="Файл obs"
      placeholder="Загрузить файл"
      icon={<Icon type="upload" />}
      accept=".17o"
      error={obsFileError}
      value={obsFile}
      onChange={(value) => {
        if (value) {
          obsFileChanged(value);
        }
      }}
    />
  );
};

const NavFileInput = (): JSX.Element => {
  const [navFile, navFileError] = useUnit([$navFile, $navFileError]);

  return (
    <FileInput
      required
      label="Файл nav"
      placeholder="Загрузить файл"
      icon={<Icon type="upload" />}
      accept=".17n"
      value={navFile}
      error={navFileError}
      onChange={(value) => {
        if (value) {
          navFileChanged(value);
        }
      }}
    />
  );
};

export const Form = (): JSX.Element => {
  const [result, calculationDone, calculating] = useUnit([$result, $calculationDone, $calculating]);

  useEffect(() => {
    mounted();
  }, []);

  return (
    <Box
      maw={420}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        formSubmitted();
      }}
    >
      <Stack>
        <Stack>
          <ObsFileInput />
          <NavFileInput />
        </Stack>
        <div>
          <Button type="submit" disabled={calculationDone} loading={calculating} tooltip="Для расчета необходимо изменить входные данные">
            Рассчитать координаты
          </Button>
        </div>
        {calculationDone && <div>{result}</div>}
      </Stack>
    </Box>
  );
};
