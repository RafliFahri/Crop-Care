"use server";
import * as tf from "@tensorflow/tfjs-node"
const modelURL = {
  cassava: "https://storage.googleapis.com/crop-care-model/cassava/model.json",
  maize: "https://storage.googleapis.com/crop-care-model/maize/model.json"
};
// const maizeModelURL = "https://storage.googleapis.com/crop-care-model/maize/model.json";

const models = {}

async function loadModel(type) {
  if (!models[type]) {
    console.log(`Loading model: ${type}`);
    models[type] = await tf.loadLayersModel(modelURL[type]);
    console.log(`Model ${type} loaded successfully`);
  }
  // model[cassava] = await tf.loadLayersModel(cassavaModelURL);
  // model[maize] = await tf.loadLayersModel(maizeModelURL);

  return models[type];
}

async function loadAllModels() {
  await Promise.all([loadModel(cassava), loadModel(maize)]);
  console.log("Model has been loaded");
  
}

function getModel(type) {
  if (!models[type]) {
    throw new Error(`Model ${type} has not been loaded`);
  }
  return models[type];
}

exports = { loadAllModels, getModel };