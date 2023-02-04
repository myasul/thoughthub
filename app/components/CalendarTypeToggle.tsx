import type { ChangeEvent } from 'react'

type Props = {
    onToggle: (calendarType: CalendarType) => void
}

export enum CalendarType {
    Month = 'Month',
    Year = 'Year'
}

export const CalendarTypeToggle = ({ onToggle }: Props) => {
    const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedType = event.target.checked ? CalendarType.Year : CalendarType.Month

        onToggle(selectedType)
    }

    return (
        <label
            className="
                relative flex w-[5.5em] h-[1.7em] overflow-hidden text-[13px]
                font-light
            "
        >
            <input defaultChecked type="checkbox" className="peer opacity-0 w-0 h-0" onChange={handleToggle} />
            <span
                className="
                    absolute cursor-pointer top-0 left-0 bottom-0 right-0 
                    bg-[#eee] duration-500 rounded-full
                    before:absolute before:content-[''] before:h-[1.4em]
                    before:top-[2px] before:left-[3px] before:shadow-lg
                    before:w-[1.4em] before:rounded-[20px] before:border-[#C8C8C8]
                    before:duration-500
                    before:bg-white
                    peer-checked:bg-[#9be9a8] peer-focus:shadow-sm
                    peer-checked:before:translate-x-[3rem]
                "
            />
            <span
                className="
                    absolute top-[50%] pointer-events-none duration-500
                    left-[1.1rem] translate-x-[-3.4em] translate-y-[-50%]
                    peer-checked:translate-x-[0] peer-checked:translate-y-[-50%]
                "
            >
                {CalendarType.Year}
            </span>
            <span
                className="
                        absolute top-[50%] pointer-events-none duration-500
                        text-black right-[0.6rem] translate-y-[-50%]
                        peer-checked:translate-x-[3.5rem] peer-checked:translate-y-[-50%]
                    "
            >
                {CalendarType.Month}
            </span>
        </label>
    )
}
