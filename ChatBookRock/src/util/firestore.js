import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth";

export function fbcolDoc(collectionNm, documentNm){
    let obj = firestore()
        .collection(collectionNm)
        .doc(documentNm)
        .get()

    return obj
}

export const userObj = auth().currentUser;