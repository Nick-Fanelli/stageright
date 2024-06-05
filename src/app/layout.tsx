import './globals.css'

export const metadata = {
    title: 'Stage Right',
    description: '',
}

export default async function RootLayout({ children } : { children: React.ReactNode }) {

    return (
        <html lang="en">
            <body data-theme="dark">
                {children}
            </body>
        </html>
    );
}
