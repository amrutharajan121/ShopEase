import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/order";
import { verifyToken } from "@/lib/auth";

export async function POST(request) {
  try {
    const user = verifyToken(request);

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized. Please login." },
        { status: 401 }
      );
    }

    await connectDB();

    const data = await request.json();

    // Attach the logged-in user's ID to the order
    data.userId = user.id;

    // Always use the logged-in user's email
    data.customer.email = user.email;

    const order = await Order.create(data);

    return NextResponse.json(order, {
      status: 201,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);

    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const user = verifyToken(request);

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized. Please login." },
        { status: 401 }
      );
    }

    await connectDB();

    // Get only orders belonging to the logged-in user
    const orders = await Order.find({
      userId: user.id,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Fetch orders error:", error);

    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}