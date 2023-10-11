import { useQuery } from '@tanstack/react-query';

import React, { useState } from 'react';
import { client } from './client';
import { totalPoints } from '../../utils/helpers';
import { bronze, gold, silver } from '../assets/images/medals';

export const useFetchLeaderBoard = () => {
  const fetchLeaderBoard = async period => {
    try {
      const response = await client.get(
        `directory_items.json/?order=likes_received&period=${
          period || 'monthly'
        }`
      );
      return response?.data;
    } catch (error) {
      throw error;
    }
  };

  const [period, setPeriod] = useState('monthly');
  const leadColumns = React.useMemo(
    () => [
      {
        header: 'Rank',
        accessorKey: '',
        cell: info => {
          const value = info?.row?.index + 1;
          const rank = ['', gold, silver, bronze];
          return (
            <span>
              {[1, 2, 3].includes(value) ? (
                <img src={rank[value]} alt={'Rank'} />
              ) : (
                <p className="ml-4">{value}</p>
              )}
            </span>
          );
        },
      },
      {
        header: 'Member',
        accessorKey: 'avatar',
        accessorFn: row => row?.user?.name,
        cell: info => {
          const { user } = info?.row?.original;
          const avatarUrl = user.avatar_template
            .replace('{size}', '50')
            .replace('{username}', user.username);
          return (
            <div className="flex items-center">
              <div className="w-12 h-12">
                <img
                  src={`https://discuss.layer5.io/${avatarUrl}`}
                  alt={user?.name}
                  className="w-full h-full rounded-full"
                />
              </div>
              <div className="ml-4 flex-1">
                <p className="flex-1">{user?.name}</p>
              </div>
            </div>
          );
        },
      },
      {
        header: 'Likes',
        accessorKey: 'likes_received',
        cell: info => info?.getValue(),
      },
      {
        header: 'Visits',
        accessorKey: 'days_visited',
        cell: info => info?.getValue(),
      },
      {
        header: 'Posts',
        accessorKey: 'post_count',
        cell: info => info?.getValue(),
      },
      {
        header: 'Solutions Accepted',
        accessorKey: 'solutions',
        cell: info => info?.getValue(),
      },
      {
        header: 'Total Points',
        accessorKey: 'points',
        cell: info => {
          const { likes_received, post_count, solutions } = info?.row?.original;
          return (
            <span>{totalPoints(post_count, likes_received, solutions)}</span>
          );
        },
      },
    ],
    []
  );

  const { data: leaderBoard, isFetching: loadingLeaderBoard } = useQuery({
    queryKey: ['leader-board', period],
    queryFn: () => fetchLeaderBoard(period),
    onError: () => {
      //  TODO: implement alerts for erros
    },
  });
  return { leaderBoard, loadingLeaderBoard, leadColumns, period, setPeriod };
};
