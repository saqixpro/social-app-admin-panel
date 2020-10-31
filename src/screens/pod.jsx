import React, { useState } from "react";
import "../styles/main.css";
import { FilePicker } from 'react-file-picker'
import firebase from 'firebase'
import {Loading} from '../components'
const NewPost = () => {
  const [image, setImage] = useState(null);
  const [textContent, setTextContent] = useState(null);
  const [sourceUrl, setSourceUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
  if(image && textContent && sourceUrl){
    updatePostOfTheDay();
  } else alert(`Missing Fields`);

  
  }

  const updatePostOfTheDay = async () => {
    setLoading(true);
    try {
      const imageRef = firebase.storage().ref().child('pod/');
      imageRef.put(image).then(async (res) => {
      const url = await imageRef.getDownloadURL();

      const data = {
        image: url, 
        textContent, 
        sourceUrl,
        likes: [],
        comments: []
      }

      await firebase.firestore().collection('pod').doc('pod').set(data);
      setLoading(false);
    })
    } catch(error) {
      setLoading(false);
      console.log(error.message);
    }
  }



  return (
    <div className="db-container">
     <div className="db-cards">
     <div className="borderedContainer">
        <h1 className="header">POST OF THE DAY</h1>
      <div className="custom-file-upload">
     {loading ? (
       <Loading />
     ) : (
      <FilePicker
      extensions={['heic', 'jpg', 'png', 'jpeg']}
      onChange={file => setImage(file)}
      onError={errMsg => alert(errMsg)}
     >
    <button className="btn">
      <img src={require('../assets/images/image.png')} style={{width: '100%', height: '100%'}} />
    .</button>
   </FilePicker>
     )}
      </div>
      <div style={{marginTop: '2%'}} />
      <div className="text-input">
       <input type="text" name="textContent" onChange={(e) => setTextContent(e.target.value) } placeholder="What's going on?" />
      </div>
      <div className="text-input">
       <input type="text" name="textContent" onChange={(e) => setSourceUrl(e.target.value)} placeholder="Source Link?" />
      </div>
      <div className="submit-button">
      <button onClick={handleSubmit}>
        <p className="btn-text">Submit</p>
      </button>
      </div>
      </div>
     </div>
    </div>
  );
};

export default NewPost;
