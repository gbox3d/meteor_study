boostrap
========

라우터를 위한 모듈 설치 
```shell 
meteor add kadira:flow-router
meteor add kadira:blaze-layout

``` 

bootstrap 설치를 위한 사전 작업
```shell 
meteor remove less
meteor remove standard-minifier-css
meteor add fourseven:scss
meteor add seba:minifiers-autoprefixer
```

부트스트랩 설치 
```
 meteor npm install bootstrap --save
```

client 측에( /client/main.scss ) main.scss 생하고 다음과 같이 작성

```scss
@import "{}/node_modules/bootstrap/scss/bootstrap.scss";

```

main.js 에서 모듈 임포팅  
```js
require('bootstrap')
```

##참고 자료 

https://medium.com/@g1zmo/bootstrap-4-and-meteor-js-4cec073a4f6c


