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
            renderObject = getSettingsFromDOM(i, circle),
            tpl = createTemplate(renderObject);

        setCircumference(renderObject);

        addTemplateToDom(circle, tpl);

        resetProgressBar(circle, renderObject);

        animateCircle(circle, renderObject);

    }

    function getSettingsFromDOM(id, circle) {
        return {
            id: id,
            speed: circle.getAttribute('data-anim-speed') || null,
            percent: circle.getAttribute('data-percentage') || 0,
            gradientStart: circle.getAttribute('data-gradient-start') || '#00bc9b',
            gradientEnd: circle.getAttribute('data-gradient-end') || '00bc9b',
            radius: circle.getAttribute('data-radius') || 54,
            isNegative: (circle.getAttribute('data-percentage') < 0)
        }
    }

    function resetProgressBar(circle, renderObject) {
        var text,
            circumference = getCircumference(renderObject);

        // Setting active progressbar to 0 / invisible
        circle.style.strokeDasharray = circumference + " " + circumference;
        circle.style.strokeDashoffset = circumference;

        text = circle.querySelector('.circle-progress-value');
        text.textContent = '0%';
    }

    function setProgress(circle, percent, renderObject) {

        var circumference = renderObject.radius * 2 * Math.PI,
            offset,
            text;

        circle.style.strokeDasharray = circumference + " " + circumference;

        offset = circumference - percent / 100 * circumference;
        circle.style.strokeDashoffset = (renderObject.isNegative) ? '-' + offset : offset;

        text = circle.querySelector('.circle-progress-value');
        text.textContent = (renderObject.isNegative) ? '-' + percent + '%' : percent + '%';
    }

    function animateCircle(circle, renderObject) {
        var percent = (renderObject.percent < 0) ? renderObject.percent * -1 : renderObject.percent;

        for (var k = 0; k <= percent; k++) {

            if (renderObject.speed) {
                (function (index) {
                    setTimeout(function () {
                        setProgress(circle, index, renderObject);
                    }, renderObject.speed * index);
                }(k));
            } else {
                setProgress(circle, k, renderObject);
            }
        }
    }

    function setCircumference(renderObject) {
        if (!renderObject.hasOwnProperty('circumference')) {
            renderObject.circumference = renderObject.radius * 2 * Math.PI;
        }
    }

    function getCircumference(renderObject) {
        return renderObject.circumference || null;
    }

    function createTemplate(renderObject) {

        return '<svg class="progress-ring"' +
            'preserveAspectRatio="xMinYMin meet"' +
            'viewBox="0 0 140 140"' +
            'height="140"' +
            'width="140">' +
            '<defs>' +
            '<linearGradient id="gradient-' + renderObject.id + '" x1="0%" y1="0%" x2="0%" y2="100%">' +
            '<stop offset="0%" stop-color="' + renderObject.gradientStart + '"/>' +
            '<stop offset="100%" stop-color="' + renderObject.gradientEnd + '"/>' +
            '</linearGradient>' +
            '</defs>' +
            '<text class="circle-progress-value" x="50%" y="50%" dy=".3em"' +
            'text-anchor="middle" alignment-baseline="middle"></text>' +
            '<circle class="progress-circle-inactive"' +
            'fill="transparent"' +
            'r="' + renderObject.radius + '"' +
            'cx="70"' +
            'cy="70"/>' +
            '<circle class="progress-circle-active"' +
            'transform="rotate(-90,70,70)"' +
            'transform-origin="center"' +
            'stroke="url(#gradient-'+ renderObject.id +')"' +
            'fill="transparent"' +
            'r="' + renderObject.radius + '"' +
            'cx="70"' +
            'cy="70"/>' +
            'Sorry, your browser does not support inline SVG.' +
            '</svg>'
    }

    function addTemplateToDom(dom, tpl) {
        dom.innerHTML = tpl;
    }
}());