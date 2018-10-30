import './msgDlg.html'

Template.msgDlg.onCreated( function () {
  this._textMsg = new ReactiveVar();
  this._textTitle = new ReactiveVar();
});

//dlgCompo.Core.msgDlg("hello","info",console.log)

Template.msgDlg.onRendered( function () {

  console.log('msgDlg component added')

  //콤포넌트 등록
  dlgCompoCore.msgDlg = ( {msgText,titleText,completeCallback} ) => {

    this._textMsg.set(msgText);
    this._textTitle.set(titleText);

    //$ 은 jquery 객체를 반환한다.
    this.$('[role="dialog"]').modal("show");

    if(completeCallback) {
      this._onCompleteCallback = completeCallback;
    }
    else {
      this._onCompleteCallback = function () {}
    }
  }

});

Template.msgDlg.events({
  "click [type='button'].close"(evt,instance) {
    instance._onCompleteCallback("close")
  },
  "click [type='button'].btn"(evt,instance) {
    instance._onCompleteCallback("ok")
  }

});

Template.msgDlg.helpers({
  "textTitle"() {
    return Template.instance()._textTitle.get();
  },
  "textMsg"() {
    return Template.instance()._textMsg.get();
  }
});
