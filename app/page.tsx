'use client';
import { fetchPolls } from '@/utils/fetchers';
import useSWR from 'swr';
import PollCard from './_components/poll-card/poll-card';

export default function Home() {
  const { data, isLoading } = useSWR('/polls', fetchPolls, {
    revalidateOnFocus: false,
  });

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        📊 Active Public Polls
      </h1>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-4 bg-gray-100 animate-pulse rounded-lg h-40"
            ></div>
          ))}
        </div>
      )}

      {/* Poll List */}
      {!isLoading && data?.data?.length === 0 && (
        <p className="text-gray-500 text-center">No active polls available.</p>
      )}

      <div className="space-y-4">
        {(data?.data || [])?.map((poll) => (
          <PollCard key={poll?._id} pollData={poll} />
        ))}
      </div>
    </div>
  );
}
