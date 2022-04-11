import { Link } from 'react-router-dom';
import { getImageFromAssets } from '../helpers/assetHelpers';

export default function NotFound() {
  return (
    <main
      className="min-h-screen bg-cover bg-top sm:bg-top"
      style={{
        backgroundImage: `url(${getImageFromAssets('assets/404.jpeg')})`,
      }}>
      <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
        <p className="text-sm font-semibold text-black text-opacity-50 uppercase tracking-wide">
          404 error
        </p>
        <h1 className="mt-4 text-4xl font-extrabold text-zinc-800 tracking-tight sm:text-5xl">
          Uh oh! I think you’re lost.
        </h1>
        <p className="mt-4 text-lg font-medium text-black text-opacity-50">
          It looks like the page you’re looking for doesn't exist.
        </p>
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-opacity-75 bg-blue-500 text-white bg-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50">
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
