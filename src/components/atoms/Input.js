import { motion } from 'framer-motion';

export default function Input({
  label,
  name,
  onchange = null,
  autoComplete = 'off',
  disabled = false,
  value,
  required = true,
  addClassLabel = 'capitalize',
  addClassForm,
  addClassParent,
  showLabel = true,
  inputType = 'text',
  note,
}) {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
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
      className={['sm:col-span-3 text-left', addClassParent].join(' ')}>
      {showLabel && (
        <label
          htmlFor={label}
          className={[
            'block text-sm text-gray-700 ',
            addClassLabel ?? 'capitalize',
          ].join(' ')}>
          {label}
        </label>
      )}
      <div className="mt-1">
        <input
          type={inputType}
          name={name}
          required={required}
          disabled={disabled}
          value={value}
          onChange={onchange}
          autoComplete={autoComplete}
          className={[
            'shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md',
            'disabled:bg-zinc-100 disabled:cursor-not-allowed disabled:text-zinc-600',
            addClassForm,
          ].join(' ')}
        />
        <p className="text-sm font-light text-zinc-400 mt-1">{note}</p>
      </div>
    </motion.div>
  );
}
