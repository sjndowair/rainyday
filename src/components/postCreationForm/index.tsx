import Form from "../../atoms/form";

interface IPostCreationFormProps {
  onClick?: () => void;
  isOpenModal?: boolean;
  onSubmit?: (title: string, content: string) => Promise<void>;
  data?: string;
  isHandleChage?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickPostSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isPostHandleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClickPostBox?: () => void;
  isTitle?: string;
  postMessage?: string;
  imageFile?: File | null;
  setImageFile?: React.Dispatch<React.SetStateAction<File | null>>;
}

const PostCreationForm = ({
  onClick,
  isOpenModal,
  isPostHandleChange,
  onClickPostSubmit,
  onClickPostBox,
  isTitle,
  postMessage,
  imageFile,
  setImageFile,
}: IPostCreationFormProps) => {
  if (!onClickPostSubmit) return null;

  const onClickInnerBox = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile?.(file);
    }
  };

  return (
    <div
      onClick={onClick}
      className="fixed inset-0 bg-purple-500 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        onClick={onClickInnerBox}
        className="w-full max-w-[900px] px-8 py-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mx-4"
      >
        <Form isHandleSubmit={onClickPostSubmit}>
          <label>
            <h3
              className={`text-xl text-purple-500 dark:text-purple-400 pb-3 font-bold`}
            >
              제목
            </h3>
            <input
              type="text"
              name="title"
              value={isTitle || ""}
              onChange={(e) => isPostHandleChange?.(e)}
              className="bg-purple-100 dark:bg-purple-900 rounded-xl p-3 w-full"
              required
            />
          </label>
          <label>
            <h3
              className={`py-4 text-xl text-purple-500 dark:text-purple-400 font-bold`}
            >
              내용
            </h3>
            <textarea
              name="content"
              value={postMessage || ""}
              onChange={(e) => isPostHandleChange?.(e)}
              className={`bg-purple-100 dark:bg-purple-900 rounded-xl w-full p-4 h-[15rem] resize-none focus:outline-none focus:ring-2 focus:ring-purple-400`}
              required
            />
          </label>
          <label>
            <h3 className="py-4 text-xl text-purple-500 dark:text-purple-400 font-bold">
              이미지 첨부
            </h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-purple-50 file:text-purple-700
                hover:file:bg-purple-100"
            />
            {imageFile && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="max-w-xs rounded-lg"
                />
              </div>
            )}
          </label>
          <div className={`flex gap-4 pt-6 justify-end`}>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors"
            >
              게시
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              onClick={onClickPostBox}
            >
              취소
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PostCreationForm;
