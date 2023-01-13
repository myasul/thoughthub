import type { LinksFunction } from '@remix-run/node'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import stylesUrl from "~/styles/index.css"

export const links: LinksFunction = () => {
    return [
        {
            rel: "stylesheet",
            href: stylesUrl,
        },
    ]
}

dayjs.extend(weekOfYear)

export default function Index () {
    const generateCalendarSvg = () => {
        const firstDayOfCurrentYear = dayjs(`${dayjs().year()}-01-01T00:00:00Z`)
        const firstDayOfNextYear = firstDayOfCurrentYear.add(1, 'year')

        let currentDay = firstDayOfCurrentYear
        let currentMonth = currentDay.month()

        const calendarGroups = []
        const monthLabels = [
            <text x="14" y="-7" className="ContributionCalendar-label" key={currentMonth}>
                {currentDay.format('MMM')}
            </text>
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
                        <text
                            className="ContributionCalendar-label"
                            y="-7"
                            x={groupXPosition + dayXPosition}
                            key={currentMonth}
                        >
                            {currentDay.format('MMM')}
                        </text>
                    )
                    currentMonth = currentDay.month()
                }

                const dayYPosition = currentDay.day() * 13

                days.push(
                    <rect
                        width="10"
                        height="10"
                        x={dayXPosition}
                        y={dayYPosition}
                        className="ContributionCalendar-day"
                        data-date={currentDay.format('DD-MM-YYYY')}
                        data-level="0"
                        rx="2"
                        ry="2"
                        key={currentDay.valueOf()}
                    >
                        {currentDay.toString()}
                    </rect>
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
            <g transform="translate(15, 20)">
                {...calendarGroups}
                {...monthLabels}

                <text text-anchor="start" className="ContributionCalendar-label" dx="-15" dy="8" style={{ display: 'none' }}>Sun</text>
                <text text-anchor="start" className="ContributionCalendar-label" dx="-15" dy="22">Mon</text>
                <text text-anchor="start" className="ContributionCalendar-label" dx="-15" dy="32" style={{ display: 'none' }}>Tue</text>
                <text text-anchor="start" className="ContributionCalendar-label" dx="-15" dy="48">Wed</text>
                <text text-anchor="start" className="ContributionCalendar-label" dx="-15" dy="57" style={{ display: 'none' }}>Thu</text>
                <text text-anchor="start" className="ContributionCalendar-label" dx="-15" dy="73">Fri</text>
                <text text-anchor="start" className="ContributionCalendar-label" dx="-15" dy="81" style={{ display: 'none' }}>Sat</text>
            </g>
        )
    }

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }} className='m-3'>
            <svg width="717" height="112" className="js-calendar-graph-svg">
                {generateCalendarSvg()}
            </svg>
        </div>
    )
}
