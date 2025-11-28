const questions = [
    "Pick a vibe:",
    "How do you like your affection?",
    "Pick a color:",
    "Pick a date activity:",
    "Which trait is hottest?",
    "Pick a hairstyle:",
    "Pick a personality type:",
    "How protective do you want him?",
    "Pick his voice vibe:",
    "Pick a setting:",
    "Pick a secret side of him:",
    "Which aesthetic attracts you?",
    "Pick his love language:",
    "Pick his flaw:",
    "Pick his confession style:"
];

const answers = [
    ["Soft", "Cold", "Chaotic", "Mysterious"],
    ["Gentle", "Possessive", "Teasing", "Quiet but loyal"],
    ["Black", "Purple", "White", "Blue"],
    ["Coffee shop", "Night drive", "Library", "Street market"],
    ["Eyes", "Voice", "Smile", "Confidence"],
    ["Long", "Short", "Messy", "Tied back"],
    ["Tsundere", "Loyal puppy", "Mysterious", "Sarcastic"],
    ["Low", "High", "Medium", "Only when needed"],
    ["Deep", "Soft", "Calm", "Raspy"],
    ["Office", "Dorm", "Fantasy palace", "City rooftops"],
    ["Secretly clingy", "Secretly jealous", "Secretly romantic", "Secretly soft"],
    ["Dark aesthetic", "Soft aesthetic", "Academia", "Street style"],
    ["Words", "Touch", "Time", "Attention"],
    ["Jealous", "Overthinking", "Too quiet", "Too blunt"],
    ["Bold", "Shy", "Unexpected", "Slow-burn"]
];

window.onload = () => {
    const qBox = document.getElementById("questions");

    questions.forEach((q, i) => {
        let div = document.createElement("div");
        div.className = "question";

        let html = `<h3>${q}</h3>`;
        answers[i].forEach((a) => {
            html += `
                <label>
                    <input type="radio" name="q${i}" value="${a}" required>
                    ${a}
                </label><br>
            `;
        });

        div.innerHTML = html;
        qBox.appendChild(div);
    });
};

document.getElementById("quizForm").addEventListener("submit", function(e){
    e.preventDefault();

    const id = Math.floor(Math.random() * 20); // random result

    window.location.href = `results.html?id=${id}`;
});
