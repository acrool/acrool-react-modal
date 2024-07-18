import React from 'react';
import ReactDOM from 'react-dom';

import {rootId} from './config';

const getCreatePortal = () => ReactDOM.createPortal;

type TSelector = () => HTMLElement


interface IProps{
    className?: string
    children: React.ReactNode
    parentSelector: TSelector
}

interface IState {
    isMount: boolean
}

/**
 * 將內容傳送到外部Body內的方法
 */
class ReactPortal extends React.Component<IProps, IState> {
    _el: HTMLElement;
    state: IState = {
        isMount: false,
    };

    static defaultProps = {
        parentSelector: () => document.getElementById('root'),
    };


    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        this.setState({isMount: true});
        // const parent = getParentElement(this.props.parentSelector);
        // if(parent){
        //     parent.appendChild(this._el);
        // }
    }

    componentWillUnmount() {
        // const parent = getParentElement(this.props.parentSelector);
        // if(parent){
        //     parent.removeChild(this._el);
        // }
    }



    renderPortal = (): React.ReactPortal => {
        const createPortal = getCreatePortal();

        if(this.state.isMount){
            return createPortal(
                this.props.children,
                document.getElementById(rootId),
            );
        }
    };


    render() {
        return this.renderPortal();
    }

}

export default ReactPortal;
