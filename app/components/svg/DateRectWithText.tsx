import type { Dayjs } from 'dayjs'

type Props = {
    xAxis: number
    yAxis: number
    size: number
    content: string
    date: Dayjs
}

export const DateRectWithText = ({ xAxis, yAxis, content, date, size }: Props) => {
    return (
        <g key={`${xAxis}-${yAxis}`}>
            <rect
                width={size}
                height={size}
                rx="2"
                ry="2"
                className="
                    shape-geometric-precision bg-[#ebedf0] fill-[#ebedf0]
                    rounded-sm outline outline-offset-[-1px] outline-1
                     outline-calendar-entry-border cursor-pointer
                "
                style={{
                    backgroundColor: "#ebedf0",
                    fill: "#ebedf0"
                }}
                x={xAxis}
                y={yAxis}
            // onClick={() => onClick(date)}
            >
                {date.toISOString()}
            </rect>
            <text
                x={xAxis + size / 2}
                y={yAxis + size / 1.8}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ fontSize: `${size / 2}px`, fontWeight: 'lighter' }}
            >
                {content}
            </text>
        </g>
    )
}