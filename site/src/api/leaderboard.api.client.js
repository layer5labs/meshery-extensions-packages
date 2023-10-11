import { useQuery } from '@tanstack/react-query';

import React, { useState } from 'react';
import { client } from './client';
import { totalPoints } from '../../utils/helpers';
import { bronze, gold, silver } from '../assets/images/medals';
import Avatar from '../reusecore/Avatar';
import styled from 'styled-components';

export const useFetchLeaderBoard = () => {
  const MemberContainer = styled.div`
    display: flex;
    align-items: center;
    color: #333;
    .avatar {
      height: 48px;
      width: 48px;
    }
    .username {
      margin-left: 16px;
      flex: 1;
      p {
        flex: 1;
        color: #333;
      }
    }
  `;

  const RankContainer = styled.span`
    p {
      margin-left: 16px;
      color: black;
    }
  `;
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
            <RankContainer>
              {[1, 2, 3].includes(value) ? (
                <img src={rank[value]} alt={'Rank'} />
              ) : (
                <p>{value}</p>
              )}
            </RankContainer>
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
            <MemberContainer className="flex items-center">
              <div className="avatar">
                <Avatar
                  src={`https://discuss.layer5.io/${avatarUrl}`}
                  alt={user?.name}
                />
              </div>
              <div className="username">
                <p>{user?.name}</p>
              </div>
            </MemberContainer>
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
