interface IProps {
  emoji: string;
  count: number;
  onClick: () => void;
}

const ReactionButton = ({ emoji, count, onClick }: IProps) => {
  return (
    <button
      className="flex gap-1 items-center space-x-1 hover:text-red-500 cursor-pointer transition bg-gray-100 px-6 py-1 rounded"
      onClick={onClick}
    >
      <span className="text-xl">{emoji}</span>
      <span className="text-sm">({count})</span>
    </button>
  );
};

export default ReactionButton;
