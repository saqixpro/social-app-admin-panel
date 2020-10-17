import React, { useState } from "react";
import "../styles/main.css";
import { FilePicker } from 'react-file-picker'

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [textContent, setTextContent] = useState(null);
  const [sourceUrl, setSourceUrl] = useState(null);

  const handleSubmit = () => {
    alert(textContent);
  }

  return (
    <div className="db-container">
      <div className="db-cards vertical">
        <h1>POST OF THE DAY</h1>
        <p>Post of the day is shown to every user on the top of their home feed page</p>
      <div className="custom-file-upload">
      <FilePicker
        extensions={['heic', 'jpg', 'png', 'jpeg']}
        onChange={file => setImage(file)}
        onError={errMsg => alert(errMsg)}
       >
      <button className="btn">
      .</button>
     </FilePicker>
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
  );
};

export default NewPost;
