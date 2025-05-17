const accounts = [
    { username: "abc", password: "123", email: "abc123@gmail.com" },
    { username: "def", password: "456", email: "def456@gmail.com" },
    { username: "ghi", password: "890", email: "ghi890@gmail.com" }
];
function login() {
    // Lấy giá trị người dùng nhập vào
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    // Lấy danh sách tài khoản từ localStorage
    const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
  
    // Kiểm tra trong localStorage
    const foundAccount = storedAccounts.find(acc =>
      acc.username === username && acc.password === password
    );
  
    // Kiểm tra trong mảng accounts cố định
    const staticAccount = accounts.find(acc =>
      acc.username === username && acc.password === password
    );
  
    if (foundAccount || staticAccount) {
      alert('Đăng nhập thành công!');
      localStorage.setItem('loggedInUser', username);
      window.location.href = '../../index.html'; // hoặc đường dẫn bạn muốn
    } else {
      alert('Sai tên đăng nhập hoặc mật khẩu!');
    }
  }
function signup() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rePassword = document.getElementById('re-password').value;
    // Lấy danh sách tài khoản từ localStorage
    let account = JSON.parse(localStorage.getItem('accounts')) || [];
    
    if (username === "" || email === "" || password === "" || rePassword === "") {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }
    // Kiểm tra tài khoản hoặc email đã tồn tại
    const isExist = account.some(acc => acc.username === username || acc.email === email);
    if (isExist) {
        alert("Tên tài khoản hoặc email đã tồn tại!");
        return;
    }
    // Kiểm tra mật khẩu khớp
    if (password !== rePassword) {
        alert("Mật khẩu không khớp!");
        return;
    }
    // Thêm tài khoản mới vào mảng account
    account.push({ username, password, email });
    
    // Lưu lại vào localStorage
    localStorage.setItem('accounts', JSON.stringify(account));
    alert("Đăng ký thành công!");
    window.location.href = 'login.html'; // Chuyển hướng đến trang đăng nhập
}

function updateAuthLinks() {
    const authLinks = document.querySelector('.auth-links');
    if (!authLinks) return;
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        authLinks.innerHTML = `
            <span>Xin chào, ${loggedInUser}</span><span> | </span>
            <a href="#" class="logout">Đăng xuất</a>
        `;
            const logoutBtn = document.querySelector('.logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function () {
                alert('Đã đăng xuất!');
                localStorage.removeItem('loggedInUser');
                            // Khôi phục giao diện chưa đăng nhập
                authLinks.innerHTML = `
                    <a href="../module/login/login.html">Đăng nhập</a> | 
                    <a href="../module/login/signup.html">Đăng ký</a>
                `;
            });
        }
    } else {
        // Nếu chưa đăng nhập thì hiển thị mặc định
        authLinks.innerHTML = `
            <a href="../module/login/login.html">Đăng nhập</a> | 
            <a href="../module/login/signup.html">Đăng ký</a>
        `;
    }
}// Khi tài liệu sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
    // Form đăng nhập
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            login();
        });
    }
    // Form đăng ký
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            signup();
        });
    }
    // Cập nhật giao diện người dùng (dành cho index.html)
    updateAuthLinks();
});