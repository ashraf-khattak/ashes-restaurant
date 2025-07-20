import { connectionStr } from "@/app/lib/db";
import { Restaurant } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongoose.connect(connectionStr);
    const data = await Restaurant.find();
    console.log("🚀 ~ GET ~ data:", data);
    return NextResponse.json({ result: true, data });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json(
      { result: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await mongoose.connect(connectionStr);
    const payload = await request.json();
    let result;
    if (payload.login) {
      result = await Restaurant.findOne({
        email: payload.email,
        password: payload.password,
      });
    } else {
      const newRestaurant = new Restaurant(payload);
      result = await newRestaurant.save();
    }
    console.log("🚀 ~ POST ~ payload:", payload);
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error("Error saving restaurant:", error);
    return NextResponse.json(
      { result: false, error: error.message },
      { status: 500 }
    );
  }
}
