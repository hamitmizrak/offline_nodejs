
console.info("index.js Server 1111 portunda ayağa kalktı");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
// Import 
// Import Express (Express:  Node.js için esnek bir web uygulama çatısını inşa eder)
// Bu modüllerle beraber HTTP istekleri(request) işleyecek ve istemciye(server) yanıt dönecektir.

// Express Import
const express = require('express');

// Mongoose Import
const mongoose = require("mongoose");

// CSRF Import
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

// bodyParser Import
const bodyParser = require('body-parser');

// App Import
const app = express();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
// Mongo DB Bağlantısı
// username:  hamitmizrak
// password:  cNrT66n13oQYtkps
// mongodb+srv://hamitmizrak:cNrT66n13oQYtkps@offlinenodejscluster.l3itd.mongodb.net/?retryWrites=true&w=majority&appName=OfflineNodejsCluster

// Localhostta MongoDB yüklüyse)
const databaseLocalUrl="mongodb://localhost:27017/blog";

// Localhostta MongoDB yüklüyse)
const databaseCloudUrl="mongodb+srv://hamitmizrak:cNrT66n13oQYtkps@offlinenodejscluster.l3itd.mongodb.net/?retryWrites=true&w=majority&appName=OfflineNodejsCluster";

// Local ve Cloud
const dataUrl = [databaseLocalUrl,databaseCloudUrl];

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

///////////////////////////////////////////////////////////////////////////////////////////
// Middleware'leri dahil et
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// CSRF Middleware
const csrfProtection = csrf({ cookie: true });

app.use(express.static("public"));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EJS(Embedded JavaScript) Görüntüleme motorunu aktifleştirdim
app.set("view engine", "ejs");

///////////////////////////////////////////////////
// Express için Log 
const morgan = require('morgan');

// Morgan Aktifleştirmek
// Morgan'ı Express.js uygulamasında kullanalım.
 //app.use(morgan('dev')); //dev: kısa ve renkli loglar göster
app.use(morgan('combined')); //dev: uzun ve renkli loglar göster

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Router (Rotalar)
const blogRoutes = require("./routes/blog_api_routes");
const { request } = require("http");

// http://localhost:1111/blog
app.use("/blog", blogRoutes);

/////////////////////////////////////////////////////////////////////////////////////////
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

app.use("/blog/", limiter)

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
// npm install cookie-parser


// Formu render eden rota ("/")
app.get("/", csrfProtection, (req, res) => {
    //response.setHeader("Content-Type", "application/json");
    res.render('index', { csrfToken: req.csrfToken() });
});

// Form verilerini işleyen rota


// blog için CSRF koruması eklenmiş POST işlemi
//app.post("/blog", csrfProtection, (req, res) => {
app.post("/", csrfProtection, (req, res) => {
    const blogData = {
        header: req.body.header,
        content: req.body.content,
        author: req.body.author,
        tags: req.body.tags,
    };

    if (!blogData.header || !blogData.content) {
        return res.status(400).send('Blog verisi eksik!');
    }

    if (!req.body) {
        console.log('Boş gövde alındı.');
      } else {
        console.log(req.body);
        console.log('Dolu gövde alındı.');
      }

    const BlogModel = require("./models/mongoose_blog_models"); // Modeli ekleyin

    const newBlog = new BlogModel(blogData);
    newBlog.save()
        .then(() => {
            console.log('Blog başarıyla kaydedildi:', blogData);
            res.send('CSRF ile blog başarıyla kaydedildi.');
        })
        .catch((err) => {
            console.log("Veritabanı hatası:", err);
            res.status(500).send("Veritabanı hatası oluştu.");
        });
});

///////////////////////////////////////////////////////////////////////
// 404 Hata sayfası
app.use((req, res, next) => {
    res.status(404).render("404", {url: req.originalUrl})
});


////////////////////////////////////////////////////////////////////
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



///////////////////////////////////////////////////
// Sunucu başlatma
const port = 1111;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor http://localhost:${port}`);
});
