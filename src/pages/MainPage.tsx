import React, { useState } from 'react';
import UsersList from '../components/UsersList';
import './MainPage.scss';

const MainPage = () => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const handleChange = (e: any) => {
    setSearchInputValue(e.target.value);
  };

  return (
    <div className="main-page">
      <div className="header-container">
        <h1 className="header">Contacts</h1>
      </div>
      <input type="text" className="search" value={searchInputValue} onChange={(e) => handleChange(e)} />
      <UsersList searchInputValue={searchInputValue} />
    </div>
  );
};

export default MainPage;
