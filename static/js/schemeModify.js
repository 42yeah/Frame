window.addEventListener("load", () => {
    const spans = document.querySelectorAll("span[style]");
    for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        if (span.style.color == "rgb(134, 179, 0)") {
            span.style.color = "#898989";
            span.style.fontFamily = "'Helvetica Neue', opensans, Arial, Helvetica, sans-serif";
            span.style.fontWeight = "bolder";
        } else if (span.style.color == "rgb(242, 151, 24)") {
            span.style.color = "black";
        } else if (span.style.color == "rgb(255, 143, 64)") {
            span.style.color = "black";
        } else if (span.style.color == "rgb(250, 110, 50)") {
            span.style.color = "rgb(0, 117, 252)";
        } else if (span.style.color == "rgb(237, 147, 102)") {
            span.style.color = "rgba(0, 117, 252, 0.5)";
        } else if (span.style.color == "rgb(240, 113, 113)") {
            span.style.color = "rgb(1, 71, 150)";
            span.style.fontWeight = "bold";
        } else if (span.style.color == "rgb(76, 191, 153)") {
            span.style.color = "rgba(1, 71, 150, 0.3)";
        }
    }
    const ps = document.querySelectorAll("p");
    for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        if (p.firstChild && p.firstChild.nodeName == "IMG") {
            p.style = "text-align: center";
            let alt = p.firstChild.getAttribute("alt");
            let altElem = document.createElement("div");
            altElem.classList.add("alt");
            altElem.innerHTML = alt;
            p.appendChild(altElem);
        }
    }
});
