## 라우터 사용하기

플로우라우터 설치
```shell 
meteor add kadira:flow-router

``` 

lib/router.js 파일에서부터 시작된다.

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

위코드의 의미는 라우터 / 는 이름이 index 이고 layout 템플릿에 랜더링하는데 index 탬플릿이 사용된다는 뜻이다.

```html
<template name="layout">
  {{> header}}
  {{> Template.dynamic template=layout}}
  {{> footer}}
</template>
```

layout.html 파일의 내용이다. FlowRouter.route 함수로 정의한 내용은 {{>Template.dynamic ..} 에 적용된다.
따라서 라우터를 사용할때는 router.js 파일에서 layout이라고 정한 템플릿이 가장 첫 화면을 구성하는 요소이다. 