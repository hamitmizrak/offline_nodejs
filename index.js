
console.info("index.js Server 1111 portunda ayağa kalktı");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

// Import 

// Import Express (Express:  Node.js için esnek bir web uygulama çatısını inşa eder)
// Bu modüllerle beraber HTTP istekleri(request) işleyecek ve istemciye(server) yanıt dönecektir.

// Express Import
const express = require("express");

// Express için Log 
const morgan = require('morgan');

// Mongoose Import
const mongoose = require("mongoose");

// bodyParser Import
const bodyParser = require("body-parser");

// App Import
const app = express(); // Express app oluştur.

// Morgan Aktifleştirmek
// Morgan'ı Express.js uygulamasında kullanalım.
// app.use(morgan('dev')); //dev: kısa ve renkli loglar göster
app.use(morgan('combined')); //dev: uzun ve renkli loglar göster


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
app.use(bodyParser.static("public"));

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Server Port 
const port = 1111;
app.listen(port, ()=>{
    console.log(`NodeJS Sunucusu ${port} portunda dinliyor http://localhost:${port}`);
    
})