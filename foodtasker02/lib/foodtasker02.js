'use babel';

import Foodtasker02View from './foodtasker02-view';
import { CompositeDisposable } from 'atom';

export default {

  foodtasker02View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.foodtasker02View = new Foodtasker02View(state.foodtasker02ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.foodtasker02View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'foodtasker02:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.foodtasker02View.destroy();
  },

  serialize() {
    return {
      foodtasker02ViewState: this.foodtasker02View.serialize()
    };
  },

  toggle() {
    console.log('Foodtasker02 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
