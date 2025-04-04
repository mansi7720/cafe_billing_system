/* script.js (JavaScript for Café Billing System) */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(item, price, qtyId) {
    let quantity = parseInt(document.getElementById(qtyId).value);
    let existingItem = cart.find(cartItem => cartItem.name === item);
    
    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.total = existingItem.quantity * existingItem.price;
    } else {
        cart.push({ name: item, price: price, quantity: quantity, total: price * quantity });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${item} added to cart!`);
}

function generateBill() {
    let billTable = document.getElementById("bill-items");
    billTable.innerHTML = "";
    let totalAmount = 0;
    let gstAmount = 0;

    cart.forEach(item => {
        let row = `<tr>
                    <td>${item.name}</td>
                    <td>₹${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>₹${item.total}</td>
                   </tr>`;
        billTable.innerHTML += row;
        totalAmount += item.total;
    });
    
    gstAmount = totalAmount * 0.05; // Calculating 5% GST
    let finalAmount = totalAmount + gstAmount;
    
    document.getElementById("total-amount").innerHTML = `
        Subtotal: ₹${totalAmount.toFixed(2)} <br>
        GST (5%): ₹${gstAmount.toFixed(2)} <br>
        <strong>Total Payable: ₹${finalAmount.toFixed(2)}</strong>
    `;
    document.getElementById("thank-you-message").style.display = "block";
}

function refreshBill() {
    localStorage.removeItem("cart");
    cart = [];
    document.getElementById("bill-items").innerHTML = "";
    document.getElementById("total-amount").innerHTML = "Total: ₹0.00";
    document.getElementById("thank-you-message").style.display = "none";
    alert("Bill has been refreshed!");
}

function printBill() {
    window.print();
}

// Ensure the bill is loaded correctly when the billing page is opened
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("bill-items")) {
        generateBill();
        let refreshBtn = document.createElement("button");
        refreshBtn.innerText = "Refresh Bill";
        refreshBtn.className = "refresh-btn";
        refreshBtn.onclick = refreshBill;
        document.body.appendChild(refreshBtn);
        
        let printBtn = document.createElement("button");
        printBtn.innerText = "Print Bill";
        printBtn.className = "print-btn";
        printBtn.onclick = printBill;
        document.body.appendChild(printBtn);
    }
});