import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';



const AdminDashboardIndexPage = () => {
  const { user } = useContext(AuthContext);

  // Get the current time and determine the greeting
  const currentHour = new Date().getHours();
  let greeting;
  if (currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  return (
    <div className="dashboard-container">
      <div className="greeting-container">
        <h1 className='mt-9 text-2xl'>{greeting}</h1>
        <h1 className='text-black lg:text-4xl md:text-3xl sm:text-lg text-lg mt-2'>Welcome Back,</h1>
        <h2 className='mt-3 lg:text-2xl md:text-2xl  sm:text-lg  text-lg  font-bold text-blue-950'>{user?.firstname} {user?.lastname}</h2>
        {/* <p>You are logged in as {user.role === 'admin' ? 'an Admin' : 'a Student'}.</p> */}
      </div>
    </div>
  );
};

export default AdminDashboardIndexPage;