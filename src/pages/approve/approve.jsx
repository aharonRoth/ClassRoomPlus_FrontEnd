import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApproveStudent = ({ courseId, studentId }) => {
    const navigate = useNavigate();

    const handleApproveStudent = async () => {
        console.log('handleApproveStudent');
        try {
            console.log('courseId:', courseId);
            const response = await axios.put(`http://localhost:3000/mail/approvestudent?courseId=${courseId}&studentId=${studentId}`);
            console.log('Student approved:', response.data);
        } catch (error) {
            console.error('Error approving student:', error);
        }
    };

    useEffect(() => {
        handleApproveStudent();
    }, []);

    return (
        <div>
            <h1>Student Approved</h1>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
                Back to Home
            </button>
        </div>
    );
};

export default ApproveStudent;
