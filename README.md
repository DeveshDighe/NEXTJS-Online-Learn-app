# Online Lecture Scheduling Application

## Table of Contents
- [Primary Tools Used](#primary-tools-used)
- [Other Tools Used](#other-tools-used)
- [Key Features](#key-features)
- [Project Information](#project-information)

## Primary Tools Used
- Next.js
- React
- MongoDB

## Other Tools Used
- Axios
- Tailwind CSS
- Tailwind Components
- Bcrypt
- JSON Web Token (JWT)
- React Hot Toast
- Context API
- Nodemon
- Mongoose
- dotenv

## Key Features
- **Authentication**: Users can sign up and log in securely using JSON Web Tokens.
- **Admin Functionality**: Admins can create courses and schedule lectures for lecturers.
- **Lecture Scheduling**: Lecturers can view all lectures scheduled for them. Admins cannot schedule the same course lecture within a 5-hour gap, and if a lecturer already has a lecture scheduled on a particular date, the admin cannot schedule another lecture for the same lecturer on that date.
- **Course Information**: Users can view all courses and their details and visit individual course pages for more information.
- **Admin Insights**: Admins can see which lectures are assigned to which lecturers.

## Project Information
This project is an online lecture scheduling application designed to streamline the process of scheduling lectures and managing courses. It serves as a platform for educational institutions or organizations to efficiently organize and track their lecture schedules. The application provides intuitive interfaces for both administrators and lecturers, ensuring smooth communication and coordination.

Key functionalities include:

- **Admin Dashboard**: Administrators have access to a dashboard where they can manage courses, schedule lectures, and view insights about lecture assignments.
- **Lecturer Portal**: Lecturers can log in to view their scheduled lectures, making it easy to stay updated on their teaching commitments.
- **Course Management**: Users can browse through available courses, access detailed information about each course, and enroll as necessary.
- **Conflict Resolution**: The application incorporates logic to prevent scheduling conflicts, ensuring that lectures are scheduled efficiently without overlaps or duplications.

