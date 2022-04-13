import { ArrowUpIcon } from '@heroicons/react/outline';
import { DocumentAddIcon, UserCircleIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import React from 'react';

export default function InputPhoto({
  photo,
  handlerChangPhoto,
  typePhoto,

  label = 'Take a Selfie',
}) {
  return (
    <motion.div whileTap={{ scale: 0.85 }} className="flex flex-col text-sm">
      <label htmlFor="image" className="text-gray-500 font-semibold rounded-lg">
        {/* Photo */}
        {photo ? (
          <img
            src={photo}
            alt="file"
            className={`rounded-lg cursor-pointer w-24 bg-gray-100 mb-4 object-center object-cover ${
              typePhoto === 'profile' ? 'h-24 shadow-lg rounded-lg' : 'h-24'
            }`}
          />
        ) : (
          <div className="flex flex-col justify-center items-center bg-gray-100 p-2 rounded-lg">
            {typePhoto === 'evidence' ? (
              <DocumentAddIcon
                tabIndex="0"
                className="h-12 text-gray-400 cursor-pointer"
              />
            ) : (
              <UserCircleIcon
                tabIndex="0"
                className="h-12 text-gray-400 cursor-pointer"
              />
            )}
            <ArrowUpIcon className="h-3 text-gray-400 animate-bounce mt-2" />
            <p className="text-xs text-gray-400 text-center  font-medium">
              {label}
            </p>
          </div>
        )}
      </label>
      {typePhoto === 'profile' ? (
        <input
          type="file"
          name="image"
          accept="image/*"
          id="image"
          className="hidden rounded-lg"
          onChange={handlerChangPhoto}
        />
      ) : (
        <input
          type="file"
          name="image"
          accept="image/*"
          capture="camera"
          id="image"
          className="hidden rounded-lg"
          onChange={handlerChangPhoto}
        />
      )}
    </motion.div>
  );
}
