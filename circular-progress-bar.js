/**
 * SOME DESCRIPTION
 *
 * @author: Jessica Nierth
 * @date: 12/23/2018
 */
(function () {
    // Get all circles
    var circles = document.querySelectorAll('.circle');

    for (var i = 0, len = circles.length; i < len; i++) {
        var circle = circles[i],
            percent = circle.getAttribute('data-percentage');

        setProgress(circle, percent);
    }

    function setProgress(circle,percent) {

        var radius = 54,
            circumference = radius * 2 * Math.PI,
            offset,
            text;

        circle.style.strokeDasharray = `${circumference} ${circumference}`;

        offset = circumference - percent / 100 * circumference;
        circle.style.strokeDashoffset = offset;

        text = circle.querySelector('.circle-progress-value');
        text.innerHTML = percent + '%';
    }
}());