
const acc = document.getElementsByClassName("acc-trigger");
const panel = document.getElementsByClassName("acc-panel");

for (var i = 0; i < acc.length; i++) {
  acc[i].setAttribute("aria-expanded", "false");

  acc[i].id = "acc-trigger-" + parseInt(i + 1); //generate id for each question panel.

  acc[i].onclick = function (e) {
    e.preventDefault();
    const setClasses = !this.classList.contains("active");
    setClass(acc, "active", "remove");
    setClass(panel, "show", "remove");

    if (setClasses) {
      this.classList.toggle("active");
      this.setAttribute("aria-expanded", "true");
      this.nextElementSibling.classList.toggle("show");
    } else {
      this.setAttribute("aria-expanded", "false");
    }
  };

  if (acc[i].classList.contains("active")) {
    acc[i].setAttribute("aria-expanded", "true");
  }
}

// SetClass function to handle active accordion and show panel
function setClass(els, className, fnName) {
  for (var i = 0; i < els.length; i++) {
    els[i].classList[fnName](className);
  }
}

//Keyboard Control

document.addEventListener("keydown", (ev) => {
  let q = Array.prototype.slice.call(document.querySelectorAll(".acc-trigger"));
  let a = Array.prototype.slice.call(document.querySelectorAll(".acc-panel"));

  let target = ev.target;
  let key = ev.which.toString();

  // 33 = Page Up, 34 = Page Down
  let ctrlModifier = ev.ctrlKey && key.match(/33|34/);

  if (target.classList.contains("acc-trigger")) {
    if (key.match(/38|40/) || ctrlModifier) {
      let index = q.indexOf(target);
      let direction = key.match(/34|40/) ? 1 : -1;
      let length = q.length;
      let newIndex = (index + length + direction) % length;

      q[newIndex].focus();
    } else if (key.match(/35|36/)) {
      // 35 = End, 36 = Home keyboard operations
      switch (key) {
        // Go to first accordion
        case "36":
          q[0].focus();
          break;
        // Go to last accordion
        case "35":
          q[q.length - 1].focus();
          break;
      }
    }
  }
});
