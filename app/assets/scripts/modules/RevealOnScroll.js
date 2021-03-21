import throttle from "lodash/throttle";
import debounce from "lodash/debounce";
class RevealOnScroll {
  constructor(els, treshholdPercent) {
    this.treshholdPercent = treshholdPercent;
    this.itemsToReveal = els;
    this.hideInitially();
    this.browserHeight = window.innerHeight;
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);

    this.events();
  }

  events() {
    window.addEventListener("scroll", this.scrollThrottle);
    window.addEventListener(
      "resize",
      debounce(() => {
        console.log("Resize");
        this.browserHeight = window.innerHeight;
      }),
      330
    );
  }

  calcCaller() {
    console.log("Scroll function run");
    this.itemsToReveal.forEach((item) => {
      if (!item.isRevealed) {
        this.calculateIfScrolledTo(item);
      }
    });
  }

  hideInitially() {
    this.itemsToReveal.forEach((item) => {
      item.classList.add("reveal-item");
      item.isRevealed = false;
    });
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
  }

  calculateIfScrolledTo(item) {
    if (window.scrollY + this.browserHeight > item.offsetTop) {
      console.log("Element was calculated");
      const scrollPercent =
        (item.getBoundingClientRect().y / this.browserHeight) * 100;
      if (scrollPercent < this.treshholdPercent) {
        item.classList.add("reveal-item--is-visible");
        item.isRevealed = true;
        if (item.isLastItem) {
          window.removeEventListener("scroll", this.scrollThrottle);
        }
      }
    }
  }
}

export default RevealOnScroll;
