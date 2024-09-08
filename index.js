console.info("index.js Server 1111 portunda ayağa kalktı");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import
// Import Express (Express:  Node.js için esnek bir web uygulama çatısını inşa eder)
// Bu modüllerle beraber HTTP istekleri(request) işleyecek ve istemciye(server) yanıt dönecektir.

// Express Import
const express = require("express");

// Mongoose Import
const mongoose = require("mongoose");

// CSRF Import
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

// Winston: Hata bilgilerini ve bilgi loglarını düzgün ve MORGAN'A göre daha gelişmiştir.
const winston = require("winston"); // Winston logger'ı ekle


// Helmet Import
const helmet = require("helmet");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// bodyParser Import
const bodyParser = require("body-parser");


// App Import
const app = express();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Winston logger yapılandırması
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: "winston_error.log", level: "error" }),
      new winston.transports.File({ filename: "winston_combined.log" }),
    ],
  });
  
  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Mongo DB Bağlantısı
// username:  hamitmizrak
// password:  cNrT66n13oQYtkps
// mongodb+srv://hamitmizrak:cNrT66n13oQYtkps@offlinenodejscluster.l3itd.mongodb.net/?retryWrites=true&w=majority&appName=OfflineNodejsCluster

// Localhostta MongoDB yüklüyse)
const databaseLocalUrl = "mongodb://localhost:27017/blog";

// Localhostta MongoDB yüklüyse)
// 1.YOL
const databaseCloudUrl =
  "mongodb+srv://hamitmizrak:cNrT66n13oQYtkps@offlinenodejscluster.l3itd.mongodb.net/?retryWrites=true&w=majority&appName=OfflineNodejsCluster";

// 2.YOL
require('dotenv').config();

// Localhostta MongoDB yüklüyse)
const databaseCloudUrlDotEnv = 
`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@offlinenodejscluster.l3itd.mongodb.net/?retryWrites=true&w=majority&appName=OfflineNodejsCluster`;  

// Local ve Cloud
const dataUrl = [databaseLocalUrl, databaseCloudUrl,databaseCloudUrlDotEnv];

// Connect
// 1.YOL
//mongoose.connect(`${dataUrl[1]}`).then().catch();

// 2.YOL
//mongoose.connect(`${databaseCloudUrl}`, {useNewUrlParser:true, useUnifiedTopology:true}) // Eski MongoDB sürümleride
/*
mongoose
  .connect(`${databaseCloudUrl}`)
  .then(() => {
    console.log("Mongo DB Başarıyla Yüklendi");
  })
  .catch((err) => {
    console.error("Mongo DB Bağlantı Hatası", err);
  });
*/
  // 3.YOL 
  mongoose
  .connect(`${databaseCloudUrlDotEnv}`)
  .then(() => {
    console.log("Mongo DB Başarıyla Yüklendi");
    logger.info("Mongo DB Başarıyla Yüklendi..."); //logger: Winston
  })
  .catch((err) => {
    console.error("Mongo DB Bağlantı Hatası", err);
  });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE
// Middleware'leri dahil et

// app.use(bodyParser.urlencoded({ extended: true }));
// Express.js uygulamalarındaki middleware'dir. Gelen isteklerin body(gövde) kısmını analiz ederek, form verilerini ve JSON verilerine erişebilir hale getirir.
// urlencoded: Burada gelen istek gövdelerini URL'ye kodlanmıi form verilerini işlemeye yarar.
// extended: true: Gelen veriler içim querystring(qs) adlı kütaphane kullanılır. Ve bunun sayesinde karmaşık nesleride ayrıştırabilir.
// URL' kodlanmış (x-www-form-urlencoded) biçimde gönderir. Bu middleware bu tür verileri ayrıştruu ve request.body nesnesine ekler.
// http://localhost:1111?name=Hamit&surname=Mızrak
/*
 {
name:"Hamit",
surname:"Mızrak"
}
 */
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.urlencoded({ extended: true }));
// Bu middleware gelen HTTP isteklerinin gövdesindeki JSIN verilerini ayrıştırır.
// Sunucusunun JSON formatından gelen GET,POST,DELETE,PUT gibi istekelrin anlamasını sağlar.
// Veriler analiz edildikten sonra ,ayrışmaztırılmış içerik request.body nesneini ekler
app.use(bodyParser.json());

// app.use(cookieParser());
// HTTP istekelrinden gelen cooki'leri(çerez) ayrıştıran bir middleware'dir.
// Bu çerezler request.cookise adlı nesneye ekler.
app.use(cookieParser());

// CSRF Middleware
// CSRF(Cross-Site Request Forgery) saldırılarına karşı güvenliği sağlar.
// CSRF tokenlarını çerezler araçılığyla gönderilir.
const csrfProtection = csrf({ cookie: true });

// Uygulamada statik dosyaların HTL,CSS,JS,image v.b içerikler sunar.
// public klasörü, statik doyalar için kök dizin olarak belirlenir.
// Bu klasörde bulunan dosyalara tarayıcıdan direk erişim sağlanır.
// Örnek: public klasöründe style.css adlı bir dosya varsa biz buna şu şekilde erişim sağlarız.
// http://localhost:1111/style.css
app.use(express.static("public"));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EJS(Embedded JavaScript) Görüntüleme motorunu aktifleştirdim
app.set("view engine", "ejs");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Express için Log
const morgan = require("morgan");

// Morgan Aktifleştirmek
// Morgan'ı Express.js uygulamasında kullanalım.
//app.use(morgan('dev')); //dev: kısa ve renkli loglar göster
app.use(morgan("combined")); //dev: uzun ve renkli loglar göster

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Router (Rotalar)
const blogRoutes = require("./routes/blog_api_routes");
const { request } = require("http");

// http://localhost:1111/blog
app.use("/blog", blogRoutes);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// compression:
// npm install compression
// Gzip : Verilerin sıkıştırılmasıyla performansı artırmak
// ve ağ üzerinde sayfaya daha hızlı erişimi sağlar
// Tüm Http cevaplarını sıkıştırarak gönderilmesini sağlar.
// const compression = require('compression');
// app.use(compression);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Rate Limiting (İstek Sınırlamasını):
// npm install express-rate-limit
// DDoS saldırlarına karşı korumayı sağlamak ve sistem performansını artırmak içindir.
// Gelen istekleri sınırlayabiliriz.

// Her 15 dakika içinde en fazla 100 istek atılabilinir.
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // buy süre zarfında en fazla bu kadar isterk atabilirsiniz.
  message: "İstek sayısı fazla yapıldı, lütfen biraz sonra tekrar deneyiniz",
});

app.use("/blog/", limiter);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CORS
// npm install cors
// CORS (Cross-Origin Resource Sharing)
// Eğer API'niz başka portlardan da erişim sağlanacaksa bunu açmamız gerekiyor.

const cors = require("cors");
app.use(cors());


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Helmet: Http başlıkalrını güvenli hale getirir ve yaygın saldırı vektörlerini azaltır
//npm install helmet

// const helmet = require("helmet");
//app.use(helmet());
 app.use(helmet.frameguard({ action: 'deny' })); // Clickjacking'e karşı koruma
 app.use(helmet.xssFilter()); // XSS saldırılarına karşı koruma
 app.use(helmet.noSniff()); // MIME sniffing koruması

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
app.get("/", csrfProtection, (request, response) => {
  // İstek gövdesinde JSON(Javascript Object Notation) formatında veri göndereceğini belirtir.
  //response.setHeader("Content-Type", "application/json");
  //response.setHeader("Content-Type", "text/plain"); // name Hamit surnameMızrak
  response.setHeader("Content-Type", "text/html");
  //response.setHeader("Content-Type", "application/x-www-form-urlencoded"); // name=Hamit&surname=Mizrak

  // cache-control: Yanıtları hızlı sunmak için ve sunucya gereksiz istekleri azaltmak için
  response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

  // Sitemizi başka sitelerde iframe ile açılmasını engellemek
  // clickjacking saldırılarına karşı korumayı sağlar
  response.setHeader("X-Frame-Options", "DENY");

  // X-XSS-Protection: Tarayıca tarafından XSS(Cross-Site Scripting) saldırılarıa karşı koruma
  // XSS saldırısını tespit ederse sayfanın yüklenmesini engeller.
  response.setHeader("X-XSS-Protection", "1; mode=block");

  // Access Control (CORS Başlıkları)
  // XBaşka bir kaynaktan gelen istekleri kontrol etmet için CORS başlığı ekleyebiliriz.
  response.setHeader("Access-Control-Allow-Origin", "https://example.com");

  // Access-Control-Allow-Methods
  // Sunucunun hangi HTTP yöntemlerini kabul etiğini gösterir.
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  // Access-Control-Allow-Headers
  // Bu başlıklar, taryıcınının sunucuya göndereceği özel başlıklar göndersin
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  response.render("index", { csrfToken: request.csrfToken() });
});

// Form verilerini işleyen rota

// DİKKATT: Eğer  blog_api_routes.js post kısmında event.preventDefault(); kapatırsam buraki kodlar çalışır.
// blog için CSRF koruması eklenmiş POST işlemi
// app.post("/blog", csrfProtection, (request, response) => {
app.post("/", csrfProtection, (request, response) => {
  const blogData = {
    header: request.body.header,
    content: request.body.content,
    author: request.body.author,
    tags: request.body.tags,
  };

  if (!blogData.header || !blogData.content) {
    return response.status(400).send("Blog verisi eksik!");
  }

  if (!request.body) {
    console.log("Boş gövde alındı.");
    logger.info("Boş gövde alındı."); //logger: Winston
  } else {
    console.log(request.body);
    console.log("Dolu gövde alındı.");

    logger.info(request.body); //logger: Winston
    logger.info("Dolu gövde alındı."); //logger: Winston
  }

  const BlogModel = require("./models/mongoose_blog_models"); // Modeli ekleyin

  const newBlog = new BlogModel(blogData);
  newBlog
    .save()
    .then(() => {
      console.log("Blog başarıyla kaydedildi:", blogData);
      logger.info("Blog başarıyla kaydedildi:", blogData); //logger: Winston
      response.send("CSRF ile blog başarıyla kaydedildi.");
    })
    .catch((err) => {
      console.log("Veritabanı hatası:", err);
      logger.error("Veritabanı hatası:", err); //logger: Winston
      response.status(500).send("Veritabanı hatası oluştu.");
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 404 Hata sayfası
app.use((request, response, next) => {
  response.status(404).render("404", { url: request.originalUrl });
});

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Sunucu başlatma
const port = 1111;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor http://localhost:${port}`);
  logger.info(`Sunucu ${port} portunda çalışıyor http://localhost:${port}`); //logger: Winston
});
