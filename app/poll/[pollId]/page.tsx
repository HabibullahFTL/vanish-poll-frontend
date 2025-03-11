'use client';

import PollCard from '@/app/_components/poll-card/poll-card';
import { fetchSinglePoll } from '@/utils/fetchers';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

const PollDetailsPage = () => {
  const { pollId } = useParams();

  const { data, isLoading } = useSWR(
    pollId ? `/polls/${pollId}` : null,
    fetchSinglePoll,
    {
      revalidateOnFocus: false,
    }
  );

  const isExpired = data?.data?.expiresIn
    ? new Date(data?.data?.expiresIn) < new Date()
    : false;

  /* Loading Skeleton */
  if (isLoading) {
    return (
      <div className="p-6 w-full mx-auto">
        {isLoading && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 animate-pulse rounded-lg h-40" />
          </div>
        )}
      </div>
    );
  }

  // Expired message
  if (!isLoading && isExpired) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <p className="text-red-500 font-medium">The poll has expired!</p>
      </div>
    );
  }

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">📊 Poll Details</h1>

      {/* Poll List */}
      {!isLoading && !data?.data ? (
        <p className="text-gray-500 text-center">No poll found.</p>
      ) : data?.data ? (
        <div className="space-y-4">
          <PollCard isDetailedView pollData={data?.data} />
        </div>
      ) : null}
    </div>
  );
};

export default PollDetailsPage;
