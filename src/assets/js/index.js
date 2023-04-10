import "swiper/swiper-bundle.min.css";
import "../styles/reset.scss";
import "../styles/styles.scss";

import Swiper, { Navigation } from "swiper";
Swiper.use([Navigation]);

const checkBoxes = {
  requirements: ["minimal", "recommended"],
  versions: ["standart", "limited"],
};
let isPlay = false;
const classes = {
  opend: "opend",
  hidden: "hidden",
  active: "active",
};

const checkBox = document.querySelectorAll(".checkbox");
const menuLink = document.querySelectorAll(".menu-link");
const menuButton = document.querySelector(".header-menu__button");
const header = document.querySelector(".header");
const video = document.getElementById("video");
const videoButton = document.querySelector(".video-btn");
const faqItem = document.querySelectorAll(".faq-item")

const scrollToSection = (e) => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute("href");

  if (!href && !href.startsWith("#")) return;

  const section = href.slice(1);
  const top = document.getElementById(section)?.offsetTop || 0;
  window.scrollTo({ top, behavior: "smooth" });
};

const getTimerValues = (diff) => {
  return {
    seconds: (diff / 1000) % 60,
    minutes: (diff / (1000 * 60)) % 60,
    hours: (diff / (1000 * 3600)) % 24,
    days: (diff / (1000 * 3600 * 24)) % 365,
  };
};

const setTimerValues = (values) => {
  Object.entries(getTimerValues(values)).forEach(([key, value]) => {
    const timerValue = document.getElementById(key);
    timerValue.innerText =
      value < 10 ? `0${Math.floor(value)}` : Math.floor(value);
  });
};

const startTimer = (date) => {
  const id = setInterval(() => {
    const diff = new Date(date).getTime() - new Date().getTime();

    if (diff < 0) {
      clearInterval(id);
      return;
    }

    setTimerValues(diff);
  }, 1000);
};

const handleVideo = ({ target }) => {
  const info = target.parentElement;

  isPlay = !isPlay;
  info.classList.toggle(classes.hidden, isPlay);
  target.innerText = isPlay ? "Pause" : "Play";

  isPlay ? video.play() : video.pause();
};

startTimer("July 4, 2023 22:15:00");
menuButton.addEventListener("click", () =>
  header.classList.toggle(classes.opend)
);

const handleCheckBox = ({ currentTarget: { checked, name } }) => {
  const { active } = classes;
  const value = checkBoxes[name][Number(checked)];
  const list = document.getElementById(value);
  const tabs = document.querySelectorAll(`[data-${name}]`);
  const sibblings = list.parentElement.children;

  for (let item of sibblings) item.classList.remove(classes.active);
  for (let tab of tabs) {
    tab.classList.remove(classes.active);
    tab.dataset[name] === value && tab.classList.add(classes.active);
  }
  list.classList.add(classes.active);
};

const initSlider = () => {
  new Swiper(".swiper", {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 20,
    initialSlide: 2,
    navigation: {
      nextEL: 'swiper-button-next',
      prevEL: 'swiper-button-prev',
    }
  });
};

const handleFaqItem = ({ currentTarget: target }) => {
  target.classList.toggle(classes.opend);
  const isOpend = target.classList.contains(classes.opend);
  const height = target.querySelector('p').clientHeight;
  const content = target.querySelector('.faq-item__content');
  content.style.height = `${isOpend ? height : 0}px`
}

initSlider();
menuLink.forEach((link) => link.addEventListener("click", scrollToSection));
videoButton.addEventListener("click", handleVideo);
checkBox.forEach((box) => box.addEventListener("click", handleCheckBox));
faqItem.forEach((item) => item.addEventListener("click", handleFaqItem));