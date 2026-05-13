const weddingDate = new Date("July 6, 2026 18:00:00").getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerText = "Сегодня свадьба!";
    }
}, 1000);


// =======================
// СЧЕТЧИК ЛЮДЕЙ (+ / -)
// =======================

let count = 1;

const countEl = document.getElementById("peopleCount");
const inputEl = document.getElementById("choice");

document.getElementById("increase").addEventListener("click", () => {
    count++;
    countEl.textContent = count;
    inputEl.value = count;
});

document.getElementById("decrease").addEventListener("click", () => {
    if (count > 1) {
        count--;
        countEl.textContent = count;
        inputEl.value = count;
    }
});


// =======================
// ОТПРАВКА В GOOGLE FORM
// =======================

const form = document.querySelector(".rsvp-form");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const selected = document.querySelector('input[name="answer"]:checked');
    const people = document.getElementById("choice").value;
    const message = document.getElementById("message").value;

    if (!selected) {
        alert("Жауапты таңдаңыз");
        return;
    }

    // ⚠️ ВСТАВЬ СВОИ entry ID сюда
    const formData = new FormData();
    formData.append("entry.2001590643", selected.value); // Келесіз бе
    formData.append("entry.1924230954", people);         // Кол-во людей
    formData.append("entry.323442123", message);        // Имя

    fetch("https://forms.gle/Pz3Y9BNGvN7Ae6ro6", {
        method: "POST",
        mode: "no-cors",
        body: formData
    })
    .then(() => {
    document.getElementById("success-message").style.display = "block";

    form.reset();

    count = 1;
    countEl.textContent = 1;
    inputEl.value = 1;
})
});





// =======================
// АНИМАЦИЯ ПОЯВЛЕНИЯ
// =======================

const animatedItems = document.querySelectorAll(
    '.gallery img, .first-image, .timer-wrapper, .rsvp-section'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.15
});

animatedItems.forEach(item => {
    observer.observe(item);
});

