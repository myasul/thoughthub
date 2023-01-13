import type { Dayjs } from 'dayjs'

type Props = {
    x: number
    y: number
    date: Dayjs
}

export const JournalSVGRect = ({x, y, date}: Props) => (
    <rect
        width="10"
        height="10"
        rx="2"
        ry="2"
        className="
            shape-geometric-precision bg-[#ebedf0] fill-[#ebedf0]
            outline-offset-[-1px] outline-none rounded-sm
        "
        x={x}
        y={y}
        data-date={date.format('DD-MM-YYYY')}
        key={date.valueOf()}
    >
        {date.toString()}
    </rect>
)