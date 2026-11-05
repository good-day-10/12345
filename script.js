// ============================================
// 程式大選修 - 主程式
// 已套用：P0-2 / P0-3 / P0-4 / P0-5 / P0-7 / P0-8 / P0-9
//        P1-2 / P1-3 / P1-5 / P1-7 / P1-8 / P1-9 / P1-10
// （P0-1 在 style.css；P0-6 在 index.html）
// ============================================

const projectsData = [
    {
        title: "墨韻：數位書法展示網頁",
        author: "徐愷、陳朝元",
        category: "site",
        tag: "展示網站",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
        description: "《墨韻》這項作品結合了 HTML5 Canvas 畫布技術與動態演算法，精細模擬毛筆的水墨濃淡、擴散與飛白筆觸效果。使用者可以在數位平台上揮毫創作，感受東方傳統書法的寫意之美與當代資訊科技的交融。"
    },
    {
        title: "智生活：AI 學習進度規劃器",
        author: "Pig、殷睿紳",
        category: "tool",
        tag: "生活工具",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        description: "《智生活》是一款專為學生設計的自主學習輔助工具。整合生成式 AI 與目標分解演算法，協助學生根據個人考程與學習進度自動調整每日讀書計畫，並具備即時專注計時與學習成就圖表回饋。"
    },
    {
        title: "鐘樓迴響：復古風時空解謎",
        author: "李昊恩、小蝎",
        category: "game",
        tag: "趣味遊戲",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
        description: "《鐘樓迴響》是一副採用古典雙色像素風格打造的解謎遊戲。玩家將扮演掌控時間與空間鑰匙的探險家，在悠揚的古典交響樂與時鐘滴答聲中，解開層層機關，探索古老鐘樓背後被封印的秘密。"
    },
    {
        title: "光雕大冒險：聲控彈珠臺",
        author: "李宥嫻",
        category: "game",
        tag: "趣味遊戲",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
        description: "《光雕大冒險》運用裝置麥克風音量偵測與物理引擎碰撞技術，創作出新型態的聲控彈珠遊戲。玩家不僅能利用按鈕發射，還能對著麥克風吶喊發聲，給予彈珠瞬間的加速與光雕特效推進！"
    }
];

let currentModalIndex = null;
let currentUtterance = null;

// P1-9：單一狀態機取代 isPaused + synth.paused 雙變數
const SpeechState = { IDLE: 'idle', PLAYING: 'playing', PAUSED: 'paused' };
let speechState = SpeechState.IDLE;

// P0-3：speech 特性檢測
const synth = window.speechSynthesis || null;
const speechAvailable = !!synth;

// ============================================
// P1-3 + P1-8：導覽渲染（桌面 + 行動端統一）
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
// P1-2：頁面切換（強制重播 fadeIn 動畫）
// ============================================
function switchPage(pageId) {
    const pages = ['home', 'projects', 'course'];
    pages.forEach(p => {
        const pageEl = document.getElementById(`page-${p}`);
        if (!pageEl) return;
        if (p === pageId) {
            pageEl.classList.remove('hidden');
            pageEl.classList.remove('page-transition');
            void pageEl.offsetWidth; // 強制 reflow，讓 fadeIn 重播
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
        btn.classList.toggle('hover:border-land-gold', !active); // P1-5
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
    modalEl.focus(); // P1-10
}

function closeProjectModal() {
    stopSpeech();
    document.getElementById('project-modal').classList.add('hidden');
    document.body.style.overflow = '';
}

// ============================================
// P1-7：組員提示卡（單例復用，不再疊加）
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

    // 從暫停中恢復
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

    // P1-9：回呼裡檢查是否還是自己這條 utterance，避免 cancel 觸發的雜訊覆蓋狀態
    u.onstart = () => { if (currentUtterance === u) setSpeechState(SpeechState.PLAYING, "語音朗讀中..."); };
    u.onend   = () => { if (currentUtterance === u) setSpeechState(SpeechState.IDLE, "朗讀完成"); };
    u.onerror = () => { if (currentUtterance === u) setSpeechState(SpeechState.IDLE, "語音播放發生錯誤"); };

    currentUtterance = u;

    // P0-4：Safari 需要延遲一幀；同時檢查是否已被 stopSpeech 清掉
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

// P1-9 + P0-2：單一入口更新狀態與 UI
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
// （script.js 置於 body 底部，DOM 已就緒）
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

// P1-3：初始化導覽狀態（首頁預設 active）
renderNav('home');

// 頁尾年份
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();