// see https://facelessuser.github.io/pymdown-extensions/extensions/arithmatex/
window.MathJax = {
    tex: {
        inlineMath: [["\\(", "\\)"]],
        displayMath: [["\\[", "\\]"]],
        processEscapes: true,
        processEnvironments: true
    },
    options: {
        ignoreHtmlClass: ".*|",
        processHtmlClass: "arithmatex"
    }
};

(function () {
    const urls = [
        'https://polyfill.io/v3/polyfill.min.js?features=es6',
        'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js'
    ];
    for (const url of urls) {
        let script = document.createElement('script');
        script.src = url;
        script.async = true;
        document.head.appendChild(script);
    }
})();