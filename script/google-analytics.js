function initGoogleAnalytics() {
    window.ga = window.ga || function() {
        (ga.q = ga.q || []).push(arguments);
    };
    ga.l = +new Date;
    ga("create", "UA-54179841-17", "auto");
    ga("send", "pageview");
}

export { initGoogleAnalytics };
