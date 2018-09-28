import './view2.html'
import {Template} from "meteor/templating";

let __templete = Template.view2

__templete.events({
  "click #btn-test" : function (evt,instance) {

    //id 는 중복일경우 찾는 것이 불가능하다. class 는 중복이여도 해당 템플릿내에서 찾아진다.
    //instance.firstNode.querySelector 를 사용하면 id가 중복이여도 가능하다.
    console.log( instance.find('.act-test').innerText  )
    //console.log( instance.find('#test').innerText  )

  }
})