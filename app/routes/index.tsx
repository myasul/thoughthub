import dayjs from 'dayjs'
import { JournalCalendar } from '~/components/calendar/JournalCalendar'

export default function Index () {
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
                <JournalCalendar />
            </div>
            <div
                className='
                    w-full flex justify-center h-3/5 flex-col items-center
                    border border-t-0 rounded-md rounded-t-[0] border-[#d0d7de]
                '
            >
                <h3 className='w-4/5 border-b text-[16px] h-3 block font-semibold'>
                    <span className='pr-5 bg-white'>
                        {dayjs().format('dddd, MMMM D, YYYY')}
                    </span>
                </h3>
                <textarea
                    className='
                        shadow-inner p-4 outline-none resize-none 
                        rounded-md m-auto mt-8 max-h-80 h-full w-4/5
                    '
                    style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px' }}
                />
            </div>
        </div>
    )
}