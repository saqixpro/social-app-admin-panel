import firebase from 'firebase';

export default class Posts {
    static fetchAllPosts(){
        return new Promise(async resolve => {
            const posts = await firebase.firestore().collection('posts').get();
            resolve({posts: posts.docs})
        })
    }
}