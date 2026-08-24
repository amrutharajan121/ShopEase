import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
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

    const products = await Product.find();
    const orders = await Order.find();

    const totalProducts = products.length;

    const totalOrders = orders.length;

    const totalRevenue = orders.reduce(
      (total, order) => {
        return total + Number(order.totalAmount || 0);
      },
      0
    );

    const lowStockProducts =
      products.filter(
        (product) => product.stock <= 5
      );

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalRevenue,
      lowStockProducts,
    });
  } catch (error) {
    console.error(
      "ADMIN STATS ERROR:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to fetch statistics",
      },
      { status: 500 }
    );
  }
}