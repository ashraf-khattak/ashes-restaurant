import { connectionStr } from "@/app/lib/db";
import { Restaurant } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // connect to DB
    await mongoose.connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // fetch restaurants
    let result = await Restaurant.find();

    // capitalize first letter of each city
    let cities = result.map((item) => {
      if (!item.city) return "";
      return (
        item.city.charAt(0).toUpperCase() + item.city.slice(1).toLowerCase()
      );
    });

    // remove duplicates
    cities = [...new Set(cities)];

    return NextResponse.json({ success: true, data: cities });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// import { connectionStr } from "@/app/lib/db";
// import { Restaurant } from "@/app/lib/restaurantsModel";
// import mongoose from "mongoose";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     await mongoose.connect(connectionStr, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     // Fetch restaurants
//     let result = await Restaurant.find();

//     // Extract & capitalize city names
//     let cities = result.map((item) =>
//       item.city
//         ? item.city.charAt(0).toUpperCase() + item.city.slice(1).toLowerCase()
//         : ""
//     );

//     // Remove duplicates
//     cities = [...new Set(cities)];

//     return NextResponse.json({ success: true, data: cities });
//   } catch (error) {
//     console.error("Error fetching cities:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

// import { connectionStr } from "@/app/lib/db";
// import { Restaurant } from "@/app/lib/restaurantsModel";
// import mongoose from "mongoose";
// import { NextResponse } from "next/server";

// export async function GET() {
//   await mongoose.connect(connectionStr, { useNewUrlParser: true });
//   let result = await Restaurant.find();
//   result = result.map((item) =>
//     item.city(charAt(0).toUpperCase() + item.city.slice(1))
//   );
//   result = [...new Set(result.map((item) => item))];
//   return NextResponse.json({ success: true });
// }
