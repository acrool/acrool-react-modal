import type { Preview } from "@storybook/react";
import './reset.css';
import '@acrool/react-modal/dist/index.css';
import { themes } from '@storybook/theming';

import '@acrool/react-grid/dist/index.css';
import {GridThemeProvider} from "@acrool/react-grid";
import {ModalProvider} from "@acrool/react-modal";


const preview: Preview = {
  parameters: {
      darkMode: {
          dark: { ...themes.dark, appPreviewBg: '#000' },
          light: { ...themes.dark, appPreviewBg: '#fff' }
      },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
      (Story) => (
          <GridThemeProvider>
            <ModalProvider>
                <Story />
            </ModalProvider>
          </GridThemeProvider>
      ),
  ],
};

export default preview;
