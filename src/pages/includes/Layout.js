import { ArrowNarrowUpIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BottomBar from './BottomBar';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ showBottomBar = true, children, moreClass }) {
  const [visible, setVisible] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const USER = useSelector((state) => state.user);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const handlerButtonToUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!didMount) {
    return null;
  }
  return (
    <div
      className={['bg-zinc-50 min-h-screen max-h-full pb-20', moreClass].join(
        ' ',
      )}>
      {visible && (
        <div
          onClick={() => handlerButtonToUp()}
          className="fixed right-10  z-20 bottom-20 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out">
          <ArrowNarrowUpIcon className="h-5 lg:h-10 text-white" />
        </div>
      )}

      {USER?.profile?.role_id === '1' && (
        <div className="hidden md:flex flex-col relative justify-center items-center h-screen bg-zinc-50">
          <span className="text-black text-lg font-semibold text-center">
            Maaf untuk saat ini halaman ini hanya dapat diakses melalui
            smartphone saja.
            <p className="mt-2">Terima kasih.</p>
          </span>
        </div>
      )}

      <div
        className={[
          'relative overflow-hidden',
          USER?.profile?.role_id === '1' ? 'md:hidden' : 'block',
        ].join(' ')}>
        {USER?.profile?.role_id !== '1' && <Header />}

        {showBottomBar && <BottomBar />}

        <main className="min-h-full">
          <div className="relative sm:pt-16 lg:p-8 lg:pb-14 lg:max-w-7xl container mx-auto lg:mt-16">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
