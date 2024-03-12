import React from 'react';
import styled from 'styled-components';

export const Td = styled.td`
  font-size: 14px;
  font-weight: normal;
  text-transform: capitalize;
  white-space: nowrap;
  padding: 14px 5px;
  color: ${({ theme }) => theme.text};

  div {
    display: flex;
    align-items: center;
  }

  @media only screen and (max-width: 768px) {
    display: ${props => (props?.className === 'mobile-hidden' ? 'none' : null)};
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
  background-color: ${({ theme, id }) =>
    Number(id) % 2 ? theme.tableBgPrimary : theme.tableBgLight};
`;
export const TableHead = styled.tr`
  position: relative;
  border-bottom: 1px solid lightgray;
  color: dark;
  background-color: ${props => (Number(props.id) % 2 ? '#E6FBF7' : 'inherit')};
`;

export const Th = styled.th`
  text-align: left;
  font-size: 12px;
  color: '#fafafa';
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;
  padding: 20px 10px;

  @media only screen and (max-width: 768px) {
    display: ${props => (props?.className === 'mobile-hidden' ? 'none' : null)};
  }
`;

export const StyledTableContainer = styled.article`
  width: 1250px;
  max-width: 100%;
  margin: auto;
  margin-top: 20px;

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.text};
  }

  .toggle-container {
    span {
      color: ${({ theme }) => theme.text};
    }
  }

  .toggle-period {
    border: 1px solid gray;
    padding: 4px;
    border-radius: 2px;
    width: 64px;
    margin-left: 12px;
    outline: none;
  }
  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
`;

export const StyledTableWrapper = styled.div`
  overflow-x: auto;
  margin: auto;
  width: 100%;
`;

export const StyledTable = styled.table`
  width: 100%;
  background-color: #fff;
  margin: auto;
  height: auto;
  overflow-y: scroll;
  position: relative;
  border: none;
  border-collapse: collapse;
`;

export const PaginationContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 20px 0;
  .main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .page-btn-container {
      margin-bottom: 0;
    }
    .page-selector {
      display: flex;
      align-items: center;
    }
  }
  .page-section {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    margin-left: 20px;
    color: ${({ theme }) => theme.text};
  }
  input {
    border: 1px solid gray;
    padding: 4px;
    border-radius: 2px;
    width: 64px;
  }
  select {
    border: 1px solid gray;
    padding: 4px;
    border-radius: 2px;
    width: 64px;
  }

  @media only screen and (max-width: 768px) {
    .main {
      flex-direction: column;
      .page-btn-container {
        margin-bottom: 12px;
      }
    }
  }
`;

export const StyledButton = styled.button`
  border-radius: 2px;
  border: none;
  padding: 4px;
  font-size: 12px;
  text-transform: capitalize;
  margin: 2px;
  cursor: pointer;
  ${props =>
    props.disabled
      ? `
  background-color: #ccc;
  opacity: 0.6;
  cursor: not-allowed;
`
      : `
  background-color: #00B39F;
  color: #fff;
`}
`;

export const MemberContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};
  .avatar {
    height: 48px;
    width: 48px;
  }
  .username {
    margin-left: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      color: ${({ theme }) => theme.text};
      margin-bottom: 0px !important;
    }
  }
`;

export const RankContainer = styled.span`
  p {
    margin: auto;
    margin-left: 10px;
    color: ${({ theme }) => theme.text};
  }
`;
