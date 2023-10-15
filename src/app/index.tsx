import { Box, MantineProvider } from '@mantine/core';

import Content from '~/content';

export const App = (): JSX.Element => (
  <MantineProvider withNormalizeCSS>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Content />
    </Box>
  </MantineProvider>
);
