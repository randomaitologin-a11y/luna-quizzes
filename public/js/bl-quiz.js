// js/bl-quiz.js

// 15 BL-themed questions. Each option value is 1..4
const questions = [
  { q: "What personality attracts you most?", opts: [
      {t:"Dominant, protective", v:1}, {t:"Playful, teasing", v:2}, {t:"Soft, caring", v:3}, {t:"Mysterious, quiet", v:4}
    ]},
  { q: "Pick a romantic setting:", opts: [
      {t:"Late-night rooftop", v:1}, {t:"Cozy cafe", v:3}, {t:"Rainy alley meet-cute", v:4}, {t:"Concert / music spot", v:2}
    ]},
  { q: "Which vibe do you like?", opts: [
      {t:"Dangerous & sexy", v:1}, {t:"Warm & fluffy", v:3}, {t:"Rebellious & wild", v:2}, {t:"Elegant & reserved", v:4}
    ]},
  { q: "Pick a go-to gift:", opts: [
      {t:"Designer item", v:1}, {t:"Handmade note", v:3}, {t:"Tickets to a show", v:2}, {t:"A rare book", v:4}
    ]},
  { q: "How jealous do you like them?", opts: [
      {t:"Very protective", v:1}, {t:"Mild & playful", v:2}, {t:"Not jealous at all", v:3}, {t:"Quiet possessive", v:4}
    ]},
  { q: "Ideal date night:", opts: [
      {t:"Late-night drive", v:1}, {t:"Picnic at sunset", v:3}, {t:"Arcade / fun night", v:2}, {t:"Art gallery & quiet walk", v:4}
    ]},
  { q: "Pick a fashion style:", opts: [
      {t:"Sharp suits", v:1}, {t:"Streetwear", v:2}, {t:"Soft pastels", v:3}, {t:"Traditional / classic", v:4}
    ]},
  { q: "How affectionate are they?", opts: [
      {t:"Public but controlled", v:1}, {t:"Constant cuddles", v:3}, {t:"Flirty touches", v:2}, {t:"Subtle gestures", v:4}
    ]},
  { q: "Which trope do you prefer?", opts: [
      {t:"Enemies → lovers", v:1}, {t:"Childhood friends", v:3}, {t:"Fake dating", v:2}, {t:"Mature-protector", v:4}
    ]},
  { q: "Pick a hobby for them:", opts: [
      {t:"Fighting / training", v:1}, {t:"Playing instruments", v:2}, {t:"Baking / cooking", v:3}, {t:"Reading & writing", v:4}
    ]},
  { q: "How much PDA?", opts: [
      {t:"Low; intense in private", v:1}, {t:"Medium; playful", v:2}, {t:"High; openly affectionate", v:3}, {t:"Low-key & meaningful", v:4}
    ]},
  { q: "Would you like them to be older?", opts: [
      {t:"Yes, older and guiding", v:4}, {t:"Slightly older", v:1}, {t:"Same age", v:2}, {t:"Younger vibe", v:3}
    ]},
  { q: "Pick an accent / voice:", opts: [
      {t:"Low & commanding", v:1}, {t:"Soft & sweet", v:3}, {t:"Playful & teasing", v:2}, {t:"Calm & distant", v:4}
    ]},
  { q: "Do you like dark backstories?", opts: [
      {t:"Yes, very", v:1}, {t:"A little", v:4}, {t:"Prefer light & healing", v:3}, {t:"No, keep it fun", v:2}
    ]},
  { q: "What matters most in love?", opts: [
      {t:"Protection & loyalty", v:1}, {t:"Fun & chemistry", v:2}, {t:"Tenderness & care", v:3}, {t:"Emotional depth", v:4}
    ]}
];

const perPage = 5;
let page = 0;
const totalPages = Math.ceil(questions.length / perPage);

const form = document.getElementById("quizForm");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

function renderPage() {
  form.innerHTML = "";
  const start = page * perPage;
  const end = Math.min(start + perPage, questions.length);

  for (let i = start; i < end; i++) {
    const q = questions[i];
    const wrapper = document.createElement("div");
    wrapper.className = "question";
    wrapper.innerHTML = `<h3>${i+1}. ${q.q}</h3>`;
    const optsDiv = document.createElement("div");

    q.opts.forEach((opt, idx) => {
      const id = `q${i}_opt${idx}`;
      const label = document.createElement("label");
      label.style.display = "block";
      label.style.margin = "8px 0";
      label.innerHTML = `<input type="radio" name="q${i}" value="${opt.v}" id="${id}"> ${opt.t}`;
      optsDiv.appendChild(label);
    });

    wrapper.appendChild(optsDiv);
    form.appendChild(wrapper);
  }

  prevBtn.style.display = page === 0 ? "none" : "inline-block";
  nextBtn.innerText = (page === totalPages - 1) ? "See Result" : "Next";
}

function validatePage() {
  const start = page * perPage;
  const end = Math.min(start + perPage, questions.length);
  for (let i = start; i < end; i++) {
    const sel = document.querySelector(`input[name="q${i}"]:checked`);
    if (!sel) return false;
  }
  return true;
}

function computeResultAndRedirect() {
  // sum values
  let sum = 0;
  for (let i = 0; i < questions.length; i++) {
    const sel = document.querySelector(`input[name="q${i}"]:checked`);
    sum += Number(sel.value);
  }

  // number of characters (must match data/bl-results.json length)
  const N = 17; // you have 17 characters
  // map sum -> index (0..N-1)
  let idx = sum % N;
  // if modulo gives 0, map to last index to avoid 0 bias (optional)
  if (idx === 0) idx = N - 1;
  else idx = idx - 1; // shift so result in 0..N-1

  // redirect to results page with index
  window.location.href = `results-bl.html?id=${idx}`;
}

// events
nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!validatePage()) {
    alert("Please answer all questions on this page.");
    return;
  }

  if (page === totalPages - 1) {
    // finished
    computeResultAndRedirect();
  } else {
    page++;
    renderPage();
    window.scrollTo({top:0, behavior:"smooth"});
  }
});

prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (page > 0) {
    page--;
    renderPage();
  }
});

// initial render
renderPage();
