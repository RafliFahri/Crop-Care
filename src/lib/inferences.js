import * as tf from "@tensorflow/tfjs-node";
import { getModel } from "./loadModels";

export async function predictAction(imageBuffer, modelType) {
  try {
    const model = await getModel(modelType);
    console.log(modelType);
    
    // Convert the image buffer to a tensor
    const tensor = tf.node.decodeImage(imageBuffer, 3)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()
      // .div(tf.scalar(255.0)); // Normalize the image data

    const prediction = model.predict(tensor);
    const result = await prediction.data();
    console.log(result);
    const [healthyScore, sickScore] = result;
    const isSick = sickScore > healthyScore;

    const resultMessage = isSick
      ? `Tanaman terdeteksi sakit dengan tingkat keparahan ${(sickScore * 100).toFixed(2)}%. Segera lakukan tindakan pencegahan.`
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
