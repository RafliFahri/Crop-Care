import { NextResponse } from "next/server";
import { loadAllModels, getModel } from "@/lib/loadModels";
import { predictAction } from "@/lib/inferences";
// import "http";

async function ensureModelLoaded() {
    try {
      await loadAllModels();
      console.log("Models loaded successfully.");
    } catch (error) {
      console.error("Error loading models:", error);
      throw error;
    }
}  

await ensureModelLoaded();

export async function GET() {
  const data = await getModel("cassava");
//   console.log(data);
  
  return NextResponse.json({ result: "data" })
}
export async function POST(request) {
    const data = await request.formData();
    const type = data.get("tipe");
    const image = data.get("image");

    const response = await predictAction(image, type);
    
    return NextResponse.json({ data: response });
}