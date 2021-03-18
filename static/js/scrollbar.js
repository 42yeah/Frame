// Calculate 

function calibrateScrollbar(scrollBarViewport, sticky, footer, blogContainer, scrollBarBrick) {
    const stickyRect = sticky.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();

    const blogContainerHeight = blogContainer.getBoundingClientRect().height;

    const top = stickyRect.y + stickyRect.height;
    const viewingRange = footerRect.y - top;
    scrollBarViewport.style = `left: ${stickyRect.x + stickyRect.width - 10}px; top: ${top}px; height: ${viewingRange}px`;

    if (viewingRange / blogContainerHeight <= 0.99) {
        // What's the point of a scrollbar if the whole window could contain the blob post?
        scrollBarViewport.classList.remove("invisible");
    } else {
        scrollBarViewport.classList.add("invisible");
    }

    const brickHeight = (viewingRange / blogContainerHeight) * viewingRange;

    return {
        top, viewingRange, blogContainerHeight, brickHeight
    };
}

function updateScrollBarBrick(top, scrollBarBrick, blogContainerHeight, viewingRange, brickHeight) {
    const brickPos = top / blogContainerHeight * viewingRange;
    let h = brickHeight;
    if (brickPos + brickHeight > viewingRange) {
        h = viewingRange - brickPos;
    }
    scrollBarBrick.style = `height: ${h}px; top: ${brickPos}px;`;
}

window.addEventListener("load", () => {
    const scrollBarViewport = document.querySelector(".scrollbar-viewport");
    const sticky = document.querySelector(".sticky");
    const footer = document.querySelector(".footer");
    const blogContainer = document.querySelector(".blog-container");
    const scrollBarBrick = document.querySelector(".scrollbar-brick");
    let viewingRange, top, blogContainerHeight, brickHeight;

    const ret = calibrateScrollbar(scrollBarViewport, sticky, footer, blogContainer, scrollBarBrick);
    viewingRange = ret.viewingRange;
    top = ret.top;
    blogContainerHeight = ret.blogContainerHeight;
    brickHeight = ret.brickHeight;
    
    scrollBarBrick.style = `height: ${brickHeight}px; top: 0;`;

    // After a successful calibration...
    window.addEventListener("resize", e => {
        const ret = calibrateScrollbar(scrollBarViewport, sticky, footer, blogContainer, scrollBarBrick);
        viewingRange = ret.viewingRange;
        top = ret.top;
        blogContainerHeight = ret.blogContainerHeight;
        brickHeight = ret.brickHeight;
        updateScrollBarBrick(verticalViewport.scrollTop, scrollBarBrick, blogContainerHeight, viewingRange, brickHeight);
    });

    const verticalViewport = document.querySelector(".vertical-viewport");
    verticalViewport.addEventListener("scroll", e => {
        updateScrollBarBrick(e.target.scrollTop, scrollBarBrick, blogContainerHeight, viewingRange, brickHeight);
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
