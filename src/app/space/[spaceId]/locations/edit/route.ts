import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {

    const segments = req.url.split('/').filter(Boolean);
    segments.pop();

    return NextResponse.redirect(new URL(segments.join("/")));

}