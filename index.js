
console.info("index.js Server 1111 portunda ayağa kalktı");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

// Import 

// Import Express (Express:  Node.js için esnek bir web uygulama çatısını inşa eder)
// Bu modüllerle beraber HTTP istekleri(request) işleyecek ve istemciye(server) yanıt dönecektir.

// Express Import
const express = require("express");

// Mongoose Import
const mongoose = require("mongoose");

///////////////////////////////////////////////////
// bodyParser Import
const bodyParser = require("body-parser");

// App Import
const app = express(); // Express app oluştur.

///////////////////////////////////////////////////
// Express için Log 
const morgan = require('morgan');


// Morgan Aktifleştirmek
// Morgan'ı Express.js uygulamasında kullanalım.
// app.use(morgan('dev')); //dev: kısa ve renkli loglar göster
app.use(morgan('combined')); //dev: uzun ve renkli loglar göster

///////////////////////////////////////////////////
// compression:
// npm install compression
// Gzip : Verilerin sıkıştırılmasıyla performansı artırmak
// ve ağ üzerinde sayfaya daha hızlı erişimi sağlar
// Tüm Http cevaplarını sıkıştırarak gönderilmesini sağlar.
// const compression = require('compression');
// app.use(compression);

///////////////////////////////////////////////////
// Rate Limiting (İstek Sınırlamasını):
// npm install express-rate-limit
// DDoS saldırlarına karşı korumayı sağlamak ve sistem performansını artırmak içindir.
// Gelen istekleri sınırlayabiliriz.

// Her 15 dakika içinde en fazla 100 istek atılabilinir.
const rateLimit=require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 100, // buy süre zarfında en fazla bu kadar isterk atabilirsiniz.
    message: "İstek sayısı fazla yapıldı, lütfen biraz sonra tekrar deneyiniz"
});

app.use("/api/", limiter)

///////////////////////////////////////////////////
// CORS
// npm install cors
// CORS (Cross-Origin Resource Sharing)
// Eğer API'niz başka portlardan da erişim sağlanacaksa bunu açmamız gerekiyor.
 
const cors= require('cors');
app.use(cors());

///////////////////////////////////////////////////
// CSRF 
/*
CSRF (Cross-Site Request Forgery):  Türkçesi Siteler Arası istek Sahteciliğidir.
Bu saldırı türünde amaç, kötü niyetli bir kullanıcının, başka bir kullanının haberi olmadan onun adına istekler göndererek
işlem yapması halidir.
Kullanımı: Genellikle kullanıcı, başka bir sitede oturum açmışken, saldırganın tasarladğo kötü niyetli sitelerle veya bağlantılarla
istem dışı işlemler yapmasına saldırgan yönlendirir.
Kullanıcı browser üzerinden oturum açtığında ve kimlik doğrulama bilgilerie sahip olduğu sitelerde yapılır.

*/
// npm install csurf
const csrf = require('csuf');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const  csrfProtections = csrf({cookie: true});

// CSRF tokenını form gönderiminde kullanmak üzere
app.get("/form", csrfProtections, (request,response) => {
response.render('send', {csrfToken: request.csrfToken()})
});

// Form gönderimi sırasında CSRF korumasını aktif etmek içinde
app.post("/process", csrfProtections, (request, response) =>{
    response.send('CSRF (Cross-Site Request Forgery) ile Form başarıyla Gönderildi')
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
// Mongo DB Bağlantısı
//username:  hamitmizrak
//password:  cNrT66n13oQYtkps
//mongodb+srv://hamitmizrak:cNrT66n13oQYtkps@offlinenodejscluster.l3itd.mongodb.net/?retryWrites=true&w=majority&appName=OfflineNodejsCluster

// Localhostta MongoDB yüklüyse)
const databaseLocalUrl="mongodb://localhost:27017/blog";


// Localhostta MongoDB yüklüyse)
const databaseCloudUrl="mongodb+srv://hamitmizrak:cNrT66n13oQYtkps@offlinenodejscluster.l3itd.mongodb.net/?retryWrites=true&w=majority&appName=OfflineNodejsCluster";

// Local ve Cloud
const dataUrl = [databaseLocalUrl,databaseCloudUrl];

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Connect
// 1.YOL
//mongoose.connect(`${dataUrl[1]}`).then().catch();

// 2.YOL
//mongoose.connect(`${databaseCloudUrl}`, {useNewUrlParser:true, useUnifiedTopology:true}) // Eski MongoDB sürümleride
mongoose.connect(`${databaseCloudUrl}`)
.then(()=>{
    console.log("Mongo DB Başarıyla Yüklendi");
})
.catch((err)=>{
    console.error("Mongo DB Bağlantı Hatası",err);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MiddleWare(Orta Katmanlar)
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(express.static("public"));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EJS(Embedded JavaScript) Görüntüleme motorunu aktifleştirdim
app.set("view engine", "ejs");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Router (Rotalar)
const blogRoutes = require("./routes/blog_api_routes");
const { request } = require("http");

// http://localhost:1111/blog
app.use("/blog", blogRoutes);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Anasayfa set
app.get("/", (request,response) => {
    //response.setHeader("Content-Type", "application/json");
    response.render("index");
});


// 404 Hata Sayfasını 
app.use((request, response, next) => {
    response.status(404).render("404", {url: request.originalUrl})
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Windowsta 1111 portunu kapatmak
/*
Terminali Yönetici olarak Aç

# Çalışan portu gösteriyor
netstat -aon | findstr :1111

# TCP Protokolü için Portu Kapatma:
netsh advfirewall firewall add rule name="Block TCP Port 1111" protocol=TCP dir=in localport=1111 action=block

# UDP Protokolü için Portu Kapatma:
netsh advfirewall firewall add rule name="Block UDP Port 1111" protocol=UDP dir=in localport=1111 action=block

*/

// Server Port 
const port = 1111;
app.listen(port, ()=>{
    console.log(`NodeJS Sunucusu ${port} portunda dinliyor http://localhost:${port}`);
});