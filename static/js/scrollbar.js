// Calculate 

function calibrateScrollbar(scrollBarViewport, sticky, footer) {
    const stickyRect = sticky.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();

    const top = stickyRect.y + stickyRect.height;
    const viewingRange = footerRect.y - top;
    scrollBarViewport.style = `left: ${stickyRect.x + stickyRect.width - 10}px; top: ${top}px; height: ${viewingRange}px`;
    return {
        top, viewingRange
    };
}

window.addEventListener("load", () => {
    const scrollBarViewport = document.querySelector(".scrollbar-viewport");
    const sticky = document.querySelector(".sticky");
    const footer = document.querySelector(".footer");
    let viewingRange, top;

    const ret = calibrateScrollbar(scrollBarViewport, sticky, footer);
    viewingRange = ret.viewingRange;
    top = ret.top;

    const scrollBarBrick = document.querySelector(".scrollbar-brick");
    const blogContainerHeight = document.querySelector(".blog-container").getBoundingClientRect().height;
    
    const brickHeight = (viewingRange / blogContainerHeight) * viewingRange;
    if (viewingRange / blogContainerHeight <= 0.99) {
        // What's the point of a scrollbar if the whole window could contain the blob post?
        scrollBarViewport.classList.remove("invisible");
    }
    scrollBarBrick.style = `height: ${brickHeight}px; top: 0;`;

    // After a successful calibration...
    window.addEventListener("resize", e => {
        const ret = calibrateScrollbar(scrollBarViewport, sticky, footer);
        viewingRange = ret.viewingRange;
        top = ret.top;
    });

    const verticalViewport = document.querySelector(".vertical-viewport");
    verticalViewport.addEventListener("scroll", e => {
        const brickPos = (e.target.scrollTop) / blogContainerHeight * viewingRange;
        let h = brickHeight;
        if (brickPos + brickHeight > viewingRange) {
            h = viewingRange - brickPos;
        }
        scrollBarBrick.style = `height: ${h}px; top: ${brickPos}px;`;
    });

    let dragging = false;
    let offsetToScrollBarBrickTop = 0;

    scrollBarBrick.addEventListener("mousedown", e => {
        offsetToScrollBarBrickTop = scrollBarBrick.getBoundingClientRect().y - e.clientY;
        dragging = true;
    });

    scrollBarBrick.addEventListener("touchstart", e => {
        offsetToScrollBarBrickTop = scrollBarBrick.getBoundingClientRect().y - e.touches[0].clientY;
        dragging = true;
    });

    window.addEventListener("mouseup", e => {
        dragging = false;
    });

    window.addEventListener("touchend", e => {
        dragging = false;
    });

    window.addEventListener("mousemove", e => {
        if (dragging) {
            const percent = ((offsetToScrollBarBrickTop + e.clientY - top) / viewingRange);
            verticalViewport.scrollTop = percent * blogContainerHeight;
        }
    });

    window.addEventListener("touchmove", e => {
        if (dragging) {
            const percent = ((offsetToScrollBarBrickTop + e.touches[0].clientY - top) / viewingRange);
            verticalViewport.scrollTop = percent * blogContainerHeight;
        }
    });
});
