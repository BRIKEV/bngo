
const shuffle = <T>(array: T[], length = 3) => {
  const random = [...array].sort(() => Math.random() - 0.5);
  return random.slice(0, length);
};

export default shuffle;
