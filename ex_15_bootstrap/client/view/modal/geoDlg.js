import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './geoDlg.html'

const cityHall = {y:37.5666805, x:126.9784147}

let __templete = Template.geoDlg;

__templete.onCreated(function () {

  this._textTitle = new ReactiveVar()
  this._items = new ReactiveVar()
  this._position = new ReactiveVar( )

})

__templete.onRendered(function () {

  let map = new naver.maps.Map('mapGeoDlg', {
    zoom: 10
  });

  //마커객체
  let marker = new naver.maps.Marker({
    map: map,
    title : this._textTitle.get(),
  });
  marker.setDraggable(true)
  //마커 클릭 이밴트
  naver.maps.Event.addListener(marker, "dragend", (e)=> {

    this._position.set(e.coord)
    this.firstNode.querySelector('#address-input').value = ''
  });

  this.$('[role="dialog"]').on('shown.bs.modal',  (e)=> {
    // do something...
    console.log('shown dlg')

    //멥 재생성
    map = new naver.maps.Map('mapGeoDlg', {
      zoom: 10
    });

    naver.maps.Event.addListener(map, "click", (e)=> {
      this._position.set(e.coord)
      this.firstNode.querySelector('#address-input').value = ''
    });

  })

  //콤포넌트 등록
  dlgCompoCore.geoDlg = (function ({titleText,items,completeCallback}) {


    console.log(items);

    this._textTitle.set(titleText);
    this._items.set(items);


    this.$('[role="dialog"]').modal("show");


    marker.setMap(null)

    if(completeCallback) {
      this._onCompleteCallback = completeCallback;
    }
    else {
      this._onCompleteCallback = function () {
      }
    }
  }).bind(this)

  this._position.set(cityHall) //서울시청

  Tracker.autorun(()=> {

    //멥 재생성
    // map = new naver.maps.Map('mapGeoDlg', {
    //   zoom: 10
    // });

    let _curPos = new naver.maps.LatLng(this._position.get().y, this._position.get().x)

    map.setCenter(_curPos)
    marker.setMap(map)
    marker.setPosition(_curPos)

    theApp.gps.searchCoordinateToAddress(
      {
        latlng : _curPos,
        callback :  (res)=> {
          console.log(res)
          if(res.err) {
            console.log(res.err)
          }
          else {
            res.result.items.forEach( function (item) {
              item.point = naver.maps.TransCoord.fromTM128ToLatLng(item.point)
            })
            this._items.set(res.result.items)
          }
        }
      }
    )




    console.log('mapGeoDlg change')

  })


})

__templete.events({
  "click #addrlist li"(evt,instance) {

    console.log(this);

    // console.log(instace.$('#address-input'));
    instance.$('#address-input').val(this.address)

    instance._position.set(this.point);

  },
  "click .okbtn"(evt,instance) {

    instance._onCompleteCallback({
      position : instance._position.get(),
      address : instance.$('#address-input').val()
    })

    instance.$('#address-input').val('')
    instance._position.set({y:37.5666805, x:126.9784147}) //서울시청

  }

})

__templete.helpers({
  "textTitle"() {
    return Template.instance()._textTitle.get();
  },
  "items"() {
    console.log(Template.instance()._items.get())
    return Template.instance()._items.get();
  }
})
