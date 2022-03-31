import { useState } from 'react';
import { getImageFromAssets } from '../helpers/assetHelpers';
import { Modals, ProgressBar } from './atoms';

/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: 'Abdul Muchtar Astria',
    imageUrl: getImageFromAssets('assets/img.jpeg'),
  },
  // More people...
];
const activityItems = [
  {
    id: 1,
    person: people[0],
    imageUrl:
      'https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    project: 'Section Header, ',
    commit: '2d89f0c7',
    environment: 'production',
    time: '12.20 PM',
    progress: 80,
  },
  {
    id: 2,
    person: people[0],
    imageUrl:
      'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c21hbGwlMjBzaXplfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    project: 'Section Summary',
    commit: '2d89f0c8',
    environment: 'production',
    time: '10.13 AM',
    progress: 40,
  },
  {
    id: 3,
    person: people[0],
    imageUrl:
      'https://media.istockphoto.com/photos/unhappy-disappointed-african-guy-with-dreadlocks-showing-a-little-picture-id1287568763?b=1&k=20&m=1287568763&s=170667a&w=0&h=MGwHEK03lpoVzAqSAyKL0zhi81QH2i-sPeQBCpldurI=',
    project: 'Section Grouping Task',
    commit: '2d89f0c9',
    environment: 'production',
    time: '08.47 AM',
    progress: 20,
  },
  // More items...
];

export default function SectionHistoryActivity({ progress, name, desc }) {
  const [showModal, setshowModal] = useState(false);
  const [imageSource, setImageSource] = useState(null);

  const handlerClickShowImage = (item) => {
    setshowModal(true);
    setImageSource(item.imageUrl);
  };

  return (
    <div className="">
      <ul className="divide-y divide-gray-200 border-b border-gray-200 mr-2">
        {activityItems.map((activityItem) => (
          <li key={activityItem.id} className="py-4">
            <div className="flex space-x-3">
              <img
                onClick={() => handlerClickShowImage(activityItem)}
                className="h-14 w-14 rounded-md object-cover object-bottom"
                src={activityItem.imageUrl}
                alt={activityItem.imageUrl}
              />
              <div className="flex-1 flex-col space-y-1">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-medium">
                    {activityItem.person.name}
                  </h3>
                  <p className="text-xs text-gray-500">{activityItem.time}</p>
                </div>
                <p className="text-sm text-gray-500">
                  Deployed {activityItem.project} ({activityItem.commit} in
                  master) to {activityItem.environment}
                </p>
                <ProgressBar progress={activityItem.progress} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Modals position="center" open={showModal} handlerClose={setshowModal}>
        <img
          src={imageSource}
          alt={imageSource}
          className="rounded-lg object-cover lg:h-96"
        />
      </Modals>
    </div>
  );
}
