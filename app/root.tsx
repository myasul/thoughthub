import type { LinksFunction, MetaFunction } from "@remix-run/node"
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts
} from "@remix-run/react"

import styles from './tailwind.css'

export const links: LinksFunction = () => ([
    { rel: "stylesheet", href: styles }
])

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "New Remix App",
    viewport: "width=device-width,initial-scale=1",
})

const Document = ({ children }: { children: React.ReactNode }) => (
    <html lang="en">
        <head>
            <Meta />
            <Links />
        </head>
        <body>
            {children}
            <Scripts />
            <LiveReload />
        </body>
    </html>
)

const Root = () => (
    <Document>
        <Outlet />
    </Document>
)

export default Root
