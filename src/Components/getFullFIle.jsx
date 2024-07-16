import React, { useEffect, useState } from 'react';
import './getFullFile.css';
import axios from 'axios';

const GetFullFIle = ({ fullFile, setFullFile, theFullFileId }) => {
    const [theSelectedFile, setTheSelectedFile] = useState(null);

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

    const handleToFullFileClose = () => {
        setFullFile(false);
    }

    const renderFile = () => {
        if (theSelectedFile) {
            const fileType = theSelectedFile.data.file.file.split('.').pop().toLowerCase();
            const filePath = `http://localhost:3000/${theSelectedFile.data.file.file}`;

            if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(fileType)) {
                return <img id="full" src={filePath} alt="" />;
            } else{
                return <iframe id="full" src={filePath} title="file" />;
            } 
            // else {
            //     return <iframe id="fullFile" src={filePath} title="file" />;
            // }
        }

        return <p>Loading...</p>;
    }

    return (
        <div id='theFullFIleContinetr'>
            <div>
                <div id='theCloseButoon'>
                    <button onClick={handleToFullFileClose}> x </button>
                </div>
                <div>task: {theSelectedFile ? theSelectedFile.data.file.post : 'Loading...'}</div>
                {renderFile()}
            </div>
        </div>
    );
}

export default GetFullFIle;
