import type { LinksFunction, MetaFunction } from "@remix-run/node"
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts
} from "@remix-run/react"
import { JournalProvider } from './contexts/JournalContext'

import styles from './tailwind.css'
import overrideToastEditorStyles from './local-tui.css'
import toastEditorStyles from '@toast-ui/editor/dist/toastui-editor.css'

export const links: LinksFunction = () => ([
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: toastEditorStyles },
    { rel: "stylesheet", href: overrideToastEditorStyles }
])

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Thought Hub",
    viewport: "width=device-width,initial-scale=1",
})

const Document = ({ children }: { children: React.ReactNode }) => (
    <html lang="en">
        <head>
            <Meta />
            <Links />
        </head>
        <body className='flex justify-center'>
            {children}
            <Scripts />
            <LiveReload />
        </body>
    </html>
)

const Root = () => (
    <Document>
        <JournalProvider>
            <Outlet />
        </JournalProvider>
    </Document>
)

export default Root
