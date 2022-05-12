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
      className={[
        'min-h-screen max-h-full ',
        USER?.profile?.role_id === '1'
          ? 'md:bg-white bg-zinc-50 pb-16 md:pb-14'
          : 'bg-zinc-50 pb-20',
        moreClass,
      ].join(' ')}>
      {visible && (
        <div className="max-w-md mx-auto relative container">
          <div
            onClick={() => handlerButtonToUp()}
            className="fixed right-10 z-20 bottom-20 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out">
            <ArrowNarrowUpIcon className="h-5 lg:h-10 text-white" />
          </div>
        </div>
      )}

      <div className={['relative overflow-hidden'].join(' ')}>
        {USER?.profile?.role_id === '3' && <Header />}

        {showBottomBar && <BottomBar />}

        <main className="min-h-full">
          {USER?.profile?.role_id !== '1' ? (
            <div className="relative sm:pt-16 lg:p-8 lg:pb-14 lg:max-w-7xl container mx-auto lg:mt-16 overflow-scroll">
              {children}
            </div>
          ) : (
            <div className="relative mx-auto container max-w-md overflow-scroll min-h-screen bg-zinc-50 px-4">
              {children}
            </div>
          )}
        </main>
        {USER?.profile?.role_id === '3' && <Footer />}
      </div>
    </div>
  );
}
