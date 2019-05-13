## npm 모듈 사용하기 

### 1. 부트스트랩을 npm으로 설치하여 미티어에서 사용해보기

1) 부트스트랩 설치
```bash
npm install bootstrap
```

2) 필요 모듈 설치

```bash
meteor add fourseven:scss
meteor npm install --save jquery 

```
위와같이 scss 번역기와 jquery 설치 해준다.  

3) 코드 삽입

main.scss 를 만들고 맨위에 아래 코드를 넣는다.  
```css
@import '{}/node_modules/bootstrap/scss/bootstrap';

```

main.js 에 아래 코드 삽입 
```js
import 'bootstrap/dist/js/bootstrap.bundle';

```

### 2. async 사용하기

npm 설치  
```bash
meteor npm install async
```

모듈 불러오기
```js
const async = require('async')
//또는 
import async from 'async'

```




### 참고  
미디어 문서   
https://guide.meteor.com/using-npm-packages.html

부트스트랩 연동하기질문  
https://forums.meteor.com/t/how-to-add-bootstrap-4-in-meteor-blaze/42208  

