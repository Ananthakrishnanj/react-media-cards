import classes from "./Card.module.css";

const Card = ({ cardData, style }) => {
  return (
    <>
      {cardData.type === "AUDIO" && (
        <audio
          className={classes.cardContainer}
          src={cardData.link}
          alt={cardData.id}
          controls
          style={style}
        />
      )}
      {cardData.type === "VIDEO" && (
        <video
          className={classes.cardContainer}
          src={cardData.link}
          alt={cardData.id}
          controls
          style={style}
        />
      )}
      {cardData.type === "IMAGE" && (
        <img
          className={classes.cardContainer}
          src={cardData.link}
          alt={cardData.id}
          style={style}
        />
      )}
    </>
  );
};

export default Card;
