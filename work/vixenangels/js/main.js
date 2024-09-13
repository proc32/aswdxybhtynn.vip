$(function() {
    function formatTime(value) {
        return value < 10 ? "0" + value : value;
    }

    function updateTime() {
        var currentTime = new Date(),
            hours = currentTime.getHours(),
            minutes = currentTime.getMinutes(),
            seconds = currentTime.getSeconds(),
            ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = formatTime(minutes);
        seconds = formatTime(seconds);

        document.getElementById("realtime").innerHTML = hours + ":" + minutes + ":" + seconds + " " + ampm;

        setTimeout(updateTime, 500);
    }

    const apiKey = "1906ccd7aa6d7c3683f1b293ee212f01",
        city = "sylhet",
        apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    $(window).on("load", function() {
        setTimeout(() => {
            $(".preloader-wrap").delay(500).fadeOut(1000);
            initializeScrollAnimations();
        }, 200);

        setTimeout(() => {
            $(".hero-sec .hero-footer-wrap.scroll-from-bottom").addClass("animated");
        }, 800);
    });

    if ($("#realtime").length) {
        updateTime();
    }

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const latitude = data.coord.lat,
                longitude = data.coord.lon;

            const latDegrees = Math.floor(latitude),
                latMinutes = Math.floor((latitude - latDegrees) * 60),
                latSeconds = 60 * ((latitude - latDegrees) * 60 - latMinutes);

            const lonDegrees = Math.floor(longitude),
                lonMinutes = Math.floor((longitude - lonDegrees) * 60),
                lonSeconds = 60 * ((longitude - lonDegrees) * 60 - lonMinutes);

            document.getElementById("coordinates").textContent =
                `${latDegrees}° ${latMinutes}' ${latSeconds.toFixed(4)}" N`;
        })
        .catch(error => {
            console.log("Error fetching data:", error);
        });

    $(document).on("click", ".header-wrap .header-right .theme-btn", function(event) {
        event.preventDefault();
        $(".popup-menu-wrap").addClass("active");
    });

    $(document).on("click", ".popup-menu-close-btn .icon", function() {
        $(".popup-menu-wrap").removeClass("active");
    });

    window.addEventListener("scroll", { scroll_animations: initializeScrollAnimations });

    $(document).on("click", ".experience-box .experience-button-box .experience-button", function(event) {
        event.preventDefault();
        $(".experience-popup").addClass("active");
    });

    $(document).on("click", ".experience-popup .experience-popup-content-wrap .close-experience-popup-btn", function() {
        $(".experience-popup").removeClass("active");
    });

    const ball = document.getElementById("ball");
    document.addEventListener("mousemove", function(event) {
        gsap.to(ball, {
            duration: 0.3,
            x: event.clientX,
            y: event.clientY,
            opacity: 1,
            ease: "power2.out"
        });
    });

    const links = document.querySelectorAll("a");
    links.forEach(function(link) {
        link.addEventListener("mouseenter", function() {
            ball.classList.add("hovered");
            gsap.to(ball, {
                duration: 0.3,
                scale: 2,
                opacity: 0,
                ease: 0.1
            });
        });

        link.addEventListener("mouseleave", function() {
            ball.classList.remove("hovered");
            gsap.to(ball, {
                duration: 0.3,
                scale: 1,
                opacity: 1,
                ease: "power2.out"
            });
        });
    });
});

function initializeScrollAnimations() {
    var defaultSettings = {
        ease: 0.05,
        animation: "fade_from_bottom",
        once: false
    };

    gsap.utils.toArray(".scroll-animation").forEach(function(element) {
        var animationSettings = {},
            durationSettings = { duration: element.dataset.animationDuration || defaultSettings.duration },
            animationTypes = {
                slide_up: { y: -180 },
                slide_down: { y: 180 },
                slide_up2: { y: -100 },
                slide_down2: { y: 100 },
                fade_from_bottom: { y: 180, opacity: 0 },
                fade_from_top: { y: -180, opacity: 0 },
                fade_from_left: { x: -180, opacity: 0 },
                fade_from_right: { x: 180, opacity: 0 },
                fade_in: { opacity: 0 },
                rotate_up: { y: 180, rotation: 10, opacity: 0 },
                bronx_zoom_out: { scale: 2 },
                slide_and_scale: { scale: 1, opacity: 1 }
            },
            scrollOffset = window.innerWidth > 809 ? "10%" : "30%",
            scrollSettings = {
                scrollTrigger: {
                    trigger: element,
                    once: defaultSettings.once,
                    start: "top bottom+=" + scrollOffset,
                    toggleActions: "play none none reverse",
                    markers: false,
                    onUpdate: function(trigger) {}
                }
            };

        if (element.dataset.animation === "bronx_zoom_out") {
            scrollSettings = {
                scrollTrigger: {
                    trigger: element,
                    once: defaultSettings.once,
                    start: "top bottom",
                    toggleActions: "play none none reverse",
                    markers: false
                }
            };
        }

        jQuery.extend(animationSettings, durationSettings);
        jQuery.extend(animationSettings, animationTypes[element.dataset.animation || defaultSettings.animation]);
        jQuery.extend(animationSettings, scrollSettings);

        gsap.from(element, animationSettings);
    });
}
$(document).ready(function() {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        $(".blur-image").on("click", function() {
            $(this).addClass("blur"); // Add blur class on click
        });
    } else {
        $(".blur-image").on("click", function() {
            $(".blur-image").not(this).addClass("blur"); // Add blur class to all images except the clicked one
            $(this).toggleClass("blur-image"); // Toggle the blur-image class on the clicked image
        });

        $(".blur-image").on("mouseenter", function() {
            $(this).addClass("hovered"); // Add a class to control hover effect
        }).on("mouseleave", function() {
            $(this).removeClass("hovered"); // Remove the class on mouse leave
        });
    }

    $(document).on("click touchstart", function(e) {
        if (!$(e.target).closest(".blur-image").length) {
            $(".blur-image").addClass("blur"); // Add the blur class back to all images
            $(".blur-image").removeClass("blur-image"); // Remove the blur-image class from all images
        }
    });
});



// Disable right-click and long-press context menu on images
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Disable dragging of images
document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});
// Disable right-click and long-press context menu on images and videos
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
        e.preventDefault();
    }
});

// Disable dragging of images and videos
document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
        e.preventDefault();
    }
});
// Disable right-click and inspect element
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});