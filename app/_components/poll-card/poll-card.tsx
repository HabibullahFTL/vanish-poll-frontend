'use client';
import { IPoll } from '@/types';
import { cn } from '@/utils/cn';
import { addReactionToPoll, voteToPoll } from '@/utils/fetchers';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaMessage, FaShare } from 'react-icons/fa6';
import { useSWRConfig } from 'swr';
import Spinner from '../spinner';
import ReactionButton from './reaction-button';

interface IProps {
  isDetailedView?: boolean;
  pollData: IPoll;
}

const PollCard = ({ pollData, isDetailedView }: IProps) => {
  const isExpired = new Date(pollData.expiresIn) < new Date();
  const [isCopying, setIsCopying] = useState(false);

  const { mutate } = useSWRConfig();

  // Poll link
  const pollLink = `/poll/${pollData?._id}`;

  const handleCopyLink = () => {
    if (isCopying) return;

    setIsCopying(true);
    toast.loading('Copying the poll link', { id: 'copy-link' });

    setTimeout(() => {
      const finalLink = location.host + pollLink;
      navigator.clipboard.writeText(finalLink);
      setIsCopying(false);
      toast.success('Copied the poll link', {
        id: 'copy-link',
        duration: 4000,
      });
    }, 500);
  };

  const handleVoteToPoll = async (optionId: string) => {
    toast.loading('Voting to the poll...', { id: 'voting' });

    try {
      const response = await voteToPoll({ pollId: pollData?._id, optionId });
      toast.success(response?.message || 'Your vote counted successfully', {
        id: 'voting',
      });

      mutate(`/polls/${pollData?._id}`, response);
      mutate(`/polls`);
    } catch (error) {
      toast.error((error as { message: string })?.message || 'Failed to vote', {
        id: 'voting',
      });
    }
  };

  const handleAddReaction = async (reaction: 'like' | 'trending') => {
    toast.loading('Reacting to the poll...', { id: 'reaction' });

    try {
      const response = await addReactionToPoll({
        pollId: pollData._id,
        reaction,
      });
      toast.success(response?.message || 'Your reaction has been recorded', {
        id: 'reaction',
      });

      mutate(`/polls/${pollData._id}`, response);
      mutate(`/polls`);
    } catch (error) {
      toast.error(
        (error as { message: string })?.message || 'Failed to react',
        {
          id: 'reaction',
        }
      );
    }
  };

  const totalVoteCount = Object.keys(pollData?.votes || {})?.reduce(
    (prevCount, currentKey) => {
      return prevCount + (pollData?.votes || {})?.[currentKey];
    },
    0
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-300">
      <h2 className="font-semibold text-xl text-brand">{pollData.question}</h2>

      <div className="mt-3 space-y-2">
        {pollData.options.map((option) => (
          <label
            key={option.id}
            className={cn(
              `relative flex w-full items-center p-2 border rounded-md cursor-pointer transition border-gray-200 overflow-hidden`,
              isExpired ? 'cursor-not-allowed' : ''
            )}
          >
            {!pollData?.hideResults && (
              <div
                className="absolute bg-blue-600/20 h-full top-0 left-0 rounded-md"
                style={{
                  width: `${
                    ((pollData?.votes?.[option?.id] || 0) / totalVoteCount) *
                    100
                  }%`,
                }}
              />
            )}
            <input
              type="radio"
              name={`poll-${pollData._id}`}
              value={option.id}
              className="hidden"
              onChange={() => handleVoteToPoll(option.id)}
              disabled={isExpired}
            />
            <span className="w-5 h-5 flex items-center justify-center border-2 rounded-full mr-3">
              {/* {selectedOption === option.id && (
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              )} */}
            </span>
            <span className="flex-1 capitalize">{option.text}</span>
            <span
              className={cn(
                'font-bold text-blue-600',
                pollData?.hideResults ? 'hidden' : ''
              )}
            >
              {pollData.votes[option.id] || 0} votes
            </span>
          </label>
        ))}
      </div>

      {/* Expiry Info */}
      <div className="mt-3 text-sm text-gray-500 font-medium">
        {isExpired ? (
          <span className="text-red-500 font-semibold">Expired</span>
        ) : (
          `Expires in ${formatDistanceToNow(new Date(pollData.expiresIn))}`
        )}
      </div>

      {/* Reaction & Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-2 justify-between items-center text-gray-600">
        <div className="flex gap-2">
          {/* 🔥 Trending */}
          <ReactionButton
            emoji="🔥"
            count={pollData.reactions?.['trending'] || 0}
            onClick={() => handleAddReaction('trending')}
          />

          {/* 👍 Like */}
          <ReactionButton
            emoji="👍"
            count={pollData.reactions?.['like'] || 0}
            onClick={() => handleAddReaction('like')}
          />
        </div>

        <div className="flex gap-2">
          {/* 💬 Comments */}
          <Link
            href={isDetailedView ? '#comment-box' : pollLink + '#comment-box'}
            className={cn(
              'flex items-center cursor-pointer px-6 bg-blue-500 py-2 rounded text-white space-x-1 hover:text-gray-900 transition'
            )}
          >
            <FaMessage size={18} />
            <span className="text-sm">
              {isDetailedView ? 'Write a comment' : 'View comments'}{' '}
            </span>
          </Link>

          {/* 👁️ View */}
          <button
            onClick={handleCopyLink}
            className="group flex items-center cursor-pointer px-6 bg-blue-500 py-2 rounded text-white space-x-1 hover:bg-blue-600 transition gap-2"
          >
            {isCopying ? (
              <>
                {' '}
                <Spinner className="!size-5 group-hover:text-gray-200 group-hover:fill-gray-900" />{' '}
                <span className="text-sm">Copying</span>
              </>
            ) : (
              <>
                {' '}
                <FaShare size={18} /> <span className="text-sm">Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Poll result hidden info */}
      {pollData?.hideResults ? (
        <div className="mt-3 text-sm text-gray-700 border-cyan-300 bg-cyan-50 border rounded py-1 px-3">
          * Results are hidden for this poll.
        </div>
      ) : null}
    </div>
  );
};

export default PollCard;
