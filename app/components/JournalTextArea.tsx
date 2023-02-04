import type { Dayjs } from 'dayjs'
import { lazy, Suspense } from 'react'

import {
    JournalActionType,
    JournalDateFormat,
    useJournal,
    useJournalDispatch
} from '~/contexts/JournalContext'
import { Database } from '~/utils/db/Database'

type Props = {
    selectedDate: Dayjs
}

const ToastUIEditor = lazy(() => import('./ToastUIEditor'))

export const JournalTextArea = ({ selectedDate }: Props) => {
    const journal = useJournal()
    const dispatch = useJournalDispatch()

    const journalEntry = journal[selectedDate.format(JournalDateFormat)] ?? ' '

    const handleEntryChange = (text: string) => {
        const date = selectedDate.format(JournalDateFormat)

        dispatch({ type: JournalActionType.Update, date, entry: text })

        const db = new Database()
        db.save('entry', { date, text })
    }

    return (
        <>
            <h3 className='w-4/5 border-b text-[16px] h-3 block font-semibold'>
                <span className='pr-5 bg-white'>
                    {selectedDate.format('dddd, MMMM D, YYYY')}
                </span>
            </h3>
            <div
                className='
                    p-4 outline-none resize-none 
                    rounded-md m-auto mt-3 h-full w-[95%] mb-3
                '
            >
                <Suspense fallback={<div />}>
                    <ToastUIEditor
                        value={journalEntry}
                        onChange={handleEntryChange}
                        height='100%'
                        key={selectedDate.valueOf()}
                    />
                </Suspense>
            </div>
        </>
    )
}