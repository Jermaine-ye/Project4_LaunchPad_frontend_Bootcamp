import React from 'react';
import LoginButton from './LoginButton';
import './css/RocketMainPage.css';

export default function RocketMainPage() {
  return (
    <div className="Rocket-main-page">
      <div className="Login-btn">
        <LoginButton />
      </div>
    </div>
  );
}
