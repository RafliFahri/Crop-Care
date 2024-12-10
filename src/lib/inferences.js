"use server";
import * as tf from "@tensorflow/tfjs-node";
import models from "./loadModels";

async function predictAction(image, modelType) {
  try {
    const model = models(modelType);
    // If image has mime extension please use code below
    const tensor = tf.node();
  } catch (e) {
    
  }
}