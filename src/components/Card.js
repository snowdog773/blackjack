import React from "react";
import club from "../assets/club.svg";
import spade from "../assets/spade.svg";
import heart from "../assets/heart.svg";
import diamond from "../assets/diamond.svg";
const Card = (props) => {
  let suit;
  props.value.suit === "H"
    ? (suit = heart)
    : props.value.suit === "D"
    ? (suit = diamond)
    : props.value.suit === "C"
    ? (suit = club)
    : (suit = spade);
  let value;
  props.value.value === 14
    ? (value = "A")
    : props.value.value === 13
    ? (value = "K")
    : props.value.value === 12
    ? (value = "Q")
    : props.value.value === 11
    ? (value = "J")
    : (value = props.value.value);
  let cardColour;
  props.value.suit === "H" || props.value.suit === "D"
    ? (cardColour = "#ff0000")
    : (cardColour = "#000000");

  return (
    <>
      <div className="card">
        <div className="cardTopLeft" style={{ color: cardColour }}>
          <div className="smallNumber">{value}</div>

          <div
            className="smallSuit"
            style={{
              backgroundImage: `url(${suit})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
        <div className="cardMiddle">
          <img src={suit} alt="suit" />
        </div>
        <div className="cardBottomRight" style={{ color: cardColour }}>
          <div
            className="smallSuit"
            style={{
              backgroundImage: `url(${suit})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>{" "}
          <div className="smallNumber">{value}</div>
        </div>
      </div>
    </>
  );
};

export default Card;
