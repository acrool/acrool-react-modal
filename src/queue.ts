import {push,removeFind} from 'bear-jsutils/array';



/**
 * 控制顯示佇列
 */
export class Queue {
    _queueList: string[] = [];
    get current() {
        if(this._queueList.length === 0){
            return undefined;
        }
        return this._queueList[this._queueList.length - 1];
    }
    get length(){
        return this._queueList.length;
    }
    add = (key: string) => {
        this._queueList = push(this._queueList, key);
    };
    remove = (key: string)  => {
        this._queueList = removeFind(this._queueList, currKey => currKey === key);
    };
}

