import { Icon } from "@iconify/react";

const CommentCount = ({ comments, loading, onClick, showIcon = true }) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 hover:text-[#F25849] transition-colors duration-300"
    >
      {showIcon && <Icon icon="heroicons:chat-bubble-left-right" className="w-4 h-4" />}
      <span className="inline-flex items-center">
        {loading ? (
          <span className="inline-flex items-center">
            <Icon icon="eos-icons:loading" className="animate-spin w-4 h-4 mr-1" />
            Loading...
          </span>
        ) : (
          <>
            Comments{" "}
            {comments && comments.length > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 ml-2 text-xs font-medium text-[#F25849] bg-red-50 rounded-full border border-red-100">
                {comments.length}
              </span>
            )}
          </>
        )}
      </span>
    </button>
  );
};

export default CommentCount; 