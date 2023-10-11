import React from 'react';
import styled from 'styled-components';

export const TD = styled.td`
  font-size: 14px;
  font-weight: normal;
  text-transform: capitalize;
  white-space: nowrap;
  padding: 14px 5px;

  div {
    display: flex;
    align-items: center;
  }
`;

export const TableBody = styled.tbody`
  background-color: #fff;
`;

export const TableHeader = styled.thead`
  background-color: #00b39f;
  color: white;
`;

export const TableRow = styled.tr`
  position: relative;
  border-bottom: 1px solid lightgray;
  color: dark;
  background-color: ${props => (Number(props.id) % 2 ? '#E6FBF7' : 'inherit')};
`;

export const TH = styled.th``;
