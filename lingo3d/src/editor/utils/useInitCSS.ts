import { useLayoutEffect } from "preact/hooks"
import { emitEditorLayout } from "../../events/onEditorLayout"
import createElement from "../../utils/createElement"

let initialized = false

const initCSS = () => {
    if (initialized) return
    initialized = true

    const style = createElement(`
        <style>
            .lingo3d-ui * {
                overscroll-behavior: none;
                user-select: none;
                -webkit-user-select: none;
                position: relative;
                box-sizing: border-box;
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
                scrollbar-width: thin;
                scrollbar-color: rgba(100,100,100,0.1);
            }
            .lingo3d-ui {
                overscroll-behavior: none;
                position: relative;
                box-sizing: border-box;
                overflow: hidden;
                float: left;
                color: white;
                font-size: 11px;
                max-height: 100%;
            }
            .lingo3d-ui *::-webkit-scrollbar {
                width: 4px;
                height: 4px;
            }
            .lingo3d-ui *::-webkit-scrollbar-thumb {
                background: rgba(100,100,100,0.7);
            }
            .lingo3d-ui *::-webkit-scrollbar-track {
                background: rgba(100,100,100,0.1);
            }
            .lingo3d-ui *::-webkit-scrollbar-corner {
                background: rgba(100,100,100,0.1);
            }
            .lingo3d-bg {
                background: rgb(40, 41, 46);
            }
            .tp-lblv_l {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .tp-rotv {
                box-shadow: none !important;
                background-color: transparent !important;
            }
            .tp-brkv {
                border-left: none !important;
            }
            .tp-fldv_b {
                border-radius: 0px !important;
            }
        </style>
    `)
    document.head.appendChild(style)
}

export default (editorLayout: boolean) => {
    useLayoutEffect(() => {
        initCSS()
        if (!editorLayout) return
        emitEditorLayout()
        return () => {
            emitEditorLayout()
        }
    }, [])
}