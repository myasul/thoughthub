import type { Dayjs } from 'dayjs'
import { JournalDateFormat, useJournal } from '~/contexts/JournalContext'

type Props = {
    currentDate: Dayjs
}

export const JournalTextArea = ({ currentDate }: Props) => {
    const journal = useJournal()
    const journalEntry = journal[currentDate.format(JournalDateFormat)] ?? ''

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
                        rounded-md m-auto mt-8 max-h-80 h-full w-4/5
                    '
                style={{
                    boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px'
                }}
                value={journalEntry}
            />
        </>
    )
}