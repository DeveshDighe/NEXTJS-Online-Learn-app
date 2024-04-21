"use client"

import React, { useEffect, useState, useContext } from 'react';
import { MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation.js';

import { MyContext } from '@/Context/AuthContext';
import axios from 'axios';
import Navbar from '@/components/UserComp/Navbar';


const SingleCoursePage = () => {
  const [singelCourseData, setsingelCourseData] = useState({});
  const [lectures, setLectures] = useState([]);
  const [allUsersData, setallUsersData] = useState([]);
  const {state , dispatch} = useContext(MyContext)
  
  const { id } = useParams();
  console.log('Id', id);
  const navigate = useRouter()

  const removeLecture = (indexToRemove) => {
    setLectures((prevLectures) => {
      // Filter out the lecture at the specified index
      return prevLectures.filter((_, index) => index !== indexToRemove);
    });
  };

  const addLecture = () => {
    setLectures([...lectures, { date: '', time: '', lecturer: '' }]);
  };

  const createLecture = async (e) => {
    try {
      console.log('tatatat');
      const response = await axios.post(`/api/course/addLectures/${id}`, lectures);
      if (response?.data?.success) {
        toast.success(response.data.message);
        navigate.push('/')
      }
    } catch (error) {
      console.log(error, 'errrrr');
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('/api/users/getAllUser');
      if (response.data.success) {
        setallUsersData(response.data.allUserData);
        console.log(response.data.allUserData, 'response.data.allUserData');
      }
    } catch (error) {
      console.error(error);
    }
  };  

  const requestSingleData = async () => {
    try {
      console.log('Is it requsting or not');
      const response = await axios.get(`/api/course/single_course/${id}`);
      if (response.data.success) {
        console.log(response.data.singleCourse, 'afafafafafafaffafaff');
        setsingelCourseData(response.data.singleCourse);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (index, event) => {
    const updatedLectures = [...lectures];
    updatedLectures[index].lecturer = event.target.value;
    setLectures(updatedLectures);
  };

  const handleLectureChange = (index, key, value) => {
    const updatedLectures = [...lectures];
    updatedLectures[index][key] = value;
    setLectures(updatedLectures);
  };


  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (id) {
      requestSingleData();
    }
  }, [id]);

  console.log(lectures.length  , 'allluserseData');

  return (
    <div className="">
      <Navbar/>
      <div className='  w-2/3 m-auto border mt-4 rounded-md px-2 pb-4'>
      <div className="mt-8 ">
        <h1 className="text-3xl font-bold text-center">{singelCourseData?.CourseName}</h1>
        <div className="mt-4">
          <img src={singelCourseData?.CourseImgURL} alt={singelCourseData?.CourseName} className="w-96 h-auto mx-auto" />
        </div>
        <p className="mt-4 text-lg"><span className="text-[18px] font-bold">Level : </span>{singelCourseData?.CourseLevel} </p>
        <p className="mt-2"><span className="text-[18px] font-bold">Course Description : </span>{singelCourseData?.CourseDescription}</p>
        <p className="mt-2"><span className="text-[18px] font-bold">Course Duration : </span>  {singelCourseData?.CourseDuration}</p>
      </div>

      {state?.user?.role === 'ADMIN' && (
  <div className="mt-8">
    <h2 className="text-xl font-bold text-center">Scheduled Lectures</h2>
    {singelCourseData?.lectures?.length > 0 ? (
      singelCourseData.lectures.map((lecture, index) => (
        <div key={index} className="mt-4 border border-gray-300 rounded-md p-4">
          <p className="font-bold">Lecturer: {lecture.lecturer.name}</p>
          <p>Date: {lecture.date.slice(0, 10)}</p>
          <p>
            <span className="text-[18px] font-bold">Time : </span>
            {lecture.time}
            {lecture.time && (
              <span className="text-[16px] font-normal">
                {parseInt(lecture.time.split(':')[0]) >= 12 ? ' PM' : ' AM'}
              </span>
            )}
          </p>
        </div>
      ))
    ) : (
      <p className="my-20 text-center">Nothing to show</p>
    )}
  </div>
)}

    {state?.user?.role == "ADMIN" && (
      <div className="mt-8">
        {lectures.map((lecture, index) => (
          <div key={index} className="flex justify-between gap-4 items-center mt-4 w-full">
          <select
            name={`lecturer-${index}`}
            className="border border-gray-400 py-2 px-4 rounded-md outline-none flex-grow "
            value={lecture.lecturer}
            onChange={(e) => handleSelectChange(index, e)}
          >
            <option value="">Select Lecturer</option>
            {allUsersData.map((opt) => (
              <option key={opt.name} value={opt.name}>
                {opt.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={lecture.date}
            className="border border-gray-400 py-2 px-4 rounded-md outline-none"
            onChange={(e) => handleLectureChange(index, 'date', e.target.value)}
          />
          <input
            type="time"
            value={lecture.time}
            className="border border-gray-400 py-2 px-4 rounded-md outline-none"
            onChange={(e) => handleLectureChange(index, 'time', e.target.value)}
          />
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md"
            type="button"
            onClick={() => removeLecture(index)}
          >
            <div className=' h-full'>

            <MdDelete />
            </div>
          </button>
        </div>
        
        ))}
        <div className="mt-4 flex justify-between">
    <button
      className="bg-green-500 text-white py-2 px-4 rounded-md mr-2"
      type="button"
      onClick={addLecture}
    >
      Add Lecture
    </button>
    {lectures.length > 0 && (
      <button
        className="bg-green-500 text-white py-2 px-4 rounded-md"
        type="button"
        onClick={(e) => createLecture(e)}
      >
        Create Lecture
      </button>
    )}
  </div>
      </div>
      )}
      </div>
    </div>
  );
};

export default SingleCoursePage;

