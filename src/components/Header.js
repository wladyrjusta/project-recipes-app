import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';
import iconHeader from '../styles/images/iconHeader.svg';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Header(props) {
  const { title, search } = props;

  const [searchArea, setSearchArea] = useState(false);

  return (
    <div>
      <div className="header-sup-container">
        <div className="header-sup-container-1">
          <img src={ iconHeader } alt="Sino" />
          <h1>
            RECIPES
            <span className="app-text"> app</span>
          </h1>
        </div>

        <div className="header-sup-container-2">
          {
            search && (
              <button
                className="search-icon-btn"
                onClick={ () => setSearchArea(!searchArea) }
              >
                <img
                  src={ searchIcon }
                  alt="Search Icon"
                  data-testid="search-top-btn"
                  className="search-icon"
                />
              </button>
            )
          }
          <Link to="/profile">
            <img
              src={ profileIcon }
              alt="Profile Icon"
              data-testid="profile-top-btn"
            />
          </Link>

        </div>

        <div className="header-inf-container">
          <div className="header-inf-container-1">
            <img
              src={ title === 'Meals' ? mealIcon : drinkIcon }
              alt={ `${title} Icon` }
            />
            <h1 data-testid="page-title">{ title }</h1>
          </div>

          <div className="header-inf-container-2">
            {
              (search && searchArea) && <SearchBar title={ title } />
            }
          </div>
        </div>

      </div>

    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
