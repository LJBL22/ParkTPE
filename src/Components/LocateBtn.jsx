import React from 'react';
import { MyLocationRounded } from '@mui/icons-material';
import styled from 'styled-components';

export const LocateBtn = ({ onClick }) => {
  return (
    <StyledBtn onClick={() => onClick?.()}>
      <MyLocationRounded />
    </StyledBtn>
  );
};

const StyledBtn = styled.button`
  background-color: var(--color-theme);
  width: 1.65rem;
  height: 1.65rem;
  position: absolute;
  top: 5.25rem;
  left: 1rem;
  z-index: 400;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: var(--color-dark);
    width: 2rem;
    height: 2rem;
  }
`;
