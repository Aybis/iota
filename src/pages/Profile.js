/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Menu, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import Cookies from 'js-cookie';
import { Fragment, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import { Loading } from '../components/atoms';
import { setHeader } from '../config/api/constant';
import iota from '../config/api/route/iota';
import { imageApi } from '../helpers/assetHelpers';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Profile({ open, handlerOpen }) {
  const [isLoading, setisLoading] = useState(false);
  const USER = useSelector((state) => state.user);
  const ref = useRef(null);

  const handlerLogout = (event) => {
    setisLoading(true);
    event.preventDefault();
    setHeader();

    swal({
      title: 'Are you sure?',
      text: 'Anda yakin ingin keluar dari aplikasi!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        return iota
          .logout()
          .then((res) => {
            Cookies.remove('session');
            localStorage.clear();
            swal('Anda berhasil logout!', {
              icon: 'success',
            });
            setTimeout(() => {
              setisLoading(false);
              window.location.reload();
            }, 300);
          })
          .catch((err) => {
            console.log(err.response);
            swal('Something Happened!', {
              icon: 'error',
            });
          });
      } else {
        setisLoading(false);
        swal('Okay!');
      }
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={ref}
        className="fixed inset-0 overflow-hidden z-40"
        onClose={handlerOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-75" />

          <div className="fixed inset-y-0 left-0 pr-10 max-w-full flex sm:pr-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll pb-16">
                  <div className="px-4 py-6 sm:px-6">
                    <div className="flex  items-start justify-between">
                      <h2
                        id="slide-over-heading"
                        className="text-lg font-medium text-gray-900">
                        Profile
                      </h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-apps-primary"
                          onClick={handlerOpen}>
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Main */}
                  <div>
                    <div className="pb-1 sm:pb-6">
                      <div>
                        <div className="relative h-40 sm:h-56">
                          <img
                            className="absolute h-full w-full object-cover"
                            src={
                              USER?.profile?.image_url ??
                              imageApi(USER?.profile?.name)
                            }
                            alt={USER?.profile?.name}
                          />
                        </div>
                        <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                          <div className="sm:flex-1">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-bold text-xl text-gray-900 sm:text-2xl capitalize">
                                  {USER?.profile?.name?.toLowerCase() ?? ''}
                                </h3>
                                <span className="ml-2.5 bg-green-400 flex-shrink-0 inline-block h-2 w-2 rounded-full">
                                  <span className="sr-only">Online</span>
                                </span>
                              </div>
                              <p className="text-sm text-gray-500">
                                {USER?.profile?.posisi ?? 'Position'} -{' '}
                                {USER?.profile?.nik ?? 'NIK'}
                              </p>
                            </div>
                            <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                              <button
                                type="button"
                                disabled
                                className="disabled:opacity-40 cursor-not-allowed flex-shrink-0 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:flex-1">
                                Ubah Data
                              </button>
                              <button
                                onClick={handlerLogout}
                                type="button"
                                disabled={isLoading}
                                className="disabled:opacity-40 flex-1 w-full inline-flex items-center justify-center px-4 py-2  rounded-md shadow-sm text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                {isLoading && (
                                  <Loading
                                    height={4}
                                    width={4}
                                    color={'text-white'}
                                  />
                                )}
                                Logout
                              </button>
                              <span className="ml-3 inline-flex sm:ml-0">
                                <Menu
                                  as="div"
                                  className="relative inline-block text-left">
                                  <Menu.Button
                                    disabled
                                    className="cursor-not-allowed disabled:opacity-40 inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-400 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    <span className="sr-only">
                                      Open options menu
                                    </span>
                                    <DotsVerticalIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </Menu.Button>
                                  <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95">
                                    <Menu.Items className="origin-top-left absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                      <div className="py-1">
                                        <Menu.Item>
                                          {({ active }) => (
                                            <a
                                              href="/"
                                              className={classNames(
                                                active
                                                  ? 'bg-gray-100 text-gray-900'
                                                  : 'text-gray-700',
                                                'block px-4 py-2 text-sm',
                                              )}>
                                              View profile
                                            </a>
                                          )}
                                        </Menu.Item>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <a
                                              href="/"
                                              className={classNames(
                                                active
                                                  ? 'bg-gray-100 text-gray-900'
                                                  : 'text-gray-700',
                                                'block px-4 py-2 text-sm',
                                              )}>
                                              Copy profile link
                                            </a>
                                          )}
                                        </Menu.Item>
                                      </div>
                                    </Menu.Items>
                                  </Transition>
                                </Menu>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
                      <dl className="space-y-8 px-4 sm:px-6 sm:space-y-6">
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            Regional
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 capitalize">
                            {USER?.profile?.regional?.alias ?? 'ALL TREG'}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            Witel
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 capitalize">
                            {USER?.profile?.witel ?? 'ALL WITEL'}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            No. HP
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            <time dateTime="1988-06-23">
                              +62 {USER?.profile?.phone ?? '...'}
                            </time>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            Email
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            {USER?.profile?.email ?? '...'}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
