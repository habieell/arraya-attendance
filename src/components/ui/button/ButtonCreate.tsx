"use client";

interface CreateButtonProps {
  onClick: () => void;
}

export const CreateButton: React.FC<CreateButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
    >
      Create New
    </button>
  );
};
