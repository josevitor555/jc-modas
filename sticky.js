const header = document.querySelector("header");

window.addEventListener("scroll", function() {
  var scrollPosition = this.window.scrollY;
  var header = this.document.querySelector("header");
  // header.style.backdropFilter = "blur(" + (scrollPosition / 50) + "px)";
  header.style.background = "#FAFAFA";
});