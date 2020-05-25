'use babel';

import Foodtasker02 from '../lib/foodtasker02';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Foodtasker02', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('foodtasker02');
  });

  describe('when the foodtasker02:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.foodtasker02')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'foodtasker02:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.foodtasker02')).toExist();

        let foodtasker02Element = workspaceElement.querySelector('.foodtasker02');
        expect(foodtasker02Element).toExist();

        let foodtasker02Panel = atom.workspace.panelForItem(foodtasker02Element);
        expect(foodtasker02Panel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'foodtasker02:toggle');
        expect(foodtasker02Panel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.foodtasker02')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'foodtasker02:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let foodtasker02Element = workspaceElement.querySelector('.foodtasker02');
        expect(foodtasker02Element).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'foodtasker02:toggle');
        expect(foodtasker02Element).not.toBeVisible();
      });
    });
  });
});
