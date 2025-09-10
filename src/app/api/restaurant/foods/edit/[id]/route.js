import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodModel";
import mongoose from "mongoose";

// ✅ GET: Fetch single food item
export async function GET(req, { params }) {
  try {
    await mongoose.connect(connectionStr);

    const food = await foodSchema.findById(params.id);

    if (!food) {
      return NextResponse.json(
        { success: false, message: "Food item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, food });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching food item", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ PUT: Update food item
export async function PUT(req, { params }) {
  try {
    await mongoose.connect(connectionStr);

    const body = await req.json();
    const updatedFood = await foodSchema.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFood) {
      return NextResponse.json(
        { success: false, message: "Food item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Food item updated successfully",
      food: updatedFood,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error updating food item", error: error.message },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";
// import { connectionStr } from "@/app/lib/db";
// import { foodSchema } from "@/app/lib/foodModel";
// import mongoose from "mongoose";

// // ✅ GET: Fetch single food item
// export async function GET(req, { params }) {
//   try {
//     await mongoose.connect(connectionStr);
//     const food = await foodSchema.findById(params.id);

//     if (!food) {
//       return NextResponse.json(
//         { success: false, message: "Food item not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, food });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Error fetching food item" },
//       { status: 500 }
//     );
//   }
// }

// // ✅ PUT: Update food item
// export async function PUT(req, { params }) {
//   try {
//     await mongoose.connect(connectionStr);

//     const body = await req.json();
//     const updatedFood = await foodSchema.findByIdAndUpdate(params.id, body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedFood) {
//       return NextResponse.json(
//         { success: false, message: "Food item not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Food item updated successfully",
//       food: updatedFood,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Error updating food item",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { connectionStr } from "@/app/lib/db";
// import { foodSchema } from "@/app/lib/foodModel";
// import mongoose from "mongoose";

// export async function GET(req, { params }) {
//   try {
//     await mongoose.connect(connectionStr);
//     const food = await foodSchema.findById(params.id);

//     if (!food) {
//       return NextResponse.json(
//         { success: false, message: "Food item not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, food });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Error fetching food item" },
//       { status: 500 }
//     );
//   }
// }

// import { connectionStr } from "@/app/lib/db";
// import { foodSchema } from "@/app/lib/foodModel";
// import mongoose from "mongoose";
// import { NextResponse } from "next/server";

// export async function GET(request, { params }) {
//   try {
//     const { id } = await params;
//     let success = false;
//     await mongoose.connect(connectionStr, { useNewUrlParser: true });
//     const result = await foodSchema.findOne({ _id: id });
//     if (result) {
//       success = true;
//     }
//     return NextResponse.json({ result, success });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }
