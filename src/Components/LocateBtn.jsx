import React from 'react';
import { MyLocationRounded } from '@mui/icons-material';
import styled from 'styled-components';

export const LocateBtn = () => {
  return (
    <StyledBtn>
      <MyLocationRounded />
    </StyledBtn>
  );
};

const StyledBtn = styled.button`
  background-color: var(--color-theme);
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 200px;
  z-index: 9999;
  /* cursor: pointer; */
  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const StyledBtn2 = styled(StyledBtn)`
  top: 300px;
`;
export const Btn2 = () => {
  return <StyledBtn2 />;
};
