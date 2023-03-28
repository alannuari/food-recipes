const randomIndex = () => {
  return Math.random().toString(36).split('.')[1];
};

export default randomIndex;
