router = {
  path: new ReactiveVar()
};

Meteor.startup(function () {
  router.path.set("page1")

});

Template.main.helpers({
  'checkPage_page1' : function () {
    return router.path.get() === "page1";
  },
  'checkPage_page2' : function () {
    return router.path.get() === "page2";
  },
  'output_msg': function () {
    return 'hello blaze';

  }
});

Template.main.events(
  {
    "click .btn-test-1" : function (ev) {
      router.path.set("page2")

    },
    "click .btn-test-2" : function (ev) {
      router.path.set("page1")

    }
  }
);