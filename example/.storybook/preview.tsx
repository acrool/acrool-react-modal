import type { Preview } from "@storybook/react";
// import './reset.css';
import '@acrool/react-modal/dist/index.css';
import '@acrool/react-grid/dist/index.css';
import {GridThemeProvider} from "@acrool/react-grid";
import {ModalPortal} from "@acrool/react-modal";
import React from "react";


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
