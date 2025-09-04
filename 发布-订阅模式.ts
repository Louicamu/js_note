class EventBus {
  private events: {
    [key: string]: Array<{ fn: Function; isOnce: boolean }>;
  };
  constructor() {
    this.events = {};
  }
  on(type: string, fn: Function, isOnce: boolean = false) {
    const events = this.events;
    if (events[type] == null) {
      events[type] = [];
    }
    events[type].push({ fn, isOnce });
  }
  once(type: string, fn: Function) {
    this.on(type, fn, true);
  }
  off(type: string, fn?: Function) {
    if (!fn) {
      this.events[type] = [];
    } else {
      const typeFnList = this.events[type];
      if (typeFnList) {
        this.events[type] = typeFnList.filter((typeFn) => typeFn.fn !== fn);
      }
    }
  }
  emit(type: string, ...args: any[]) {
    const typeFnList = this.events[type];
    if (typeFnList == null) return;
    this.events[type] = typeFnList.filter((typeFn) => {
      const { fn, isOnce } = typeFn;
      fn(...args);
      if (!isOnce) return true;
      else return false;
    });
  }
}
