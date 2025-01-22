const calculatePrize = () => {
    const chance = Math.random();
    return chance <= 0.25;
  };
  
  module.exports = calculatePrize;
  