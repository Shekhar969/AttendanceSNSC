import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore"; 

const db = getFirestore();

async function copyAttendance(sourceCollection, destinationCollection) {
    try {
        const sourceRef = collection(db, sourceCollection);
        const snapshot = await getDocs(sourceRef);
        
        for (const docSnap of snapshot.docs) {
            const docData = docSnap.data();
            const destinationDocRef = doc(db, destinationCollection, docSnap.id);
            await setDoc(destinationDocRef, docData);
        }

        console.log(`Successfully copied ${snapshot.size} documents from ${sourceCollection} to ${destinationCollection}`);
    } catch (error) {
        console.error("Error copying collection: ", error);
    }
}

copyAttendance("StudentAttendance", "fifthSemAttendance");
