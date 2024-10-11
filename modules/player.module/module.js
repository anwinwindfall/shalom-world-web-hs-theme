



const targetDate = new Date("Oct 12, 2024 15:00:00").getTime();


const countdownInterval = setInterval(function () {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);


    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;


    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").style.display = "none";
        document.getElementById("player").style.display = "block";
    }
}, 1000);