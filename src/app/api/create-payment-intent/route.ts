import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET || "");

type ItemID = 'space';

const calculateAmountCents = (itemId : ItemID) : number => {

    switch(itemId) {
        case 'space':
            return 1500;
    }

}

export async function POST(req: NextRequest) {

    const { itemId } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateAmountCents(itemId),
        currency: "usd"
    });

    return NextResponse.json({
        clientSecret: paymentIntent.client_secret
    });

}