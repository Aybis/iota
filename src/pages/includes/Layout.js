import BottomBar from './BottomBar';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ showBottomBar = true, children }) {
  return (
    <div className="bg-zinc-50 min-h-screen max-h-full pb-20">
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
