"use client"


import Navbar from '@/components/UserComp/Navbar';
import React, { useEffect, useRef, useState } from 'react';

// import { api } from '../../../Configer/configure';
import toast from 'react-hot-toast'

import { useRouter } from 'next/navigation';
import axios from 'axios';

const CreateCourse = () => {
  const CourseName = useRef('');
  const CourseLevel = useRef('');
  const CourseDescription = useRef('');
  const CourseImgURL = useRef('');
  const CourseDurationNumber = useRef('');
  const CourseDurationWords = useRef('');

  const arr = ['Suresh', "Ramesh", 'Naresh'];

  const [allUsersData, setallUsersData] = useState([]);
  const [lectures, setLectures] = useState([]);

  const addLecture = () => {
    setLectures([...lectures, { date: '', time: '', lecturer: '' }]);
  };

  const navigate = useRouter()

  const fetchAllUsers =async () => {
    try {
      const response = await axios.get('/api/v1/users/getAllUser')

      if (response.data.success) {
        setallUsersData(response.data.allUserData)
        console.log(response.data.allUserData , 'response.data.allUserData');
      }
    } catch (error) {
      console.error(error)
    }
  }

  // const removeLecture = (index) => {
  //   const updatedLectures = [...lectures];
  //   updatedLectures.splice(index, 1);
  //   setLectures(updatedLectures);
  // };

  // const handleLectureChange = (index, key, value) => {
  //   const updatedLectures = [...lectures];
  //   updatedLectures[index][key] = value;
  //   setLectures(updatedLectures);
  // };

  // const handleSelectChange = (index, event) => {
  //   const updatedLectures = [...lectures];
  //   updatedLectures[index].lecturer = event.target.value;
  //   setLectures(updatedLectures);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseDuration = `${CourseDurationNumber.current.value} ${CourseDurationWords.current.value}`;
    const AllInputVal = {
      CourseName: CourseName.current.value,
      CourseLevel: CourseLevel.current.value,
      CourseDescription: CourseDescription.current.value,
      CourseImgURL: CourseImgURL.current.value,
      LecturesData: lectures,
      CourseDuration: courseDuration
    };
    console.log(AllInputVal, 'AllInputField');

    try {
      const response = await axios.post('/api/course/create', AllInputVal);
      console.log(response, 'response');
      if (response.data.success) {
        toast.success('Course is created')
        navigate.push('/')
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };



  useEffect(() => {
    fetchAllUsers()
  }, [])
  

  return (
    <>
    <Navbar/>
    <div className=' flex w-full justify-center'>
    <div className='w-2/4 border  mt-8 pb-4 rounded-md max-sm:w-full mx-4 border-gray-500'>
      <h1 className='my-8 text-3xl text-center'>Create Course</h1>
      <form onSubmit={handleSubmit} className='w-full px-4 flex flex-col gap-2'>
        <div className='flex gap-x-4'>
          <input
            ref={CourseName}
            className='border border-gray-400 outline-none w-full py-1 px-2 rounded-md'
            type='text'
            name='name'
            id='name'
            placeholder='Name'
          />
          <input
            ref={CourseLevel}
            className='border border-gray-400 outline-none w-full py-1 px-2 rounded-md'
            type='text'
            name='level'
            id='level'
            placeholder='Level (Difficulty)'
          />
        </div>
        <div>
          <textarea
            ref={CourseDescription}
            className='border rounded-md outline-none border-gray-400 w-full py-1 px-2 text-lg'
            name='description'
            id='description'
            cols='30'
            rows='5'
            placeholder='Description'
          ></textarea>
        </div>
        <div>
          <input
            ref={CourseImgURL}
            className='border rounded-md outline-none border-gray-400 w-full py-1 px-2 text-lg'
            type='text'
            placeholder='Image Link'
          />
        </div>
        <label htmlFor="CourseDurationNumber">Course Duration :</label>
        <div className='flex gap-x-4'>
          <input
            ref={CourseDurationNumber}
            className='border border-gray-400 outline-none w-full py-1 px-2 rounded-md'
            type='number'
            name='CourseDurationNumber'
            id='CourseDurationNumber'
            placeholder='eg: 10'
          />
          <input
            ref={CourseDurationWords}
            className='border border-gray-400 outline-none w-full py-1 px-2 rounded-md'
            type='text'
            name='CourseDurationWords'
            id='CourseDurationWords'
            placeholder='days / months / years'
          />
        </div>
        {/* <div className='mt-4'>
          {lectures.map((lecture, index) => (
            <div key={index} className='flex gap-x-4 mt-2 mb-2'>
              <select
                name="lecturers"
                id={`lecturer-${index}`}
                className='border border-gray-400 outline-none w-full py-1 px-1 rounded-md'
                value={lecture.lecturer}
                onChange={(e) => handleSelectChange(index, e)}
              >
                <option value="">Select Lecturer</option>
                {allUsersData.map((opt) => (
                  <option key={opt.name} value={opt.name}>{opt.name}</option>
                ))}
              </select>
              <input
                className='border border-gray-400 outline-none w-full py-1 px-1 rounded-md'
                type='date'
                value={lecture.date}
                onChange={(e) => handleLectureChange(index, 'date', e.target.value)}
              />
              <input
                className='border border-gray-400 outline-none w-full py-1 px-1 rounded-md'
                type='time'
                value={lecture.time}
                onChange={(e) => handleLectureChange(index, 'time', e.target.value)}
              />
              <button
                className='bg-red-500 text-white py-1 px-2 rounded-md'
                type='button'
                onClick={() => removeLecture(index)}
              >
                <MdDelete />
              </button>
            </div>
          ))}
          <button
            className='mt-2 py-1 px-4 bg-green-500 text-white rounded-md'
            type='button'
            onClick={addLecture}
          >
            Add Lecture
          </button>
        </div> */}
        <input type="submit" value={'Create Course'} className=' py-2 px-4 bg-blue-500 rounded-md text-white border w-2/4 m-auto' />
      </form>
    </div>
    </div>
    </>
  );
};

export default CreateCourse;
