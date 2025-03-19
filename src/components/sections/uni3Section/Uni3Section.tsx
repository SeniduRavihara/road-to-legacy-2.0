import { UOC, UOM, USJ } from "@/assets";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ExportedImage from "next-image-export-optimizer";
import { useState } from "react";
import "./Uni3Section.css";

gsap.registerPlugin(ScrollTrigger);

const initialCards = [
  {
    title: "slide1",
    description: "",
    imgUrl: USJ,
    classNames: "previous--card",
  },
  {
    title: "slide2",
    description: "",
    imgUrl: UOM,
    classNames: "current--card",
  },
  {
    title: "slide3",
    description: "",
    imgUrl: UOC,
    classNames: "next--card",
  },
];

const Uni3Section = () => {
  const [cards] = useState(initialCards);

  function swapCards(direction: "left" | "right") {
    const cardsContainerEl = document.querySelector(".cards__wrapper");
    const appBgContainerEl = document.querySelector(".app__bg");

    if (!cardsContainerEl || !appBgContainerEl) {
      console.error("Cards container or app background not found!");
      return;
    }

    const currentCardEl = cardsContainerEl.querySelector(".current--card");
    const previousCardEl = cardsContainerEl.querySelector(".previous--card");
    const nextCardEl = cardsContainerEl.querySelector(".next--card");

    const currentBgImageEl = appBgContainerEl.querySelector(".current--image");
    const previousBgImageEl =
      appBgContainerEl.querySelector(".previous--image");
    const nextBgImageEl = appBgContainerEl.querySelector(".next--image");

    if (
      !currentCardEl ||
      !previousCardEl ||
      !nextCardEl ||
      !currentBgImageEl ||
      !previousBgImageEl ||
      !nextBgImageEl
    ) {
      console.error("Some required elements were not found!");
      return;
    }

    changeInfo(direction);
    swapCardsClass();

    function swapCardsClass() {
      if (
        !currentCardEl ||
        !previousCardEl ||
        !nextCardEl ||
        !currentBgImageEl ||
        !previousBgImageEl ||
        !nextBgImageEl
      ) {
        console.error("Some required elements were not found!");
        return;
      }

      // Remove current classes
      currentCardEl.classList.remove("current--card");
      previousCardEl.classList.remove("previous--card");
      nextCardEl.classList.remove("next--card");

      currentBgImageEl.classList.remove("current--image");
      previousBgImageEl.classList.remove("previous--image");
      nextBgImageEl.classList.remove("next--image");

      // Adjust z-index to manage visibility
      (currentCardEl as HTMLElement).style.zIndex = "50";
      (currentBgImageEl as HTMLElement).style.zIndex = "-2";

      if (direction === "right") {
        (previousCardEl as HTMLElement).style.zIndex = "20";
        (nextCardEl as HTMLElement).style.zIndex = "30";
        (nextBgImageEl as HTMLElement).style.zIndex = "-1";

        // Apply new classes
        currentCardEl.classList.add("previous--card");
        previousCardEl.classList.add("next--card");
        nextCardEl.classList.add("current--card");

        currentBgImageEl.classList.add("previous--image");
        previousBgImageEl.classList.add("next--image");
        nextBgImageEl.classList.add("current--image");
      } else if (direction === "left") {
        (previousCardEl as HTMLElement).style.zIndex = "30";
        (nextCardEl as HTMLElement).style.zIndex = "20";
        (previousBgImageEl as HTMLElement).style.zIndex = "-1";

        // Apply new classes
        currentCardEl.classList.add("next--card");
        previousCardEl.classList.add("current--card");
        nextCardEl.classList.add("previous--card");

        currentBgImageEl.classList.add("next--image");
        previousBgImageEl.classList.add("current--image");
        nextBgImageEl.classList.add("previous--image");
      }
    }
  }

  function changeInfo(direction: "left" | "right") {
    const cardInfosContainerEl = document.querySelector(".info__wrapper");

    if (!cardInfosContainerEl) {
      console.error("Error: .info__wrapper not found in the DOM!");
      return;
    }

    const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
    const previousInfoEl =
      cardInfosContainerEl.querySelector(".previous--info");
    const nextInfoEl = cardInfosContainerEl.querySelector(".next--info");

    if (!currentInfoEl || !previousInfoEl || !nextInfoEl) {
      console.error("Error: One or more info elements not found!");
      return;
    }

    gsap
      .timeline()
      .to([".btn--left", ".btn--right"], {
        duration: 0.2,
        opacity: 0.5,
        pointerEvents: "none",
      })
      .to(
        currentInfoEl.querySelectorAll(".text"),
        {
          duration: 0.4,
          stagger: 0.1,
          translateY: "-120px",
          opacity: 0,
        },
        "-="
      )
      .call(() => {
        swapInfosClass(direction);
      })
      .fromTo(
        direction === "right"
          ? nextInfoEl.querySelectorAll(".text")
          : previousInfoEl.querySelectorAll(".text"),
        {
          opacity: 0,
          translateY: "40px",
        },
        {
          duration: 0.4,
          stagger: 0.1,
          translateY: "0px",
          opacity: 1,
        }
      )
      .to([".btn--left", ".btn--right"], {
        duration: 0.2,
        opacity: 1,
        pointerEvents: "all",
      });

    function swapInfosClass(direction: "left" | "right") {
      if (!currentInfoEl || !previousInfoEl || !nextInfoEl) {
        console.error("Error: One or more info elements not found!");
        return;
      }

      currentInfoEl.classList.remove("current--info");
      previousInfoEl.classList.remove("previous--info");
      nextInfoEl.classList.remove("next--info");

      if (direction === "right") {
        currentInfoEl.classList.add("previous--info");
        nextInfoEl.classList.add("current--info");
        previousInfoEl.classList.add("next--info");
      } else if (direction === "left") {
        currentInfoEl.classList.add("next--info");
        nextInfoEl.classList.add("previous--info");
        previousInfoEl.classList.add("current--info");
      }
    }
  }

  return (
    <div className="w-[100vw] my-10 overflow-x-hidden flex flex-col items-center justify-between">
      <div className="w-full lg:h-[100vh] md:h-[80vh] h-[60vh] overflow-hidden flex items-center justify-center relative">
        <div className="cardList ">
          <button
            className="cardList__btn btn btn--left hidden md:block"
            onClick={() => swapCards("right")}
          >
            <div className="icon">
              <ChevronLeft />
              {/* <svg>
                <use xlinkHref="#arrow-left"></use>
              </svg> */}
            </div>
          </button>

          <div className="cards__wrapper">
            {cards.map(({ imgUrl, classNames }, index) => (
              <div key={index} className={`card ${classNames}`}>
                <div className="card__image">
                  <ExportedImage className="img" src={imgUrl} alt="" fill />
                </div>
              </div>
            ))}
          </div>

          <button
            className="cardList__btn btn btn--right  hidden md:block"
            onClick={() => swapCards("left")}
          >
            <div className="icon">
              <ChevronRight />
              {/* <svg>
                <use xlinkHref="#arrow-right"></use>
              </svg> */}
            </div>
          </button>
        </div>

        <div className="infoList">
          <div className="info__wrapper">
            <div className="info current--info">
              <h1 className="text name">UOM</h1>
              <h4 className="text location">Scotland</h4>
              <p className="text description">The mountains are calling</p>
            </div>

            <div className="info next--info">
              <h1 className="text name">USJ</h1>
              <h4 className="text location">Peru</h4>
              <p className="text description">Adventure is never far away</p>
            </div>

            <div className="info previous--info">
              <h1 className="text name">UOC</h1>
              <h4 className="text location">France</h4>
              <p className="text description">Let your dreams come true</p>
            </div>
          </div>
        </div>

        <div className="app__bg">
          <div className="app__bg__image current--image">
            <ExportedImage
              className="img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxK0nLezqlaqJjGtRUruZCY-fqKdI2Wi7bG1i0n7PrNerD-aNfH5iit53FO92f5X3xjDo&usqp=CAU"
              alt=""
              fill
            />
          </div>
          <div className="app__bg__image next--image">
            <ExportedImage
              className="img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVreuIL7YFIhOLpMK0HDOcgbFTH9MDoB5neyMoDWZzL4iFRQg_dI4J9sQQTCcmUx7L55c&usqp=CAU"
              alt=""
              fill
            />
          </div>
          <div className="app__bg__image previous--image">
            <ExportedImage
              className="img"
              src="https://i.pinimg.com/474x/58/be/4a/58be4a4722481dbecee4d549a65197c4.jpg"
              alt=""
              fill
            />
          </div>
        </div>
      </div>

      <div className=" w-full h-[50px] flex items-center justify-center gap-10 z-10">
        <button
          className="btn--left block md:hidden"
          onClick={() => swapCards("right")}
        >
          <div className="icon">
            <ChevronLeft className="w-14 h-14" />
            {/* <svg>
                <use xlinkHref="#arrow-left"></use>
              </svg> */}
          </div>
        </button>

        <button
          className="btn--right block md:hidden"
          onClick={() => swapCards("left")}
        >
          <div className="icon">
            <ChevronRight className="w-14 h-14" />
            {/* <svg>
                <use xlinkHref="#arrow-right"></use>
              </svg> */}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Uni3Section;
