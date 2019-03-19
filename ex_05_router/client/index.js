import './index.html'

Template.index.events({
  "click #btn-go-test"() {

    let path = FlowRouter.path("detail", {id:"any"}, {
      param1 : "heloo",
      param2 : {p1:1,p2:"world"}
    })
    console.log(path)
    FlowRouter.go(path);
  }
});