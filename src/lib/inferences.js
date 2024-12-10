"use server";
import * as tf from "@tensorflow/tfjs-node";
import models from "./loadModels";

async function predictAction(image, modelType) {
  try {
    const model = await models();
    // If image has mime extension please use code below
    const tensor = tf.node.decodeJpeg(image).resizeNearestNeighbor([224, 224]).expandDims().toFloat();
    const predict = model.predict();
    const result = predict.data();
  } catch (e) {
    
  }
}