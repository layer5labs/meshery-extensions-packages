import React, { useState } from 'react';
import TableComponent from '../sitecomponents/Leaderboard/Table';
import { useFetchLeaderBoard } from '../api/leaderboard.api.client';
import { useDarkMode } from '../sitecomponents/useDarkMode';
import { ThemeProvider } from 'styled-components';
import layer5LeaderboardLightMode from '../assets/images/layer5/Layer5_Learderboard_light.png';
import layer5LeaderboardDarkMode from '../assets/images/layer5/Layer5_Learderboard_darkmode.png';
import {
  GlobalStyle,
  darkTheme,
  lightTheme,
} from '../sitecomponents/index.style';
import Navigation from '../sitecomponents/Navigation';
import Header from '../sitecomponents/Leaderboard/Header';

const LeaderBoard = () => {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const [showSignUpButton, setShowSignUpButton] = useState(true);
  const {
    leaderBoard,
    leadColumns,
    loadingLeaderBoard,
    period,
    setPeriod,
    setName,
  } = useFetchLeaderBoard();

  const _leaderboard = React.useMemo(
    () =>
      Array.isArray(leaderBoard?.directory_items)
        ? leaderBoard?.directory_items
        : [],
    [leaderBoard]
  );

  const Logo =
    theme === 'light' ? layer5LeaderboardLightMode : layer5LeaderboardDarkMode;
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
          logo={Logo}
        />
        <Header />
        <TableComponent
          data={_leaderboard}
          columns={leadColumns}
          loading={loadingLeaderBoard}
          option={period}
          setOption={setPeriod}
          setName={setName}
        />
      </ThemeProvider>
    </>
  );
};

export default LeaderBoard;
