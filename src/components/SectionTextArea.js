import { PaperClipIcon } from '@heroicons/react/solid';
import { Loading } from './atoms';

export default function SectionTextArea({
  buttonName = 'Update',
  showTitle = false,
  valueTitle,
  valueDescription,
  handlerChange,
  handlerSubmit,
  handlerChangePhoto,
  namePhoto,
  isLoading,
  uploadPhoto = true,
}) {
  return (
    <form onSubmit={handlerSubmit} className="relative">
      <div className="border pt-1 border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
        {showTitle && (
          <>
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={valueTitle}
              onChange={(e) => handlerChange(e)}
              className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
              placeholder="Title"
            />
          </>
        )}
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          rows={2}
          name="description"
          id="description"
          onChange={(e) => handlerChange(e)}
          value={valueDescription}
          className="block w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder="Write a description..."
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-px">
        <div className="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3">
          {uploadPhoto && (
            <div className="flex">
              <label
                htmlFor="file-upload"
                className="-ml-2 -my-2 rounded-full px-3 py-2 inline-flex items-center text-left text-gray-400 group">
                <PaperClipIcon
                  className="-ml-1 h-5 w-5 mr-2 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="text-sm text-gray-500 group-hover:text-gray-600 italic">
                  {namePhoto ?? 'Attach a file'}
                </span>
                <input
                  // type="file"
                  // name="image"
                  // accept="image/*"
                  // capture="camera"
                  // id="image"
                  // className="sr-only rounded-lg"
                  // onChange={handlerChangePhoto}
                  id="file-upload"
                  accept="image/*"
                  capture="camera"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handlerChangePhoto}
                />
              </label>
            </div>
          )}

          <div className="flex-shrink-0">
            <button
              type="submit"
              disabled={isLoading}
              className="disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {isLoading && <Loading height={5} width={5} color="text-white" />}
              {buttonName}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
