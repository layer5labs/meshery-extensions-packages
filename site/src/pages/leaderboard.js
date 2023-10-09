import React from 'react';
import TableComponent from '../sitecomponents/Leaderboard/Table';
import { useFetchLeaderBoard } from '../api/leaderboard.api.client';
import Header from '../sitecomponents/Leaderboard/Header';

const LeaderBoard = () => {
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
    <section>
      <Header />
      <TableComponent
        data={_leaderboard}
        columns={leadColumns}
        loading={loadingLeaderBoard}
        option={period}
        setOption={setPeriod}
      />
    </section>
  );
};

export default LeaderBoard;
