import { NextRequest, NextResponse } from "next/server";
import { getModel } from "@/lib/loadModels";
// import * as tf from "@tensorflow/tfjs-node";

export async function GET() {
  const data = await getModel("cassava");
//   console.log(data);
  
  return NextResponse.json({ result: "data" })
}

// export async function POST(request) {
//   try {
//     const data = await request.formData();
//     // console.log(data.formData().get('type'));
//     // const response = await predictAction(image, type);
//     return NextResponse.json({ data: data });
//   } catch (err) {
//     return new NextResponse('error broh', { status:500 });
//   }
    
// }

export async function POST(request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image");
    const plantType = formData.get("type");

    if (!imageFile || !plantType) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Konversi file ke tensor
    const buffer = await imageFile.arrayBuffer();
    // const tensor = tf.node.decodeImage(new Uint8Array(buffer));

    // Panggil model yang sesuai
    // const model = await getModel(plantType);
    // const prediction = model.predict(tensor.expandDims(0));

    // Ekstrak hasil
    // const predictedValue = prediction.dataSync();

    // return NextResponse.json({ result: predictedValue });
    return NextResponse.json({ result: buffer });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
