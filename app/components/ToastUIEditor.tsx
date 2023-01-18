import { Editor } from '@toast-ui/react-editor'
import { useRef } from 'react'

type Props = {
    value: string
    height: string
    onChange: (text: string) => void
}

const ToastUIEditor = ({ value, onChange, height }: Props) => {
    const editorRef = useRef<Editor>(null)

    function handleChange () {
        if (!editorRef.current) return

        const markdown = editorRef?.current.getInstance().getMarkdown()

        onChange(markdown)
    }

    return (
        <Editor
            height={height}
            initialEditType="wysiwyg"
            initialValue={value}
            onChange={handleChange}
            ref={editorRef}
        />
    )
}

export default ToastUIEditor
