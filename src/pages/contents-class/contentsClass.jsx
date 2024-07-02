import React, { useEffect, useId } from 'react'
import './contentsClass.css'
import axios from 'axios'
import { useState } from 'react'
import { useRef } from 'react'
import { json, useLocation } from 'react-router-dom'
import ContentsClassPeople from '../../Components/contents-class-people/ContentsClassPeople'
import UtilsCheckUserAndToken from '../../utils/utilsCheckUserAndToken'
import Chatroom from '../../Components/chatroom/chatroom.jsx'
import AddFile from '../../Components/addFile/AddFile'
import GetFiles from '../../Components/getFiles/getFiles'
import Chatbot from '../../Components/chatbot/chatbot'


import Header from '../../Components/header/Header'
import GetFullFIle from '../../Components/getFullFIle.jsx'


const ContentsClass = () => {

  const checkUserAndToken = UtilsCheckUserAndToken()
  const [friends, setFriends] = useState([])
  const [courses, setCourses] = useState(true)
  const [people, setPeople] = useState(null)
  const [chats, setChats] = useState(null)
  const [openPostFile, setOpenPostFile] = useState(null)
  const location = useLocation()
  const [teacher, setTeacher] = useState(false)
  const [images, setImages] = useState([]);
  const [fullFile, setFullFile] = useState(false)
  const [theFullFileId, setTheFullFileId] = useState('')

  const { courseId, openDate, endDate, courseName, description, price, userId, subscription } = location.state || {};

  const userInfo = localStorage.getItem('userInfo');
  // const avatar = JSON.parse(localStorage.getItem('avatar'));
  const name = JSON.parse(userInfo).data.user.firstName
  const { data } = JSON.parse(userInfo)
  const theUserId = data.user._id

  const isTeacher = (userId === theUserId) ? [{ role: 'teacher' }] : []

  useEffect(() => {
    checkUserAndToken();
    if (isTeacher.length > 0 && isTeacher[0].role === 'teacher') {
      setTeacher(true);
    }
  }, [checkUserAndToken, isTeacher]);

  // useEffect(() => {
  //   const fetchfriends = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:3000/courses/${courseId}`, { withCredentials: true });

  //       setFriends(res.data.course.subscriptions);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchfriends()
  // }, [courseId])




  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/files/course/${courseId}`, { withCredentials: true });
        // const files = res.data.files.map(item => ({ ...item, file: `http://localhost:3000/${item.file}` }))
        setImages(res.data.files);

      } catch (error) {
        console.log(error);
      }
    };

    fetchFiles();
  }, [courseId]);

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({});
  const targetRef = useRef(null);


  const togglePopup = () => {
    const { top, left } = targetRef.current.getBoundingClientRect();
    const popupTopPosition = top + window.scrollY - 30;
    setPosition({ top: popupTopPosition, left: left + window.scrollX });
    setIsOpen(!isOpen);
  };
  const handlePeople = () => {
    setPeople(true)
    setCourses(false)
    setChats(false)
    setOpenPostFile(false)

  }
  const handleChats = () => {
    setChats(true)
    setCourses(false)
    setPeople(false)
    setOpenPostFile(false)



  }
  const handleCourses = () => {
    setCourses(true)
    setPeople(false)
    setChats(false)
    setOpenPostFile(false)


  }
  const handleButtonPostFile = () => {
    setOpenPostFile(true)
  }

  return (
    <>
      <Header showLinks={false} showPartLinks={true} />
      <Chatbot />

      <div id='theContainer1'>
        <button onClick={handleCourses} className='mx-3' id={courses ? 'Courses1' : 'none'}>Courses</button>
        <button onClick={handleChats} className='mx-3' id={chats ? 'Courses1' : 'chats'}>Chats</button>
        <button onClick={handlePeople} className='mx-3' id={people ? 'Courses1' : 'people1'}>People</button>
      </div>
      <div id='theCourses1'>
        <h2>Files</h2>
        <div className='theFriends'>
          <div className='theFriend'>
            {/* <img className='friendimg' src='' alt='avatar' /> */}
        <GetFiles images={images} teacher={teacher} fullFile={fullFile} setFullFile={setFullFile}
         theFullFileId={theFullFileId}
         setTheFullFileId={setTheFullFileId}  />
          </div>
        </div>
      </div>
      {courses && !openPostFile && !fullFile && (
        <>
          <div id='theUl1'>
            <ul id='ul'>
              <li id='theLi'>
                <h2>{courseName}</h2>
              </li>
              <li>{openDate}</li>
              <li>{endDate}</li>
              <li ref={targetRef} onMouseEnter={togglePopup} onMouseLeave={togglePopup} className='text-decoration-underline' id='De'>{description}</li>
              <li>{price}</li>
              {teacher && (
                <button id='PostFile' onClick={handleButtonPostFile}>Post file</button>
              )}
            </ul>
            {isOpen && (
              <div id="popup" style={{ top: position.top, left: position.left }}>
                <span className="close" onClick={togglePopup}>&times;</span>
                <p>Here goes the text of the description.</p>
              </div>
            )}
          </div>
        </>
      )}
      {people && (
        <ContentsClassPeople courseId={courseId} />
      )}
      {chats && (
        <div>
          <Chatroom courseId={courseId} />
        </div>
      )}
      {openPostFile && (
        <div>
          <AddFile openPostFile={openPostFile} setOpenPostFile={setOpenPostFile} courseId={courseId} />
        </div>
      )}
      {fullFile && (
        <GetFullFIle fullFile={fullFile} setFullFile={setFullFile}
        theFullFileId={theFullFileId}
        />
      )}
    </>
  );
};

export default ContentsClass;
