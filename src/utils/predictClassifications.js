import Tensorflow from "@tensorflow/tfjs-node";

async function predictCassava(image, model) {
    const tensor = Tensorflow.node.decodeJpeg(image).resizeNearestNeighbor([224, 224]).expandDims().toFloat();
    const prediction = model.predict(tensor);
    const value = prediction.data();
}