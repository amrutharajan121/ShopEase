import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
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
    const data = await request.json();

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name: data.name,
        price: Number(data.price),
        stock: Number(data.stock),
        category: data.category,
        description: data.description,
        image: data.image,
        rating: Number(data.rating || 0),
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);

    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
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

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);

    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}