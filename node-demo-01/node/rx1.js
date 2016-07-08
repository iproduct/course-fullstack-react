const Rx = require('rxjs');

Rx.Observable.from(["Reactive", "Extensions", "JavaScript"])
   .take(2).map(s => s + " : on " + new Date())
   .subscribe(s => console.log(s));