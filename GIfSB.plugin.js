/**
 * @name SpeechBubble
 * @version 1.0.0
 * @description Allows you to add a speech bubbles to discord gifs
 * @author DrEmoji
 * @authorId 486925088222871562
 * @website https://plague.vip
 */
module.exports = class {
  constructor() {
      const createCallbackHandler = (callbackName) => {
          const fullName = callbackName + "Callbacks";
          this[fullName] = [];
          return (callback, once, id) => {
              let object = { callback }

              const delCallback = () => {
                  this[fullName].splice(this[fullName].indexOf(object), 1);
              }

              if (once === true) {
                  object.callback = () => {
                      callback();
                      delCallback();
                  }
              }

              if(id) {
                  object.id = id

                  for(let i = 0; i < this[fullName].length; i++) {
                      if(this[fullName][i].id === id) {
                          this[fullName][i] = object;
                          return delCallback;
                      }
                  }
              }

              this[fullName].push(object);
              return delCallback;
          }
      }

      const onStart = createCallbackHandler("start");
      const onStop = createCallbackHandler("stop");
      const watchElement = (selector, callback) => {
          let observer = new MutationObserver((mutations) => {
              for (let mutation of mutations) {
                  if (mutation.addedNodes.length) {
                      for (let node of mutation.addedNodes) {
                          if (node.matches && node.matches(selector)) {
                              callback(node);
                          }

                          if (node.querySelectorAll) {
                              for (let element of node.querySelectorAll(selector)) {
                                  callback(element);
                              }
                          }
                      }
                  }
              }
          });

          let startDispose = onStart(() => {
              observer.observe(document.body, { childList: true, subtree: true });

              for(let element of document.querySelectorAll(selector)) {
                  callback(element);
              }
          });

          let stopDispose = onStop(() => {
              observer.disconnect();
          });

          return () => {
              observer.disconnect();
              startDispose();
              stopDispose();
          }
      }

'use strict';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
return n && n['default'] || n;
}

var domain;

function EventHandlers() {}
EventHandlers.prototype = Object.create(null);

function EventEmitter() {
EventEmitter.init.call(this);
}

EventEmitter.EventEmitter = EventEmitter;

EventEmitter.usingDomains = false;

EventEmitter.prototype.domain = undefined;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

EventEmitter.defaultMaxListeners = 10;

EventEmitter.init = function() {
this.domain = null;
if (EventEmitter.usingDomains) {

  if (domain.active ) ;
}

if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
  this._events = new EventHandlers();
  this._eventsCount = 0;
}

this._maxListeners = this._maxListeners || undefined;
};

EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
if (typeof n !== 'number' || n < 0 || isNaN(n))
  throw new TypeError('"n" argument must be a positive number');
this._maxListeners = n;
return this;
};

function $getMaxListeners(that) {
if (that._maxListeners === undefined)
  return EventEmitter.defaultMaxListeners;
return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
return $getMaxListeners(this);
};

function emitNone(handler, isFn, self) {
if (isFn)
  handler.call(self);
else {
  var len = handler.length;
  var listeners = arrayClone(handler, len);
  for (var i = 0; i < len; ++i)
    listeners[i].call(self);
}
}
function emitOne(handler, isFn, self, arg1) {
if (isFn)
  handler.call(self, arg1);
else {
  var len = handler.length;
  var listeners = arrayClone(handler, len);
  for (var i = 0; i < len; ++i)
    listeners[i].call(self, arg1);
}
}
function emitTwo(handler, isFn, self, arg1, arg2) {
if (isFn)
  handler.call(self, arg1, arg2);
else {
  var len = handler.length;
  var listeners = arrayClone(handler, len);
  for (var i = 0; i < len; ++i)
    listeners[i].call(self, arg1, arg2);
}
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
if (isFn)
  handler.call(self, arg1, arg2, arg3);
else {
  var len = handler.length;
  var listeners = arrayClone(handler, len);
  for (var i = 0; i < len; ++i)
    listeners[i].call(self, arg1, arg2, arg3);
}
}

function emitMany(handler, isFn, self, args) {
if (isFn)
  handler.apply(self, args);
else {
  var len = handler.length;
  var listeners = arrayClone(handler, len);
  for (var i = 0; i < len; ++i)
    listeners[i].apply(self, args);
}
}

EventEmitter.prototype.emit = function emit(type) {
var er, handler, len, args, i, events, domain;
var doError = (type === 'error');

events = this._events;
if (events)
  doError = (doError && events.error == null);
else if (!doError)
  return false;

domain = this.domain;

if (doError) {
  er = arguments[1];
  if (domain) {
    if (!er)
      er = new Error('Uncaught, unspecified "error" event');
    er.domainEmitter = this;
    er.domain = domain;
    er.domainThrown = false;
    domain.emit('error', er);
  } else if (er instanceof Error) {
    throw er; 
  } else {

    var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
    err.context = er;
    throw err;
  }
  return false;
}

handler = events[type];

if (!handler)
  return false;

var isFn = typeof handler === 'function';
len = arguments.length;
switch (len) {

  case 1:
    emitNone(handler, isFn, this);
    break;
  case 2:
    emitOne(handler, isFn, this, arguments[1]);
    break;
  case 3:
    emitTwo(handler, isFn, this, arguments[1], arguments[2]);
    break;
  case 4:
    emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
    break;

  default:
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];
    emitMany(handler, isFn, this, args);
}

return true;
};

function _addListener(target, type, listener, prepend) {
var m;
var events;
var existing;

if (typeof listener !== 'function')
  throw new TypeError('"listener" argument must be a function');

events = target._events;
if (!events) {
  events = target._events = new EventHandlers();
  target._eventsCount = 0;
} else {

  if (events.newListener) {
    target.emit('newListener', type,
                listener.listener ? listener.listener : listener);

    events = target._events;
  }
  existing = events[type];
}

if (!existing) {

  existing = events[type] = listener;
  ++target._eventsCount;
} else {
  if (typeof existing === 'function') {

    existing = events[type] = prepend ? [listener, existing] :
                                        [existing, listener];
  } else {

    if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }
  }

  if (!existing.warned) {
    m = $getMaxListeners(target);
    if (m && m > 0 && existing.length > m) {
      existing.warned = true;
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + type + ' listeners added. ' +
                          'Use emitter.setMaxListeners() to increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      emitWarning(w);
    }
  }
}

return target;
}
function emitWarning(e) {
typeof console.warn === 'function' ? console.warn(e) : console.log(e);
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
  function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  };

function _onceWrap(target, type, listener) {
var fired = false;
function g() {
  target.removeListener(type, g);
  if (!fired) {
    fired = true;
    listener.apply(target, arguments);
  }
}
g.listener = listener;
return g;
}

EventEmitter.prototype.once = function once(type, listener) {
if (typeof listener !== 'function')
  throw new TypeError('"listener" argument must be a function');
this.on(type, _onceWrap(this, type, listener));
return this;
};

EventEmitter.prototype.prependOnceListener =
  function prependOnceListener(type, listener) {
    if (typeof listener !== 'function')
      throw new TypeError('"listener" argument must be a function');
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  };

EventEmitter.prototype.removeListener =
  function removeListener(type, listener) {
    var list, events, position, i, originalListener;

    if (typeof listener !== 'function')
      throw new TypeError('"listener" argument must be a function');

    events = this._events;
    if (!events)
      return this;

    list = events[type];
    if (!list)
      return this;

    if (list === listener || (list.listener && list.listener === listener)) {
      if (--this._eventsCount === 0)
        this._events = new EventHandlers();
      else {
        delete events[type];
        if (events.removeListener)
          this.emit('removeListener', type, list.listener || listener);
      }
    } else if (typeof list !== 'function') {
      position = -1;

      for (i = list.length; i-- > 0;) {
        if (list[i] === listener ||
            (list[i].listener && list[i].listener === listener)) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      }

      if (position < 0)
        return this;

      if (list.length === 1) {
        list[0] = undefined;
        if (--this._eventsCount === 0) {
          this._events = new EventHandlers();
          return this;
        } else {
          delete events[type];
        }
      } else {
        spliceOne(list, position);
      }

      if (events.removeListener)
        this.emit('removeListener', type, originalListener || listener);
    }

    return this;
  };

EventEmitter.prototype.off = function(type, listener){
  return this.removeListener(type, listener);
};

EventEmitter.prototype.removeAllListeners =
  function removeAllListeners(type) {
    var listeners, events;

    events = this._events;
    if (!events)
      return this;

    if (!events.removeListener) {
      if (arguments.length === 0) {
        this._events = new EventHandlers();
        this._eventsCount = 0;
      } else if (events[type]) {
        if (--this._eventsCount === 0)
          this._events = new EventHandlers();
        else
          delete events[type];
      }
      return this;
    }

    if (arguments.length === 0) {
      var keys = Object.keys(events);
      for (var i = 0, key; i < keys.length; ++i) {
        key = keys[i];
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners('removeListener');
      this._events = new EventHandlers();
      this._eventsCount = 0;
      return this;
    }

    listeners = events[type];

    if (typeof listeners === 'function') {
      this.removeListener(type, listeners);
    } else if (listeners) {

      do {
        this.removeListener(type, listeners[listeners.length - 1]);
      } while (listeners[0]);
    }

    return this;
  };

EventEmitter.prototype.listeners = function listeners(type) {
var evlistener;
var ret;
var events = this._events;

if (!events)
  ret = [];
else {
  evlistener = events[type];
  if (!evlistener)
    ret = [];
  else if (typeof evlistener === 'function')
    ret = [evlistener.listener || evlistener];
  else
    ret = unwrapListeners(evlistener);
}

return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
if (typeof emitter.listenerCount === 'function') {
  return emitter.listenerCount(type);
} else {
  return listenerCount.call(emitter, type);
}
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
var events = this._events;

if (events) {
  var evlistener = events[type];

  if (typeof evlistener === 'function') {
    return 1;
  } else if (evlistener) {
    return evlistener.length;
  }
}

return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

function spliceOne(list, index) {
for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
  list[i] = list[k];
list.pop();
}

function arrayClone(arr, i) {
var copy = new Array(i);
while (i--)
  copy[i] = arr[i];
return copy;
}

function unwrapListeners(arr) {
var ret = new Array(arr.length);
for (var i = 0; i < ret.length; ++i) {
  ret[i] = arr[i].listener || arr[i];
}
return ret;
}

var _polyfillNode_events = Object.freeze({
__proto__: null,
EventEmitter: EventEmitter,
default: EventEmitter
});

var css = "#progressDialog {\r\n    width: 100vw;\r\n    height: 100vh;\r\n    background-color: rgba(0, 0, 0, 0.5);\r\n    text-align: center;\r\n    color: white;\r\n    font-size: 80px;\r\n    outline: none;\r\n    border: none;\r\n}\r\n\r\n#cancelRender {\r\n    background-color: red;\r\n    border-radius: 9999px;\r\n    font-size: 30px;\r\n    padding: 10px;\r\n    padding-left: 35px;\r\n    padding-right: 35px;\r\n}\r\n\r\n.gif-captioner-btn {\r\n    position: absolute;\r\n    z-index: 4;\r\n    top: 0px;\r\n    left: 0px;\r\n    background-color: transparent;\r\n    border: none;\r\n    outline: none;\r\n    color: white;\r\n    padding: 0px;\r\n}\r\n\r\n.caption-creator {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    width: 100%;\r\n    color: white;\r\n}\r\n\r\n.settings {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    width: 100%;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.caption-input {\r\n    flex-grow: 1;\r\n    margin-right: 10px;\r\n}\r\n\r\n.font-size-slider {\r\n    width: 100px;\r\n}\r\n\r\n.caption-canvas {\r\n    border: 1px solid #000;\r\n    width: 100%;\r\n    border: none;\r\n    outline: none;\r\n}\r\n\r\n.caption-preview {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    width: 100%;\r\n    border: 2px solid black;\r\n}\r\n\r\n.caption-video {\r\n    width: 100%;\r\n}";

var CaptionBtnSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
<rect x="2" y="4" width="20" height="16" fill="black"></rect>
<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="5" font-weight="bold" fill="white">Speech</text>
</svg>
`;

const gifSelector = "video[class^='gif']";
watchElement(gifSelector, (gif) => {
  if (gif.querySelector(".gif-captioner-btn"))
      return;
  let captionBtn = document.createElement("button");
  captionBtn.innerHTML = CaptionBtnSVG;
  captionBtn.classList.add("gif-captioner-btn");
  gif.before(captionBtn);
  BdApi.UI.createTooltip(captionBtn, "Add Speech Bubble", {});
  captionBtn.addEventListener('click', async (e) => {
      console.log(gif.src);
      document.querySelector(".expression-picker-chat-input-button > button")?.click();
  });
});
function getChannelId() {
  const channelID = location.href.split("/").pop();

  if (isNaN(Number(channelID)))
      return null;
  return channelID;
}
const imgAdder = Object.values(BdApi.Webpack.getModule(module => Object.values(module)?.[0]?.addFile))[0];
const chatKeyHandlers = BdApi.Webpack.getModule((exports) => Object.values(exports)?.[0]?.
  toString().includes("selectNextCommandOption"));
let submitMessage;

function uploadFile(channelId, file) {
  imgAdder.addFile({
      channelId,
      draftType: 0,
      showLargeMessageDialog: false,
      file: {
          file,
          isThumbnail: false,
          platform: 1
      }
  });
  submitMessage();
}

onStart(() => {
  BdApi.DOM.addStyle("gif-captioner-style", css);
});
onStop(() => {
  BdApi.DOM.removeStyle("gif-captioner-style");

  let btns = document.querySelectorAll(".gif-captioner-btn");
  for (let btn of btns) {
      btn.remove();
  }
});

exports.chatKeyHandlers = chatKeyHandlers;
exports.imgAdder = imgAdder;
  }

  start() {
      for(let callback of this.startCallbacks) {
          callback.callback();
      }
  }
  stop() {
      for(let callback of this.stopCallbacks) {
          callback.callback();
      }
  }
}
