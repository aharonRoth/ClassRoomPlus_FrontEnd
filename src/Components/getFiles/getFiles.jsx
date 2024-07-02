import React, { useState } from 'react';
import './getFiles.css';
import DeleteFile from '../deleteFile/DeleteFile';

const GetFiles = ({ images, teacher, fullFile, setFullFile }) => {
  console.log(fullFile);
  console.log(images);
  const [openDeleteFile, setopenDeleteFile] = useState(null)
  const [selectedFileId, setSelectedFileId] = useState(null);

  const handleDeleteFile = (imageId) => {
    setSelectedFileId(imageId);
    setOpenDeleteFile(true);
  };

  const handleToFullFile = () => {
    setFullFile(true)
  }
  const handleToFullFileClose = () => {
    setFullFile(false)
  }


  return (
    <>
  <div>
  {!fullFile && (
      <div>
        {images && (
          <div className='d-flex flex-wrap'>
            {images.map((image) => {
              return(
                <div key={image._id}>
                <button onClick={handleToFullFile}> Link </button>
                <p>name</p>
                  {/* <img src={`http://localhost:3000/${image.file}`} alt="" /> */}
                  {teacher && (
                    <button id='PostFile' onClick={() => handleDeleteFile(image._id)}>
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
      )}
      </div>
      <div>
      {fullFile && (
              <div>
              {images.map((image) => {
                return(
                  <div key={image._id} className='w-100 h-100'>
                    <button onClick={handleToFullFileClose}> x </button>
                    <img src={`http://localhost:3000/${image.file}`} alt="" />
                  </div>
                )
              })}
              </div>
      )}
      </div>
      </>
    );
  };



export default GetFiles;
