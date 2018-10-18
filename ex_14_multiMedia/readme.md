## multi media access

이 예제는 html5에서 지원하는 멀디미티어를 사용하는 예제이다.  
멀티미디어 파일을 접근하기위한 경로는 projectRoot/public 폴더 기준이다. 이 폴더에 모든 리소스 파일을 모아 놓는다.  
미티어에서 public/sounds/hit1.wav 에 접근하려면 './sounds/hit1.wav' 로 파일에 직접 접근할 수 있다.  

```js
this.bufferLoader = new BufferLoader(this.context, [
        './sounds/katusha.mp3', './sounds/hit1.wav'],
       (_bufferList)=> {//로딩이 모두 완료 되면...
        this.msg.set( 'load ok' );
        // Create two sources and play them both together.
        this.bufferList = _bufferList;
      }
    );
this.bufferLoader.load();

```

