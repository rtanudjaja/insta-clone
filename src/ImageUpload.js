import React, { useState } from 'react'
import { Button, LinearProgress } from '@material-ui/core'
import { storage, db } from './firebase';
import firebase from 'firebase';
import './ImageUpload.css';

function ImageUpload({username}) {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = (e) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      }, (error) => {
        console.log(error);
        alert(error.message);
      }, (complete) => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              username: username,
              caption: caption,
              imageUrl: url
            })
          })

        setCaption("");
        setImage(null);
        setProgress(0);
      }
    )
  }
  
  return (
    <div className="imageupload">
      <LinearProgress variant="determinate" value={progress} />
      <input type="text" placeholder="Enter a caption ..." onChange={event => setCaption(event.target.value)} />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>     
    </div>
  )
}

export default ImageUpload
