import './master.html'

Template.master.events({
  "click #btn-js-go"(evt,instance) {
    FlowRouter.go('/');
  }
})