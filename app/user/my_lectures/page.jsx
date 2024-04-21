"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import RotateLoader from "react-spinners/RotateLoader.js";
import Navbar from '@/components/UserComp/Navbar';
import Footer from '@/components/UserComp/Footer';
import axios from 'axios';


const Lectures = () => {
  const [lectures, setLectures] = useState([]);
  const navigate = useRouter();

  const getAllLectures = async () => {
    try {
      const response = await axios.get('/api/users/getUserlectures');
      if (response.data.success) {
        console.log(response.data.lectures.lectures, 'response.data.lectures');
        setLectures(response.data.lectures.lectures); // Ensure lectures is an array
      }
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllLectures();
  }, []);

  return (
    <>
      <Navbar />
      <div className="text-blue-500 text-center text-2xl my-6 font-bold">Your Scheduled Lectures</div>
      {lectures.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 px-2 gap-y-8 gap-x-5">
        {lectures.map((lecture) => (
          <div key={lecture._id} className="border border-gray-300 rounded-md shadowBox px-1 pb-3 cursor-default">
            <div className="flex flex-col gap-y-1">
              <h1 className="mt-1 text-lg font-bold text-center text-slate-700">{lecture.Course.CourseName}</h1>
              <div>
                <img className="w-full h-auto" src={lecture.Course.CourseImgURL} alt={lecture.Course.CourseName} />
              </div>
              <p><span className="text-[18px] font-bold">Date : </span> {lecture.date.slice(0, 10)}</p>
              <p>
                <span className="text-[18px] font-bold">Time : </span>
                {lecture.time}
                {lecture.time && (
                  <span className="text-[16px] font-normal">
                    {parseInt(lecture.time.split(':')[0]) >= 12 ? ' PM' : ' AM'}
                  </span>
                )}
              </p>

              <p><span className="text-[18px] font-bold">Level : </span> {lecture.Course.CourseLevel}</p>
              <p><span className="text-[18px] font-bold">Course Duration : </span> {lecture.Course.CourseDuration}</p>
              <p><span className="text-[18px] font-bold">Description : </span> {lecture.Course.CourseDescription}</p>
            </div>
          </div>
        ))}
      </div>
      )
      : (
        <div className='h-[900px] flex justify-center items-center w-full'>
          <RotateLoader
            color="#36d1d6"
            speedMultiplier={1}
          />
        </div>
      )}
      <Footer />
    </>
  );
};

export default Lectures;