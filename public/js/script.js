// js/script.js — Manhwa Boyfriend Quiz

// 15 questions with 4 options each (1–4 values)
const questions = [
  { q: "What type of male lead attracts you?", opts: [
      {t:"Cold but soft inside", v:1}, {t:"Strong & protective", v:2}, {t:"Sweet & caring", v:3}, {t:"Mysterious & dangerous", v:4}
  ]},
  { q: "Pick a setting:", opts: [
      {t:"Royal palace", v:2}, {t:"Modern city", v:3}, {t:"Fantasy forest", v:4}, {t:"Academy / school", v:1}
  ]},
  { q: "Which vibe?", opts: [
      {t:"Villain energy", v:4}, {t:"Golden retriever", v:3}, {t:"Tsundere", v:1}, {t:"Knight/protector", v:2}
  ]},
  { q: "Pick a date:", opts: [
      {t:"Library study date", v:1}, {t:"Training together", v:2}, {t:"Cute cafe date", v:3}, {t:"Secret night meeting", v:4}
  ]},
  { q: "How romantic should he be?", opts: [
      {t:"Secretly romantic", v:1}, {t:"Confident romantic", v:2}, {t:"Very openly romantic", v:3}, {t:"Quiet and subtle", v:4}
  ]},
  { q: "Pick a jealous level:", opts: [
      {t:"Quietly possessive", v:4}, {t:"Softly jealous", v:3}, {t:"Very protective", v:2}, {t:"Barely jealous", v:1}
  ]},
  { q: "Pick a color:", opts: [
      {t:"Black", v:4}, {t:"Blue", v:2}, {t:"Pink", v:3}, {t:"White", v:1}
  ]},
  { q: "What trait matters most?", opts: [
      {t:"Loyalty", v:2}, {t:"Kindness", v:3}, {t:"Power", v:4}, {t:"Intelligence", v:1}
  ]},
  { q: "Pick a male lead trope:", opts: [
      {t:"Cold → soft", v:1}, {t:"Enemy → lover", v:4}, {t:"Childhood friend", v:3}, {t:"Bodyguard", v:2}
  ]},
  { q: "Height preference:", opts: [
      {t:"Tall & intimidating", v:4}, {t:"Tall & gentle", v:2}, {t:"Medium & cute", v:3}, {t:"Doesn’t matter", v:1}
  ]},
  { q: "How protective?", opts: [
      {t:"Very protective", v:2}, {t:"A little", v:3}, {t:"Not much", v:1}, {t:"Overprotective villain style", v:4}
  ]},
  { q: "Do you like older?", opts: [
      {t:"Yes", v:4}, {t:"Prefer same age", v:1}, {t:"A little older", v:2}, {t:"Doesn’t matter", v:3}
  ]},
  { q: "Pick an aesthetic:", opts: [
      {t:"Dark academia", v:1}, {t:"Royal / knight", v:2}, {t:"Soft pastel", v:3}, {t:"Gothic fantasy", v:4}
  ]},
  { q: "Do you want a dangerous man?", opts: [
      {t:"Yes, absolutely", v:4}, {t:"A little danger is okay", v:2}, {t:"Prefer soft boys", v:3}, {t:"Not at all", v:1}
  ]},
  { q: "Pick a mood:", opts: [
      {t:"Angsty & emotional", v:4}, {t:"Warm & comforting", v:3}, {t:"Cool & calm", v:1}, {t:"Protective & bold", v:2}
  ]}
];

const perPage = 5;
let page = 0;

const form = document.getElementById("quizForm");
const nextBtn = document.getElementById("nextBtn");

function loadQuestions() {
  form.innerHTML = "";
  const start = page * perPage;
  const end = Math.min(start + perPage, questions.length);

  for (let i = start; i < end; i++) {
    const q = questions[i];
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `<h3>${i + 1}. ${q.q}</h3>`;

    q.opts.forEach((opt, idx) => {
      div.innerHTML += `
        <label style="display:block; margin:6px 0;">
          <input type="radio" name="q${i}" value="${opt.v}">
          ${opt.t}
        </label>
      `;
    });
    form.appendChild(div);
  }

  nextBtn.innerText = (end >= questions.length) ? "See Result" : "Next";
}

function validatePage() {
  const start = page * perPage;
  const end = Math.min(start + perPage, questions.length);

  for (let i = start; i < end; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (!selected) return false;
  }
  return true;
}

function computeResult() {
  let sum = 0;
  for (let i = 0; i < questions.length; i++) {
    const sel = document.querySelector(`input[name="q${i}"]:checked`);
    sum += Number(sel.value);
  }

  const N = 20; // your manhwa characters count
  let idx = sum % N;
  if (idx === 0) idx = N - 1;
  else idx = idx - 1;

  window.location.href = `results.html?id=${idx}`;
}

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!validatePage()) {
    alert("Please answer all questions!");
    return;
  }

  const end = (page + 1) * perPage;

  if (end >= questions.length) {
    computeResult();
  } else {
    page++;
    loadQuestions();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

loadQuestions();
