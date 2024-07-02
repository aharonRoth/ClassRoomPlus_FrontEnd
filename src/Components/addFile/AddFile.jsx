import { useState } from 'react';
import './AddFile.css';
import axios from 'axios';

function AddFile({courseId, openPostFile, setOpenPostFile}) {

  const [file, setFile] = useState(null);
  const [formDetails, setFormDetails] = useState({});
  const [image, setImage] = useState('');

  const handleOnChange = e => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleFile = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(formDetails).map((attr) => formData.append(attr[0], attr[1]));
    axios
      .post(`http://localhost:3000/files/course/${courseId}`, formData, { withCredentials: true })
      .then((res) => {
        const imageUrl = `http://localhost:3000/${res.data.file.file}`;
        console.log(imageUrl);
        setImage(imageUrl);
        const correctedFilePath = correctFilePath(res.data.file.file);
        console.log(correctedFilePath);
        axios.get(`http://localhost:3000/${correctedFilePath}`, {withCredentials: true})
          .then(res => {
            console.log(res.data);
            const aimage = `http://localhost:3000/${correctedFilePath}`;
            setImage(aimage);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  
    const handleClosePostFile = () => {
      setOpenPostFile(false)
      window.location.reload()

    }
  const correctFilePath = (filePath) => {
    return filePath.replace(/\\/g, '/');

  };

  return (
    <>
      <main id='theFile'>
        <button id='thePostFileClose' onClick={handleClosePostFile}> x </button>
        <form className='form' onSubmit={handleSubmit}>
          <input id='theIn' type="file" name="file" accept=".jpg,.jpeg,.png,.doc,.docx,.pdf" onChange={handleFile} />
          <input id='inputs' type="text" name="post" placeholder='post' onChange={handleOnChange} />
          <input className='submit' type="submit" value="Upload" />
        </form>
        {image && (
          <div>
            <a href={image} target='_blank' rel='noopener noreferrer'>link</a>
            {formDetails.post && <p>{formDetails.post}</p>} 
            <img src={image} alt="" />
          </div>
        )}
      </main>
    </>
  );

}

export default AddFile;
