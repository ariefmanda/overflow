## OVERFLOW-SIMPLE

### TREE

```
├── client
|  ├── package.json
|  ├── public
|  |  ├── favicon.ico
|  |  ├── img
|  |  |  └── icons
|  |  ├── index.html
|  |  └── manifest.json
|  ├── src
|  |  ├── App.vue
|  |  ├── assets
|  |  |  └── logo.png
|  |  ├── components
|  |  |  ├── Footer.vue
|  |  |  ├── Header.vue
|  |  |  └── HeaderAdmin.vue
|  |  ├── main.js
|  |  ├── registerServiceWorker.js
|  |  ├── router.js
|  |  ├── store.js
|  |  └── views
|  |     ├── Admin.vue
|  |     ├── Dash.vue
|  |     ├── Home.vue
|  |     ├── Jumbotron.vue
|  |     └── Question.vue
|  ├── test
|  |  └── unit
|  |     └── HelloWorld.spec.js
|  └── yarn.lock
└── server
   ├── app.js
   ├── bin
   |  └── www
   ├── controllers
   |  ├── answer.js
   |  ├── auth.js
   |  ├── category.js
   |  └── question.js
   ├── middleware
   |  ├── authentication.js
   |  ├── authorization.js
   |  └── facebook.js
   ├── models
   |  ├── answer.js
   |  ├── category.js
   |  ├── question.js
   |  └── user.js
   ├── package.json
   ├── public
   |  ├── images
   |  ├── javascripts
   |  └── stylesheets
   |     └── style.css
   ├── routes
   |  ├── answer.js
   |  ├── api.js
   |  ├── auth.js
   |  ├── category.js
   |  ├── index.js
   |  └── question.js
   ├── views
   |  ├── error.jade
   |  ├── index.jade
   |  └── layout.jade
   └── yarn.lock

directory: 2326 file: 6920 
```
### ROUTE
#### CLIENT

BaseURL : overflow.feedomain.tk

| Router 	                | Description |
|-----------------------    |:----:|
|/          |Jumbotron Halaman Utama  | 
|/category          |Menampilkan semua category dan Question dengan fitur category per topik dan search serta di sort berdasarkan point terbanyak |
|/category/:id          |Menampilkan Category per Id Params yang diinginkan  |
|/question/:id          |Menampilkan pertanyaan yang dipilih serta jawaban dari pertanyaan dengan fitur sort dari point yang terbanyak (tidak bisa menambahkan point dirinya sendiri)   |
|/admin          |menampilkan halaman admin dengan menghapus user dan question>>>answer  |  

#### ADMIN

BaseURL : feedomain.tk:3004 <br>
Kue-UI	: feedomain.tk:6363

| Router 	                | HTTP | Description       |
|-----------------------    |:----:|-------------------|
|/api/auth          |GET  | auth signin      |

List of answer route:

| Router                     | HTTP | Description       |
|-----------------------    |:----:|-------------------|
|/api/answer          |GET  |     |
|/api/answer/:id          |GET  |     |
|/api/answer/point/:id          |PUT  |     |
|/api/answer/question/:id          |GET  |     |
|/api/answer          |POST  |     |
|/api/answer/:id          |PUT  |     |
|/api/answer/:id          |DELETE  |     |

List of CATEGORY route:

| Router                     | HTTP | Description       |
|-----------------------    |:----:|-------------------|
|/api/category          |GET  |      |
|/api/category/:id          |GET  |      |
|/api/category          |POST  |      |
|/api/category/:id          |PUT  |      |
|/api/category/:id          |DELETE  |      |

List of user route:

| Router                     | HTTP | Description       |
|-----------------------    |:----:|-------------------|
|/api/user          |GET  |      |
|/api/user          |POST  |      |
|/api/user/:id          |PUT  |      |
|/api/user/:id          |DELETE  |      |
|/api/user/:id          |PATCH  |      |

List of question route:

| Router                     | HTTP | Description       |
|-----------------------    |:----:|-------------------|
|/api/question          |GET  |     |
|/api/question/:id          |GET  |     |
|/api/question/point/:id          |PUT  |     |
|/api/question/category/:id          |GET  |     |
|/api/question          |POST  |     |
|/api/question/:id          |PUT  |     |
|/api/question/:id          |DELETE  |     |
|/api/question/:id         |PATCH |     |


### Usage

```
> git clone
> cd server/client
> npm install / yarn install
> npm run dev /yarn run dev 
```

