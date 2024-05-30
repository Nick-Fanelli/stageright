import AuthProvider from '@/components/AuthProvider'
import './globals.css'
import { getServerSession } from 'next-auth';

export const metadata = {
    title: 'Stage Right',
    description: '',
}

export default async function RootLayout({ children } : { children: React.ReactNode }) {

    const session = await getServerSession();

    return (
        <html lang="en" data-theme="dark">
            <AuthProvider session={session}>
                <body>{children}</body>
            </AuthProvider>
        </html>
    );
}
