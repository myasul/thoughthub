type Props = {
    isVisible?: boolean
    dx: number
    dy: number
    day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
    fontSize?: string
}

export const DayLabelText = ({ dx, dy, isVisible = true, day, fontSize = 'initial' }: Props) => (
    <text
        className='text-xs font-light text-[#24292f]'
        dx={dx}
        dy={dy}
        style={{ display: isVisible ? 'inherit' : 'none', fontSize }}
        textAnchor='start'
    >
        {day}
    </text>
)