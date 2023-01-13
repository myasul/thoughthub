type Props = {
    isVisible?: boolean
    dx: number
    dy: number
    day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
}

export const DayLabelSVGText = ({ dx, dy, isVisible = true, day }: Props) => (
    <text
        className='text-xs font-normal text-[#24292f]'
        dx={dx}
        dy={dy}
        style={{ display: isVisible ? 'inherit' : 'none' }}
        textAnchor='start'
    >
        {day}
    </text>
)