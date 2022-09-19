import React, { useEffect, useState } from 'react';
import { getUsersData } from '../services';
import './MainPage.scss';

interface UserDataInterface {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  avatar: string;
}

const MainPage = () => {
  const [usersData, setUsersData] = useState<UserDataInterface[]>([]);

  useEffect(() => {
    getUsersData().then((res) => {
      setUsersData(res.data);
    });
  }, []);

  return (
    <div className="MainPage">
      <h1>MainPage</h1>
      <p onClick={() => console.log(usersData[0])}>klik</p>
    </div>
  );
};

export default MainPage;
