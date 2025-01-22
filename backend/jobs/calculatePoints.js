const calculatePoints = () => {
    const chance = Math.random();
    if (chance <= 0.5) return 10;
    return 1;
  };
  
  module.exports = calculatePoints;
  