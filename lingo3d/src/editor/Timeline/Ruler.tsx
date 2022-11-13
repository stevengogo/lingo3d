import { APPBAR_HEIGHT, FRAME_WIDTH } from "../../globals"
import VirtualizedListHorizontal from "../component/VirtualizedListHorizontal"
import Metric from "./Metric"
import { useScrollLeft } from "./states"

type RulerProps = {
    width: number
}

const Ruler = ({ width }: RulerProps) => {
    const [scrollLeft, setScrollLeft] = useScrollLeft()

    return (
        <VirtualizedListHorizontal
            scrollLeft={scrollLeft}
            onScrollLeft={setScrollLeft}
            itemNum={100}
            itemWidth={FRAME_WIDTH * 2}
            containerWidth={width}
            containerHeight={APPBAR_HEIGHT}
            renderItem={({ index, style }) => (
                <Metric key={index} index={index} style={style} />
            )}
        />
    )
}

export default Ruler