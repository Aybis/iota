import { getImageFromAssets } from '../helpers/assetHelpers';

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
    project: 'Section Header, ',
    commit: '2d89f0c7',
    environment: 'production',
    time: '1h',
  },
  {
    id: 2,
    person: people[0],
    project: 'Section Summary',
    commit: '2d89f0c8',
    environment: 'production',
    time: '1h',
  },
  {
    id: 3,
    person: people[0],
    project: 'Section Grouping Task',
    commit: '2d89f0c9',
    environment: 'production',
    time: '1h',
  },
  // More items...
];

export default function SectionHistoryActivity() {
  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {activityItems.map((activityItem) => (
          <li key={activityItem.id} className="py-4">
            <div className="flex space-x-3">
              <img
                className="h-14 w-14 rounded-md"
                src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                alt=""
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">
                    {activityItem.person.name}
                  </h3>
                  <p className="text-sm text-gray-500">{activityItem.time}</p>
                </div>
                <p className="text-sm text-gray-500">
                  Deployed {activityItem.project} ({activityItem.commit} in
                  master) to {activityItem.environment}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
