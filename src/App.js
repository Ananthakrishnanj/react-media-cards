import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Card from "./Card";
import "./styles.css";

export default function App() {
  const media = [
    {
      id: 1,
      link:
        "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      type: "VIDEO"
    },
    {
      id: 2,
      link: "https://picsum.photos/200/300?random=2",
      type: "IMAGE"
    },
    {
      id: 3,
      link: "https://picsum.photos/200/300?random=3",
      type: "IMAGE"
    },
    {
      id: 4,
      link: "https://picsum.photos/200/300?random=4",
      type: "IMAGE"
    },
    {
      id: 5,
      link: "https://picsum.photos/200/300?random=5",
      type: "IMAGE"
    },
    {
      id: 6,
      link: "https://picsum.photos/200/300?random=6",
      type: "IMAGE"
    },
    {
      id: 7,
      link: "https://picsum.photos/200/300?random=7",
      type: "IMAGE"
    },
    {
      id: 8,
      link: "https://picsum.photos/200/300?random=8",
      type: "IMAGE"
    }
  ];

  const [activeMedias, setActiveMedias] = useState(media);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const noOfCards = 4;
  const arrayRotate = (arr, count = 1) => {
    return [...arr.slice(count, arr.length), ...arr.slice(0, count)];
  };

  const mapRange = (
    value,
    startRange,
    endRange,
    tragetStartRange = 0,
    targetEndRnge = 1
  ) =>
    tragetStartRange +
    ((value - startRange) * (targetEndRnge - tragetStartRange)) /
      (endRange - startRange);
  return (
    <>
      <div className="App">
        <TransitionGroup
          onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
          onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
          onTouchEnd={() => {
            if (touchStart - touchEnd > 100) {
              setActiveMedias((activeMedia) => arrayRotate(activeMedia, 1));
            } else if (touchStart - touchEnd < -100) {
              setActiveMedias((activeMedia) => arrayRotate(activeMedia, -1));
            }
          }}
        >
          {activeMedias
            .filter((_, index) => index <= 3)
            .map((item, index) => (
              <CSSTransition key={item.id} timeout={1000} classNames="item">
                <Card
                  style={{
                    zIndex: noOfCards - (index + 1),
                    left: index * 26,
                    filter: `brightness(${mapRange(index, noOfCards, 0)})`,
                    // opacity: mapRange(index, noOfCards, 0),
                    transform: `scale(${mapRange(
                      index,
                      noOfCards,
                      0,
                      0.7,
                      1
                    )})`,
                    transition: "all 0.5s"
                  }}
                  key={item.id}
                  cardData={item}
                />
              </CSSTransition>
            ))}
        </TransitionGroup>
      </div>
      <button
        onClick={() =>
          setActiveMedias((activeMedia) => arrayRotate(activeMedia, -1))
        }
      >
        Prev
      </button>
      <button
        onClick={() =>
          setActiveMedias((activeMedia) => arrayRotate(activeMedia, 1))
        }
      >
        Next
      </button>
    </>
  );
}
