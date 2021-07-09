function changeCSS(cssFile, cssLinkIndex) {

    var oldlink = document.getElementsByTagName("switch").item(cssLinkIndex);

    var newlink = document.createElement("button");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document.getElementsByTagName("header").item(cssLinkIndex).replaceChild(newlink, oldlink);
}