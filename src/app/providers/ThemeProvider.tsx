"use client";

import { ReactNode, createContext, useCallback, useEffect, useState } from "react";

type ProviderProps = {

    theme: string,
    setTheme: (theme: string) => void

}

export const ThemeContext = createContext<ProviderProps>({ theme: "dark", setTheme: (theme: string) => {} });

const ThemeProvider = ({ children } : { children: ReactNode }) => {

    const [theme, setTheme] = useState<string>("dark");
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {

        if(isMounted) {
            setTheme(localStorage.getItem("theme") || "dark");
        }

    }, [isMounted]);

    useEffect(() => {
        if(isMounted) {
            localStorage.setItem("theme", theme);
        }
    }, [isMounted, theme]);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <div data-theme={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    )

}

export default ThemeProvider;