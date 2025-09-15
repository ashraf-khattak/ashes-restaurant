import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Restaurant } from "@/app/lib/restaurantsModel"; // ✅ import model

export async function GET(request) {
  try {
    // Extract query params
    const queryParams = new URL(request.url).searchParams;

    let filter = {};

    if (queryParams.get("location")) {
      const city = queryParams.get("location");
      filter = { city: { $regex: new RegExp(city, "i") } }; // case-insensitive city search
    } else if (queryParams.get("restaurant")) {
      const name = queryParams.get("restaurant");
      filter = { name: { $regex: new RegExp(name, "i") } }; // case-insensitive restaurant search
    }

    // connect to DB
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // fetch restaurants with filter
    const result = await Restaurant.find(filter);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// import { connectionStr } from "@/app/lib/db";
// import mongoose from "mongoose";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//   let queryParams = request.nextUrl.searchParams;
//   console.log(queryParams.get("restaurant"));
//   let filter = {};
//   if (queryParams.get("location")) {
//     let city = queryParams.get("location");
//     filter = { city: { $regex: new RegExp(city, "i") } };
//   } else if (queryParams.get("restaurant")) {
//     let name = queryParams.get("restaurant");
//     filter = { name: { $regex: new RegExp(name, "i") } };
//   }
//   await mongoose.connect(connectionStr, { useNewUrlParser: true });
//   let result = await Restaurant.find(filter);
//   return NextResponse.json({ success: true, result });
// }
