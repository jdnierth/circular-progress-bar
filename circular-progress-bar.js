/**
 * SOME DESCRIPTION
 *
 * @author: Jessica Nierth
 * @date: 12/23/2018
 */
(function () {

    // Get all circles
    var circles = document.querySelectorAll('.circle');

    // Initialize all circles
    for (var i = 0, len = circles.length; i < len; i++) {
        var circle = circles[i],
            speed = circle.getAttribute('data-anim-speed'),
            percent = circle.getAttribute('data-percentage'),
            radius = circle.getAttribute('data-radius'),
            circumference = radius * 2 * Math.PI;

        var tpl = createTemplate(radius);

        addTemplateToDom(circle, tpl);
        for (var i = 0; i <= percent; i++) {
            if (speed) {
                (function (l) {
                    setTimeout(function () {
                        setProgress(circle, l, radius, circumference);
                    }, speed * l);
                }(i));
            } else {
                setProgress(circle, i, radius, circumference);
            }
        }
    }

    function setProgress(circle, percent, radius, circumference) {

        var offset,
            text;

        circle.style.strokeDasharray = circumference + " " + circumference;

        offset = circumference - percent / 100 * circumference;
        circle.style.strokeDashoffset = offset;

        text = circle.querySelector('.circle-progress-value');
        text.innerHTML = percent + '%';
    }

    function createTemplate(radius) {

        return '<svg class="progress-ring"' +
            'preserveAspectRatio="xMinYMin meet"' +
            'viewBox="0 0 140 140">' +
            '<defs>' +
            '<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">' +
            '<stop offset="0%" stop-color="#00bc9b"/>' +
            '<stop offset="100%" stop-color="#5eaefd"/>' +
            '</linearGradient>' +
            '</defs>' +
            '<text class="circle-progress-value" x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"></text>' +
            '<circle class="progress-circle-inactive"' +
            'stroke="white"' +
            'stroke-width="4"' +
            'fill="transparent"' +
            'r="' + radius + '"' +
            'cx="70"' +
            'cy="70"/>' +
            '<circle class="progress-circle-active"' +
            'stroke="url(#gradient)"' +
            'fill="transparent"' +
            'r="' + radius + '"' +
            'cx="70"' +
            'cy="70"/>' +
            '</svg>'
    }

    function addTemplateToDom(dom, tpl) {
        dom.innerHTML = tpl;
    }
}());