import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const { title, search } = props;

  const [searchArea, setSearchArea] = useState(false);

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      <Link to="/profile">
        <img src={ profileIcon } alt="Profile Icon" data-testid="profile-top-btn" />
      </Link>
      {
        search && (
          <div>
            <button onClick={ () => setSearchArea(!searchArea) }>
              <img
                src={ searchIcon }
                alt="Search Icon"
                data-testid="search-top-btn"
              />
            </button>
            {
              searchArea && <SearchBar title={ title } />
            }
          </div>
        )
      }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};

export default Header;
