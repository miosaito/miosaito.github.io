// ===== view.js 完全版 =====

// viewport取得
const viewportMeta = document.querySelector('meta[name="viewport"]');

// 保存された状態を取得
let savedViewMode = localStorage.getItem('viewMode');

// 初期状態（未設定ならmobileにする）
if (!savedViewMode) {
  savedViewMode = 'mobile';
  localStorage.setItem('viewMode', 'mobile');
}

let isMobileView = savedViewMode === 'mobile';

// 適用関数
function applyViewMode() {
  if (isMobileView) {
    // ===== MOBILE =====
    document.body.classList.add('force-mobile-view');

    if (viewportMeta) {
      viewportMeta.setAttribute(
        'content',
        'width=375, initial-scale=1.0'
      );
    }

  } else {
    // ===== DESKTOP =====
    document.body.classList.remove('force-mobile-view');

    if (viewportMeta) {
      viewportMeta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0'
      );
    }
  }
}

// 切り替え関数（ボタン用）
function setMobileView() {
  localStorage.setItem('viewMode', 'mobile');
  location.reload();
}

function setDesktopView() {
  localStorage.setItem('viewMode', 'desktop');
  location.reload();
}

// 実行（最重要）
applyViewMode();

// デバッグ用（確認したい時だけ）
console.log("view mode:", savedViewMode);