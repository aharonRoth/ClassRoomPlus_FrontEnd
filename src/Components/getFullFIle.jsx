import React, { useEffect, useState } from 'react'
import './getFullFile.css'
import axios from 'axios'

const GetFullFIle = ({fullFile, setFullFile, theFullFileId }) => {
    const [theSelectedFile, setTheSelectedFile] = useState(null) 
    useEffect(() => {
        const fetchSelectedFile = async () => {
          try {
            const selectedFile = await axios.get(`http://localhost:3000/files/${theFullFileId}`, { withCredentials: true });
            setTheSelectedFile(selectedFile);
        } catch (error) {
            console.error('Error fetching the file:', error);
        }
    };
    
    fetchSelectedFile();
}, [theFullFileId]);
console.log(theSelectedFile);




const handleToFullFileClose = () => {
    setFullFile(false)
}

console.log(theSelectedFile);
    return (
        <div id='theFullFIleContinetr'>
            <div >
                            <div id='theCloseButoon'>
                                <button onClick={handleToFullFileClose}> x </button>
                            </div>
                            {theSelectedFile ? (
        <>
          <div>task: {theSelectedFile.data.file.post}</div>
          <img id="fullImage" src={`http://localhost:3000/${theSelectedFile.data.file.file}`} alt="" />
        </>
      ) : (
        <p>Loading...</p>
      )}
            </div>
        </div>
    )
}

export default GetFullFIle