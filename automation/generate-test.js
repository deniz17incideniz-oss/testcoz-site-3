import fs from "fs-extra";

const sinif = process.argv[2];
const ders = process.argv[3];
const konu = process.argv[4];
const testNo = process.argv[5];
const zorluk = process.argv[6];

const fileName = `${ders}-${konu}-test-${testNo}.html`;

const html = `
<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${konu} - Test ${testNo} | TestÇöz</title>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{
font-family:'Inter',Arial,sans-serif;
background:#f3f4f6;
padding:40px;
color:#111827;
}

.container{
max-width:1000px;
margin:auto;
}

.card{
background:white;
border-radius:16px;
padding:32px;
box-shadow:0 4px 20px rgba(0,0,0,0.08);
}

h1{
font-size:32px;
margin-bottom:24px;
}

.meta{
display:grid;
grid-template-columns:repeat(2,1fr);
gap:16px;
margin-bottom:32px;
}

.box{
background:#eef2ff;
padding:18px;
border-radius:12px;
font-weight:600;
}

.question{
margin-top:32px;
padding-top:24px;
border-top:1px solid #e5e7eb;
}

.question h2{
font-size:22px;
margin-bottom:16px;
}

.options{
display:grid;
grid-template-columns:repeat(2,1fr);
gap:16px;
margin-top:20px;
}

button{
padding:16px;
border:none;
border-radius:12px;
background:#e5e7eb;
cursor:pointer;
font-size:16px;
font-weight:600;
transition:0.2s;
}

button:hover{
background:#c7d2fe;
}

.correct{
background:#4ade80 !important;
color:white;
}

.wrong{
background:#f87171 !important;
color:white;
}

.finish-btn{
margin-top:40px;
width:100%;
background:#2563eb;
color:white;
font-size:18px;
}

.finish-btn:hover{
background:#1d4ed8;
}

.result{
margin-top:32px;
padding:24px;
border-radius:16px;
background:#ecfeff;
display:none;
}

@media(max-width:768px){

.options{
grid-template-columns:1fr;
}

.meta{
grid-template-columns:1fr;
}

body{
padding:16px;
}

}

</style>
</head>

<body>

<div class="container">

<div class="card">

<h1>${konu} Test ${testNo}</h1>

<div class="meta">
<div class="box">Sınıf: ${sinif}</div>
<div class="box">Ders: ${ders}</div>
<div class="box">Zorluk: ${zorluk}</div>
<div class="box">Konu: ${konu}</div>
</div>

<div class="question">
<h2>Örnek Soru</h2>

<p>Bu alan gerçek DOCX parser bağlandığında otomatik oluşacak.</p>

<div class="options">
<button>A</button>
<button>B</button>
<button>C</button>
<button>D</button>
</div>
</div>

<button class="finish-btn">
Testi Bitir
</button>

<div class="result" id="result">
<h2>Test Tamamlandı</h2>
<p>Doğru: 0</p>
<p>Yanlış: 0</p>
<p>Boş: 0</p>
</div>

</div>
</div>

<script>

document.querySelectorAll('.options button').forEach(btn=>{

btn.addEventListener('click',()=>{

const parent=btn.parentElement;

parent.querySelectorAll('button').forEach(b=>{
b.disabled=true;
});

btn.classList.add('correct');

});

});

document.querySelector('.finish-btn').addEventListener('click',()=>{

document.getElementById('result').style.display='block';

});

</script>

</body>
</html>
`;

await fs.ensureDir("tests");

await fs.writeFile(`tests/${fileName}`, html);

console.log("Test oluşturuldu:", fileName);
