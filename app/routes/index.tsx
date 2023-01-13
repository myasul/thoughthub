import { JournalCalendar } from '~/components/calendar/JournalCalendar'

export default function Index () {
    return (
        <div
            className='
                m-auto leading-normal font-calendar w-screen h-screen 
                flex flex-col items-center max-w-3xl
            '
        >
            <JournalCalendar />
            <div className='w-full flex justify-center h-full'>
                <textarea
                    className='
                        shadow-inner p-4 outline-none resize-none 
                        w-4/5 rounded-md m-auto mt-8 max-h-80 h-full
                    '
                    style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px' }}
                />
            </div>
        </div>
    )
}