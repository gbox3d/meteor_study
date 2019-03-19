import './detail.html'
Template.detail.onCreated(function () {
  console.log(FlowRouter.current())
})

Template.detail.helpers({
  "queryParams"(){
    return FlowRouter.current().queryParams;
  },
  "Params"() {
    return FlowRouter.current().params;
  }

});