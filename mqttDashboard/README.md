# Come vedere le versioni dei pacchetti

`npm ls --depth=0`

# Per installare i pacchetti presenti nel file `package.json`

`npm i`

# PEr avviare in dev l'app

`ng serve`

# Per aggiungere Boostrap e ngx-boostrap

`ng add ngx-bootstrap`
`npm install jquery --save`
`npm install popper.js --save`

# Aggiungere ngx-pipes

`npm install ngx-pipes --save`

# Aggiungere ngx-translate

`npm install @ngx-translate/core --save`
`npm install @ngx-translate/http-loader --save`

# Aggiungere ngx-moment

`npm install --save moment ngx-moment`

# Aggiungere date-fns

`npm install date-fns --save`

# Aggiungere ngx-toastr

`npm install ngx-toastr --save`

# Aggiungere lodash

`npm install lodash --save`

# Aggiungere oidc-client

`npm install oidc-client --save`

# Aggiungere ngx-datatable

`npm install @swimlane/ngx-datatable --save`

# Aggiungere i componenti per gestire lo store

`npm install @ngrx/effects --save`
`npm install @ngrx/store --save`
`npm install @ngrx/router-store --save`
`npm install @ngrx/store-devtools --save` da metter poi nella parte DEV del package.json
`npm install ngrx-store-logger --save` da metter poi nella parte DEV del package.json

# Aggiungere le icone di Fontawesome

`npm install @fortawesome/angular-fontawesome --save`
`npm install @fortawesome/fontawesome-svg-core --save`
`npm install @fortawesome/free-solid-svg-icons --save`

# Per aggiungere una pagina

`ng g component core/pages/WelcomePage`

# Per lanciare in locale la configurazione di DEV

`ng serve`

# Per lanciare in locale la configurazione di TEST

`ng serve --configuration=test`

# Per lanciare in locale la configurazione di PROD

`ng serve --configuration=production`

# Per buildare in TEST

`ng build --prod --aot --configuration=test --base-href /cartella-server/`

# Per buildare in PROD

`ng build --prod --aot --configuration=production --base-href /cartella-server/` 
