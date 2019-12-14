import "./index.html"
Meteor.startup(function () {
    console.log('start app');

});

Template.main.onCreated(function () {

    console.log(this)
    console.log('blaze templete createed')

});

Template.main.helpers({

});

Template.main.events({
    "submit [name=create-user]"(evt,instance) {
        evt.preventDefault()

        Meteor.call("users/createUser",
            {
                username : evt.target.id.value,
                password : evt.target.passwd.value,
                roles : [evt.target.roles.value]
            },
            (err,_)=> {

                if(err) {
                    console.log(err)
                    alert(err.message);
                }
                else {
                    console.log(_)
                    alert('ok')
                }

            }
        )

    },
    "submit [name=login-user]"(evt,instance) {

        evt.preventDefault()

        console.log(evt.target.id.value, evt.target.passwd.value)

        Meteor.loginWithPassword(
            evt.target.id.value, evt.target.passwd.value,
            function (err) {
                if(err) {
                    alert(err.reason);
                }
                else {
                    alert(`${Meteor.userId()} login `);
                }
            });
    },
    "click form[name=edit-user] [name=logout]"(evt,instance) {
        evt.preventDefault()
        Meteor.logout()

    }
})
