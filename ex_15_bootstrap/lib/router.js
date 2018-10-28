FlowRouter.route('/', {
  name:'main',
  action: function () {
    BlazeLayout.render('layout',
      {
        layout : "main"
      });
  }
});


FlowRouter.route('/inputSample', {
  name:'inputSample',
  action: function () {
    BlazeLayout.render('layout',
      {
        layout : "inputSample"
      });
  }
});


FlowRouter.route('/gridSample', {
  name:'gridSample',
  action: function () {
    BlazeLayout.render('layout',
      {
        layout : "gridSample"
      });
  }
});



