import {
  getImageFromAssets,
  getImageFromStorage,
} from '../helpers/assetHelpers';
import { convertTimeAgo } from '../helpers/timeAgo';
import { ProgressBar } from './atoms';

export default function SectionHistoryActivity({
  moreClass,
  progress,
  name,
  desc,
  title,
  item,
  handlerShowImage,
}) {
  return (
    <div className="py-4 bg-white p-3 rounded-lg shadow-lg shadow-zinc-200/50">
      <div className="flex items-start space-x-3">
        <img
          onClick={() => handlerShowImage(item)}
          className="h-14 w-14 rounded-md object-cover object-bottom"
          src={
            item.photo
              ? getImageFromStorage(item.photo)
              : getImageFromAssets('/assets/nfimage.jpeg')
          }
          alt={item.photo}
        />
        <div className="flex-1 flex-col">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium capitalize text-zinc-800">
              {title}
            </h3>
            <p className="text-xs text-gray-400 text-right">
              {convertTimeAgo(item.created_at)}
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-1">{item.description}</p>

          <ProgressBar moreClass={'mt-4'} progress={item.progress} />
        </div>
      </div>
    </div>
  );
}
