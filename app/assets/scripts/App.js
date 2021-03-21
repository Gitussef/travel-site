import "../styles/styles.css";
import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";

const mobileMenu = new MobileMenu();
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
const stickyHeader = new StickyHeader();
let modal;

document.querySelectorAll(".open-modal").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (typeof modal === "undefined") {
      import(/*webpackChunkName: "modal"*/ "./modules/Modal")
        .then((x) => {
          modal = new x.default();
          setTimeout(() => {
            modal.openModal();
          }, 20);
        })
        .catch(() => {
          console.log("Error");
        });
    } else {
      module.openModal();
    }
  });
});

if (module.hot) {
  module.hot.accept();
}
