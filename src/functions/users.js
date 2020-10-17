import firebase from 'firebase';

export default class Users {
    static fetchAllUsers(){
        return new Promise(async resolve => {
            const users = await firebase.firestore().collection('users').get();
            resolve({users: users.docs})
        })
    }
}