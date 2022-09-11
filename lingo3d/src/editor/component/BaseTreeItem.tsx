import { createContext, h } from "preact"
import { useState, useRef, useMemo, useContext } from "preact/hooks"
import { preventTreeShake } from "@lincode/utils"
import CollapseIcon from "../SceneGraph/icons/CollapseIcon"
import ExpandIcon from "../SceneGraph/icons/ExpandIcon"
import CubeIcon from "../SceneGraph/icons/CubeIcon"
import { forwardRef } from "preact/compat"
import { useEffect } from "react"

preventTreeShake(h)

export const TreeItemContext = createContext<{ draggingItem?: any }>({})

export type BaseTreeItemProps = {
    label?: string
    selected?: boolean
    children?: () => any
    onCollapse?: () => void
    onExpand?: () => void
    onDragStart?: (e: DragEvent) => void
    onDragEnd?: (e: DragEvent) => void
    onDragOver?: (e: DragEvent) => void
    onDragEnter?: (e: DragEvent) => void
    onDragLeave?: (e: DragEvent) => void
    onDrop?: (e: DragEvent) => void
    dragOver?: boolean
    draggable?: boolean
    expanded?: boolean
    expandable?: boolean
}

const BaseTreeItem = forwardRef<HTMLDivElement, BaseTreeItemProps>(
    (
        {
            label,
            children,
            selected,
            onCollapse,
            onExpand,
            onDragStart,
            onDragEnd,
            onDragOver,
            onDragEnter,
            onDragLeave,
            onDrop,
            dragOver,
            draggable,
            expanded: expandedProp,
            expandable
        },
        ref
    ) => {
        const expandIconStyle = {
            opacity: expandable ? 0.5 : 0.05,
            cursor: "pointer"
        }

        const [expanded, setExpanded] = useState(!!expandedProp)
        useEffect(() => {
            setExpanded(!!expandedProp)
        }, [expandedProp])

        const startRef = useRef<HTMLDivElement>(null)
        const endRef = useRef<HTMLDivElement>(null)

        const highlightWidth = useMemo(() => {
            if (!selected || !startRef.current || !endRef.current) return

            const boundsStart = startRef.current.getBoundingClientRect()
            const boundsEnd = endRef.current.getBoundingClientRect()
            return boundsEnd.right - boundsStart.left + 4
        }, [selected, expanded])

        const collapse = () => {
            setExpanded(false)
            onCollapse?.()
        }
        const expand = () => {
            setExpanded(true)
            onExpand?.()
        }

        const handleDoubleClick = (e: MouseEvent) => {
            e.stopPropagation()
            expanded ? collapse() : expand()
        }

        const context = useContext(TreeItemContext)

        return (
            <div
                ref={ref}
                onClick={(e) => e.stopPropagation()}
                onDblClick={handleDoubleClick}
                draggable={draggable}
                onDragStart={(e) => {
                    e.stopPropagation()
                    onDragStart?.(e)
                }}
                onDragEnd={(e) => {
                    e.stopPropagation()
                    onDragEnd?.(e)
                }}
                onDragOver={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    onDragOver?.(e)
                }}
                onDragEnter={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    onDragEnter?.(e)
                }}
                onDragLeave={(e) => {
                    e.stopPropagation()
                    onDragLeave?.(e)
                }}
                onDrop={(e) => {
                    e.stopPropagation()
                    onDrop?.(e)
                }}
                style={{
                    color: "rgba(255, 255, 255, 0.75)",
                    marginLeft: 8,
                    borderLeft: "1px solid rgba(255, 255, 255, 0.05)",
                    background: dragOver ? "rgba(255, 255, 255, 0.5)" : "none"
                }}
            >
                <div
                    ref={startRef}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: selected
                            ? "rgba(255, 255, 255, 0.1)"
                            : undefined,
                        width: highlightWidth,
                        minWidth: "100%",
                        cursor: "default"
                    }}
                >
                    {expanded ? (
                        <CollapseIcon
                            style={expandIconStyle}
                            onClick={collapse}
                        />
                    ) : (
                        <ExpandIcon style={expandIconStyle} onClick={expand} />
                    )}
                    <CubeIcon />
                    <div ref={endRef}>{label}</div>
                </div>
                {expanded &&
                    (typeof children === "function" ? children() : children)}
            </div>
        )
    }
)

export default BaseTreeItem
