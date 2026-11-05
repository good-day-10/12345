// ============================================
// 程式大選修 - 主程式
// 已套用：P0-2 / P0-3 / P0-4 / P0-5 / P0-7 / P0-8 / P0-9
//        P1-2 / P1-3 / P1-5 / P1-7 / P1-8 / P1-9 / P1-10
// 作品總數：4（已移除前 4 張外鏈佔位符）
// ============================================

const projectsData = [
    // 作品 1 - data-idx="0"
    {
        title: "圖文日曆：視覺化事件記錄",
        author: "Pig",
        category: "tool",
        tag: "生活工具",
        image: "images/calendar.webp",
        description: "這是一個結合圖片與日曆的事件記錄工具。除了月曆檢視，你可以為任何一天新增事件，填寫標題、日期、全天或特定時間段、描述，並上傳一張代表圖片。無論是生日、旅行、紀念日，或想記下某個特別瞬間，都能用圖片讓日曆更有溫度。表單設計直覺，適合喜歡用視覺方式整理生活的人。"
    },
    // 作品 2 - data-idx="1"
    {
        title: "Payas Days：簡約日曆",
        author: "Pig",
        category: "tool",
        tag: "生活工具",
        image: "images/calendar.webp",
        description: "Payas Days 專注於最核心的日曆體驗：清楚呈現每個月的日期排列，標示星期與今天的位置。頁面提供「點擊前往今天」的快捷功能，讓你無論瀏覽到哪個月，都能一鍵返回當前日期。沒有多餘裝飾或複雜操作，適合喜歡極簡風格、只需要快速確認日期與規劃行程的使用者。"
    },
    // 作品 3 - data-idx="2"
    {
        title: "Turtle Planner：每日任務規劃",
        author: "Pig",
        category: "tool",
        tag: "生活工具",
        image: "images/planner.webp",
        description: "Turtle Planner 圍繞「今天要完成什麼？」設計。你可以新增多項任務，為每項填寫任務內容、選擇分類、指定地點，並設定開始時間、結束時間與預計時長。當一天規劃完成後，可以將清單鎖定，避免臨時更動。內建統計後台會顯示完成率總覽，幫助你回顧每日目標的達成情況，適合需要結構化安排一天行程的使用者。"
    },
    // 作品 4 - data-idx="3"
    {
        title: "多功能計時器：正計時與倒計時",
        author: "Pig",
        category: "tool",
        tag: "生活工具",
        image: "images/timer.webp",
        description: "這是一個靈活的計時工具，提供「正計時」與「倒計時」兩種模式，並允許同時新增多個計時器，各自獨立運作。每個計時器都能開始、計次、重設，並以清晰數字顯示經過時間或剩餘時間。全螢幕模式讓時間數字更醒目，適合廚房烹飪、運動計時、工作專注等需要精準掌握時間的場景。"
    }
];

let currentModalIndex = null;
let currentUtterance = null;

// P1-9：單一狀態機
const SpeechState = { IDLE: 'idle', PLAYING: 'playing', PAUSED: 'paused' };
let speechState = SpeechState.IDLE;

// P0-3：speech 特性檢測
const synth = window.speechSynthesis || null;
const speechAvailable = !!synth;

// ============================================
// P1-3 + P1-8：導覽渲染
// ============================================
function renderNav(activePage) {
    ['home', 'projects', 'course'].forEach(p => {
        const on = p === activePage;
        const d = document.getElementById(`nav-${p}`);
        const m = document.getElementById(`m-nav-${p}`);

        if (d) {
            d.className = on
                ? "nav-btn px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 bg-land-dark text-land-gold shadow-sm"
                : "nav-btn px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 text-land-muted hover:text-land-dark";
        }
        if (m) {
            m.classList.toggle('ring-2', on);
            m.classList.toggle('ring-land-gold', on);
        }
    });
}

// ============================================
// P1-2：頁面切換（強制重播 fadeIn）
// ============================================
function switchPage(pageId) {
    const pages = ['home', 'projects', 'course'];
    pages.forEach(p => {
        const pageEl = document.getElementById(`page-${p}`);
        if (!pageEl) return;
        if (p === pageId) {
            pageEl.classList.remove('hidden');
            pageEl.classList.remove('page-transition');
            void pageEl.offsetWidth;
            pageEl.classList.add('page-transition');
        } else {
            pageEl.classList.add('hidden');
        }
    });
    renderNav(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// 行動端選單
// ============================================
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}

// ============================================
// P0-9 + P1-5：作品類別篩選
// ============================================
function filterProjects(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const active = btn.id === `filter-${category}`;
        btn.classList.toggle('bg-land-dark', active);
        btn.classList.toggle('text-land-gold', active);
        btn.classList.toggle('shadow-sm', active);
        btn.classList.toggle('border-land-gold', active);
        btn.classList.toggle('text-land-dark', !active);
        btn.classList.toggle('border-land-gold/30', !active);
        btn.classList.toggle('hover:border-land-gold', !active);
    });

    document.querySelectorAll('.project-card').forEach(card => {
        const show = category === 'all' || card.dataset.category === category;
        card.classList.toggle('hidden', !show);
    });
}

// ============================================
// P0-5 + P0-7 + P1-10：Modal 開關
// ============================================
function openProjectModal(index) {
    currentModalIndex = index;
    const project = projectsData[index];

    document.getElementById('modal-tag').textContent = project.tag;
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-author').textContent = `創作人：${project.author}`;
    document.getElementById('modal-desc').textContent = project.description;

    const imgEl = document.getElementById('modal-img');
    imgEl.onerror = function () {
        this.onerror = null;
        this.src = `https://placehold.co/800x600/1A3029/B58E52?text=${encodeURIComponent(project.title)}`;
    };
    imgEl.src = project.image;

    stopSpeech();
    const modalEl = document.getElementById('project-modal');
    modalEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    modalEl.focus();
}

function closeProjectModal() {
    stopSpeech();
    document.getElementById('project-modal').classList.add('hidden');
    document.body.style.overflow = '';
}

// ============================================
// P1-7：組員提示卡（單例）
// ============================================
let memberToastEl = null;
let memberToastTimer = null;

function showMemberInfo(name, role) {
    if (!memberToastEl) {
        memberToastEl = document.createElement('div');
        memberToastEl.className = "fixed bottom-8 right-8 z-50 paper-card p-4 rounded-xl border border-land-gold text-land-dark shadow-2xl flex items-center gap-3 animate-fadeIn max-w-xs";
        document.body.appendChild(memberToastEl);
    }
    memberToastEl.innerHTML = `
        <div class="w-9 h-9 rounded-full bg-land-dark text-land-gold flex items-center justify-center font-bold text-xs flex-shrink-0">
            <i class="fa-solid fa-user-astronaut"></i>
        </div>
        <div>
            <h5 class="font-bold text-xs text-land-dark">${name}</h5>
            <p class="text-[11px] text-land-muted mt-0.5">${role}</p>
        </div>
    `;
    memberToastEl.style.transition = '';
    memberToastEl.style.opacity = '1';
    clearTimeout(memberToastTimer);
    memberToastTimer = setTimeout(() => {
        memberToastEl.style.transition = 'opacity 0.5s ease';
        memberToastEl.style.opacity = '0';
    }, 3000);
}

// ============================================
// P0-2 / P0-3 / P0-4 / P1-9：語音導覽
// ============================================
function startCurrentSpeech() {
    if (!speechAvailable) {
        alert('此瀏覽器不支援語音播放，建議使用 Chrome 或 Edge。');
        return;
    }
    if (currentModalIndex === null) return;

    if (speechState === SpeechState.PAUSED) {
        synth.resume();
        return;
    }

    synth.cancel();

    const project = projectsData[currentModalIndex];
    const textToRead = `${project.title}。創作團隊：${project.author}。${project.description}`;

    const u = new SpeechSynthesisUtterance(textToRead);
    u.lang = 'zh-TW';
    u.rate = 0.95;

    u.onstart = () => { if (currentUtterance === u) setSpeechState(SpeechState.PLAYING, "語音朗讀中..."); };
    u.onend   = () => { if (currentUtterance === u) setSpeechState(SpeechState.IDLE, "朗讀完成"); };
    u.onerror = () => { if (currentUtterance === u) setSpeechState(SpeechState.IDLE, "語音播放發生錯誤"); };

    currentUtterance = u;

    setTimeout(() => {
        if (synth && currentUtterance === u) synth.speak(u);
    }, 60);
}

function toggleSpeechPause() {
    if (!speechAvailable) return;
    if (speechState === SpeechState.PLAYING) {
        synth.pause();
        setSpeechState(SpeechState.PAUSED, "已暫停朗讀");
    } else if (speechState === SpeechState.PAUSED) {
        synth.resume();
        setSpeechState(SpeechState.PLAYING, "繼續朗讀中...");
    }
}

function stopSpeech() {
    if (synth) synth.cancel();
    currentUtterance = null;
    setSpeechState(SpeechState.IDLE, "點擊播放鍵開始語音朗讀");
}

function setSpeechState(state, statusText) {
    speechState = state;
    const waveEl = document.getElementById('modal-audio-wave');
    const statusEl = document.getElementById('speech-status-text');
    const btnPlay = document.getElementById('btn-play-speech');

    if (statusEl) statusEl.textContent = statusText;
    if (waveEl) waveEl.classList.toggle('hidden', state !== SpeechState.PLAYING);

    if (btnPlay) {
        btnPlay.classList.toggle('bg-land-slate', state === SpeechState.PLAYING);
        btnPlay.classList.toggle('bg-land-gold', state !== SpeechState.PLAYING);
    }
}

// ============================================
// P0-7 + P0-8：一次性事件綁定
// ============================================
document.getElementById('project-modal').addEventListener('click', (e) => {
    if (!e.target.closest('.paper-card')) closeProjectModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !document.getElementById('project-modal').classList.contains('hidden')) {
        closeProjectModal();
    }
});

document.getElementById('projects-grid').addEventListener('click', (e) => {
    const btn = e.target.closest('.js-open-modal');
    if (!btn) return;
    openProjectModal(Number(btn.dataset.idx));
});

// P1-3：初始化導覽狀態
renderNav('home');

// 頁尾年份
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();