##트랙커 예제

이 예제는 미티어의 트랙커 시스템에 대하여 알아보는 예제이다.  
트랙커는 리액트브변수가 변할때마다 콜백되는 시스템이다.

```js
//모든 리액티브 값들이 변화(set 호출)가 생기면 트랙커가 발동한다.(autorun 함수 호출)
  Tracker.autorun(()=> {

    //리액티브 변수값 확인
    console.log('tracker run ' + this.className.get())

    //리스트를 갱신하기 위하여 서버측의 publish 함수 다시 호출
    // 다시 구독하면( subscribe 재호출 ) 서버측의 publish 가 다시 호출된다.
    this.subscribe('msgLog/list',this.className.get())

  })
```

동물과 꽃 목록중에서 처음에는 전체를 다보여주고 버튼을 눌러 선택하면 선택한 목록만 다시 보여주는 예제이다.