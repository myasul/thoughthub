import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'

import type { AbbrevMonthName } from '~/components/svg/MonthLabelText'
import { DayLabelText } from '~/components/svg/DayLabelText'
import { DateRect } from '~/components/svg/DateRect'
import { MonthLabelText } from '~/components/svg/MonthLabelText'

dayjs.extend(weekOfYear)

type Props = {
    onEntryClick: (date: Dayjs) => void
}

export const YearCalendar = ({ onEntryClick }: Props) => {
    const generateCalendarSvg = () => {
        const firstDayOfCurrentYear = dayjs(`${dayjs().year()}-01-01T00:00:00Z`)
        const firstDayOfNextYear = firstDayOfCurrentYear.add(1, 'year')

        let currentDay = firstDayOfCurrentYear
        let currentMonth = currentDay.month()

        const calendarGroups = []
        const monthLabels = [
            <MonthLabelText
                x={14}
                y={-7}
                month={currentDay.format('MMM') as AbbrevMonthName}
                key={currentMonth}
            />
        ]

        while (currentDay.isBefore(firstDayOfNextYear)) {
            const currentWeek = currentDay.week()
            const days = []
            const groupXPosition = calendarGroups.length * 14
            const dayXPosition = 14 - calendarGroups.length

            if (currentDay.month() !== currentMonth) {
                monthLabels.push(
                    <MonthLabelText
                        y={-7}
                        x={groupXPosition + dayXPosition}
                        month={currentDay.format('MMM') as AbbrevMonthName}
                        key={groupXPosition}
                    />
                )
                currentMonth = currentDay.month()
            }

            while (
                currentDay.week() === currentWeek &&
                currentDay.isBefore(firstDayOfNextYear)
            ) {
                const dayYPosition = currentDay.day() * 13

                days.push(
                    <DateRect
                        x={dayXPosition}
                        y={dayYPosition}
                        date={currentDay}
                        onClick={onEntryClick}
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
            <div className='flex w-full gap-0'>
                <svg width="30" height="112" className='w-[105px] sm:w-[50px]'>
                    <g transform="translate(15, 20)">
                        <DayLabelText dx={-15} dy={8} isVisible={false} day='Sun' fontSize='0.7rem' />
                        <DayLabelText dx={-15} dy={22} day='Mon' fontSize='0.7rem' />
                        <DayLabelText dx={-15} dy={32} isVisible={false} day='Tue' fontSize='0.7rem' />
                        <DayLabelText dx={-15} dy={48} day='Wed' fontSize='0.7rem' />
                        <DayLabelText dx={-15} dy={57} isVisible={false} day='Thu' fontSize='0.7rem' />
                        <DayLabelText dx={-15} dy={73} day='Fri' fontSize='0.7rem' />
                        <DayLabelText dx={-15} dy={81} isVisible={false} day='Sat' fontSize='0.7rem' />
                    </g>
                </svg>
                <div className='overflow-x-auto w-[1200px]'>
                    <svg width="717" height="112" className='w-[717px]'>
                        <g transform="translate(0, 20)">
                            {...calendarGroups}
                            {...monthLabels}
                        </g>
                    </svg>
                </div>
            </div>
        )
    }

    return (
        <div className='leading-normal font-calendar pt-8'>
            {generateCalendarSvg()}
        </div>
    )
}
