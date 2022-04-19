/* This example requires Tailwind CSS v2.0+ */
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

export default function Breadcrumbs({ name, href, icon }) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        <li>
          <div>
            <Link to={'/'} className="text-zinc-400 hover:text-zinc-500">
              <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRightIcon
              className="flex-shrink-0 h-5 w-5 text-zinc-400"
              aria-hidden="true"
            />
            <Link
              to={'#'}
              className="ml-4 text-sm font-medium text-zinc-500 hover:text-zinc-700"
              aria-current={'page'}>
              {name}
            </Link>
          </div>
        </li>
      </ol>
    </nav>
  );
}
