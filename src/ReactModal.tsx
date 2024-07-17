import React from 'react';
import ReactDOM from 'react-dom';

const getCreatePortal = () => ReactDOM.createPortal;

type TSelector = () => HTMLElement

function getParentElement(parentSelector: TSelector): HTMLElement {
    return parentSelector();
}

interface IProps{
    id: string
    className?: string
    children: React.ReactNode
    parentSelector: TSelector
}

interface IState {}

/**
 * 將內容傳送到外部Body內的方法
 */
class ReactModal extends React.Component<IProps, IState> {
    _el: HTMLElement;

    static defaultProps = {
        isOpen: false,
        parentSelector: () => document.getElementById('root'),
    };


    constructor(props: IProps) {
        super(props);
        const el = document.createElement('div');
        el.dataset.id = props.id;
        if(props.className){
            el.className = props.className;
        }
        this._el = el;
    }

    componentDidMount() {
        const parent = getParentElement(this.props.parentSelector);
        if(parent){
            parent.appendChild(this._el);
        }
    }

    componentWillUnmount() {
        const parent = getParentElement(this.props.parentSelector);
        if(parent){
            parent.removeChild(this._el);
        }
    }


    renderPortal = (): React.ReactPortal => {
        const createPortal = getCreatePortal();
        return createPortal(
            this.props.children,
            this._el,
        );
    };


    render() {
        return this.renderPortal();
    }

}

export default ReactModal;
