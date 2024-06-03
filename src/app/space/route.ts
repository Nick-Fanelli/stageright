import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {

    return NextResponse.redirect(new URL("/spaces", req.url));

}