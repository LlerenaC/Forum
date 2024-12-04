import admin, { ServiceAccount } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "./final-project-bbe82-firebase-adminsdk-zb54e-a4ffcccabb.json";
import { cert } from "firebase-admin/app";
import { initializeApp } from "firebase/app";

const app = admin.initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
})

const db = getFirestore(app);

export {db};
