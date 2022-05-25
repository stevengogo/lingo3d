import { event } from "@lincode/events"
import { debounce } from "@lincode/utils"
import PositionedItem from "../api/core/PositionedItem"
import { getCamera } from "../states/useCamera"

const [_emitSelectionTarget, onSelectionTarget] = event<PositionedItem | undefined>()
const emitSelectionTarget = debounce(_emitSelectionTarget, 0, "trailing")

export { emitSelectionTarget, onSelectionTarget }

getCamera(() => emitSelectionTarget(undefined))