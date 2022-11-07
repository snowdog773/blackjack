export const shuffle = (inputDeck) => {
  const shuffleDeck = [];
  const activeDeck = [...inputDeck];
  for (let i = 0; i < 52; i++) {
    const pick = Math.floor(Math.random() * (52 - i));
    shuffleDeck.push(activeDeck[pick]);
    activeDeck.splice(pick, 1);
  }
  return shuffleDeck;
};
