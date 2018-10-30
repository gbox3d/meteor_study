import './yesnoDlg.html'
import {Template} from "meteor/templating";

Template.yesnoDlg.onCreated(function () {
  this._textMsg = new ReactiveVar();
  this._textTitle = new ReactiveVar();
});

Template.yesnoDlg.onRendered(function () {

  dlgCompoCore.yesnoDlg = (function ({titleText,msgText,completeCallback}) {
    this._textMsg.set(msgText);
    this._textTitle.set(titleText);
    this.$('#YesNoModal').modal("show");
    this._onCompleteCallback = completeCallback;
  }).bind(this)


})

Template.yesnoDlg.events({
  "click #btn-yes"(evt,instance) {
    instance._onCompleteCallback("yes")
  },
  "click #btn-no"(evt,instance) {
    instance._onCompleteCallback("no")
  }
});



Template.yesnoDlg.helpers({
  "textTitle"() {
    return Template.instance()._textTitle.get();
  },
  "textMsg"() {
    return Template.instance()._textMsg.get();
  }
});
