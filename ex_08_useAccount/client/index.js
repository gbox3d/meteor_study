import "./index.html"



Meteor.startup(function () {
    console.log('start app');

    if(Meteor.userId()) {
        //현제 로그인된 사용자 아이디
        console.log(Meteor.userId())
    }
    else {
        console.log('user not login')
    }


    //네트웍에서 로그인 데이터를 모두 받으면...
    Meteor.users.find().observeChanges({
        added(id,fileds) {
            console.log(Meteor.user())
        },
        changed(id,fileds) {
            console.log(id,fileds)
        }
    })

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
    "submit [name=edit-user]"(evt,instance) {
        evt.preventDefault()

        console.log(evt.target.email.value)

        Meteor.call("edit/user", {
            name : evt.target.name.value,
            email : evt.target.email.value
        }, (err,_)=> {
            if(err) console.log(err)
            else {
                console.log(_)
            }
        })

    },
    "click form[name=edit-user] [name=logout]"(evt,instance) {
        evt.preventDefault()
        Meteor.logout()
    },
    "click [name=subscribe-userdata]"(evt,instance) {
        //자신의 데이터 구독하기
        instance.subscribe("users/userData")

    }
})
