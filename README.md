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



## Requirement

### 單一頁面使用光箱

```tsx

// 製作

const EditTaskModal = () => {
    const modal = useModal();
    
    return <div>
        This is Modal Content
        <button type="button" onClick={modal.hidden}>Cancel</button>
    </div>
}

// 使用
import {useCreateModal} from "./Modal";
const TaskList = () => {
    const modal = useCreateModal(EditTaskModal);

    const handleShow = (id: string) => {
        modal.show({id});
    }
    
    return <div>
        <button onClick={() => handleShow(1)}>Show</button>

        <modal.Component/>;
    </div>;
}
```


### 需要跨區呼叫的光箱

```tsx


// 製作
const EditTaskModal = () => {
    const modal = useModal();

    return <div>
        This is Modal Content
        <button type="button" onClick={modal.hidden}>Cancel</button>
    </div>
}

// 使用
import {useCreateModal} from "./Modal";
const PageParent = () => {
    const WithEditTaskModal = useCreateModal(EditTaskModal);
    
    return <div>
        <PageChild/>

        
        <WithEditTaskModal.Component/>;
    </div>;
}

const PageChild = () => {
    const WithEditTaskModal = useCreateModal(EditTaskModal);

    const handleShow = (id: string) => {
        WithEditTaskModal.show({id});
    }
    
    return <div>
        <button onClick={() => WithEditTaskModal.show(args)}>Show</button>

        <WithEditTaskModal.Component/>;
    </div>;
}
```



## Features

- Supports queue modal list
- Plug and unplug using `@acrool/react-portal` and `framer-motion`

## Install

```bash
yarn add @acrool/react-modal
```

## Usage

add in your index.tsx
```tst
import "@acrool/react-modal/dist/index.css";
```

add in your App.tsx

```tsx
import {ModalPortal} from "@acrool/react-modal";

const App = () => {
    return (
        <div>
            <BaseUsed/>
            <ModalPortal
                isVisibleQueueKey={false}
                renderLoader={<Loader/>}
                defaultMessage="Loading..."
            />
        </div>
    );
};
```

then in your page

```tsx
import {modal} from '@acrool/react-modal';
import {useEffect} from "react";

const Example = () => {

    useEffect(() => {
        modal.show();
        
        setTimeout(() => {
            modal.hidden();
        }, 3000)
    }, []);

    return (
        <div>
            sample page
        </div>
    );
};
```

- modal.show
- modal.hidden
- toast.hiddenAll


There is also a example that you can play with it:

[![Play react-editext-example](https://raw.githubusercontent.com/acrool/acrool-react-modal/main/play-in-example-button.svg)](https://acrool-react-modal.pages.dev)


## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)
