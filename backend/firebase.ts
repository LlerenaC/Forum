import admin, { ServiceAccount } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./finalproject-c7272-firebase-adminsdk-slzux-e77734e579.json";
import { cert } from "firebase-admin/app";

const app = admin.initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
})

const db = getFirestore();

export {db};
