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

export const TH = styled.th`
  text-align: left;
  font-size: 12px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;
  padding: 20px 10px;
`;

export const StyledTableContainer = styled.article`
  display: flex;
  flex-direction: column;
  /* border: 1px solid #d1d5db; */
`;

export const StyledTableWrapper = styled.div`
  overflow-x: auto;
  margin: 0 -1rem;
`;

export const StyledTable = styled.table`
  width: 100%;
  background-color: #fff;
  margin: 0 auto;
  height: auto;
  overflow-y: scroll;
  position: relative;
`;
