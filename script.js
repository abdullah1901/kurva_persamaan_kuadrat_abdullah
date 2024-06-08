document.getElementById('quadraticForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    
    const canvas = document.getElementById('quadraticCanvas');
    const ctx = canvas.getContext('2d');
    
    // Mengatur ukuran canvas agar lebih besar dan responsif
    canvas.width = window.innerWidth * 0.9; // 90% dari lebar layar
    canvas.height = window.innerHeight * 0.8; // 80% dari tinggi layar
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fungsi untuk menemukan akar-akar persamaan kuadrat
    function findRoots(a, b, c) {
        const discriminant = b * b - 4 * a * c;
        if (discriminant < 0) {
            return [null, null];
        }
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        return [root1, root2];
    }
    
    // Menemukan akar-akar
    const [root1, root2] = findRoots(a, b, c);
    
    if (root1 === null || root2 === null) {
        alert("Tidak ada akar real, tidak dapat menggambar kurva.");
        return;
    }
    
    // Menentukan rentang nilai x dari -10 hingga 10
    const xMin = -10;
    const xMax = 10;
    
    // Rentang nilai x
    const xValues = [];
    for (let x = xMin; x <= xMax; x += 0.1) {
        xValues.push(x);
    }
    
    // Menghitung nilai y berdasarkan persamaan kuadrat
    const yValues = xValues.map(x => a * x * x + b * x + c);
    
    // Skala untuk menggambar kurva agar sesuai dengan rentang -10 hingga 10
    const scaleX = canvas.width / (xMax - xMin);
    const scaleY = canvas.height / (35); // Rentang y dari -30 hingga 5
    
    // Pusatkan kurva pada canvas
    const offsetX = canvas.width / 2;
    const offsetY = canvas.height - (canvas.height / 35) * 30; // 30 adalah nilai minimum y
    
    // Membuat plot
    ctx.beginPath();
    ctx.moveTo(xValues[0] * scaleX + offsetX, -yValues[0] * scaleY + offsetY);
    
    for (let i = 1; i < xValues.length; i++) {
        ctx.lineTo(xValues[i] * scaleX + offsetX, -yValues[i] * scaleY + offsetY);
    }
    
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Menambahkan sumbu x dan y
    ctx.beginPath();
    ctx.moveTo(0, offsetY);
    ctx.lineTo(canvas.width, offsetY);
    ctx.moveTo(offsetX, 0);
    ctx.lineTo(offsetX, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Menambahkan angka pada sumbu x dan y
    ctx.font = '10px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Angka pada sumbu x
    for (let x = xMin; x <= xMax; x++) {
        const xPos = x * scaleX + offsetX;
        ctx.fillText(x, xPos, offsetY + 10);
        ctx.beginPath();
        ctx.moveTo(xPos, offsetY - 5);
        ctx.lineTo(xPos, offsetY + 5);
        ctx.stroke();
    }
    
    // Angka pada sumbu y
    for (let y = -30; y <= 5; y++) {
        const yPos = -y * scaleY + offsetY;
        ctx.fillText(y, offsetX - 10, yPos);
        ctx.beginPath();
        ctx.moveTo(offsetX - 5, yPos);
        ctx.lineTo(offsetX + 5, yPos);
        ctx.stroke();
    }
    // Menambahkan grid
    ctx.beginPath();
    for (let x = 0; x <= canvas.width; x += scaleX) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }
    for (let y = 0; y <= canvas.height; y += scaleY) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 0.5;
    ctx.stroke();
});
