import type { Dayjs } from 'dayjs'
import type { ChangeEventHandler } from 'react'
import {
    JournalActionType,
    JournalDateFormat,
    useJournal,
    useJournalDispatch
} from '~/contexts/JournalContext'
import { Database } from '~/utils/db/Database'

type Props = {
    currentDate: Dayjs
}

export const JournalTextArea = ({ currentDate }: Props) => {
    const journal = useJournal()
    const dispatch = useJournalDispatch()

    const journalEntry = journal[currentDate.format(JournalDateFormat)] ?? ''

    const handleEntryChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        const entry = event.target.value
        const date = currentDate.format(JournalDateFormat)

        dispatch({ type: JournalActionType.Update, date, entry })

        const db = new Database()
        db.save('entry', { date, text: entry })
    }

    return (
        <>
            <h3 className='w-4/5 border-b text-[16px] h-3 block font-semibold'>
                <span className='pr-5 bg-white'>
                    {currentDate.format('dddd, MMMM D, YYYY')}
                </span>
            </h3>
            <textarea
                className='
                    shadow-inner p-4 outline-none resize-none 
                    rounded-md m-auto mt-8 max-h-[470px] h-full w-4/5 mb-8
                '
                style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px' }}
                value={journalEntry}
                onChange={handleEntryChange}
            />
        </>
    )
}