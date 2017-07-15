test_list = [{name:'alpha'},{name:'beta'}];

Template.main.helpers({
  'output_msg': function () {
    return 'hello blaze';

  },
  'mylist' : function () {
    return test_list;

  }
});
