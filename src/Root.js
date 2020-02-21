import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { AppContext, defaulIdentity } from './context/Context';
import toggleStylesheet from './helpers/toggleStylesheet';
import { getItemFromStore, setItemToStore } from './helpers/utils';
import { verifyAuth } from './actions/auth';
import { configureFakeBackend } from './helpers/fake-backend';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS
} from './actions/auth';

function authReducer(state = defaulIdentity, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: true
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {}
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true
      };
    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false
      };
    default:
      return state;
  }
}

const Root = props => {
  const [isFluid, setIsFluid] = useState(getItemFromStore('isFluid', false));
  const [isRTL, setIsRTL] = useState(getItemFromStore('isRTL', false));
  const [isDark, setIsDark] = useState(getItemFromStore('isDark', false));
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [currency, setCurrency] = useState('$');
  const [identity, setIdentity] = useReducer(authReducer, defaulIdentity);

  const value = {
    isFluid,
    setIsFluid,
    isRTL,
    setIsRTL,
    isDark,
    setIsDark,
    showBurgerMenu,
    setShowBurgerMenu,
    currency,
    setCurrency,
    identity,
    setIdentity
  };

  const setStylesheetMode = mode => {
    setItemToStore(mode, value[mode]);
    toggleStylesheet({ isRTL, isDark });
  };

  useEffect(() => {
    setStylesheetMode('isFluid');
    // eslint-disable-next-line
  }, [isFluid]);

  useEffect(() => {
    setStylesheetMode('isRTL');
    // eslint-disable-next-line
  }, [isRTL]);

  useEffect(() => {
    setStylesheetMode('isDark');
    // eslint-disable-next-line
  }, [isDark]);

  useEffect(() => {
    if(identity.isAuthenticated){
        window.localStorage.setItem('token', identity.user.token);
    }
    else{
      verifyAuth(setIdentity);
    }
    // eslint-disable-next-line
  }, [identity.isAuthenticated]);

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

Root.propTypes = { children: PropTypes.node };

// setup fake backend
configureFakeBackend();

export default Root;