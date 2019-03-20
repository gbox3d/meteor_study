## 라우터 사용하기

라우터는 url에서 / 로 구분하는 단위이다. 도메인을 지정하는 것과 비슷하다.

형식은 다음과같다  
특정주소/라우터1/라우터2

예>  

```url
http://localhost:3000/master
```

위의 내용은 'master' 라는 이름의 라우터를 사용한 예이다.


플로우라우터 사용하려면 두가지 패키지가 필요하다.

```shell 
meteor add kadira:flow-router
meteor add kadira:blaze-layout

``` 


라우터 탬플릿을 정의한다. layout.html 은 아래와 같다.
```html
<template name="layout">
  {{> header}}
  {{> Template.dynamic template=layout}}
  {{> footer}}
</template>
```
위 예제에서는 레이아웃에 header footer 탬플릿을 추가 하였다. 
FlowRouter.route 함수로 정의한 내용은 {{>Template.dynamic ..} 에 적용된다.  
따라서 라우터를 사용할때는 router.js 파일에서 layout이라고 정한 템플릿이 가장 첫 화면을 구성하는 요소이다. 

lib/router.js 파일에서 라우터를 지정한다.

```js
FlowRouter.route('/', {
  name:'index',
  action: function () {
    BlazeLayout.render('layout',{
      layout : "index"
    });
  }
});

```

위코드의 의미는 라우터 '/' 는 이름이 index 이고 layout 템플릿에 랜더링하는데 index 탬플릿이 사용된다는 뜻이다.
index 탬플릿은 index.html 에 다음과 같이 정의 되어있다.

```html
<template name="index">
  <a href="/master">master</a>
  <a href="/detail">detail</a>
  <button id="btn-go-test"> go param test </button>
</template>
```

go 함수로 원하는 페이지로 이동한다.  
```js
FlowRouter.go('/');

```

파라메터 전당은 다음과 같이 할수있다.  
```js
let path = FlowRouter.path("detail", {id:"any"}, {
      param1 : "heloo",
      param2 : {p1:1,p2:"world"}
    })
    
    FlowRouter.go(path)
```

전달된 파라메터는 current로 받아볼수있다.
```js

Template.detail.helpers({
  "queryParams"(){
    return FlowRouter.current().queryParams;
  },
  "Params"() {
    return FlowRouter.current().params;
  }

})
```


