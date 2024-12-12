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
    let sickness = "";
    let suggest = [];
    let isHealthy = true;
    
    if (modelType === "singkong") {
      const [cbb, cbsd, cgm, cmd, healty] = result;
      if (cbb > 0.4) {
        sickness = "Bercak Bakteri Singkong (CBB)";
        suggest = [
          "Buang dan hancurkan tanaman yang terinfeksi.",
          "Terapkan bakterisida yang sesuai.",
          "Pastikan jarak tanam yang baik untuk sirkulasi udara yang baik."
        ];
        isHealthy = false;
      } else if (cbsd > 0.4) {
        sickness = "Penyakit Garis Coklat Singkong (CBSD)";
        suggest = [
          "Buang dan hancurkan tanaman yang terinfeksi.",
          "Gunakan bahan tanam yang bebas penyakit.",
          "Lakukan rotasi tanaman untuk mencegah penumpukan penyakit di tanah."
        ];
        isHealthy = false;
      } else if (cgm > 0.4) {
        sickness = "Tungau Hijau Singkong (CGM)";
        suggest = [
          "Terapkan akarisida untuk mengendalikan populasi tungau.",
          "Gunakan varietas singkong yang tahan.",
          "Pelihara kebersihan ladang untuk mengurangi habitat tungau."
        ];
        isHealthy = false;
      } else if (cmd > 0.4) {
        sickness = "Penyakit Mozaik Singkong (CMD)";
        suggest = [
          "Gunakan bahan tanam bebas virus.",
          "Segera buang tanaman yang terinfeksi.",
          "Tanam varietas singkong yang tahan."
        ];
        isHealthy = false;
      } else {
        suggest = [
          "Pastikan tanaman mendapatkan sinar matahari yang cukup untuk fotosintesis yang optimal.",
          "Lakukan penyiraman secara teratur, terutama saat musim kemarau, agar tanah tetap lembab.",
          "Pantau tanaman secara teratur untuk tanda-tanda awal penyakit dan lakukan langkah pencegahan."
        ];
      }
    }

    const resultMessage = isHealthy
      ? "Tanaman dalam kondisi sehat."
      : `Tanaman terdeteksi sakit dengan penyakit ${sickness}.`;

    return {
        isSehat: isHealthy,
        penyakit: isHealthy ? null : sickness,
        saran: suggest,
        pesan: resultMessage,
    };
  } catch (error) {
    console.error("Prediction error:", error);
    throw new Error("Failed to process prediction.");
  }
}
