import ThemeProvider, { ThemeContext } from './providers/ThemeProvider';
import './globals.css'

export const metadata = {
    title: 'Stage Right',
    description: '',
}

export default async function RootLayout({ children } : { children: React.ReactNode }) {

    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
