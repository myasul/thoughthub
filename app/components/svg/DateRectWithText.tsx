import type { Dayjs } from 'dayjs'
import { JournalDateFormat, useJournal } from '~/contexts/JournalContext'
import { getEntryLevel } from '~/utils/entry-level'

type Props = {
    xAxis: number
    yAxis: number
    size: number
    content: string
    date: Dayjs
    onClick: (date: Dayjs) => void
}

/**
 * TODOS:
 * - Add hover effect. e.g. change opacity.
 */
export const DateRectWithText = ({ xAxis, yAxis, content, date, size, onClick }: Props) => {
    const journal = useJournal()
    const entry = journal[date.format(JournalDateFormat)] ?? ''
    const entryLevel = getEntryLevel(entry)

    return (
        <g
            key={`${xAxis}-${yAxis}`}
            onClick={() => onClick(date)}
            className="cursor-pointer"
        >
            <rect
                width={size}
                height={size}
                rx="2"
                ry="2"
                className="
                    shape-geometric-precision bg-[#ebedf0] fill-[#ebedf0]
                    rounded-sm outline outline-offset-[-1px] outline-1
                     outline-calendar-entry-border
                "
                style={{
                    backgroundColor: entryLevel,
                    fill: entryLevel
                }}
                x={xAxis}
                y={yAxis}
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