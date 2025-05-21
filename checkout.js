window.onload = function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        document.getElementById('cart-items').innerHTML = '<p>Giỏ hàng của bạn trống.</p>';
        return;
    }

    let totalAmount = 0;

    // Tạo bảng
    const table = document.createElement('table');
    table.classList.add('cart-table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá (VND)</th>
                <th>Thành tiền (VND)</th>
            </tr>
        </thead>
        <tbody>
            ${cart.map(item => {
                totalAmount += item.price * item.quantity;
                return `
                    <tr>
                        <td>${item.name}</td>
                        <td>${item.quantity}</td>
                        <td>${item.price}</td>
                        <td>${item.price * item.quantity}</td>
                    </tr>
                `;
            }).join('')}
        </tbody>
    `;

    document.getElementById('cart-items').appendChild(table);
    document.getElementById('total-amount').textContent = totalAmount;

    document.getElementById('checkout-btn').onclick = function() {
        let orderText = 'Chi tiết đơn hàng:\n\n';
        cart.forEach(item => {
            orderText += `Tên sản phẩm: ${item.name}\nSố lượng: ${item.quantity}\nGiá: ${item.price} VND\nThành tiền: ${item.price * item.quantity} VND\n\n`;
        });
        orderText += `Tổng cộng: ${totalAmount} VND\n`;

        const shouldDownload = confirm('Bạn có muốn tải hoá đơn đơn hàng về máy không?');

        if (shouldDownload) {
            const blob = new Blob([orderText], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'don_hang.txt';
            link.click();
        }

        localStorage.removeItem('cart');
        alert('Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đã được thanh toán.');
        location.reload()
    };
};
