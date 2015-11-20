describe("Dispatcher", function() {

  class Dispatcher {
    private stores = {};

    static new () {
      return new Dispatcher();
    }
    dispatch (action: any) {
      var stores = this.stores;
      Object.keys(stores).forEach(function (key){
        var store: {dispatch: (action: any) => any} = stores[key];
        store.dispatch(action);
      });
      return this;
    }
    register_store (name: string, store: {dispatch: (action: any) => any}) {
      this.stores[name] = store;
      return this;
    }

  }
  var actions1: Array<any> = [];
  var actions2: Array<any> = [];
  var store1 = {dispatch: (action: any) => actions1.push(action)};
  var store2 = {dispatch: (action: any) => actions2.push(action)};

  it("should call all stores with the action", function () {
    var dispatcher = Dispatcher.new();
    dispatcher.register_store("store1", store1);
    dispatcher.register_store("store2", store2);
    var action = {type: "FAKE_ACTION"};
    dispatcher.dispatch(action);
    expect(actions1[0]).toBe(action);
    expect(actions2[0]).toBe(action);
  });
});
