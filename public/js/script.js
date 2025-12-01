// script.js  -- Manhwa Quiz Logic

const questions = [
  "What type of personality attracts you the most?",
  "Do you prefer soft men or dominant men?",
  "Which setting feels romantic to you?",
  "Pick a vibe:",
  "How do you like your love interest to treat you?",
  "Ideal date night?",
  "Pick a color:",
  "How patient should he be?",
  "Pick a trope:",
  "Pick a height preference:",
  "How jealous should he be?",
  "Do you like older men?",
  "Pick an aesthetic:",
  "Do you like cold-to-soft arcs?",
  "How protective should he be?"
];

let page = 0;
const perPage = 5;

function loadQuestions() {
  const form = document.getElementById("quizForm");
  form.innerHTML = "";

  let start = page * perPage;
  let end = start + perPage;

  questions.slice(start, end).forEach((q, index) => {
    let qNum = start + index + 1;
    form.innerHTML += `
      <div class="question">
        <h3>${qNum}. ${q}</h3>
        <label><input name="q${qNum}" type="radio"> Option A</label><br>
        <label><input name="q${qNum}" type="radio"> Option B</label><br>
        <label><input name="q${qNum}" type="radio"> Option C</label><br>
      </div>
    `;
  });

  if (end >= questions.length) {
    document.getElementById("nextBtn").innerText = "See Result";
  }
}

document.getElementById("nextBtn").addEventListener("click", () => {
  let checked = document.querySelectorAll("input[type='radio']:checked");

  if (checked.length < 5) {
    alert("Please answer all questions!");
    return;
  }

  page++;

  if (page * perPage >= questions.length) {
    // redirect to result page
    window.location.href = "results.html";
  } else {
    loadQuestions();
  }
});

loadQuestions();
