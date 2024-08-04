import { db } from "@/db";
import { stripe } from "@/lib/stripe";

import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature) {
      return new Response("Invalid Signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email) {
        throw new Error("Missing User Email!");
      }

      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      };

      if (!userId || !orderId) {
        throw new Error("Invalid Request Metadata!");
      }

      const billingAddress = session.customer_details!.address;
      const shippingAddress = session.shipping_details!.address;

      await db.order.update({
        where: { id: orderId },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              city: shippingAddress!.city!,
              state: shippingAddress!.state!,
              street: shippingAddress!.line1!,
              country: shippingAddress!.country!,
              name: session.customer_details!.name!,
              postalCode: shippingAddress!.postal_code!,
            },
          },
          billingAddress: {
            create: {
              city: billingAddress!.city!,
              state: billingAddress!.state!,
              street: billingAddress!.line1!,
              country: billingAddress!.country!,
              name: session.customer_details!.name!,
              postalCode: billingAddress!.postal_code!,
            },
          },
        },
      });
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong!", ok: false },
      { status: 500 }
    );
  }
}
