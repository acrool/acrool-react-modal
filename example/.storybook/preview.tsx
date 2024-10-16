import type { Preview } from "@storybook/react";
import '@acrool/react-modal/dist/index.css';
import '@acrool/react-grid/dist/index.css';
import '@acrool/react-table/dist/index.css';
import '@acrool/react-table/dist/themes/game.css';
import {GridThemeProvider} from "@acrool/react-grid";
import React, {createElement} from "react";
import {ModalPortal} from '@acrool/react-modal';


const preview: Preview = {
  parameters: {
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
            <Story />


              <ModalPortal
              />


          </GridThemeProvider>
      ),
  ],
};

export default preview;
