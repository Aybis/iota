import { motion } from 'framer-motion';

export default function Select({
  children,
  value,
  onchange,
  isDisabled = false,
  placeholder,
  addClassInput,
  labelName,
  name,
  addClassLabel,
  addClassParent,
}) {
  const container = {
    hidden: { opacity: 1, width: 0 },
    visible: {
      opacity: 1,
      width: '100%',
      transition: {
        delayChildren: 1,
        staggerChildren: 0.8,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={['relative sm:col-span-3 text-left', addClassParent].join(
        ' ',
      )}>
      <label
        htmlFor={name}
        className={[
          'block text-sm text-zinc-600 capitalize',
          addClassLabel,
        ].join(' ')}>
        {labelName}
      </label>
      <select
        onChange={onchange}
        disabled={isDisabled}
        name={name}
        value={value}
        className={[
          'disabled:bg-zinc-100 disabled:cursor-not-allowed font-medium mt-1 shadow-sm text-zinc-800 focus:ring-blue-500 focus:border-blue-500 block w-full text-sm border-zinc-300 rounded-md',
          addClassInput,
        ].join(' ')}>
        <option value="" disabled>
          Choose {labelName}
        </option>
        {children}
      </select>
    </motion.div>
  );
}
