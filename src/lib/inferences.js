import * as tf from "@tensorflow/tfjs-node";
import { getModel } from "./loadModels";

// loadAllModels();
export async function predictAction(image, modelType) {
  try {
    const model = await getModel(modelType);
    // If image has mime extension please use code below
    const tensor = tf.node.decodeJpeg(image).resizeNearestNeighbor([224, 224]).expandDims().toFloat();
    const prediction = model.predict(tensor);
    const result = await prediction.data()
    const [healthyScore, sickScore] = result;
    const isSick = sickScore > healthyScore;

    const resultMessage = isSick
      ? `Tanaman terdeteksi sakit dengan tingkat keparahan ${(
          sickScore * 100
        ).toFixed(2)}%. Segera lakukan tindakan pencegahan.`
      : `Tanaman dalam kondisi sehat dengan tingkat keyakinan ${(healthyScore * 100).toFixed(2)}%.`;

    return {
      result: isSick ? "sick" : "healthy",
      message: resultMessage,
    };
  } catch (error) {
    console.error("Prediction error:", error);
    throw new Error("Failed to process prediction.");
  }
}