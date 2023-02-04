import type { Dayjs } from 'dayjs'
import { JournalDateFormat, useJournal } from '~/contexts/JournalContext'

type Props = {
    x: number
    y: number
    date: Dayjs
    onClick: (date: Dayjs) => void
}

enum EntryLevel {
    LevelZero = '#ebedf0',
    LevelOne = '#9be9a8',
    LevelTwo = '#40c463',
    LevelThree = '#30a14e',
    LevelFour = '#216e39'
}

const getEntryLevel = (entry: string) => {
    if (entry === '') return EntryLevel.LevelZero

    const wordCount = entry.split(' ').length

    if (wordCount > 30) return EntryLevel.LevelFour
    if (wordCount > 25) return EntryLevel.LevelThree
    if (wordCount > 10) return EntryLevel.LevelTwo
    
    return EntryLevel.LevelOne

}

export const DateRect = ({ x, y, date, onClick }: Props) => {
    const journal = useJournal()
    const entry = journal[date.format(JournalDateFormat)] ?? ''
    const entryLevel = getEntryLevel(entry)

    return (
        <rect
            width="10"
            height="10"
            rx="2"
            ry="2"
            className="
                shape-geometric-precision bg-[#ebedf0] fill-[#ebedf0]
                rounded-sm outline outline-offset-[-1px] outline-1
                 outline-calendar-entry-border cursor-pointer
            "
            style={{
                backgroundColor: entryLevel,
                fill: entryLevel
            }}
            x={x}
            y={y}
            data-date={date.format('DD-MM-YYYY')}
            key={date.valueOf()}
            onClick={() => onClick(date)}
        >
            {date.toString()}
        </rect>
    )
}