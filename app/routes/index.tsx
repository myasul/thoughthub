import type { Dayjs } from 'dayjs'
import type { Journal, JournalAction } from '~/contexts/JournalContext'
import type { Dispatch } from 'react'

import dayjs from 'dayjs'
import { JournalActionType } from '~/contexts/JournalContext'
import { useEffect, useState } from 'react'
import { useJournalDispatch } from '~/contexts/JournalContext'

import { JournalCalendar } from '~/components/JournalCalendar'
import { JournalTextArea } from '~/components/JournalTextArea'
import { Database } from '~/utils/db/Database'

export default function Index () {
    const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs())
    const dispatch = useJournalDispatch()

    useEffect(() => {
        hydrateJournal(dispatch)
    }, [dispatch])

    const hydrateJournal = async (dispatch: Dispatch<JournalAction>) => {
        const db = new Database()
        const entries = await db.findAll('entry')

        const persistedJournal = entries.reduce((journal, nextEntry) => {
            journal[nextEntry.date] = nextEntry.value

            return journal
        }, {} as Journal)

        dispatch({ type: JournalActionType.Hydrate, journal: persistedJournal })
    }

    const handleJournalCalendarEntryClick = (date: Dayjs) => {
        setCurrentDate(date)
    }

    return (
        <div
            className='
                m-auto leading-normal font-calendar w-screen h-screen 
                flex flex-col items-center max-w-[800px] p-5
            '
        >
            <h1 className='my-5 font-bold'>Thought Hub</h1>
            <div
                className='
                    border-[#d0d7de] border border-b-0 w-full rounded-md rounded-b-[0]
                    p-5 flex justify-center
                '
            >
                <JournalCalendar onEntryClick={handleJournalCalendarEntryClick} />
            </div>
            <div
                className='
                    w-full flex justify-center h-3/5 flex-col items-center
                    border border-t-0 rounded-md rounded-t-[0] border-[#d0d7de]
                '
            >
                <JournalTextArea currentDate={currentDate} />
            </div>
        </div>
    )
}