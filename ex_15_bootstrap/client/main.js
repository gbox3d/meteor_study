import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

import './layout.html'
import '../lib/router'

import './view/grid/core'
import './view/input/core'
import './view/modal/core'

let _templete = Template.main

_templete.events(
  {
    "click .go-gridSample"(evt,instance) {
      FlowRouter.go('/gridSample')
    },
    "click .go-inputSample"(evt,instance) {
      FlowRouter.go('/inputSample')
    },
    "click .go-modalSample"(evt,instance) {
      FlowRouter.go('/modalSample')
    }
  }
)
