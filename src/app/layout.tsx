import './globals.css'

export const metadata = {
    title: 'Stage Right',
    description: '',
}

export default async function RootLayout({ children } : { children: React.ReactNode }) {

    // const session = await getServerSession();

    return (
        <html lang="en" data-theme="dark">
            <body>{children}</body>
        </html>
    );
}
