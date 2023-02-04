import type { Dayjs } from 'dayjs'
import type { Journal, JournalAction } from '~/contexts/JournalContext'
import type { Dispatch } from 'react'

import dayjs from 'dayjs'
import { JournalActionType } from '~/contexts/JournalContext'
import { useEffect, useState } from 'react'
import { useJournalDispatch } from '~/contexts/JournalContext'

import { YearCalendar } from '~/components/YearCalendar'
import { JournalTextArea } from '~/components/JournalTextArea'
import { Database } from '~/utils/db/Database'
import { MonthCalendar } from '~/components/MonthCalendar'
import { CalendarType, CalendarTypeToggle } from '~/components/CalendarTypeToggle'

export default function Index () {
    const [selectedDate, setCurrentDate] = useState<Dayjs>(dayjs())
    const [selectedCalendarType, setSelectedCalendarType] = useState(CalendarType.Year)
    const dispatch = useJournalDispatch()

    useEffect(() => {
        hydrateJournal(dispatch)
    }, [dispatch])

    // const hydrateDb = async (journal: Journal) => {
    //     const entries = Object.entries(journal).map(([key, value]) => ({ date: key, text: value }))

    //     const db = new Database()
    //     await db.batchSave('entry', entries)
    // }

    const hydrateJournal = async (dispatch: Dispatch<JournalAction>) => {
        const db = new Database()
        const entries = await db.findAll('entry')

        const persistedJournal = entries.reduce((journal, nextEntry) => {
            journal[nextEntry.date] = nextEntry.text

            return journal
        }, {} as Journal)

        dispatch({ type: JournalActionType.Hydrate, journal: persistedJournal })
    }

    const handleJournalCalendarEntryClick = (date: Dayjs) => {
        setCurrentDate(date)
    }

    const handleCalendarTypeToggle = (calendarType: CalendarType) => {
        setSelectedCalendarType(calendarType)
    }

    return (
        <div
            className='
                leading-normal font-calendar h-screen w-full
                flex flex-col items-center p-5
                md:max-w-[825px]
            '
        >
            <div
                className='
                    border-[#d0d7de] border border-b-0 w-full rounded-md rounded-b-[0]
                    px-5 py-3
                    md:justify-center md:align-center
                '
            >
                <div className="text-center">
                    <h1 className="font-bold text-xl">
                        {selectedDate.format(selectedCalendarType === CalendarType.Year ? 'YYYY' : 'MMMM')}
                    </h1>
                </div>
                <div className='h-[200px]'>
                    {
                        selectedCalendarType === CalendarType.Year
                            ? <YearCalendar onEntryClick={handleJournalCalendarEntryClick} />
                            : <MonthCalendar selectedDate={selectedDate} onEntryClick={handleJournalCalendarEntryClick} />
                    }
                </div>
                <div className='flex justify-center h-[50px] items-center'>
                    <div></div>
                    <CalendarTypeToggle onToggle={handleCalendarTypeToggle} />
                </div>
            </div>
            <div
                className='
                    w-full flex justify-center h-[70%] flex-col items-center
                    border border-t-0 rounded-md rounded-t-[0] border-[#d0d7de]
                '
            >
                <JournalTextArea selectedDate={selectedDate} />
            </div>
        </div>
    )
}