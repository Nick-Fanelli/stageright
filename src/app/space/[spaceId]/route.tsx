import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {

    console.log(req.nextUrl.basePath);

    return NextResponse.redirect(new URL(`${req.url}/dashboard`, req.url));

}