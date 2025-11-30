const questions = [
    {
        name: "Kinn Anakinn Theerapanyakul",
        series: "KinnPorsche",
        image: "images/bl/kinn.png"
    },
    {
        name: "Vegas Theerapanyakul",
        series: "KinnPorsche",
        image: "images/bl/vegas.png"
    },
    {
        name: "Han Tuo",
        series: "Secret Lover",
        image: "images/bl/hantuo.png"
    },
    {
        name: "Kwon Jeong U",
        series: "Ball Boy Tactics",
        image: "images/bl/kwonjeongu.png"
    }
];

let current = 0;

function loadQuestion() {
    const q = questions[current];

    document.getElementById("character-image").src = q.image;
    document.getElementById("question").innerText = "Who is this character?";

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    questions.forEach(qObj => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = qObj.name;
        btn.onclick = () => {
            document.getElementById("next-btn").style.display = "block";
        };
        optionsDiv.appendChild(btn);
    });
}

document.getElementById("next-btn").onclick = () => {
    current++;
    if (current >= questions.length) {
        alert("Quiz finished!");
        return;
    }
    document.getElementById("next-btn").style.display = "none";
    loadQuestion();
};

loadQuestion();
