import React from 'react';
import styled from 'styled-components';

export const TD = styled.td``;

export const TableBody = styled.tbody``;

export const TableHeader = styled.thead``;

export const TableRow = styled.tr`
  position: relative;
  border-bottom: 1px solid lightgray;
  color: dark;
  background-color: ${props =>
    Number(props.id) % 2 ? 'primary-100' : 'inherit'};
`;

export const TH = styled.th``;
