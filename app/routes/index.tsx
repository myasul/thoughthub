import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { useState } from 'react'
import { JournalCalendar } from '~/components/JournalCalendar'
import { JournalTextArea } from '~/components/JournalTextArea'
import { JournalProvider } from '~/contexts/JournalContext'

export default function Index () {
    const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs())

    const handleJournalCalendarEntryClick = (date: Dayjs) => {
        setCurrentDate(date)
    }

    return (
        <JournalProvider>
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
        </JournalProvider>
    )
}