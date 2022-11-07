import React, { useEffect, useMemo, useState } from "react";
import Card from "../Card";
import CardBack from "../CardBack";
import { orderedDeck } from "../../constants/index";
import { shuffle } from "../../utils/shuffle";

import "../../styles/twentyOne.css";

const TwentyOne = () => {
  const [started, setStarted] = useState(false);
  const [deck, setDeck] = useState(shuffle(orderedDeck));

  const [playerHand, setPlayerHand] = useState([]);
  const [aiHand, setAiHand] = useState([]);
  const [displayHand, setDisplayHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);

  const [deckPosition, setDeckPosition] = useState();
  const [playerTurn, setPlayerTurn] = useState(true);
  const [aiTurn, setAiTurn] = useState(false);
  const [playerBust, setPlayerBust] = useState(false);
  const [aiBust, setAiBust] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerBlackjack, setPlayerBlackjack] = useState(false);
  const [aiBlackjack, setAiBlackjack] = useState(false);

  useMemo(() => {
    let aceCount = 0;
    let acesArray = [];
    const playerScoreArray = playerHand.map((e) =>
      e.value === 14
        ? 11
        : e.value === 13 || e.value === 12 || e.value === 11
        ? 10
        : e.value
    );
    playerScoreArray[0] &&
      acesArray.push(playerScoreArray.reduce((a, b) => a + b));
    playerScoreArray.forEach((e) => e === 11 && aceCount++);
    if (aceCount) {
      for (let i = 0; i < aceCount; i++) {
        acesArray.push(acesArray[i] - 10);
      }
    }

    const filteredAcesArray = acesArray.filter((e) => e < 22);
    filteredAcesArray.length > 0
      ? setPlayerScore(Math.max(...filteredAcesArray))
      : setPlayerScore(Math.min(...acesArray));
    if (playerScore > 21) {
      setPlayerBust(true);
    } else {
      setPlayerBust(false);
    }
    playerBust ? setPlayerTurn(false) : setPlayerTurn(true);
    playerScore === 21 && [...playerHand].length === 2
      ? setPlayerBlackjack(true)
      : setPlayerBlackjack(false);
  }, [playerHand, playerScore, playerBust]);

  useMemo(() => {
    let aceCount = 0;
    let acesArray = [];

    const aiScoreArray = aiHand.map((e) =>
      e.value === 14
        ? 11
        : e.value === 13 || e.value === 12 || e.value === 11
        ? 10
        : e.value
    );
    aiScoreArray[0] && acesArray.push(aiScoreArray.reduce((a, b) => a + b));
    aiScoreArray.forEach((e) => e === 11 && aceCount++);
    if (aceCount) {
      for (let i = 0; i < aceCount; i++) {
        acesArray.push(acesArray[i] - 10);
      }
    }

    const filteredAcesArray = acesArray.filter((e) => e < 22);
    filteredAcesArray.length > 0
      ? setAiScore(Math.max(...filteredAcesArray))
      : setAiScore(Math.min(...acesArray));
    const aiCopy = [...aiHand];
    aiCopy.splice(0, 1);
    setDisplayHand(aiCopy);
    aiScore === 21 && [...aiHand].length === 2
      ? setAiBlackjack(true)
      : setAiBlackjack(false);
  }, [aiHand, aiScore]);

  const initialiseGame = () => {
    setDeck([...shuffle(orderedDeck)]);
    setDeckPosition(4);
    setStarted(true);
    setPlayerBust(false);
    setPlayerTurn(true);
    setAiTurn(false);
    setAiBust(false);
    setPlayerHand([deck[0], deck[1]]);
    setAiHand([deck[2], deck[3]]);
    setDeckPosition(4);
    setGameOver(false);
    setAiBlackjack(false);
    setPlayerBlackjack(false);
  };

  const playerTwist = () => {
    setPlayerHand([...playerHand, deck[deckPosition]]);
    setDeckPosition(deckPosition + 1);
  };

  const playerStick = () => {
    setPlayerTurn(false);
    setAiTurn(true);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (aiTurn) {
        if (aiScore < 17 || aiScore < playerScore) {
          setAiHand((aiHand) => [...aiHand, deck[deckPosition]]);
          setDeckPosition((deckPosition) => deckPosition + 1);
        } else if (aiScore > 21) {
          setAiBust(true);
        } else {
          setGameOver(true);
        }
      }
    }, 1000);
    return () => clearTimeout(delay);
  }, [aiScore, aiTurn, deck, deckPosition, playerScore]);

  return (
    <>
      {!started && (
        <button
          className="twentyOneStartButton"
          onClick={() => initialiseGame()}
        >
          Start Game
        </button>
      )}
      {started && (
        <div className="gameWrapper">
          <div className="gamePlay">
            <div className="handWrapper">
              <h3>Player Hand</h3>
              <p>Score {playerScore}</p>
              <div className="cardWrapper">
                {playerHand.map((e, index) => (
                  <Card value={e} key={index} />
                ))}
              </div>
            </div>
            <div className="handWrapper">
              <h3>Computer Hand</h3>
              {aiTurn || playerBust ? <p>Score {aiScore}</p> : <p>Score ???</p>}
              {aiTurn || playerBust ? (
                <div className="cardWrapper">
                  {aiHand.map((e, index) => (
                    <Card value={e} key={index} />
                  ))}
                </div>
              ) : (
                <div className="cardWrapper">
                  <CardBack />
                  {displayHand.map((e, index) => (
                    <Card value={e} key={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="buttonsMessages">
            {playerTurn && !playerBust && !aiBust && (
              <div className="playerButtons">
                <button className="twistButton" onClick={() => playerTwist()}>
                  Twist
                </button>
                <button className="stickButton" onClick={() => playerStick()}>
                  Stick
                </button>
              </div>
            )}
            {playerBust && (
              <div className="playerBust">
                <h3> Player is BUST!!! Computer wins!!!</h3>
                <button className="playAgain" onClick={() => initialiseGame()}>
                  Play again?
                </button>{" "}
              </div>
            )}
            {aiBust && (
              <div className="aiBust">
                <h3>Computer is BUST!!! Player wins!!!</h3>
                <button onClick={() => initialiseGame()} className="playAgain">
                  Play again?
                </button>{" "}
              </div>
            )}
            {gameOver && (
              <div>
                {playerBlackjack && !aiBlackjack ? (
                  <p>Player wins with Blackjack</p>
                ) : aiBlackjack && !playerBlackjack ? (
                  <p>Computer wins with Blackjack</p>
                ) : aiBlackjack && playerBlackjack ? (
                  <p>It's a draw, both have Blackjack</p>
                ) : playerScore > aiScore ? (
                  <p>Player 1 wins</p>
                ) : playerScore < aiScore ? (
                  <p>Computer wins</p>
                ) : (
                  <p>It's a draw</p>
                )}
                <button onClick={() => initialiseGame()} className="playAgain">
                  Play again?
                </button>{" "}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TwentyOne;
