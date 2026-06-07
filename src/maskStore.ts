import {useSyncExternalStore} from 'react';


/**
 * 共用遮罩 (Shared Mask) 全域協調 store
 *
 * 問題背景：
 *   每一個 Modal（無論走 `createStateModal` 各自 portal，或 `createModal` 走 queue）
 *   若各自渲染一張半透明遮罩，多層疊起來時遮罩會一張張相加 —— 開越多層背景越黑、
 *   backdrop blur 也越疊越糊。而且「每層各自一張、再用旗標互搶顯示權」會在進退場
 *   動畫期間交棒，造成遮罩在不同層之間跳動、背景閃爍。
 *
 * 設計（單一全域遮罩）：
 *   遮罩不再由各層 Modal 自己畫。改用一個 module-level store 登記「目前有哪些需要
 *   遮罩的 Modal 正掛載著」（各帶一個遞增 token，token 越大代表越上層）。
 *   再由一個「唯一」的 <SharedMask> 元件訂閱這個 store，永遠只渲染一張遮罩，
 *   並把自己的 z-index 疊在「最上層那個 Modal」的正下方。
 *
 *   因為遮罩 DOM 自始至終只有一個、不隨層級增減而新增/移除 DOM，
 *   疊加或關閉時都不會有「遮罩在層間跳動」的閃爍。
 *
 * 為什麼用 store 而不是純 CSS：
 *   createStateModal 與 createModal 兩條路徑會把 Modal 放進「不同的 portal 容器」，
 *   CSS 沒有跨容器的「全文件最後一個符合者」選擇器，無法可靠判斷誰是最上層。
 *   module-level store + 遞增 token 不受 DOM 結構影響，跨路徑也 100% 準確。
 */

export interface IMaskEntry {
    /** 遞增 token，越大越上層 */
    token: number
    /** 點此遮罩時要執行的關閉行為（對應「點最上層遮罩關閉該層」） */
    onMaskClick?: () => void
}

export interface IMaskState {
    /** 目前是否該顯示遮罩（有任一需要遮罩的 Modal 掛載著） */
    visible: boolean
    /** 最上層 Modal 的 token（決定遮罩 z-index 疊在誰下面） */
    topToken: number | null
    /** 最上層 Modal 的點擊關閉行為 */
    topOnMaskClick?: () => void
}


/**
 * z-index 配置（單一來源，drawer 與 mask 共用，確保兩邊算法一致）
 *
 *   drawer(token) = Z_BASE + token * Z_STEP   （token 越大越上層）
 *   mask(top)     = drawer(top) - 1           （永遠卡在最上層 drawer 正下方）
 *
 * Z_STEP 取 2，是為了在「最上層 drawer」與「下一層 drawer」之間留出剛好一格
 * 給遮罩插入：top=token N → drawer=BASE+2N、mask=BASE+2N-1，
 * 下一層最多 token N-1 → drawer=BASE+2N-2 < mask < top。彼此不會打平。
 */
const Z_BASE = 900;
const Z_STEP = 2;

/** 某層 Modal 內容該用的 z-index（依其 token，登記後固定不變） */
export function getDrawerZIndex(token: number): number {
    return Z_BASE + token * Z_STEP;
}

/** 共用遮罩該用的 z-index（卡在最上層 drawer 正下方） */
export function getMaskZIndex(topToken: number): number {
    return getDrawerZIndex(topToken) - 1;
}


let seq = 0;
const entries = new Map<number, IMaskEntry>();
const listeners = new Set<() => void>();

/** 快取 snapshot，讓 getSnapshot 回傳穩定參考（useSyncExternalStore 要求） */
let snapshot: IMaskState = {visible: false, topToken: null, topOnMaskClick: undefined};


function recompute(): IMaskState {
    const top = Array.from(entries.values()).reduce<IMaskEntry | null>((acc, entry) => {
        if (acc === null || entry.token > acc.token) {
            return entry;
        }
        return acc;
    }, null);

    if (top === null) {
        return {visible: false, topToken: null, topOnMaskClick: undefined};
    }
    return {visible: true, topToken: top.token, topOnMaskClick: top.onMaskClick};
}


function emit() {
    const next = recompute();
    // 只有真的變動才更新 snapshot 參考 + 通知，避免無謂 re-render
    if (
        next.visible !== snapshot.visible ||
        next.topToken !== snapshot.topToken ||
        next.topOnMaskClick !== snapshot.topOnMaskClick
    ) {
        snapshot = next;
        listeners.forEach(listener => listener());
    }
}


/**
 * 登記一個「需要遮罩」的 Modal，回傳唯一遞增 token
 */
export function registerMask(onMaskClick?: () => void): number {
    seq += 1;
    const token = seq;
    entries.set(token, {token, onMaskClick});
    emit();
    return token;
}


/**
 * 更新某個已登記 Modal 的點擊關閉行為（hide reference 變動時）
 */
export function updateMask(token: number, onMaskClick?: () => void): void {
    const entry = entries.get(token);
    if (!entry) return;
    entry.onMaskClick = onMaskClick;
    // 若它正好是最上層，需要讓 SharedMask 取得新的 click handler
    if (snapshot.topToken === token) {
        emit();
    }
}


/**
 * 取消登記
 */
export function unregisterMask(token: number): void {
    entries.delete(token);
    // 全部關閉後把 seq 歸零，避免長時間反覆開關使 token（與 z-index）無止盡增長
    if (entries.size === 0) {
        seq = 0;
    }
    emit();
}


function subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}


function getSnapshot(): IMaskState {
    return snapshot;
}


const serverSnapshot: IMaskState = {visible: false, topToken: null, topOnMaskClick: undefined};


/**
 * 訂閱共用遮罩狀態
 * SSR 安全：server snapshot 固定回傳「不顯示」
 */
export function useMaskState(): IMaskState {
    return useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
}
