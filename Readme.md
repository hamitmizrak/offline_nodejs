# Node js
[GitHub](https://github.com/hamitmizrak/offline_nodejs)
[Mongo Db Login](https://account.mongodb.com/account/login)
---

## Teknolojiler
```sh
Html5
Css3
Javascript
Javascript EJS
Bootstrap5
jquery
Font awesome

node.js
express.js
mongodb 
public.ejs
git/github 
docker => Dockerfile
docker => docker-compose.yml
Rest API
bashscript
nodemon
mongoose

```
---

## Teknolojiler
```sh
body-parser
compression
cookie-parser
cors
csurf
dotenv
ejs
express
express-rate-limit
helmet
mongodb
mongoose
morgan
swagger-jsdoc
swagger-ui-express
typescript
winston

nginx
typescript
gitlab => gitlab-ci.yml (CI/CD)
```
---

## Version
```sh
node -v
npm -v

```
---


## Node JS NPM INIT
```sh
Otomatik olarak package.json oluştursun.
npm init -y 


npm init
package name: 
1-) herşeyi küçük harfle yaz
2-) boşluk kullanma bunun yerine (- veya _ kullan)
3-) Türkçe karakterlerden (üğşçö) kullanma

package name: offline_node_blog
version: v1.0.0 (Semantic version)
description: Html5,css3,bootstrap5, js, es, nodejs, jquery, express,nodemon
entry point: index.js
test command: start 
git repository: https://github.com/hamitmizrak/offline_nodejs
keywords: Html5,css3,bootstrap5, js, es, ejs, nodejs, nodemon, jquery, express
author: Yüksek Bilgisayar Mühendisi Hamit Mızrak
license: ISC
Is this OK? yes
```
---

## Node JS NPM INSTALL, EXPRESS, NODEMON
```sh
npm search express
npm install express
npm install express --save
npm install express -g

npm install express@4.17.1
npm install nodemon --save-dev
npm install nodemon -D
npm install nodemon -g

npm install ejs

npm uninstall express
npm update express

npm list
npm list -g           (Global olarak herşeyi göster)
npm list -g --depth=0 (Global olarak, sadece ana branch'e yüklediğim dosyaları göster)

npm root     : Local projedeki node_modules gösterir.
npm root -g  : Glocal projedeki node_modules gösterir.

npm install
npm update

npm start
npm test

```
---


## NPM LOCAL INSTALL
```sh
npm install express typescript mongoose body-parser ejs
npm install nodemon --save-dev

```
---

## NPM GLOCAL INSTALL
```sh
npm install -g express typescript mongoose body-parser ejs

express     : 
Node.js üzerinden hızlı ve minimal(minimalist) web uygulaması için gerekli js frameworkudur. 
Express sunucu tarafıdan HTTPS isteklerini yönetmek için kullanıyoruz. 
Yangın olarak REST API web geliştirmek için kullanıyoruz.

typescript  :  js kullanarak OOP daha yakın uygulamalar çıkarmak içindir. Bir dildir. interface, abstact, enum vb.

mongoose    : 
NoSql yer alan Mongo DB için Node.js ile MongoDB veritabanı arasında köprüdür. 
ODM(Object Data Modeling). 
Mongoose, MongoDB üzerinden C-R-U-D işlemlerimizi yapmamıza olanak sağlar

body-parser : 
Express.js uygulamalarında HTTP istekler(request) gövdede(body) verilerini ayrıştırma için kullanılan bir ara katmandır.(middleware). 
Gelen bir post istekleri `request.body` üzerinden erişim sağlıyorum. 
Bundan dolayı form verilerimizi ,JSON formalarındaki verilere kolayca erişim sağlamış oluruz.
NOT: Express ^4.16.0 üstündeki sürümlerde body-parse express dahil edilmiştir.

ejs(Embedded Javascript Templates) : 
- EJS şablon motoru.
- EJS: dinamik değişen verileri HTML sayfalarında an be an görmek içindir.
- EJS: Express ile birlikte kullandığımızda sunucu tarafında dinamik HTML sayfaları oluşturmamıza olanak sağlar.
- EJS, Javascript kodlarımızı HTML içine gömerek proje kodlarımızı interaktif bir şekilde çalışmasını sağlar.
- EJS: Sytax  `<% %> <%= %>` bu komutları HTML içinde Javascript kodlarını rahatlıkla ekleyebilirsiniz. 
Bundan dolayı veritabanındaki verileri dinamik olarak son kullanıcı(end user) gösterebiliriz.  
```
---


## Node JS Nodemon
```sh
Nodemon_

-- package.json -- 
"script" :{
"start": "node index.js",
"nodemon": "nodemon index.js",
"nodemon_q": "nodemon -q index.js",
}

```
---


## Node JS NPM  EXPRESS, NODEMON
```sh
npm search express

-- LOCAL --
npm install express 
npm install express --save

npm install mongodb

npm install typescript 
npm install typescript express
npm install typescript@5.5.4 --save

npm install nodemon --save-dev

-- GLOBAL --
npm install express --save -g
npm install nodemon --save-dev -g
npm install typescript@5.5.4 --save -g

-- package.json -- 
"script" :{
"start": "node index.js",
"nodemon": "nodemon index.js",
"nodemon_q": "nodemon -q index.js",
}

npm run nodemon
npm run nodemon_1

```
---


##  compression
```sh

 compression:
 npm install compression
 Gzip : Verilerin sıkıştırılmasıyla performansı artırmak
 ve ağ üzerinde sayfaya daha hızlı erişimi sağlar
 Tüm Http cevaplarını sıkıştırarak gönderilmesini sağlar.
const compression = require('compression');
app.use(compression);

```
---


##  Rate Limited
```sh
npm install express-rate-limit
 Rate Limited (İstek Sınırlamasını):
 DDoS saldırlarına karşı korumayı sağlamak ve sistem performansını artırmak içindir.
 Gelen istekleri sınırlayabiliriz.

// Her 15 dakika içinde en fazla 100 istek atılabilinir.
const rateLimit=require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 100, // buy süre zarfında en fazla bu kadar isterk atabilirsiniz.
    message: "İstek sayısı fazla yapıldı, lütfen biraz sonra tekrar deneyiniz"
});

app.use("/api/", limiter)

```
---


##  CORS
```sh
CORS
npm install cors
CORS (Cross-Origin Resource Sharing)
Eğer API'niz başka portlardan da erişim sağlanacaksa bunu açmamız gerekiyor.
 
const cors= require('cors');
app.use(cors());
```
---


##  CSRF Koruması (Cross-Site Request Forgery)
```sh
npm install csurf
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });

app.use(csrfProtection);

app.get("/form", csrfProtection, (req, res) => {
  // CSRF token'ı form gönderiminde kullanmanız gerekecek
  res.render("send", { csrfToken: req.csrfToken() });
});


```
---


##  HELMET
```sh
Helmet: Http başlıkalrını güvenli hale getirir ve yaygın saldırı vektörlerini azaltır

npm install helmet

const helmet = require("helmet");
app.use(helmet());
```
---

##  Mongo DB
```sh

npm install mongodb
npm install -g mongodb

username:  hamitmizrak
password:  cNrT66n13oQYtkps

mongodb+srv://hamitmizrak:cNrT66n13oQYtkps@offlinenodejscluster.l3itd.mongodb.net/?retryWrites=true&w=majority&appName=OfflineNodejsCluster



```
---

##  MONGO İÇİN VERİ GÜVENLİĞİ (dotenv)
```sh
MongoDB kullanıcı adı ve şifresini doğrudan yazılmaz.
Hassas verileri saklamak için .env dosyası üzerinden ilerlemeliyiz.

DİKKATT: .env root dizinde olamlıdır.

npm install dotenv

.env
MONGO_USERNAME=hamitmizrak
MONGO_PASSWORD=cNrT66n13oQYtkps

index.js
require('dotenv').config();

// Localhostta MongoDB yüklüyse)
const databaseCloudUrlDotEnv = 
`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@offlinenodejscluster.l3itd.mongodb.net/?retryWrites=true&w=majority&appName=OfflineNodejsCluster`;  
```
---

##  CORS
```sh

```
---

## Node JS Nedir ?
```sh
NodeJS :
- Chrome V8 Javascript motorunu kullanan, 
- açık kaynak kodlu, 
- hızlı ve etkili bir platformdur.
- Server Side(Server[Sunucu]) tarafından çalışan bir Javascript framework'udur. 
- Ryan Dahl ve Isaac Z. Schluter tarafından 2009 yılında geliştirmeye başlamış.
```
---


## Node JS Özellikleri
```sh
Javascript betik dilimiz senkron(Aynı anda sadece bir iş yapan) çalışır.

Event-Driven (Olay odaklıdır),Non-Blocking I/O Modeli (Engelsiz Input(Girdi), Output(Çıktı)):
- Bu özellikler amaçı JS özelliğinden olan senkron özelliğini, asenkron(Aynı anda birden fazla process) özelliğe taşımaktır.
- Single Threaded(Tek iş parçasıcı) mimarisinde sahiptir.
- Npm'i otomatik olarak sisteme yükler.
- Full stack(frontend,backend) aynı dil(JS) üzerinden projemizi geliştirme imkanını sağlar.
- API ile çalışmamıza olanak sağlar.
- Gerçek zamanlı uygulamalar(Message: Socket) yüksek performans sağlar.
- Express(Middleware: orta katman), node js için popüler bir web geliştirme platformudur. 
- Veri tabanı erişimlerinde MongoDB, mysql, postgresql
- Routing(yönlendirme)
```
---


## Node JS Olay odaklı(event-driven) , engelsiz(non-blocking) I/O Modeli, Event Loop
```sh
- Bu model amacı performans metriğini artırmak içindir
- Olay odaklı programlamada, bir programın olaylar(event) tepki verme şeklidir.
- Uzun süren işlemlerde(Ağ etkileşimi) bazen bekleyebiliyoruz. Biz bunu asenkron olarak işlersek beklemeden diğer işlemlerin sürdürülebilirliğini artırmış oluruz.
- Yani işlemlerin tamamlanmasını beklemeden diğer tetiklenen(trigger) olaylara yanıt vermedir.
- Aynı anda  birden fazla işlem(process) çalışır ve bloke olmadan devam eder.
- Event-Loop(Olay döngüsü): uygulamaları dinliyor ve işlem bekleyenleri işliyor.
- Callback function: programalada callback functionlar olay odaklı programlanın bir parçasıdır.
- Olay odaklı bu model ölçeklenebilinirliliğini sağlar ve eş zamanlı çalışmayı sağlar
```
---

## Node JS Tarihçesi
```sh
2009 geliştirilmeye başlandı
2010 Non-blocking (Engelsiz)
Windows
LTS(Long Term Support: Uzaun vadeli destek)
```
---

## Node JS Node JS Framework
```sh
- Express.js (En popüler olanı) hafiftir.
- Koa.js (ES6 destekliyor) daha az kod
- Nest.js (TS ile geliştirildi)
- Meteor.js (Full- stack) JS uygulamaları geliştirmek için uygundur.
- Sails.js (MVC) mimarisine dayanır.
- Hapi.js (Büyük ölçekli projeler için uygundur)
```
---

## Node JS Framework Express
```sh
- Middleware: orta katman için uygundur.
- Esnektir, 
- Hızlıdır (Minimalist)
- SPA uygulamalarında(Single Page Application) idealdir SPA(React,Angular)
- node js için en popüler hafif,esnek, bir web geliştirme platformudur. 
- Http istekleri (GET,POST,PUT, DELETE) için birçok özellikler sağlar.
- Hızlı prototype oluşturmada, RESTful API geliştirmede 
- Yönlendirme (Routing): Yönlendirme mekanizması vardır.
```
---

## Npm Nedir
```sh
Npm(Node Package Management): Paket yönetim sistemidir.
Npm bize hızlı kodlar yazmamız için gereken alt yapıyı sunar.
```
---



##  EJS
```sh
**EJS (Embedded JavaScript)**, Node.js tabanlı uygulamalarda dinamik HTML içerik oluşturmak için kullanılan bir **şablon (template) motoru**dur. 
EJS ile, HTML sayfalarının içine JavaScript kodlarını gömerek dinamik içerik üretebilir ve sayfayı istemciye sunabilirsiniz.

### EJS'in Temel Özellikleri:
1. **JavaScript ile Entegre**: EJS, HTML içine JavaScript kodu gömmeye izin verir. Bu, veritabanından gelen veya başka bir kaynaktan alınan verileri HTML içerisine kolayca entegre etmenizi sağlar.
   
   Örneğin, bir kullanıcı listesini HTML şablonuna eklemek:
   ```ejs
   <ul>
     <% users.forEach(function(user) { %>
       <li><%= user.name %></li>
     <% }); %>
   </ul>
   ```
   - `<% %>`: JavaScript kodu çalıştırmak için kullanılır (örneğin, döngüler, koşullu ifadeler).
   - `<%= %>`: Değişken veya ifade değerini eklemek için kullanılır (HTML çıktısına veri eklemek).

2. **Veri Bağlama (Data Binding)**: Sunucuda işlenen verileri, HTML sayfalarına kolayca ekleyebilirsiniz. Node.js tarafında oluşturulan veriler, EJS şablonuna gönderilir ve burada dinamik içerik oluşturulabilir.

   Örneğin, bir Express.js route'unda:
   ```javascript
   app.get('/users', (req, res) => {
     const users = [{ name: "Hamit" }, { name: "Hulusi" }];
     res.render('users', { users: users });
   });
   ```
   Bu veriler, EJS şablonunda yukarıda gösterilen şekilde kullanılarak liste halinde görüntülenir.

3. **Esnek ve Hafif**: EJS, birçok şablon motoruna göre oldukça esnektir ve kolayca öğrenilebilir. HTML yapısının içerisine eklenen JavaScript kodu ile sadece gerekli yerlerde dinamik veri gösterimi yapılabilir.

4. **Koşullu İfadeler ve Döngüler**: EJS, if-else blokları veya döngü yapılarını HTML ile birlikte kullanmanıza olanak tanır, bu da şablonların esnekliğini artırır.
   
   Koşullu ifade örneği:
   ```ejs
   <% if (user.isAdmin) { %>
     <p>Admin kullanıcı</p>
   <% } else { %>
     <p>Normal kullanıcı</p>
   <% } %>
   ```

5. **Layout Desteği**: EJS, şablonlar arasında parçalama ve yeniden kullanma işlemlerini destekler. Layout'lar oluşturup, çeşitli şablonları bu ana yapıya dahil edebilirsiniz.

### EJS Nasıl Kullanılır?
EJS'yi Node.js projenize şu şekilde dahil edebilirsiniz:

1. **EJS'yi Projeye Eklemek**:
   ```bash
   npm install ejs
   ```

2. **Express.js ile Kullanımı**:
   Express.js uygulamasında EJS şablon motorunu şu şekilde ayarlayabilirsiniz:
   ```javascript
   const express = require('express');
   const app = express();

   app.set('view engine', 'ejs');

   app.get('/', (req, res) => {
     res.render('index', { title: 'Ana Sayfa' });
   });

   app.listen(3000);
   ```

3. **EJS Dosyası Oluşturma**:
   `views/index.ejs` dosyasında şablon yapısı oluşturabilirsiniz:
   ```ejs
   <h1><%= title %></h1>
   <p>Bu, dinamik olarak oluşturulan bir sayfadır.</p>
   ```

### EJS Kullanmanın Avantajları:
- **Basit ve Öğrenmesi Kolay**: HTML ile iç içe geçmiş JavaScript kodu, özellikle önceden HTML ve JavaScript bilen geliştiriciler için kullanımı kolaydır.
- **Hafif ve Performanslı**: Fazla ek kütüphanelere ihtiyaç duymadan, doğrudan HTML içine dinamik içerik eklemek mümkün olur.
- **Node.js ile Entegre**: Express.js gibi popüler Node.js çerçeveleriyle mükemmel bir şekilde entegre olabilir.

EJS, basit dinamik HTML içerik oluşturma ihtiyacı olan projelerde oldukça kullanışlıdır ve Node.js uygulamalarıyla yaygın bir şekilde kullanılır.

---

## Morgan Log
```sh

npm install morgan
npm install -g morgan

**Morgan**; Node.js uygulamalarında HTTP isteklerini loglamak için kullanılan bir **middleware** kütüphanesidir. 
Express.js ile birlikte çalışarak her bir gelen HTTP isteği ve sunucudan dönen yanıtı loglayarak, uygulama geliştiricisinin sunucu işlemlerini takip etmesini sağlar. 
Bu loglar sayesinde, isteklerin durumu, yanıt kodları, yanıt süreleri gibi bilgiler kolayca izlenebilir ve hata ayıklama süreci hızlanır.

### Morgan'ın Temel Özellikleri:
1. **HTTP İsteklerini İzleme**: Gelen istekler (GET, POST, PUT, DELETE vb.) hakkında bilgi toplar ve bunu geliştiriciye log olarak sunar.
2. **Log Formatları**: Morgan, isteklere ait bilgileri çeşitli formatlarda loglayabilir (`combined`, `dev`, `short`, `common` gibi).
3. **Geliştirme ve Üretim Ortamlarında Kullanım**: `dev` gibi kısa ve öz log formatları, geliştirme sırasında hızlı bilgi sağlar. `combined` gibi daha ayrıntılı formatlar ise üretim ortamında detaylı takip için uygundur.
4. **Logların Dosyaya Yazdırılması**: Morgan logları, konsol yerine bir dosyaya yönlendirilebilir, böylece uygulamanın işlem geçmişi saklanabilir.
5. **Kolay Entegrasyon**: Express.js uygulamalarına sadece birkaç satır kodla eklenir ve kullanımı basittir.

### Kullanım Senaryoları:
- **Hata Ayıklama**: HTTP isteklerinin durum kodlarını ve yanıt sürelerini izleyerek performans sorunlarını ve hataları tespit etmek.
- **Geliştirme Süreci**: Uygulamanın nasıl çalıştığını izlemek ve istek yanıt döngüsünü takip etmek.
- **Log Tutma**: Üretim ortamında kullanıcı hareketlerini ve sunucunun yanıt verme sürecini kaydetmek.

### Örnek Kullanım:
```javascript
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('combined')); // Detaylı log formatı

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


Bu kod ile gelen her istek, Morgan tarafından loglanır ve geliştiriciye daha fazla kontrol ve görünürlük sağlar.

### Neden Morgan Kullanılır?
- **Kolay hata ayıklama**: Sunucu loglarını izleyerek, uygulamada oluşan hataları tespit etmek kolaylaşır.
- **Performans izleme**: Yanıt sürelerini gözlemleyerek performans sorunlarını belirleme.
- **Uygulama güvenliği**: Kötü niyetli istekleri veya anormal davranışları loglar üzerinden tespit etmek mümkündür.

Morgan, Express.js gibi popüler Node.js çerçeveleri ile loglama işlemlerini basit ve verimli hale getirir.

---


## Swagger
```sh
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SWAGGER
// http://localhost:1111/api-docs
/*

API'lerinizi daha iyi yönetmek ve test etmek için swagger kullanabilirsiniz.

npm install swagger-jsdoc swagger-ui-express

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger ayarları
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Blog API",
      description: "Blog API yönetimi için dökümantasyon",
      contact: {
        name: "Developer"
      },
      servers: ["http://localhost:5555"]
    }
  },
  apis: ["index.js", "./routes/*.js"], // API tanımları için dosyaları belirtin
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

*/

// Authorize Geliyor
/*
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "Blog API",
        description: "Blog API yönetimi için dökümantasyon",
        contact: {
          name: "Developer"
        },
        servers: ["http://localhost:1111"]
      }
    },
    apis: ["index.js", "./routes/blog_api_routes.js"], // API tanımları için dosyaları belirtin
    //apis: ["index.js", "./routes/*.js"], // API tanımları için dosyaları belirtin
  };
*/
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      description:
        "Blog API yönetimi için dökümantasyon Author: Yüksek Bilgisayar Mühendisi Hamit Mızrak",
        version: "1.0.0",
      contact: {
        name: "Developer",
      },
      servers: [
        {
            url:"http://localhost:1111",
        },
    ],
    // Bearer authentication istemiyorsak securtiy kapat
    },
  },
  apis: ["index.js", "./routes/blog_api_routes.js"], // API tanımları için dosyaları belirtin
  //apis: ["index.js", "./routes/*.js"], // API tanımları için dosyaları belirtin
};

/*
Dikkat: No operations defined in spec! Swagger dokümasntasyonları API rotalarını işlemleri doğru yazdık
API dosyamızın blog_api.routes.js , Swagger taglarini (JSDoc) olmadığı için 

LIST
/**
 * @swagger
 * /blog:
 *   get:
 *     summary: Get all blogs
 *     description: Retrieves a list of all blogs
 *     responses:
 *       200:
 *         description: Successfully retrieved list of blogs
 */
 
POST
/*
 * @swagger
 * /blog:
 *   post:
 *     summary: Create a new blog
 *     description: Adds a new blog to the collection
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               header:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *               tags:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created new blog
 */

/**
 * @swagger
 * /blog/{id}:
 *   put:
 *     summary: Bir blog yazısını güncelle
 *     description: Verilen id ile bir blog yazısını MongoDB üzerinde günceller.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Güncellenecek blog yazısının id'si.
 *         schema:
 *           type: string
 *       - in: body
 *         name: Blog
 *         description: Güncellenecek blog verileri.
 *         schema:
 *           type: object
 *           required:
 *             - header
 *             - content
 *             - author
 *             - tags
 *           properties:
 *             header:
 *               type: string
 *               example: "Yeni Blog Başlığı"
 *             content:
 *               type: string
 *               example: "Bu blog yazısının içeriği güncellenmiştir."
 *             author:
 *               type: string
 *               example: "Hamit Mızrak"
 *             tags:
 *               type: string
 *               example: "nodejs, mongodb, update"
 *     responses:
 *       200:
 *         description: Güncellenmiş blog verisi döndürülür.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Güncelleme sırasında hata oluştu.
 */
 
 /**
 * @swagger
 * /blog/{id}:
 *   delete:
 *     summary: Bir blog yazısını sil
 *     description: Verilen id ile bir blog yazısını MongoDB üzerinden siler.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Silinecek blog yazısının id'si.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Silme işlemi başarılı olduğunda mesaj döner.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "1 nolu id silindi"
 *       400:
 *         description: Silme işlemi sırasında hata oluştu.
 */

const swaggerDocs = swaggerJsDoc(swaggerOptions);
// http://localhost:1111/api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

```
---


## Npm Nedir
```sh
`winston` logger'ı, uygulamanızda hata ve bilgi loglarını düzgün bir şekilde yönetmek için kullanılır. Bu kodu genellikle uygulamanızın **`index.js`** veya **`server.js`** gibi ana giriş dosyasına eklemeniz gerekir. Logger, uygulamanızın başlangıcından itibaren tüm hataları ve bilgileri loglar.

### 1. **Kurulum:**
Öncelikle `winston` kütüphanesini yüklemeniz gerekiyor. Terminalde şu komutu çalıştırarak yükleyebilirsiniz:
```bash
npm install winston
```

### Winston
### 1. **Install**
npm install winston

### 2. **index.js veya server.js Dosyasına Ekleme:**
Logger kodunu projenizin başlangıç dosyasına ekleyin. Genellikle bu dosya `index.js` veya `server.js` olur. Aşağıdaki örnekte, `winston` logger kodu, `index.js` dosyasına eklenmiştir:

```javascript => index.js
const express = require("express");
const mongoose = require("mongoose");
const winston = require("winston"); // Winston logger'ı ekle

const app = express();

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
// Logger kullanımı
logger.info("Sunucu başlatılıyor...");

// MongoDB bağlantısı örneği
mongoose
  .connect("mongodb://localhost:27017/mydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("MongoDB bağlantısı başarılı.");
  })
  .catch((err) => {
    logger.error("MongoDB bağlantı hatası:", err);
  });

// Sunucu başlatma
const port = 3000;
app.listen(port, () => {
  logger.info(`Sunucu ${port} portunda çalışıyor.`);
});
```

### 3. **Winston Logger'ın Kullanımı:**
Yukarıdaki kodda `logger.info()` ve `logger.error()` kullanarak bilgi ve hata loglarını yönetebilirsiniz. Örneğin:

- `logger.info("Sunucu başlatıldı")`: Bilgi mesajlarını loglar.
- `logger.error("Bir hata oluştu")`: Hata mesajlarını loglar.

Bu loglar:
- `error.log`: Sadece hata seviyesindeki logları içerir.
- `combined.log`: Tüm logları içerir.

### 4. **Log Dosyalarını Kontrol Etme:**
- `error.log` ve `combined.log` dosyaları, çalıştırdığınız dizinde otomatik olarak oluşturulur.
- Uygulamanız çalışırken bu dosyalara logların yazıldığını göreceksiniz.

Logger'ı hatalar, bilgi mesajları veya özel olaylar için kullanabilirsiniz.
```
---

