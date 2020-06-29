import firebase from 'react-native-firebase';

export function addFood(food, addComplete){
 
    // firebase.firestore()
    // .collection('Foods')
    // .add({
    //     name : food.name,
    //     color : food.color,
    //     createAt : firebase.firestore.FieldValue.serverTimestamp()
    // }).then((data) => addComplete(data))
    // .catch((error) => console.log(error));
}

export async function getFoods(foodsRetreived){

    // var foodList = [];

    // var snapshot = await firebase.firestore()
    // .collection('Foods')
    // .orderBy('createAt')
    // .get()

    // snapshot.forEach((doc) => {
    //     foodList.push(doc.data());
    // });

    // foodsRetreived(foodList);
}