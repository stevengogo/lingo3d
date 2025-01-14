import { APPBAR_HEIGHT, FRAME_WIDTH, PANELS_HEIGHT } from "../../globals"
import { useTimelineFrame } from "../states/useTimelineFrame"
import { useTimelineScrollLeft } from "../states/useTimelineScrollLeft"

const Needle = () => {
    const [scrollLeft] = useTimelineScrollLeft()
    const [frame] = useTimelineFrame()

    return (
        <div
            className="lingo3d-absfull"
            style={{
                height: PANELS_HEIGHT,
                zIndex: 1,
                overflow: "hidden",
                pointerEvents: "none"
            }}
        >
            <div
                style={{
                    position: "absolute",
                    left: -scrollLeft + frame * FRAME_WIDTH,
                    top: 0,
                    width: FRAME_WIDTH,
                    height: APPBAR_HEIGHT,
                    background: "white",
                    opacity: 0.3
                }}
            >
                <div
                    style={{
                        width: 1,
                        height: PANELS_HEIGHT,
                        background: "white",
                        position: "absolute",
                        left: FRAME_WIDTH * 0.5
                    }}
                />
            </div>
        </div>
    )
}

export default Needle
