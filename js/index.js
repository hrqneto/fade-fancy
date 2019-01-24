var fadeButtons = document.querySelectorAll('[data-type="fade-button"]');

for(var i=0;i<fadeButtons.length;i++){
 
  bindEventListener(fadeButtons[i], "click", function(e) {
    fade(getSibling(e.target, '[data-type="fade-div"]'), "block");
  }, false);
  
  //Display initial element display state on page load
  getSibling(fadeButtons[i], '[data-type="display-box"]').innerHTML = "Display: "+ getComputedStyle(getSibling(fadeButtons[i], '[data-type="fade-div"]')).display;
  
}

function fade(target, displayType) {
    //Binding transitionend event listener
    if(!target.hasAttribute("data-opacity-transition-listener")){
      bindEventListener(target, "transitionend", function(e) {
        target.setAttribute("data-opacity-transition-listener",true);
        fadeTransitionEnd(e, displayType);
      }); 
    }
    
    if (getComputedStyle(target).display !== "none" && !target.classList.contains(displayType)) {
      target.classList.add("hide");
    } else if (getComputedStyle(target).display === "none" && target.classList.contains("none")) {
      target.classList.remove("none");
      if (!getComputedStyle(target).display !== "none") {
        target.classList.add("show");
      }
    } else if (getComputedStyle(target).display === "none" && !target.classList.contains("none")) {
      target.classList.add(displayType);
      if (getComputedStyle(target).display !== "none") {
        target.classList.add("show");
      }
    } else if (getComputedStyle(target).display !== "none" && target.classList.contains(displayType)) {
      target.classList.remove("show");
    }
}

function fadeTransitionEnd(e, displayType) {
  if (e.propertyName === "opacity") {
    
    //Get fade button to toggle inner text
    var button = getSibling(e.target, '[data-type="fade-button"]'),
        displayBox = getSibling(e.target, '[data-type="display-box"]');
    if (getComputedStyle(e.target).opacity <= 0 && e.target.classList.contains("hide")) {
      e.target.classList.add("none");
      button.innerHTML = "Fancy In";
    } else if (getComputedStyle(e.target).opacity > 0 && !e.target.classList.contains(displayType)) {
      e.target.classList.remove("hide", "show");
      button.innerHTML = "Fancy Out";
    } else if (getComputedStyle(e.target).opacity <= 0 && !e.target.classList.contains("hide")) {
      e.target.classList.remove(displayType);
      button.innerHTML = "Fancy In";
    } else if (getComputedStyle(e.target).opacity > 0 && e.target.classList.contains(displayType)) {
      button.innerHTML = "Fancy";
    }
    displayBox.innerHTML = "Display: "+getComputedStyle(e.target).display;
  }
}

function bindEventListener(el, ev, callback) {
  el.addEventListener(ev, callback, false);
}

function getSibling(el, selector) {
  return el.parentNode.querySelector(selector);
}