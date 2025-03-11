'use client';
import Checkbox from '@/app/_components/form-elements/checkbox';
import Input from '@/app/_components/form-elements/input';
import Select from '@/app/_components/form-elements/select';
import { cn } from '@/utils/cn';
import { createPoll } from '@/utils/fetchers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import { mutate } from 'swr';
import { z } from 'zod';

// Validation schema
const validationSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  options: z
    .array(z.string().min(1, 'Option is required'))
    .min(2, 'At least two options are required')
    .default([]),
  type: z.enum(['yes/no', 'multiple-choice']),
  expiresIn: z.enum(['1h', '12h', '24h']),
  hideResults: z.boolean(),
});
export type ICreatePoll = z.infer<typeof validationSchema>;

const CreatePollPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  // Form methods
  const formMethods = useForm<ICreatePoll>({
    defaultValues: {
      question: '',
      options: ['Yes', 'No'] as string[],
      type: 'yes/no',
      expiresIn: '1h',
      hideResults: false,
    },
    resolver: zodResolver(validationSchema),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = formMethods;
  const pollType = watch('type');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: 'options',
  });

  // Submit
  const onSubmit = async (values: ICreatePoll) => {
    setIsSubmitting(true);
    toast.loading('Creating poll...', { id: 'poll-creating' });

    try {
      const response = await createPoll(values);
      toast.success(response?.message || 'Created your poll successfully', {
        id: 'poll-creating',
      });

      formMethods.reset();

      mutate(`/polls`);
      router.replace(`/poll/${response?.data?._id}`);
    } catch (error) {
      toast.error(
        (error as { message: string })?.message || 'Failed to create poll',
        {
          id: 'poll-creating',
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6 my-10 border border-gray-200 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create a Poll</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Question */}
        <Input
          label="Question"
          {...register('question')}
          disabled={isSubmitting}
          placeholder="Enter poll question"
        />
        {errors.question && (
          <p className="text-red-500 text-sm">{errors.question.message}</p>
        )}

        {/* Poll Type */}
        <Select
          label="Poll Type"
          {...register('type')}
          disabled={isSubmitting}
          options={[
            { value: 'yes/no', label: 'Yes/No' },
            { value: 'multiple-choice', label: 'Multiple Choice' },
          ]}
        />

        {/* Options */}
        <div className="shadow p-2 rounded">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Options
          </label>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={cn(
                'flex gap-2 mb-2 items-center',
                pollType === 'yes/no' && index > 1 ? 'hidden' : ''
              )}
            >
              <span className="w-5 h-5 flex items-center justify-center border-2 rounded-full" />
              <Input
                {...register(`options.${index}`)}
                disabled={pollType === 'yes/no' || isSubmitting}
                placeholder={`Option ${index + 1}`}
                className="h-10"
              />
              <button
                type="button"
                onClick={() => (index < 2 ? undefined : remove(index))}
                disabled={isSubmitting}
                className={cn(
                  'px-2 py-1 text-sm h-10 hover:bg-red-600 cursor-pointer border border-red-500 rounded-md bg-red-500 text-white transition',
                  index < 2
                    ? 'bg-gray-200 text-gray-500 hover:bg-gray-200 cursor-not-allowed border-gray-300'
                    : ''
                )}
              >
                <FaTrash />
              </button>
            </div>
          ))}
          {pollType === 'multiple-choice' ? (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => append('')}
              className="px-3 flex gap-2 items-center py-2 text-sm text-blue-500 border border-blue-500 rounded-md hover:bg-blue-500 cursor-pointer hover:text-white transition"
            >
              <FaPlus /> Add Option
            </button>
          ) : null}
          {errors.options && (
            <p className="text-red-500 text-sm">{errors.options.message}</p>
          )}
        </div>

        {/* Expiration Time */}
        <Select
          label="Expires In"
          {...register('expiresIn')}
          disabled={isSubmitting}
          options={[
            { value: '1h', label: '1 Hour' },
            { value: '12h', label: '12 Hours' },
            { value: '24h', label: '24 Hours' },
          ]}
        />

        {/* Hide Results */}
        <Checkbox
          disabled={isSubmitting}
          label="Hide results until the poll ends"
          {...register('hideResults')}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 cursor-pointer text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Poll...' : 'Create Poll'}
        </button>
      </form>
    </div>
  );
};

export default CreatePollPage;
