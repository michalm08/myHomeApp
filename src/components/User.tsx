import React from 'react';
import { UserDataInterface } from './UsersList';
import './User.scss';

interface UserProps {
  user: UserDataInterface;
  handleSelectedUser: (userId: number) => void;
}

const User: React.FC<UserProps> = ({ user, handleSelectedUser }) => {
  return (
    <>
      {user.show ? (
        <div className={`user ${user.selected ? 'user--selected' : ''}`} onClick={() => handleSelectedUser(user.id)}>
          {user.avatar ? (
            <img className="user__avatar" src={user.avatar} alt={`Avatar of: ${user.first_name} ${user.last_name}`} />
          ) : (
            <div className="user__custom-avatar">
              <p> {`${user.first_name[0]} ${user.last_name[0]}`}</p>
            </div>
          )}
          <div className="right-section">
            <p className="user__name">
              {user.first_name} {user.last_name}
            </p>
            <p className="user__email">{user.email}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default User;
