# Acrool React Modal

<a href="https://acrool-react-modal.pages.dev/" title="Acrool React Modal - This is a modal function for React development loading modal">
    <img src="https://raw.githubusercontent.com/acrool/acrool-react-modal/main/example/public/og.webp" alt="Acrool React Modal Logo"/>
</a>

<p align="center">
    This is a toast message function for React development notifications
</p>

<div align="center">

[![NPM](https://img.shields.io/npm/v/@acrool/react-modal.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-modal)
[![npm](https://img.shields.io/bundlejs/size/@acrool/react-modal?style=for-the-badge)](https://github.com/acrool/@acrool/react-modal/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/l/@acrool/react-modal?style=for-the-badge)](https://github.com/acrool/react-modal/blob/main/LICENSE)

[![npm downloads](https://img.shields.io/npm/dm/@acrool/react-modal.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-modal)
[![npm](https://img.shields.io/npm/dt/@acrool/react-modal.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-modal)

</div>


`^1.1.0 support react >=19.0.0 <20.0.0, framer-motion@12`


## Features

- Supports queue modal list
- Plug and unplug using `@acrool/react-portal` and `framer-motion`
- Quickly create light box effects and send them to the outside to avoid hierarchical problems
- Support [@acrool/react-router-hash](https://github.com/acrool/acrool-react-router-hash) lightbox (using createControlledModal)
- Modal open auto add `acrool_model-open` body overflow style class
- export BodyScroll utils (state control)

## Install

```bash
yarn add @acrool/react-modal framer-motion@12
```

in your packages. (Make the version of styled-component you use match the version of styled-component used in acrool-react-gird)


## Usage

add in your index.tsx
```tst
import "@acrool/react-modal/dist/index.css";
```

add in your App.tsx

> It should be noted that it must be within the scope of `Router Provider`. Another way is to place it in `Layout` and `Outlet` middle layer.


```tsx
import {ModalPortal} from "@acrool/react-modal";

const App = () => {
    return (
        <div>
            <BaseUsed/>
            <ModalPortal/>
        </div>
    );
};
```

- Here are two ways to use it
  - [A. Custom modal component](#a-custom-modal-component)
  - [B. Custom state modal component](#b-custom-state-modal-component)


## A. Custom modal component

Add the lightbox to the display column list by throwing the Show method

***Defined Modal***

```tsx
import {animation, createModal, IModalOptions, useModal} from '@acrool/react-modal';

interface IProps {
    myVar: string
}

const PromotionModal = (args: IProps) => {
    const {hide} = useModal();

    return <div>
        <div>Test2 content</div>
        <button type="button" onClick={hide}>X </button>
    </div>;
}

export default createModal(
    PromotionModal,
    animation.generateFadeInFromTop(),
);
```

***Use Modal***

then in your page

```tsx
const ExamplePage = () => {
    return <div>
        <button type="button" onClick={() => PromotionModal.show({myVar: 'Imageine'})}>Show Modal</button>
    </div>
}
```









## B. Custom state modal component

The inside of the light box is controlled by its own state, which is displayed through rendering, such as using HashRouter.

***Defined Modal***

```tsx
import {animation, createStateModal, IModalOptions, useModal} from '@acrool/react-modal';
import {useHashParams} from '@acrool/react-router-hash';


const PromotionHashModal = () => {
      const {hide} = useModal();
      const navigate = useNavigate();
      const {id} = useHashParams<{id: string}>();

      useEffect(() => {
        return () => {
          navigate({...location, hash: undefined});
        };
      }, []);

      const handleOnHide = () => {
        hide();
      };
      
      // const handleOnClose = () => {
      //     hide().then(() => {
      //         navigate({hash: undefined});
      //     })
      // }

  return <div>
          <div>Test2 content</div>
          <button type="button" onClick={handleOnClose}>Close Modal</button>
      </div>;
}

export default createStateModal(
    PromotionHashModal,
    {
      ...animation.generateFadeInFromTop(),
      isHideWithMaskClick: true,
    },
);
```


***Defined Hash Route***

> It should be noted that it must be within the scope of `Router Provider`. Another way is to place it in `Layout` and `Outlet` middle layer.

```tsx
import {HashRoute,HashRoutes} from '@acrool/react-router-hash';
import {createBrowserHistory} from 'history';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';

const history = createBrowserHistory({window});

const RouterSetting = () => {
    return <Router>

        <Routes>
            <Route path="/" element={<Example/>} />
        </Routes>

        <HashRoutes>
            <HashRoute path="promotion/:id" element={<PromotionHashModal/>}/>
        </HashRoutes>

        {/* Add this */}
        <ModalPortal/>

    </Router>;
};
```



***Use Modal***

then in your page

```tsx
import {useNavigate} from 'react-router-dom';

const ExamplePage = () => {
    const navigate = useNavigate();
    return <div>
        <button type="button" onClick={() => navigate({hash: '/promotion/1'})}>Show Modal</button>
        <button type="button" onClick={() => navigate({hash: '/promotion/2'})}>Show Modal</button>
    </div>
}
```



- [animation](src/animation.ts)
  - fadeInDown: (default), ex Base modal style
  - zoomInDown
  - slideInLeft: ex Drawer slider
  - slideInRight: ex Drawer slider
  - slideInUp: ex Dropdown
  - custom (ref; https://www.framer.com/motion/animate-presence/#usage)
   ```tsx
  variants = {
     initial: {opacity: 0, y: -20, transition: {type:'spring'}},
     animate: {opacity: 1, y: 0},
     exit: {opacity: 0, y: -40}
  }
  ```


There is also a example that you can play with it:

[![Play react-editext-example](https://raw.githubusercontent.com/acrool/acrool-react-modal/main/play-in-example-button.svg)](https://acrool-react-modal.pages.dev)


## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)


## Refer to

- [https://github.com/ebay/nice-modal-react](https://github.com/ebay/nice-modal-react)
- [https://animate.style](https://animate.style)
