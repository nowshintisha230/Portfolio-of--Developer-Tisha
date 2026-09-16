(function () {

  // ---------- 1. Widget HTML (inline panel, not floating) ----------
  const widgetHTML = `
  <div class="w-full max-w-xl mx-auto bg-white border border-[#DCE8FF] rounded-2xl shadow-[0_1px_2px_rgba(15,34,102,0.04),0_8px_24px_-8px_rgba(15,34,102,0.12)] flex flex-col overflow-hidden">

    <!-- Header -->
    <div class="bg-gradient-to-r from-[#0F2266] via-[#234FE0] to-[#3465EA] text-white px-4 py-3 flex items-center gap-2">
      <i class="fa-solid fa-robot"></i>
      <span class="font-semibold text-sm">Ask about Tisha</span>
    </div>

    <!-- Messages -->
    <div id="chatMessages" class="h-72 overflow-y-auto px-3 py-3 space-y-2 text-sm bg-[#F5F8FF]">
      <div class="bg-white border border-[#DCE8FF] text-[#0B1730] px-3 py-2 rounded-lg rounded-bl-none max-w-[85%] shadow-sm">
        Hi! 👋 I'm a quick FAQ bot for Tisha's portfolio. Ask me about her <b>skills</b>, <b>projects</b> (try "RentEasy", "FinSight" or "TutorHub"), <b>experience</b>, <b>education</b>, or <b>contact</b> info.
      </div>
    </div>

    <!-- Quick suggestion chips -->
    <div id="chatChips" class="flex flex-wrap gap-2 px-3 py-2 border-t border-[#EAF1FF] bg-white">
      <button class="chip text-xs px-3 py-1 rounded-full border border-[#C6D9FF] text-[#1B3EB8] hover:bg-[#EAF1FF] transition">Skills</button>
      <button class="chip text-xs px-3 py-1 rounded-full border border-[#C6D9FF] text-[#1B3EB8] hover:bg-[#EAF1FF] transition">Projects</button>
      <button class="chip text-xs px-3 py-1 rounded-full border border-[#C6D9FF] text-[#1B3EB8] hover:bg-[#EAF1FF] transition">Experience</button>
      <button class="chip text-xs px-3 py-1 rounded-full border border-[#C6D9FF] text-[#1B3EB8] hover:bg-[#EAF1FF] transition">Contact</button>
    </div>

    <!-- Input -->
    <form id="chatForm" class="flex items-center gap-2 p-3 border-t border-[#EAF1FF] bg-white">
      <input id="chatInput" type="text" autocomplete="off" placeholder="Type a question..."
             class="flex-1 text-sm px-3 py-2 rounded-full border border-[#C6D9FF] bg-white text-[#0B1730] focus:outline-none focus:ring-2 focus:ring-[#5B86F5]">
      <button type="submit" class="bg-gradient-to-br from-[#234FE0] to-[#5B86F5] hover:brightness-110 text-white w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition" aria-label="Send">
        <i class="fa-solid fa-paper-plane text-xs"></i>
      </button>
    </form>
  </div>
  `;

  // ---------- 2. FAQ knowledge base ----------
  // Edit this array to add/change what the bot knows about you.
  const faq = [
    {
      keys: ['skill', 'tech', 'stack', 'technology', 'language'],
      answer: "Tisha works with <b>HTML, CSS, JavaScript, TypeScript, React.js, Next.js, Tailwind CSS, shadcn/ui, HeroUI, Node.js, Express.js, MongoDB, Mongoose, PostgreSQL, Prisma, Firebase, Stripe, Recharts, JWT Auth, REST APIs &amp; Git/GitHub</b>."
    },
    {
      keys: ['renteasy', 'rental', 'property'],
      answer: "<b>RentEasy</b> is a full-stack MERN + Next.js property rental & booking platform with role-based Tenant/Owner/Admin dashboards, Stripe payments, Firebase auth, favorites, bookings, reviews, and an owner analytics dashboard. " +
              "<a href='https://property-rental-client-kappa.vercel.app/' target='_blank' class='underline font-medium text-[#234FE0] hover:text-[#0F2266]'>Live</a> &middot; " +
              "<a href='https://github.com/nowshintisha230/property-rental-client' target='_blank' class='underline font-medium text-[#234FE0] hover:text-[#0F2266]'>Client Repo</a> &middot; " +
              "<a href='https://github.com/nowshintisha230/property-rental-server' target='_blank' class='underline font-medium text-[#234FE0] hover:text-[#0F2266]'>Server Repo</a>"
    },
    {
      keys: ['finsight', 'expense', 'budget', 'tracker'],
      answer: "<b>FinSight</b> is a simple, fast expense tracking app built with Next.js, MongoDB and Tailwind CSS — add/edit/delete expenses, filter by date or category, and visualize spending with an interactive pie chart. " +
              "<a href='https://expense-tracker-iota-wine.vercel.app/' target='_blank' class='underline font-medium text-[#234FE0] hover:text-[#0F2266]'>Live</a>"
    },
    {
      keys: ['tutorhub', 'tutor', 'tutoring'],
      answer: "<b>TutorHub</b> is an online tutoring platform where students can find tutors and book sessions with real-time slot updates, backed by JWT-protected private routes. " +
              "<a href='https://mediqueue-fawn.vercel.app' target='_blank' class='underline font-medium text-[#234FE0] hover:text-[#0F2266]'>Live</a> &middot; " +
              "<a href='https://github.com/nowshintisha230/tutorhub' target='_blank' class='underline font-medium text-[#234FE0] hover:text-[#0F2266]'>Client Repo</a> &middot; " +
              "<a href='https://github.com/nowshintisha230/tutorhub-server' target='_blank' class='underline font-medium text-[#234FE0] hover:text-[#0F2266]'>Server Repo</a>"
    },
    {
      keys: ['project', 'work', 'built', 'made', 'portfolio'],
      answer: "She has built <b>RentEasy</b> (property rental & booking platform), <b>FinSight</b> (expense tracker with charts) and <b>TutorHub</b> (online tutoring platform). Ask me about any one by name for repo & live links, or check the Projects section!"
    },
    {
      keys: ['experience', 'intern', 'internship', 'job', 'career', 'company', 'jevxo'],
      answer: "Tisha worked as a <b>MERN Stack Developer Intern at JEVXO</b> (Remote, Jul 1 &ndash; Aug 15, 2026), building features with Next.js, TypeScript, Tailwind CSS, shadcn/ui, PostgreSQL & Prisma."
    },
    {
      keys: ['education', 'university', 'degree', 'study', 'college', 'cse', 'bgc'],
      answer: "She's pursuing a <b>B.Sc. in Computer Science & Engineering</b> at <b>BGC Trust University, Bangladesh</b> (2024 &ndash; 2027)."
    },
    {
      keys: ['contact', 'email', 'reach', 'hire', 'linkedin', 'github', 'connect'],
      answer: "You can reach Tisha via email at <b>nafisatisha230@gmail.com</b>, or find her here: " +
              "<a href='https://github.com/nowshintisha230' target='_blank' class='underline font-medium text-[#234FE0] hover:text-[#0F2266]'>GitHub <i class=\"fa-brands fa-github\"></i></a> &middot; " +
              "<a href='https://www.linkedin.com/in/nafishanowshintisha' target='_blank' class='underline font-medium text-[#234FE0] hover:text-[#0F2266]'>LinkedIn <i class=\"fa-brands fa-linkedin\"></i></a>"
    },
    {
      keys: ['resume', 'cv'],
      answer: "You can download her resume using the <b>Download My Resume</b> button at the top of the page."
    },
    {
      keys: ['name', 'who'],
      answer: "This is the portfolio of <b>Nafisha Nowshin Tisha</b>, a Full Stack Developer."
    },
    {
      keys: ['hi', 'hello', 'hey'],
      answer: "Hey there! 👋 Ask me about Tisha's skills, projects (RentEasy, FinSight, TutorHub), experience, education, or contact info."
    }
  ];

  const fallback = "I'm not sure about that 🤔 Try asking about her <b>skills</b>, <b>projects</b>, <b>experience</b>, <b>education</b>, or <b>contact</b> info.";

  function getAnswer(text) {
    const lower = text.toLowerCase();
    for (const item of faq) {
      if (item.keys.some(k => lower.includes(k))) return item.answer;
    }
    return fallback;
  }

  // ---------- 3. Init once DOM is ready ----------
  function init() {
    const mount = document.getElementById('chatbotMount');
    if (!mount) return; // no mount point found on this page

    mount.innerHTML = widgetHTML;

    const messagesEl = mount.querySelector('#chatMessages');
    const form        = mount.querySelector('#chatForm');
    const input        = mount.querySelector('#chatInput');
    const chips        = mount.querySelectorAll('.chip');

    function addMessage(html, sender) {
      const bubble = document.createElement('div');
      bubble.className = sender === 'user'
        ? 'ml-auto bg-gradient-to-br from-[#234FE0] to-[#3465EA] text-white px-3 py-2 rounded-lg rounded-br-none max-w-[85%] shadow-sm'
        : 'bg-white border border-[#DCE8FF] text-[#0B1730] px-3 py-2 rounded-lg rounded-bl-none max-w-[85%] shadow-sm';
      bubble.innerHTML = html;
      messagesEl.appendChild(bubble);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function handleQuery(text) {
      if (!text.trim()) return;
      addMessage(text, 'user');
      setTimeout(() => addMessage(getAnswer(text), 'bot'), 350);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleQuery(input.value);
      input.value = '';
    });

    chips.forEach(chip => {
      chip.addEventListener('click', () => handleQuery(chip.textContent));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();