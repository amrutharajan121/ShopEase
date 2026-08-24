import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
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

    const products = await Product.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = verifyToken(request);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Admin access required" },
        { status: 403 }
      );
    }

    await connectDB();

    const data = await request.json();

    const product = await Product.create(data);

    return NextResponse.json(product, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}