const containerSmall = document.getElementById('globeViz');
const containerLarge = document.getElementById('large-globe');

// travel.js の index.html用処理
if (containerSmall) {
    const globe = Globe()(containerSmall)
        // パスが正しいか確認（//から始まる、またはhttps://から始まる）
        .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .backgroundColor('rgba(0,0,0,0)')
        .width(300)
        .height(300)
        .showAtmosphere(true)
        .onGlobeClick(() => {
            window.location.href = 'travel.html';
        });
    globeSmall.controls().autoRotate = true;
    globeSmall.controls().autoRotateSpeed = 1.0;
    globeSmall.controls().enableZoom = false;
}

if (containerLarge) {
    // 旅行データの定義（fileプロパティで各htmlを指定）
    const myTrips = [
        { name: "New York", lat: 40.7128, lng: -74.0060, file: "newyork.html" },
        { name: "Bangkok", lat: 13.7563, lng: 100.5018, file: "bangkok.html" },
        { name: "Okinawa", lat: 26.2124, lng: 127.6809, file: "okinawa.html" },
        { name: "Milano", lat: 45.4642, lng: 9.1900, file: "milano.html" },
        { name: "Ibaraki", lat: 36.3418, lng: 140.4468, file: "ibaraki.html" },
        { name: "San Francisco", lat: 37.7749, lng: -122.4194, file: "sanfrancisco.html" }
    ];

    const mapReal = '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg';
    const mapArt = '//unpkg.com/three-globe/example/img/earth-night.jpg';
    let isRealMap = true; 

    // 地球儀の初期化
    const globe = Globe()(containerLarge)
        .globeImageUrl(mapReal)
        .backgroundColor('#000011')
        .showAtmosphere(true)
        .htmlElementsData(myTrips)
        .htmlElement(d => {
            const el = document.createElement('div');
            el.innerHTML = `
                <div style="cursor: pointer; text-align: center; transition: transform 0.2s;">
                    <div style="font-size: 30px;">📍</div>
                    <div style="color: white; font-weight: bold; font-size: 14px; text-shadow: 2px 2px 4px black; margin-top: -5px;">
                        ${d.name}
                    </div>
                </div>
            `;
            // --- 旗をクリックした時の処理 ---
            el.onclick = () => {
                window.location.href = d.file;
            };
            
            el.onmouseenter = () => el.style.transform = 'scale(1.4)';
            el.onmouseleave = () => el.style.transform = 'scale(1)';
            return el;
        });

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;

    // --- マップ切り替え処理 ---
    const toggleBtn = document.getElementById('toggle-map');
    toggleBtn.addEventListener('click', () => {
        isRealMap = !isRealMap;
        globe.globeImageUrl(isRealMap ? mapReal : mapArt);

        if (isRealMap) {
            toggleBtn.innerHTML = 'The Earth<br>at Night';
        } else {
            toggleBtn.innerHTML = 'The Earth<br>in Daylight';
        }
    });

    // --- ホームに戻る処理 ---
    const backHomeBtn = document.getElementById('back-home');
    if (backHomeBtn) {
        backHomeBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
}