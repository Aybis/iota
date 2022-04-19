import { LocationMarkerIcon } from '@heroicons/react/solid';
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
  location,
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
          <p className="text-sm text-gray-700 leading-relaxed">
            {item.description}
          </p>
          <ProgressBar moreClass={'mt-4'} progress={item.progress} />
          <p className="text-xs text-gray-400 text-right mt-2">
            {convertTimeAgo(item.jam)}
          </p>
        </div>
      </div>
      <hr className="border border-zinc-100 mt-3 mb-2 mx-6" />

      <div className="flex justify-center items-center gap-2 mt-4">
        <LocationMarkerIcon
          className={[
            'text-red-600',
            item?.lokasi?.length > 4 ? 'h-10' : 'h-6 hidden',
          ].join(' ')}
        />
        <p className="text-xs font-light text-zinc-400">
          {item?.lokasi ?? 'Lokasi tidak ditemukan'}
        </p>
      </div>
    </div>
  );
}
