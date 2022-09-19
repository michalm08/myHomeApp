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

const solrtByLastName = (userA: UserDataInterface, userB: UserDataInterface) => {
  if (userA.last_name < userB.last_name) {
    return -1;
  }
  if (userA.last_name > userB.last_name) {
    return 1;
  }
  return 0;
};

const MainPage = () => {
  const [usersData, setUsersData] = useState<UserDataInterface[]>([]);

  const sortArray = (arrayToSort: UserDataInterface[]) => {
    let sortedArray = arrayToSort.sort(solrtByLastName);
    console.log(sortedArray);
    return sortedArray;
  };
  // git commit -m 'feat(front): show list of user
  useEffect(() => {
    getUsersData().then((res) => {
      setUsersData(sortArray(res.data));
    });
  }, []);

  return (
    <div className="MainPage">
      <h1>MainPage</h1>
      <p onClick={() => console.log(usersData[0])}>klik</p>
      {usersData.map((user) => (
        <div>
          <img src={user.avatar} alt={`Avatar of: ${user.first_name} ${user.last_name}`} />
          <p>{user.first_name} | {user.last_name}</p>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
