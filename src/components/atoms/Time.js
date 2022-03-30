import React, { useEffect, useState } from 'react';

export default function Time({ moreClass }) {
  const [didMount, setDidMount] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setDidMount(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      setDidMount(false);
      clearInterval(interval);
    };
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <div
      className={['flex justify-center items-center w-full', moreClass].join(
        ' ',
      )}>
      <h1 className="text-xl font-semibold text-white">
        {time.getHours() +
          ' : ' +
          (time.getMinutes() > 9
            ? time.getMinutes()
            : `0${time.getMinutes()}`) +
          ' : ' +
          (time.getSeconds() > 9 ? time.getSeconds() : `0${time.getSeconds()}`)}
        <small> {time.getHours() > 12 ? 'PM' : 'AM'}</small>
      </h1>
    </div>
  );
}
