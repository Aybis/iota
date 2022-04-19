import { Menu, Transition } from '@headlessui/react';
import Cookies from 'js-cookie';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import { setHeader } from '../../config/api/constant';
import iota from '../../config/api/route/iota';
import { imageApiAvatarUser } from '../../helpers/assetHelpers';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProfileDropdown() {
  const USER = useSelector((state) => state.user);

  const handlerLogout = (event) => {
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
        swal('Okay!');
      }
    });
  };

  return (
    <>
      <Menu as="div" className="ml-4 relative flex-shrink-0">
        <div>
          <Menu.Button className="bg-white flex text-sm rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white">
            <span className="sr-only">Open user menu</span>
            <img
              className="h-10 w-10 rounded-lg"
              src={imageApiAvatarUser(USER?.profile?.name)}
              alt=""
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  disabled={true}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700 disabled:opacity-30 w-full text-left cursor-not-allowed',
                  )}>
                  View Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <form onSubmit={handlerLogout}>
                  <button
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700 w-full text-left',
                    )}>
                    Logout
                  </button>
                </form>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
