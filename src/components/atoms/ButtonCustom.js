import { motion } from 'framer-motion';
import React from 'react';
import { Loading } from '.';

export default function ButtonCustom({
  type = 'in',
  name,
  value,
  moreClass,
  isSubmit = false,
  isDisabled = false,
  handlerClick = null,
  children,
  isAnimated = false,
  typeButton = 'submit',
}) {
  let classBackground;

  if (type === 'in') {
    classBackground = 'bg-blue-600 shadow-blue-500/50 hover:bg-blue-500';
  } else if (type === 'out') {
    classBackground = 'bg-red-500  shadow-red-500/50 hover:bg-red-700';
  } else if (type === 'edit') {
    classBackground = 'bg-green-600 shadow-green-500/50 hover:bg-green-700';
  } else if (type === 'view') {
    classBackground = 'bg-indigo-600 shadow-indigo-500/50 hover:bg-indigo-700';
  } else if (type === 'danger') {
    classBackground = 'bg-red-600 shadow-red-500/50 hover:bg-red-700';
  }

  return (
    <motion.button
      type={typeButton}
      initial={isAnimated && { opacity: 0, y: -20 }}
      animate={isAnimated && { opacity: 1, y: 0 }}
      transition={isAnimated && { duration: 0.3 }}
      disabled={isSubmit || isDisabled}
      onClick={handlerClick ?? undefined}
      name={name}
      className={[
        `disabled:bg-opacity-40 font-semibold px-4 py-2 text-center rounded-md  text-white flex justify-center items-center transition-all duration-300 ease-in-out`,
        isSubmit && 'cursor-not-allowed',
        'disabled:shadow-none',
        classBackground,
        moreClass,
      ].join(' ')}>
      {isSubmit ? <Loading color="text-white" height={5} width={5} /> : ''}
      {children}
    </motion.button>
  );
}
