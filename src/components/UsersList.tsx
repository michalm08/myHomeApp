import React, { useEffect, useState } from 'react';
import { getUsersData } from '../services';
import User from './User';
import './UsersList.scss';

interface UserDataResInterface {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  avatar: string;
}

export interface UserDataInterface extends UserDataResInterface {
  selected: boolean;
  show: boolean;
}

interface UsersListProps {
  searchInputValue: string;
}

const sortByLastName = (userA: UserDataInterface, userB: UserDataInterface) => {
  if (userA.last_name < userB.last_name) {
    return -1;
  }
  if (userA.last_name > userB.last_name) {
    return 1;
  }
  return 0;
};

const UsersList: React.FC<UsersListProps> = ({ searchInputValue }) => {
  const [usersData, setUsersData] = useState<UserDataInterface[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    getUsersData().then((res) => {
      let usersData: UserDataInterface[] = [];
      res.data.forEach((user: UserDataResInterface) => {
        usersData.push({ ...user, selected: false, show: true });
      });

      setUsersData(sortArray(usersData));
      setIsDataLoaded(true);
    });
  }, []);

  useEffect(() => {
    filterUsers(searchInputValue);
  }, [searchInputValue]);

  const sortArray = (arrayToSort: UserDataInterface[]) => {
    let sortedArray = arrayToSort.sort(sortByLastName);
    return sortedArray;
  };

  const filterUsers = (name: string) => {
    let usersDataCopy = JSON.parse(JSON.stringify(usersData));
    usersDataCopy = usersDataCopy.map((user: UserDataInterface) => {
      let fullName = user.first_name + ' ' + user.last_name;
      return { ...user, show: fullName.toLocaleLowerCase().includes(name.toLocaleLowerCase()) };
    });
    setUsersData(usersDataCopy);
  };

  const handleSelectedUser = (userId: number) => {
    let usersDataCopy = usersData.map((user) => {
      if (userId === user.id) {
        return { ...user, selected: !user.selected };
      } else {
        return { ...user };
      }
    });

    let arrToWrite: number[] = [];
    usersDataCopy.forEach((userData) => {
      if (userData.selected) {
        arrToWrite.push(userData.id);
      }
    });
    console.log(arrToWrite);
    setUsersData(usersDataCopy);
  };

  return (
    <div className="users-list">
      {isDataLoaded ? (
        <>
          {usersData.map((user) => (
            <User user={user} handleSelectedUser={handleSelectedUser} />
          ))}
        </>
      ) : (
        <>
          <div className="loader-container">
            <div className="loader" />
          </div>
        </>
      )}
    </div>
  );
};

export default UsersList;
