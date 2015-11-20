export interface Action {
  type: Function;
  payload: any;
}

class OpenMenu implements Action {
  type = OpenMenu;
  payload: any = null;
}

class SelectColorScheme implements Action {
  type = SelectColorScheme;
  payload = "apple";
  constructor (selection: string) {
    this.payload = selection;
  }
}
export { OpenMenu, SelectColorScheme }
