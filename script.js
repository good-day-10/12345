// ============================================
// 程式大選修 - 主程式
// 已套用：P0-2 / P0-3 / P0-4 / P0-5 / P0-7 / P0-8 / P0-9
//        P1-2 / P1-3 / P1-5 / P1-7 / P1-8 / P1-9 / P1-10
// 本地化：Tailwind / Font Awesome / placeholder
// 作品總數：11（4 舊 Pig + 5 徐愷 + 2 新：將軍村、Luna Piano）
// ============================================

const projectsData = [
    // 作品 1 - data-idx="0"
    {
        title: "圖文日曆：視覺化事件記錄",
        author: "Pig",
        category: "tool",
        tag: "生活工具",
        image: "images/calendarv2.webp",
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
    },
    // ───── 徐愷 的作品（data-idx 4-8） ─────
    // 作品 5 - data-idx="4"
    {
        title: "日本神社御神籤：線上運勢占卜",
        author: "徐愷",
        category: "game",
        tag: "趣味遊戲",
        image: "images/placeholder.svg",
        description: "這是一個模擬日本神社御神籤的線上占卜工具。進入頁面後，畫面引導你靜下心來，向神明默念心中所想，然後透過「搖籤」的互動抽取今日運勢。整體氛圍安靜而帶有儀式感，適合在想尋求一點方向、或單純想為一天增添趣味時使用。無論是當作每日的小小占卜，還是與朋友分享抽到的結果，都能感受到那份來自神社的溫柔寓意。"
    },
    // 作品 6 - data-idx="5"
    {
        title: "中文詞彙抽取器：每日一詞",
        author: "徐愷",
        category: "tool",
        tag: "生活工具",
        image: "images/placeholder.svg",
        description: "這是一個為中文學習者設計的詞彙抽取工具，核心理念是「今天，認識一個詞」。每次進入頁面，系統會從詞庫中隨機抽出一個詞彙，並呈現它的拼音、英文釋義，以及一句貼近日常的例句。你可以點擊「聽一聽」來聆聽發音，也可以「再說一次」複習。學習足跡會自動保存在這台裝置上，不需要註冊帳號。整體節奏輕鬆、不給壓力，適合每天花幾分鐘，慢慢累積詞彙量。"
    },
    // 作品 7 - data-idx="6"
    {
        title: "台灣玩耍記憶資料庫：集體童年故事",
        author: "徐愷",
        category: "site",
        tag: "展示網站",
        image: "images/placeholder.svg",
        description: "這是一個以台灣童年與遊戲記憶為主題的溫柔資料庫，收錄從1960年代至今、來自不同世代與鄉鎮的集體回憶。每一則記憶都以「NO.」編號呈現，附上年代、地區與遊戲類型標籤，例如「1970年代 / 童玩」「1980年代 / 巷弄遊戲」「1990年代 / 電玩時光」等。故事由真實的人們口述，內容涵蓋紙上遊戲、彈珠、竹蜻蜓、紅白機、廟埕追逐戰等，充滿細節與溫度。網站也提供「我的收藏」功能，讓你可以將觸動自己的故事保存下來，是一座仍在持續長大的記憶島嶼。"
    },
    // 作品 8 - data-idx="7"
    {
        title: "Studio Portfolio：程式設計工作室作品集",
        author: "徐愷",
        category: "site",
        tag: "展示網站",
        image: "images/placeholder.svg",
        description: "這是一個程式設計工作室的線上作品集網站，以簡潔的版面展示團隊歷年來打造的網站、應用程式與各類工具。頁面開頭以「Studio Portfolio」為標題，簡要說明工作室的服務範疇——能做網站、APP、工具等等，下方則以「精選我們打造的網站、應用程式與工具」引導訪客探索實際作品。整體設計乾淨、直接，適合讓潛在合作對象快速了解團隊的開發能力與作品風格，也適合作為工作室對外的數位門面。"
    },
    // 作品 9 - data-idx="8"
    {
        title: "地景臺灣島：用泥土與水堆築的島嶼",
        author: "徐愷",
        category: "site",
        tag: "展示網站",
        image: "images/placeholder.svg",
        description: "這是一個記錄地景藝術創作歷程的展示網站，完整呈現「用泥土與水，堆疊出我們心中的臺灣」這件作品的誕生過程。計畫位於新竹縣新埔鎮，緊鄰味衛佳柿餅與涼井人文咖啡廳，團隊從一旁的池塘引水、在空地上堆土，一步步塑出臺灣山脈的輪廓，並設置排水口讓水流循環。網站以「島嶼誕生的四個步伐」為敘事主軸——引水與堆土、塑形臺灣山脈、設置排水口、鋪設觀賞走道——搭配虛擬走道導覽與生態角落的記錄，呈現螃蟹與青蛙等「新居民」的到來。網站也串聯在地景點資訊，邀請訪客在秋季柿餅產季親自走一趟，感受土地與藝術交會的溫度。"
    },
    // ───── 新增 2 件（data-idx 9-10） ─────
    // 作品 10 - data-idx="9"
    {
        title: "將軍村最後一封電報（將軍村實境解謎）",
        author: "陳朝元",
        category: "site",
        tag: "展示網站",
        image: "images/placeholder.svg",
        description: "這個是「實境解謎遊戲」，玩家要搭配材料包以及手機上的虛擬劇情。在現場實地與環境互動，從而完成遊戲，並重點理解將軍村的導覽內容。我做這個的動機是為了延續我們之前參加的金車文教，文化理解組首獎的企劃。當時我們的企劃內容著重在「數位導覽」，例如拍影片擺放 QRcode。這樣做的目的是為了解決導覽員人手不足的情況。延續這個數位導覽的概念，我自己在寒假時報名了數個關於 AI 開發的營隊，去台南的奇美博物館實際試完別人的成品、將軍村場刊，最後製作出實解謎遊戲。我希望透過遊戲的方式吸引更多人前來參觀。我也在遊戲中安插一些歷史知識讓人在輕鬆的氛圍下也能學習枯燥的歷史。我希望透過實境解謎的方式，結合 SDGs 永續發展讓古蹟活化、文化傳承能一直經營下去。"
    },
    // 作品 11 - data-idx="10"
    {
        title: "Luna Piano",
        author: "李昊恩",
        category: "game",
        tag: "趣味遊戲",
        image: "images/placeholder.svg",
        description: "Luna Piano 是一款可在瀏覽器中使用的電子鋼琴，提供 50 個黑白琴鍵，搭配原聲鋼琴取樣，支援電腦鍵盤、手機多點觸控與按住滑動換音。你可以使用空白鍵或畫面踏板延長琴音，也能自訂踏板按鍵；鋼琴會保留自然衰減，呈現接近實體踏板的演奏感。除了彈奏鋼琴，也能錄製聲音或匯入音檔，裁切片段、辨識音高並套用到指定琴鍵，打造個人化取樣音色。設定中可調整音量、整體移調、起音、釋音、回音與混響；琴鍵可切換全覽或放大模式，方便在不同尺寸的螢幕上演奏。無論是日常練習、嘗試旋律，或把自己的聲音變成樂器，都能快速開始。"
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
        this.src = 'images/placeholder.svg';
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