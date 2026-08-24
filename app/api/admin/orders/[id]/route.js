import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/order";
import { verifyToken } from "@/lib/auth";

export async function PUT(request, { params }) {
  try {
    const user = verifyToken(request);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Admin access required" },
        { status: 403 }
      );
    }

    await connectDB();

    const { id } = await params;
    const { status } = await request.json();

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error(
      "UPDATE ORDER ERROR:",
      error
    );

    return NextResponse.json(
      { message: "Failed to update order" },
      { status: 500 }
    );
  }
}