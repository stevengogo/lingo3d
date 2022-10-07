import { forceGet } from "@lincode/utils"
import { MeshStandardMaterial, Object3D } from "three"
import { appendableRoot } from "../../api/core/Appendable"
import BasicMaterialManager from "./BasicMaterialManager"
import StandardMaterialManager from "./StandardMaterialManager"

const materialManagerMap = new WeakMap<Object3D, StandardMaterialManager>()

export const attachStandardMaterialManager = (
    target: Object3D,
    recursive?: boolean
) =>
    forceGet(materialManagerMap, target, () => {
        if (recursive) {
            let myMaterialManager!: StandardMaterialManager
            target.traverse((child) => {
                const materialManager = attachStandardMaterialManager(child)
                if (child === target) myMaterialManager = materialManager
            })
            return myMaterialManager
        }
        //@ts-ignore
        const { material, userData } = target
        const materialManager = (userData.materialManager =
            new StandardMaterialManager(
                material
                    ? ((target as any).material = material.clone())
                    : new MeshStandardMaterial()
            ))
        const { manager } = userData
        if (manager) manager.append(materialManager)
        else appendableRoot.delete(materialManager)
        return materialManager
    })

export const attachBasicMaterialManager = (target: Object3D) =>
    forceGet(materialManagerMap, target, () => {
        //@ts-ignore
        const { material } = target
        if (!material) return
        //@ts-ignore
        return new BasicMaterialManager((target.material = material.clone()))
    })
