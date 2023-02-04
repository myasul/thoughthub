import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'

import { DayLabelText } from './svg/DayLabelText'
import { DateRectWithText } from './svg/DateRectWithText'

dayjs.extend(weekOfYear)

export const MonthCalendar = () => {
    const generateCalendarSvg = () => {
        const firstDayOfCurrentMonth = dayjs().date(1)
        const currentMonth = firstDayOfCurrentMonth.month()

        let currentDay = firstDayOfCurrentMonth
        const calendarGroups = []

        while (currentDay.month() === currentMonth) {
            const currentWeek = currentDay.week()
            const days = []
            const groupXPosition = calendarGroups.length * 35

            while (
                currentDay.week() === currentWeek &&
                currentDay.month() === currentMonth
            ) {
                const dayYPosition = currentDay.day() * 26

                days.push(
                    <DateRectWithText
                        xAxis={0}
                        yAxis={dayYPosition}
                        content={currentDay.date().toString()}
                        date={currentDay}
                        size={20}
                    />
                )

                currentDay = currentDay.add(1, 'day')
            }

            const calendarGroup = (
                <g transform={`translate(${groupXPosition}, 0)`}>
                    {...days}
                </g>
            )

            calendarGroups.push(calendarGroup)
        }

        return (
            <div className='flex w-full gap-0 justify-center'>
                <svg width="30" height="200" className='w-[70px] sm:w-[30px]'>
                    <g transform="translate(42, 20)">
                        <DayLabelText dx={-15} dy={(26 * 0) + 15} isVisible={false} day='Sun' fontSize='15px'/>
                        <DayLabelText dx={-15} dy={(26 * 1) + 15} day='Mon' fontSize='15px'/>
                        <DayLabelText dx={-15} dy={(26 * 2) + 15} isVisible={false} day='Tue' fontSize='15px'/>
                        <DayLabelText dx={-15} dy={(26 * 3) + 15} day='Wed' fontSize='15px'/>
                        <DayLabelText dx={-15} dy={(26 * 4) + 15} isVisible={false} day='Thu' fontSize='15px'/>
                        <DayLabelText dx={-15} dy={(26 * 5) + 15} day='Fri' fontSize='15px'/>
                        <DayLabelText dx={-15} dy={(26 * 6) + 15} isVisible={false} day='Sat' fontSize='15px'/>
                    </g>
                </svg>
                <div className='overflow-x-auto w-[200px]'>
                    <svg width="200" height="200" className='w-[200px]'>
                        <g transform="translate(0, 20)">
                            {...calendarGroups}
                        </g>
                    </svg>
                </div>
            </div>
        )
    }
    return (
        <div className='leading-normal font-calendar'>
            {generateCalendarSvg()}
        </div>
    )
}
