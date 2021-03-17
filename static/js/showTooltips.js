function showTooltips() {
    const toolButtons = document.querySelectorAll("[tooltip]");
    const viewport = document.querySelector(".viewport");
    const biasY = 2;
    const biasX = 14;
    let offsetY = 0;
    const len = toolButtons.length;
    for (let i = 0; i < len; i++) {
        const toolButton = toolButtons[i];
        const rect = toolButton.getBoundingClientRect();
        let x = rect.x;
        let oy = rect.y + rect.height;
        let y = rect.y + rect.height + biasY + offsetY;
        const tipInner = `<div class="tooltip-content">
            <strong>${toolButton.getAttribute("tooltip")}</strong>
        </div>`;
        let tipElem = document.createElement("div");
        tipElem.classList.add("tooltip");
        tipElem.style = `left: ${x}px; top: ${y}px`;
        tipElem.innerHTML = tipInner;
        tipElem.setAttribute("tipid", "" + i);

        let lineElem = document.createElement("div");
        lineElem.classList.add("tooltip-line");
        lineElem.style = `width: 1px; height: ${y - oy}px; left: ${x + biasX}px; top: ${oy}px`;

        viewport.appendChild(tipElem);
        viewport.appendChild(lineElem);
        // find height of added tip
        const lastTip = document.querySelector(`[tipid="${i}"]`);
        offsetY += lastTip.getBoundingClientRect().height + biasY;
    }
}

function deleteTooltips() {
    const tips = document.querySelectorAll(".tooltip");
    const lines = document.querySelectorAll(".tooltip-line");
    for (let i = 0; i < tips.length; i++) {
        tips[i].remove();
        lines[i].remove();
    }
}

window.addEventListener("load", () => {
    window.addEventListener("keydown", e => {
        if (e.key == "Alt") {
            showTooltips();
        }
    });
    
    window.addEventListener("keyup", e => {
        if (e.key == "Alt") {
            deleteTooltips();
        }
    });

    const help = document.querySelector("#help");
    if (help) {
        help.addEventListener("mouseenter", e=> {
            showTooltips();
        });
        help.addEventListener("mouseleave", e=> {
            deleteTooltips();
        });
    }
});


