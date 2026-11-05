// ============================================
// 程式大選修 - 主程式
// 已套用：P0-2 / P0-3 / P0-4 / P0-5 / P0-7 / P0-8 / P0-9
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
let isPaused = false;

// P0-3：speech 特性檢測
const synth = window.speechSynthesis || null;
const speechAvailable = !!synth;

// ============================================
// 頁面切換
// ============================================
function switchPage(pageId) {
    const pages = ['home', 'projects', 'course'];
    pages.forEach(p => {
        const pageEl = document.getElementById(`page-${p}`);
        const navBtn = document.getElementById(`nav-${p}`);
        if (p === pageId) {
            pageEl.classList.remove('hidden');
            if (navBtn) {
                navBtn.className = "nav-btn px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 bg-land-dark text-land-gold shadow-sm";
            }
        } else {
            pageEl.classList.add('hidden');
            if (navBtn) {
                navBtn.className = "nav-btn px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 text-land-muted hover:text-land-dark";
            }
        }
    });
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
// P0-9：作品類別篩選（classList.toggle 版）
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
    });

    document.querySelectorAll('.project-card').forEach(card => {
        const show = category === 'all' || card.dataset.category === category;
        card.classList.toggle('hidden', !show);
    });
}

// ============================================
// P0-5 + P0-7：Modal 開關
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
        this.onerror = null; // P0-5：斷開死循環
        this.src = `https://placehold.co/800x600/1A3029/B58E52?text=${encodeURIComponent(project.title)}`;
    };
    imgEl.src = project.image;

    stopSpeech();
    document.getElementById('project-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // P0-7：鎖背景滾動
}

function closeProjectModal() {
    stopSpeech();
    document.getElementById('project-modal').classList.add('hidden');
    document.body.style.overflow = ''; // P0-7
}

// ============================================
// 組員提示卡
// ============================================
function showMemberInfo(name, role) {
    const messageBox = document.createElement('div');
    messageBox.className = "fixed bottom-8 right-8 z-50 paper-card p-4 rounded-xl border border-land-gold text-land-dark shadow-2xl flex items-center gap-3 animate-fadeIn max-w-xs";
    messageBox.innerHTML = `
        <div class="w-9 h-9 rounded-full bg-land-dark text-land-gold flex items-center justify-center font-bold text-xs flex-shrink-0">
            <i class="fa-solid fa-user-astronaut"></i>
        </div>
        <div>
            <h5 class="font-bold text-xs text-land-dark">${name}</h5>
            <p class="text-[11px] text-land-muted mt-0.5">${role}</p>
        </div>
    `;
    document.body.appendChild(messageBox);
    setTimeout(() => {
        messageBox.style.opacity = '0';
        messageBox.style.transition = 'opacity 0.5s ease';
        setTimeout(() => messageBox.remove(), 500);
    }, 3000);
}

// ============================================
// P0-2 / P0-3 / P0-4：語音導覽
// ============================================
function startCurrentSpeech() {
    if (!speechAvailable) { // P0-3
        alert('此瀏覽器不支援語音播放，建議使用 Chrome 或 Edge。');
        return;
    }
    if (currentModalIndex === null) return;

    if (synth.paused && isPaused) {
        synth.resume();
        isPaused = false;
        updateSpeechUI(true, "朗讀中...");
        return;
    }

    synth.cancel();

    const project = projectsData[currentModalIndex];
    const textToRead = `${project.title}。創作團隊：${project.author}。${project.description}`;

    currentUtterance = new SpeechSynthesisUtterance(textToRead);
    currentUtterance.lang = 'zh-TW';
    currentUtterance.rate = 0.95;

    currentUtterance.onstart = () => { isPaused = false; updateSpeechUI(true, "語音朗讀中..."); };
    currentUtterance.onend   = () => { isPaused = false; updateSpeechUI(false, "朗讀完成"); };
    currentUtterance.onerror = () => { isPaused = false; updateSpeechUI(false, "語音播放發生錯誤"); };

    const ref = currentUtterance;
    setTimeout(() => {
        if (synth && ref) synth.speak(ref);
    }, 60); // P0-4：Safari 需要延遲一幀
}

function toggleSpeechPause() {
    if (!speechAvailable) return;
    if (synth.speaking && !synth.paused) {
        synth.pause();
        isPaused = true;
        updateSpeechUI(false, "已暫停朗讀");
    } else if (synth.paused) {
        synth.resume();
        isPaused = false;
        updateSpeechUI(true, "繼續朗讀中...");
    }
}

function stopSpeech() {
    if (synth) synth.cancel();
    currentUtterance = null;
    isPaused = false;
    updateSpeechUI(false, "點擊播放鍵開始語音朗讀");
}

function updateSpeechUI(isPlaying, statusText) {
    const waveEl = document.getElementById('modal-audio-wave');
    const statusEl = document.getElementById('speech-status-text');
    const btnPlay = document.getElementById('btn-play-speech');

    if (statusEl) statusEl.textContent = statusText;
    if (waveEl) waveEl.classList.toggle('hidden', !isPlaying);

    // P0-2：用 toggle 互斥，避開 Tailwind CSS 順序坑
    if (btnPlay) {
        btnPlay.classList.toggle('bg-land-slate', isPlaying);
        btnPlay.classList.toggle('bg-land-gold', !isPlaying);
    }
}

// ============================================
// P0-7 + P0-8：一次性事件綁定
// （script.js 置於 body 底部，此時 DOM 已就緒）
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

// 頁尾年份
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();