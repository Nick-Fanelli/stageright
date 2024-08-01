import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {

    return NextResponse.redirect(new URL(`${req.url}/dashboard`, req.url));

}