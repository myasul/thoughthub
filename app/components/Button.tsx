type Props = {
    text: string
    fontSize: string
    onClick?: () => void
}

export const Button = ({ onClick, text, fontSize }: Props) => {
    return (
        <button
            style={{ fontSize }}
            className="
                bg-[#9be9a8] px-5 py-[2px] font-light rounded-xl shadow-sm hover:bg-[#40c463]
                duration-200
            "
            onClick={onClick}
        >
            {text}
        </button>
    )
}