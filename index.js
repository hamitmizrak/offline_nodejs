const express = require('express');
const mongoose = require("mongoose");
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const blogRoutes = require("./routes/blog_api_routes");
const app = express();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
// MongoDB Bağlantısı
const databaseCloudUrl = "mongodb+srv://hamitmizrak:cNrT66n13oQYtkps@offlinenodejscluster.l3itd.mongodb.net/?retryWrites=true&w=majority&appName=OfflineNodejsCluster";

mongoose.connect(`${databaseCloudUrl}`)
    .then(() => {
        console.log("Mongo DB başarıyla bağlandı.");
    })
    .catch((err) => {
        console.error("Mongo DB bağlantı hatası:", err);
    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Middleware'leri dahil et
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('combined')); // Loglama için Morgan
app.use(express.static("public")); // Statik dosyaları public klasöründen sağla
app.use(cors()); // CORS koruması

// CSRF Middleware
const csrfProtection = csrf({ cookie: true });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EJS Görüntüleme motorunu aktifleştir
app.set("view engine", "ejs");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Rotalar
app.use("/blog", blogRoutes);

// Formu render eden rota ("/")
app.get("/", csrfProtection, (req, res) => {
    res.render('index', { csrfToken: req.csrfToken() });
});

// Form verilerini işleyen rota (POST)
app.post("/process", csrfProtection, (req, res) => {
    if (!req.body) {
        console.log('Boş gövde alındı.');
    } else {
        console.log('dolu gövde alındı.');
        console.log(req.body);
    }
    console.log("Form verisi alındı"); // Formdan gelen verileri logla
    res.send('CSRF korumalı form başarıyla gönderildi');
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 404 Hata sayfası
app.use((req, res, next) => {
    res.status(404).render("404", { url: req.originalUrl });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Sunucu başlatma
const port = 1111;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor http://localhost:${port}`);
});
