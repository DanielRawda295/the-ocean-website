declare module 'page-flip' {
  export type PageFlipState = 'user_fold' | 'fold_corner' | 'flipping' | 'read'
  export interface PageFlipEvent<T> { data: T; object: PageFlip }
  export interface PageFlipSettings {
    width: number; height: number; size?: 'fixed' | 'stretch'; minWidth?: number; maxWidth?: number; minHeight?: number; maxHeight?: number;
    drawShadow?: boolean; flippingTime?: number; usePortrait?: boolean; startZIndex?: number; autoSize?: boolean; maxShadowOpacity?: number;
    showCover?: boolean; mobileScrollSupport?: boolean; swipeDistance?: number; clickEventForward?: boolean; useMouseEvents?: boolean; disableFlipByClick?: boolean;
  }
  export class PageFlip {
    constructor(element: HTMLElement, settings: PageFlipSettings)
    on(event: 'flip', callback: (event: PageFlipEvent<number>) => void): this
    on(event: 'changeState', callback: (event: PageFlipEvent<PageFlipState>) => void): this
    on(event: 'init', callback: (event: PageFlipEvent<{ page: number; mode: 'portrait' | 'landscape' }>) => void): this
    loadFromHTML(items: HTMLElement[]): void
    flipNext(corner?: 'top' | 'bottom'): void
    flipPrev(corner?: 'top' | 'bottom'): void
    turnToNextPage(): void
    turnToPrevPage(): void
    getCurrentPageIndex(): number
    getPageCount(): number
    getState(): PageFlipState
    destroy(): void
  }
}
