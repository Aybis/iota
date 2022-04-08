export const convertTimeAgo = (time) => {
  const now = new Date();

  const compare = Math.abs(now - new Date(time));

  const calculate = (value) => {
    return (compare / value).toFixed(0);
  };

  if (calculate(1000) < 60) {
    return calculate(1000) + ' seconds ago';
  } else if (calculate(60000) < 60) {
    return calculate(60000) + ' minutes ago';
  } else if (calculate(3600000) < 24) {
    return calculate(3600000) + ' hours ago';
  } else if (calculate(3600000) >= 24) {
    return calculate(86400000) + ' day ago';
  }
};
