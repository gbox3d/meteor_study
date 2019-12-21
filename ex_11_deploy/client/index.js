Meteor.startup(function () {

    console.log('start up')

    console.log(Meteor.settings)

    document.querySelector('[name=test-text]').innerText = `${Meteor.settings.public.race} , ${Meteor.settings.public.class} `



})