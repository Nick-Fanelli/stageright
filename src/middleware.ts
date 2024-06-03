// export { auth as middleware } from "@/auth"

import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {

    const headers = new Headers(req.headers);
    headers.set("next-url", req.url);

    return NextResponse.next({
        request: {
            headers
        }
    });

}