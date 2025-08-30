// Generate unique payment reference
const generateReference = () => {
  return `NEG_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};

export default generateReference;
