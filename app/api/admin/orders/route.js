import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/order";
import { verifyToken } from "@/lib/auth";

export async function GET(request) {
  try {
    const user = verifyToken(request);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Admin access required" },
        { status: 403 }
      );
    }

    await connectDB();

    const orders = await Order.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("ADMIN ORDERS ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}