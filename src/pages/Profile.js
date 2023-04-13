import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/Profile.css';

import favoriteImg from '../styles/images/favoriteHeart.svg';
import doneImg from '../styles/images/done.svg';
import logoutImg from '../styles/images/logout.svg';

function Profile({ history }) {
  const email = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <Header title="Profile" search={ false } />
      <div className="profile-main">
        <h2
          data-testid="profile-email"
        >
          { email && email.email }
        </h2>
        <div className="profile-buttons">
          <button
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            <img src={ doneImg } alt="done" />
            Done Recipes
          </button>
          <hr />
          <button
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            <img src={ favoriteImg } alt="favorite" />
            Favorite Recipes
          </button>
          <hr />
          <button
            data-testid="profile-logout-btn"
            onClick={ () => {
              localStorage.clear();
              history.push('/');
            } }
          >
            <img src={ logoutImg } alt="logout" />
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

export default Profile;
