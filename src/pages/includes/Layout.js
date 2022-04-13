import { ArrowNarrowUpIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import BottomBar from './BottomBar';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ showBottomBar = true, children, moreClass }) {
  const [visible, setVisible] = useState(false);
  const [didMount, setDidMount] = useState(false);

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
      <div className="relative overflow-hidden">
        <Header />

        {showBottomBar && <BottomBar />}

        <main>
          <div className="relative sm:pt-16 lg:pt-8 lg:pb-14">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
