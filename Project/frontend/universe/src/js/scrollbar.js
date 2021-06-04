const scrollbar = document.getElementById('gamePreview');

let pos = { top: 0, left: 0, x: 0, y: 0 };
let scrolling;

scrollbar.addEventListener("mousedown", e=> {
  scrollbar.style.cursor = "grabbing";
  scrolling = true;
  pos = {
    // The current scroll 
    left: scrollbar.scrollLeft,
    top: scrollbar.scrollTop,
    // Get the current mouse position
    x: e.clientX,
    y: e.clientY,
  };

  scrollbar.addEventListener("mousemove", e => {
    if(scrolling){
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;
    
      // Scroll the element
      scrollbar.scrollTop = pos.top - dy;
      scrollbar.scrollLeft = pos.left - dx;
    }
  });
  
  scrollbar.addEventListener("mouseup", e => {
    scrollbar.style.cursor = "default";
    scrolling = false;
  });
});
