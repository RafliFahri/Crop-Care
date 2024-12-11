import { NextRequest, NextResponse } from "next/server";
import { loadAllModels, getModel } from "@/lib/loadModels";
import { predictAction } from "@/lib/inferences";
// import "http";

export async function GET() {
  const data = await getModel("cassava");
//   console.log(data);
  
  return NextResponse.json({ result: "data" })
}

export async function POST(request) {
  try {
    const data = await request.formData();
    // console.log(data.formData().get('type'));
    // const response = await predictAction(image, type);
    return NextResponse.json({ data: data });
  } catch (err) {
    return new NextResponse('error broh', { status:500 });
  }
    
}