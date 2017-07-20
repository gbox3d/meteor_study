FlowRouter.route('/', {
  name:'index',
  action: function () {
    BlazeLayout.render('layout',{
      layout : "index"
    });
  }
});

FlowRouter.route('/detail', {
  name:'detail',
  action: function () {
    BlazeLayout.render('layout',{
      layout : "detail"
    });
  }
});

FlowRouter.route('/detail/:id', {
  name:'detail',
  action: function () {
    BlazeLayout.render('layout',{
      layout : "detail"
    });
  }
});

//http://localhost:3000/detail/any/thing
//FlowRouter.getParam("id") -> any
//FlowRouter.getParam("row") -> thing
FlowRouter.route('/detail/:id/:row', {
  name:'detail',
  action: function () {
    BlazeLayout.render('layout',{
      layout : "detail"
    });
  }
});


FlowRouter.route('/master', {
  name:'master',
  action: function () {
    BlazeLayout.render('layout',{
      layout : "master"
    });
  }
});
