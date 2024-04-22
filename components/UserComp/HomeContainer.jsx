"use client"

import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Footer from './Footer.jsx'
import RotateLoader from "react-spinners/RotateLoader.js";
import axios from 'axios'
import { MyContext } from '@/Context/AuthContext'

const HomeContainer = () => {
  const [allData, setallData] = useState([])
  const [currentUser, setcurrentUser] = useState({})

  const navigate = useRouter()
  const { state, dispatch } = useContext(MyContext)

  const getAllCourseData = async () => {
    try {
      const response = await axios.get('/api/course')
      if (response.data.success) {
        setallData(response.data.allCoursesData)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllCourseData()
  }, [])

  return (
    <>
      <div className='text-blue-500 text-center text-2xl my-6 font-bold'>All Courses</div>
      {allData.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 px-2 gap-y-8 gap-x-5  '>
          {allData.map((data) => (
            <div key={data._id} onClick={() => navigate.push(`course/single_course/${data._id}`)} className='border border-gray-300 rounded-md shadowBox px-1 pb-3 cursor-pointer '>
              <div className='flex flex-col gap-y-1'>
                <h1 className='mt-1 font-ThirdFont text-lg text-center font-bold text-slate-900'>{data.CourseName}</h1>
                <div>
                  <img src={data.CourseImgURL} alt="" />
                </div>
                <p><span className='text-[18px] font-bold font-ThirdFont'>Level :</span> {data.CourseLevel}</p>
                <p><span className='text-[18px] font-bold font-ThirdFont'>Course Duration :</span> {data.CourseDuration}</p>
                <p><span className='text-[18px] font-bold font-ThirdFont'>Description : </span>{data.CourseDescription}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
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
  
}

export default HomeContainer
