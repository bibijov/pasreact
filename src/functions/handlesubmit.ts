import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";

const handleSubmit = (testdata: String) => {
  const ref = collection(db, "autoSkole");
  let data = {
    testData: testdata,
  };
  try {
    addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
};
export default handleSubmit;
