import React from 'react';
import { NavLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import styled from '@emotion/styled';

const NavLinkStyled = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 20px;
  &.active {
    color: #ffc300;
  }
  &:hover,
  &:focus {
    color: #ffc300;
  }
`;



export const AuthNav = () => {
  return (
    <Stack spacing={2} direction="row">
      <NavLinkStyled to="/register">
        Register
      </NavLinkStyled>
      <NavLinkStyled to="/login">
        Log In
      </NavLinkStyled>
    </Stack>
  );
};