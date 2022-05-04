type Callback = (likelihoodOfAntWinning: number) => void

const generateAntWinLikelihoodCalculator = () => {
  const delay = 7000 + Math.random() * 7000;
  const likelihoodOfAntWinning = Math.random();

  return (callback: Callback) => {
    setTimeout(() => {
      callback(likelihoodOfAntWinning);
    }, delay);
  };
}

export { generateAntWinLikelihoodCalculator };