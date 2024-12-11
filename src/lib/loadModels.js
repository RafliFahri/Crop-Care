import * as tf from "@tensorflow/tfjs-node";
const modelURL = {
  cassava: "https://storage.googleapis.com/crop-care-model/cassava/model.json",
  maize: "https://storage.googleapis.com/crop-care-model/maize/model.json"
};

const models = {}

async function loadModel(type) {
  if (!models[type]) {
    console.log(`Loading model: ${type}`);
    // models[type] = await tf.loadLayersModel(modelURL[type]);
    models[type] = await tf.loadGraphModel("file://model/model.json");
    // models[type].summary();
    console.log(`Model ${type} loaded successfully`);
  }
  return models[type];
}

async function ensureModelLoaded() {
  try {
    if (!models[type]) {
      await loadAllModels();
      console.log("Models loaded successfully.");
    }
    console.log("Models have been load");
  } catch (error) {
    console.error("Error loading models:", error);
    throw error;
  }
}  

export async function loadAllModels() {
  await Promise.all([loadModel("cassava"), loadModel("maize")]);
  console.log("Model has been loaded");
}

export async function getModel(type) {
  if (!models[type]) {
    throw new Error(`Model ${type} has not been loaded`);
  }
  return models[type];
}