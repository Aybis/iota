import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import { Fragment, useRef } from 'react';
import { useSelector } from 'react-redux';

export default function Modals({
  open,
  handlerClose,
  children,
  title,
  dontClose = false,
  position = 'center',
  margin = true,
  addClass,
  addClassTitle,
}) {
  let completeButtonRef = useRef(null);
  const USER = useSelector((state) => state.user);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={completeButtonRef}
        className="fixed z-30 inset-0 overflow-y-auto"
        onClose={() => handlerClose(dontClose)}>
        <div
          className={[
            'flex justify-center w-full min-h-screen text-center inset-0',
            position === 'center' && 'items-center',
            position === 'bottom' && 'items-end',
            position === 'top' && 'items-start',
          ].join(' ')}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div
              className={[
                'mx-4 inline-block align-bottom bg-white p-3 shadow-xl transform transition-all h-auto my-12 overflow-auto',
                margin ? 'rounded-xl  max-w-full' : 'rounded-xl w-full',
                String(USER?.profile?.role_id) === '1'
                  ? 'max-w-md'
                  : 'max-w-full',
                addClass,
              ].join(' ')}>
              <div className="p-2">
                <div className="flex justify-between items-center mb-4">
                  <h1
                    className={[
                      'text-left text-zinc-800 text-lg font-semibold',
                      addClassTitle,
                    ].join(' ')}>
                    {title}
                  </h1>
                  <XIcon
                    onClick={() => handlerClose(false)}
                    className="h-5 text-zinc-500 cursor-pointer"
                  />
                </div>
                <div>{children}</div>
                <button
                  ref={completeButtonRef}
                  onClick={() => handlerClose(false)}
                  className="bg-warmGray-100 opacity-0 -mt-4 h-0 w-0 hidden"></button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
