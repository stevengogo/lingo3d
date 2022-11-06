import { Cancellable } from "@lincode/promiselikes"
import { createNestedEffect } from "@lincode/reactivity"
import { mouseEvents } from "../../../../api/mouse"
import { getEditing } from "../../../../states/useEditing"
import { getEditorMode } from "../../../../states/useEditorMode"
import { getSelectionTarget } from "../../../../states/useSelectionTarget"

export default () => {
    createNestedEffect(() => {
        if (!getEditing() || getEditorMode() !== "path") return

        const handle = new Cancellable()
        import("../../../Curve").then(({ default: Curve }) => {
            if (handle.done) return

            const curve = new Curve()
            curve.helper = true

            handle.watch(
                mouseEvents.on("click", (e) => {
                    setTimeout(() => {
                        if (handle.done || getSelectionTarget()) return
                        curve.addPoint(e.point)
                    })
                })
            )
        })
        return () => {
            handle.cancel()
        }
    }, [getEditing, getEditorMode])
}
