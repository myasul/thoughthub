export type AbbrevMonthName =  'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec'

type Props = {
    x: number
    y: number
    month: AbbrevMonthName
}

export const MonthLabelText = ({ x, y, month }: Props) => (
    <text
        className='text-xs font-normal text-[#24292f]'
        x={x}
        y={y}
    >
        {month}
    </text>
)