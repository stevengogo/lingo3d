import store, { createEffect } from "@lincode/reactivity"
import { getCameraRendered } from "../../../../states/useCameraRendered"
import { getSSR } from "../../../../states/useSSR"
import { getSSRIntensity } from "../../../../states/useSSRIntensity"
import scene from "../../../scene"
import { SSREffect } from "./SSREffect"

const [setSSREffect, getSSREffect] = store<SSREffect | undefined>(undefined)
export { getSSREffect }

createEffect(() => {
    if (!getSSR()) return

    const effect = new SSREffect(scene, getCameraRendered())
    setSSREffect(effect)

    const handle = getSSRIntensity(
        //@ts-ignore
        (val) => (effect.intensity = val)
    )
    return () => {
        setSSREffect(undefined)
        effect.dispose()
        handle.cancel()
    }
}, [getSSR, getCameraRendered])
