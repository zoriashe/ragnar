import "swiper/swiper-bundle.min.css";
import "../styles/reset.scss";
import "../styles/styles.scss";
import { languages } from "./lang";

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
const values = [
  {
    price: 19.99,
    title: "Standard Edition",
  },
  {
    price: 18.99,
    title: "Standard Edition",
  },
  {
    price: 29.99,
    title: "Deluxe Edition",
  }
]

const checkBox = document.querySelectorAll(".checkbox");
const menuLink = document.querySelectorAll(".menu-link");
const menuButton = document.querySelector(".header-menu__button");
const header = document.querySelector(".header");
const video = document.getElementById("video");
const videoButton = document.querySelector(".video-btn");
const faqItem = document.querySelectorAll(".faq-item");
const sections = document.querySelectorAll(".section");
const language = document.querySelectorAll(".language");
const buyButton = document.querySelectorAll(".button-buy");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal-version");
const modalPrice = document.querySelector(".modal-total__price");
const modalClose = document.querySelector(".modal-close");


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

const handleScroll = () => { 
  const { scrollY, innerHeight } = window
  sections.forEach(section => {
    if (scrollY > section.offsetTop - innerHeight / 1.5) section.classList.remove(classes.hidden)
  })
};

const setTexts = () => {
  const lang = localStorage.getItem('lang' || 'en');
  const content = languages[lang]

  Object.entries(content).forEach(([key, value]) => {
    const items = document.querySelectorAll(`[data-text="${key}"]`)
    items.forEach(item => item.innerText = value)
  })
}

const toggleLanguage = ({ target }) => {
  const { lang } = target.dataset;

  if(!lang) return;

  localStorage.setItem('lang', lang)
  setTexts();
}

const handleBuyButton = ({ currentTarget: target }) => {
  const { value } = target.dataset;

  if(!value) return;

  const { price, title } = values[value];

  modalTitle.innerText = title;
  modalPrice.innerText = `${price}$`;
  modal.classList.add(classes.opend);
  overlay.classList.add(classes.opend);
}

overlay.addEventListener('click', (e) => {

  let withinModal = e.composedPath().includes(modal);
            
  if (!withinModal && modal.classList.contains(classes.opend)) {
      modal.classList.remove(classes.opend);
      overlay.classList.remove(classes.opend);
  }
})

const handleCloseModal = (e) => {
  modal.classList.remove(classes.opend);
  overlay.classList.remove(classes.opend);
}

document.addEventListener('keydown', (e) => e.key === 'Escape' ? handleCloseModal() : '')

initSlider();
setTexts();
startTimer("July 4, 2023 22:15:00");
window.addEventListener("scroll", handleScroll)
menuLink.forEach((link) => link.addEventListener("click", scrollToSection));
videoButton.addEventListener("click", handleVideo);
checkBox.forEach((box) => box.addEventListener("click", handleCheckBox));
faqItem.forEach((item) => item.addEventListener("click", handleFaqItem));
language.forEach((lang) => lang.addEventListener("click", toggleLanguage));
buyButton.forEach((btn) => btn.addEventListener("click", handleBuyButton));
modalClose.addEventListener("click", handleCloseModal);