import { initSearch, hideSearchField, hideSearchResults } from "./search";
import { initSidebar, closeSidebar, setActiveLink } from "./sidebar";
import { initGoogleAnalytics } from "./google-analytics";

document.addEventListener("DOMContentLoaded", function(event) {
    initBarba();
    initSearch();
    initSidebar();
    initGoogleAnalytics();
    setActiveLink();
});

function initBarba() {
    Barba.Pjax.start();
    Barba.Prefetch.init();
    Barba.Dispatcher.on("newPageReady", function(currentStatus, oldStatus, container) {
        setActiveLink();
        initGoogleAnalytics();
        delete window.pageReady;
        hideSearchResults();
        hideSearchField();
        scrollToTop();
        closeSidebar();

        const js = container.querySelector("script");
        if (js === null) {
            return;
        }

        // eslint-disable-next-line no-eval
        eval(js.innerHTML);

        if (typeof pageReady === "function") {
            pageReady(container);
        }
    });

    if (typeof pageReady === "function") {
        pageReady(document);
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
