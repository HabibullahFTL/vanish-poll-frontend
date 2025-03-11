'use client';
import PollCard from '@/app/_components/poll-card/poll-card';
import { fetchAllComments, fetchSinglePoll } from '@/utils/fetchers';
import { formatDistance } from 'date-fns';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import CommentBox from './_components/comment-box';

const PollDetailsPage = () => {
  const { pollId } = useParams();
  const { data: pollData, isLoading: isPollLoading } = useSWR(
    pollId ? `/polls/${pollId}` : null,
    fetchSinglePoll,
    { revalidateOnFocus: false }
  );
  const { data: commentData, isLoading: isCommentsLoading } = useSWR(
    pollId ? `/comments/${pollId}` : null,
    fetchAllComments,
    { revalidateOnFocus: false }
  );

  const isExpired = pollData?.data?.expiresIn
    ? new Date(pollData?.data?.expiresIn) < new Date()
    : false;

  /* Loading Skeleton */
  if (isPollLoading) {
    return (
      <div className="p-6 w-full mx-auto">
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 animate-pulse rounded-lg h-40" />
        </div>
      </div>
    );
  }

  // Expired message
  if (!isPollLoading && isExpired) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <p className="text-red-500 font-medium">The poll has expired!</p>
      </div>
    );
  }

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">📊 Poll Details</h1>

      {/* Poll Card */}
      {!isPollLoading && !pollData?.data ? (
        <p className="text-gray-500 text-center">No poll found.</p>
      ) : pollData?.data ? (
        <div className="space-y-4">
          <PollCard isDetailedView pollData={pollData?.data} />
        </div>
      ) : null}

      {/* Comments Section */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-lg font-semibold mb-3">💬 Comments</h2>

        {/* Show Dummy Comments */}
        <div className="space-y-3">
          {isCommentsLoading ? (
            <div className="">Loading comments...</div>
          ) : (
            (commentData?.data || [])?.map((c) => (
              <div key={c._id} className="">
                <div className="px-2 py-1 bg-white rounded-md border border-gray-200">
                  <div className="">
                    <span className="font-semibold text-sm text-blue-600 mr-2">
                      Anonymous User
                    </span>
                  </div>
                  <span className="block text-sm"> {c?.comment}</span>
                </div>
                <span className="text-sm ml-2 italic font-medium text-gray-600">
                  {formatDistance(new Date(c?.createdAt), new Date(), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Add a Comment */}
        <CommentBox pollId={(pollId || '')?.toString()} />
      </div>
    </div>
  );
};

export default PollDetailsPage;
