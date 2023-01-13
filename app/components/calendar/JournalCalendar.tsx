import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'

import type { AbbrevMonthName } from '~/components/calendar/svg/MonthLabelSVGText'
import { DayLabelSVGText } from '~/components/calendar/svg/DayLabelSVGText'
import { JournalSVGRect } from '~/components/calendar/svg/JournalSVGRect'
import { MonthLabelSVGText } from '~/components/calendar/svg/MonthLabelSVGText'

dayjs.extend(weekOfYear)

export const JournalCalendar = () => {
    const generateCalendarSvg = () => {
        const firstDayOfCurrentYear = dayjs(`${dayjs().year()}-01-01T00:00:00Z`)
        const firstDayOfNextYear = firstDayOfCurrentYear.add(1, 'year')

        let currentDay = firstDayOfCurrentYear
        let currentMonth = currentDay.month()

        const calendarGroups = []
        const monthLabels = [
            <MonthLabelSVGText
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

            while (
                currentDay.week() === currentWeek &&
                currentDay.isBefore(firstDayOfNextYear)
            ) {
                if (currentDay.month() !== currentMonth) {
                    monthLabels.push(
                        <MonthLabelSVGText
                            y={-7}
                            x={groupXPosition + dayXPosition}
                            month={currentDay.format('MMM') as AbbrevMonthName}
                            key={currentMonth}
                        />
                    )
                    currentMonth = currentDay.month()
                }

                const dayYPosition = currentDay.day() * 13

                days.push(
                    <JournalSVGRect
                        x={dayXPosition}
                        y={dayYPosition}
                        date={currentDay}
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
            <svg width="717" height="112">
                <g transform="translate(15, 20)">
                    {...calendarGroups}
                    {...monthLabels}

                    <DayLabelSVGText dx={-15} dy={8} isVisible={false} day='Sun' />
                    <DayLabelSVGText dx={-15} dy={22} day='Mon' />
                    <DayLabelSVGText dx={-15} dy={32} isVisible={false} day='Tue' />
                    <DayLabelSVGText dx={-15} dy={48} day='Wed' />
                    <DayLabelSVGText dx={-15} dy={57} isVisible={false} day='Thu' />
                    <DayLabelSVGText dx={-15} dy={73} day='Fri' />
                    <DayLabelSVGText dx={-15} dy={81} isVisible={false} day='Sat' />
                </g>
            </svg>
        )
    }

    return (
        <div className='mt-2 leading-normal font-calendar'>
            {generateCalendarSvg()}
        </div>
    )
}
