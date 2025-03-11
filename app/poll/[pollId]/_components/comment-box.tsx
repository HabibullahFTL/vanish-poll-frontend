import { cn } from '@/utils/cn';
import { addComment } from '@/utils/fetchers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { z } from 'zod';

interface IProps {
  pollId: string;
}

const CommentBox = ({ pollId }: IProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate } = useSWRConfig();

  // Validation Schema
  const validationSchema = z.object({
    comment: z.string({ required_error: 'Comment is required' }),
  });

  // Form Methods
  const formMethods = useForm<z.infer<typeof validationSchema>>({
    defaultValues: {
      comment: '',
    },
    resolver: zodResolver(validationSchema),
  });

  // Submit handler
  const onSubmit = async (values: z.infer<typeof validationSchema>) => {
    setIsSubmitting(true);
    toast.loading('Adding comment...', { id: 'commenting' });

    try {
      const response = await addComment({
        pollId: pollId,
        comment: values?.comment,
      });
      toast.success(response?.message || 'Your comment added successfully', {
        id: 'commenting',
      });

      formMethods.reset();

      mutate(`/comments/${pollId}`);
      mutate(`/polls`);
    } catch (error) {
      toast.error(
        (error as { message: string })?.message || 'Failed to comment',
        {
          id: 'commenting',
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={formMethods.handleSubmit(onSubmit)}
      id="comment-box"
      className="mt-4 flex md:gap-2 flex-wrap"
    >
      <input
        disabled={isSubmitting}
        className={cn(
          'flex-1 p-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm',
          isSubmitting && 'opacity-80'
        )}
        placeholder="Write a comment..."
        {...formMethods.register('comment')}
      />
      <button
        type={isSubmitting ? 'button' : 'submit'}
        className="mt-2 md:mt-0 w-full md:w-28 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition text-sm"
      >
        Comment
      </button>
    </form>
  );
};

export default CommentBox;
