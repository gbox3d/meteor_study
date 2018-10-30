import './core.html'

import './msgDlg'
import './yesnoDlg'
import './geoDlg'
import {Template} from "meteor/templating";

global.dlgCompoCore = {

}

let _templete = Template.modalSample;

_templete.onCreated(function () {

  console.log('create modalSample templete')


})


_templete.events({
  "click .go-msg"(evt,instance) {

    dlgCompoCore.msgDlg({
      msgText : "메시지 입니다.",
      titleText : "타이틀입니다.",
      completeCallback : ()=> {
        console.log("콜백 호출")
      }
    })

  },
  "click .go-yesno"() {
    dlgCompoCore.yesnoDlg({
      msgText : "메시지 입니다.",
      titleText : "타이틀입니다.",
      completeCallback : ()=> {
        console.log("콜백 호출")
      }
    })
  }
})
