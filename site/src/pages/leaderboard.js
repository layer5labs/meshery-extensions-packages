import React, { useState } from 'react';
import TableComponent from '../sitecomponents/Leaderboard/Table';
import { useFetchLeaderBoard } from '../api/leaderboard.api.client';
import Header from '../sitecomponents/Leaderboard/Header';
import { useDarkMode } from '../sitecomponents/useDarkMode';
import { ThemeProvider } from 'styled-components';
import {
  GlobalStyle,
  darkTheme,
  lightTheme,
} from '../sitecomponents/index.style';
import Navigation from '../sitecomponents/Navigation';

const LeaderBoard = () => {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const [showSignUpButton, setShowSignUpButton] = useState(true);
  const { leaderBoard, leadColumns, loadingLeaderBoard, period, setPeriod } =
    useFetchLeaderBoard();

  const _leaderboard = React.useMemo(
    () =>
      Array.isArray(leaderBoard?.directory_items)
        ? leaderBoard?.directory_items
        : [],
    [leaderBoard]
  );

  return (
    <>
      <title>Layer5 LeaderBoard</title>
      <meta
        name="description"
        content="Showcasing Your Achievements as a User and a Contributor"
      />
      <ThemeProvider theme={themeMode}>
        <GlobalStyle />
        <Navigation
          theme={theme}
          toggleTheme={toggleTheme}
          showSignUpButton={showSignUpButton}
        />
        <section>
          <TableComponent
            data={_leaderboard}
            columns={leadColumns}
            loading={loadingLeaderBoard}
            option={period}
            setOption={setPeriod}
          />
        </section>
      </ThemeProvider>
    </>
  );
};

export default LeaderBoard;
