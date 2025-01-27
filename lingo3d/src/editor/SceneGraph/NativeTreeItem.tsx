import { useEffect, useMemo, useState } from "preact/hooks"
import { Bone, Object3D } from "three"
import { makeTreeItemCallbacks, TreeItemProps } from "./TreeItem"
import { useSelectionNativeTarget } from "../states"
import ComponentIcon from "./icons/ComponentIcon"
import BaseTreeItem from "../component/treeItems/BaseTreeItem"
import BoneIcon from "./icons/BoneIcon"
import { useSceneGraphExpanded } from "../states/useSceneGraphExpanded"

type NativeTreeItemProps = TreeItemProps & {
    object3d: Object3D | Bone
}

const NativeTreeItem = ({ appendable, object3d }: NativeTreeItemProps) => {
    const [expanded, setExpanded] = useState(false)
    const [nativeTarget] = useSelectionNativeTarget()

    const handleClick = useMemo(
        () => makeTreeItemCallbacks(object3d, appendable),
        []
    )

    const [sceneGraphExpanded, setSceneGraphExpanded] = useSceneGraphExpanded()
    useEffect(() => {
        sceneGraphExpanded?.has(object3d) && setExpanded(true)
    }, [sceneGraphExpanded])

    const selected = nativeTarget === object3d

    const IconComponent = useMemo(() => {
        if ("isBone" in object3d) return BoneIcon
        return ComponentIcon
    }, [object3d])

    return (
        <BaseTreeItem
            label={object3d.name}
            selected={selected}
            onCollapse={() => setSceneGraphExpanded(undefined)}
            onClick={() => handleClick()}
            onContextMenu={() => handleClick(true)}
            expanded={expanded}
            expandable={!!object3d.children.length}
            outlined
            IconComponent={IconComponent}
        >
            {() =>
                object3d.children.map((child) => (
                    <NativeTreeItem
                        key={child.uuid}
                        object3d={child}
                        appendable={appendable}
                    />
                ))
            }
        </BaseTreeItem>
    )
}

export default NativeTreeItem
