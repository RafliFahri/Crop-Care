import {Storage} from "@google-cloud/storage";
import Tensorflow from "@tensorflow/tfjs-node";
const storage = new Storage();
async function loadCassavaModel() {
    const bucketName = "crop-care-model";
    const fileName = "cassava/cassava_disease_classifier.h5";
    const bucket = storage.bucket(bucketName);
    try {
        console.log("Starting load Model");
        const model = await bucket.file(fileName).download();
        // console.log(`gs://${bucketName}/${fileName} downloaded and .`);
        // console.log(model.toString());
        return Tensorflow.loadLayersModel(model);
    } catch (err) {
        console.error(err);
    }
}

async function loadMaizeModel() {
    tf.loadLayersModel()
}

loadModel();

export { loadCassavaModel, loadMaizeModel };
