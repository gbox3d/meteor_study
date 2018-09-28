import './view1.html'
import {Template} from "meteor/templating";

let __templete = Template.view1

__templete.events({
  "click #btn-test" : function (evt,instance) {

    //id 는 중복일경우 찾지못한다.
    console.log( instance.find('.act-test').innerText  )
    //console.log( instance.find('#test').innerText  )

  }
})