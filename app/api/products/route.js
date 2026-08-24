import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

// GET - Fetch all products
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find();

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST - Add a new product
export async function POST(request) {
  try {
    await connectDB();

    const data = await request.json();

    const product = await Product.create(data);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}