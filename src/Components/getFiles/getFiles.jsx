import React, { useState } from 'react';
import './getFiles.css';
import DeleteFile from '../deleteFile/DeleteFile';

const GetFiles = ({ images, teacher, fullFile, setFullFile, theFullFileId, setTheFullFileId }) => {
  const [openDeleteFile, setopenDeleteFile] = useState(null)
  const [selectedFileId, setSelectedFileId] = useState(null);

  const handleDeleteFile = (imageId) => {
    setSelectedFileId(imageId);
    setopenDeleteFile(true);
  };

  const handleToFullFile = (fullFileId) => {
    setFullFile(true)
    setTheFullFileId(fullFileId)
  }
 

  return (
    <>
  <div>
      <div>
        {images && (
          <div className='d-flex flex-wrap'>
            {images.map((image) => {
              return(
                <div  id='theGetFilesContainter' key={image._id}>
                <button id='LinkButton' onClick={() => handleToFullFile(image._id)}> Link </button>
                <p>{image.post}</p>
                  {/* <img src={`http://localhost:3000/${image.file}`} alt="" /> */}
                  {teacher && (
                    <button id='deleteFile' onClick={() => handleDeleteFile(image._id)}>
                      Delete file
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
        {openDeleteFile && selectedFileId && (
          <DeleteFile theId={selectedFileId} />
        )}
      </div>
      </div>




 
      </>
    );
  };



export default GetFiles;
