"use server";
import * as tf from "@tensorflow/tfjs-node"
const cassavaModelURL = "https://storage.googleapis.com/crop-care-model/cassava/model.json";
const maizeModelURL = "https://storage.googleapis.com/crop-care-model/maize/model.json";

let model = {}

async function loadModels(type) {
  model[cassava] = await tf.load(cassavaModelURL);
  model[maize] = await tf.load(cassavaModelURL);

  return model;
}

export default loadModels;
