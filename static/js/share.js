function share() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: location.href
        });
    } else {
        const url = document.querySelector("#page-url");
        url.select();
        document.execCommand("copy");
    }
}
