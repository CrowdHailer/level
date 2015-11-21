import * as Action from "./actions.ts";
import Gator from "./gator.js";

class UserInput {
  $root: any;
  constructor (element: any, actions: {dispatch: any}) {
    this.$root = element;
    var events = Gator(element, null);
    events.on("click", "[data-hook~=open-menu]", function (e: any) {
      e.preventDefault();
      var action = new Action.OpenMenu();
      actions.dispatch(action);
    });
    events.on("click", "[data-hook~=select-color-scheme]", function (e: any) {
      e.preventDefault();
      var action = new Action.SelectColorScheme("blueberry");
      actions.dispatch(action);
    });
  }
}

export default UserInput;
