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

var ncycles = 100; 
var netsize = 256; 
var maxnetpos = netsize - 1;

var netbiasshift = 4; 
var intbiasshift = 16; 
var intbias = (1 << intbiasshift);
var gammashift = 10;
var betashift = 10;
var beta = (intbias >> betashift); 
var betagamma = (intbias << (gammashift - betashift));

var initrad = (netsize >> 3); 
var radiusbiasshift = 6; 
var radiusbias = (1 << radiusbiasshift);
var initradius = (initrad * radiusbias); 
var radiusdec = 30; 

var alphabiasshift = 10; 
var initalpha = (1 << alphabiasshift);

var radbiasshift = 8;
var radbias = (1 << radbiasshift);
var alpharadbshift = (alphabiasshift + radbiasshift);
var alpharadbias = (1 << alpharadbshift);

var prime1 = 499;
var prime2 = 491;
var prime3 = 487;
var prime4 = 503;
var minpicturebytes = (3 * prime4);

function NeuQuant(pixels, samplefac) {
var network; 
var netindex; 

var bias;
var freq;
var radpower;

function init() {
  network = [];
  netindex = new Int32Array(256);
  bias = new Int32Array(netsize);
  freq = new Int32Array(netsize);
  radpower = new Int32Array(netsize >> 3);

  var i, v;
  for (i = 0; i < netsize; i++) {
    v = (i << (netbiasshift + 8)) / netsize;
    network[i] = new Float64Array([v, v, v, 0]);

    freq[i] = intbias / netsize;
    bias[i] = 0;
  }
}

function unbiasnet() {
  for (var i = 0; i < netsize; i++) {
    network[i][0] >>= netbiasshift;
    network[i][1] >>= netbiasshift;
    network[i][2] >>= netbiasshift;
    network[i][3] = i; 
  }
}

function altersingle(alpha, i, b, g, r) {
  network[i][0] -= (alpha * (network[i][0] - b)) / initalpha;
  network[i][1] -= (alpha * (network[i][1] - g)) / initalpha;
  network[i][2] -= (alpha * (network[i][2] - r)) / initalpha;
}

function alterneigh(radius, i, b, g, r) {
  var lo = Math.abs(i - radius);
  var hi = Math.min(i + radius, netsize);

  var j = i + 1;
  var k = i - 1;
  var m = 1;

  var p, a;
  while ((j < hi) || (k > lo)) {
    a = radpower[m++];

    if (j < hi) {
      p = network[j++];
      p[0] -= (a * (p[0] - b)) / alpharadbias;
      p[1] -= (a * (p[1] - g)) / alpharadbias;
      p[2] -= (a * (p[2] - r)) / alpharadbias;
    }

    if (k > lo) {
      p = network[k--];
      p[0] -= (a * (p[0] - b)) / alpharadbias;
      p[1] -= (a * (p[1] - g)) / alpharadbias;
      p[2] -= (a * (p[2] - r)) / alpharadbias;
    }
  }
}

function contest(b, g, r) {

  var bestd = ~(1 << 31);
  var bestbiasd = bestd;
  var bestpos = -1;
  var bestbiaspos = bestpos;

  var i, n, dist, biasdist, betafreq;
  for (i = 0; i < netsize; i++) {
    n = network[i];

    dist = Math.abs(n[0] - b) + Math.abs(n[1] - g) + Math.abs(n[2] - r);
    if (dist < bestd) {
      bestd = dist;
      bestpos = i;
    }

    biasdist = dist - ((bias[i]) >> (intbiasshift - netbiasshift));
    if (biasdist < bestbiasd) {
      bestbiasd = biasdist;
      bestbiaspos = i;
    }

    betafreq = (freq[i] >> betashift);
    freq[i] -= betafreq;
    bias[i] += (betafreq << gammashift);
  }

  freq[bestpos] += beta;
  bias[bestpos] -= betagamma;

  return bestbiaspos;
}

function inxbuild() {
  var i, j, p, q, smallpos, smallval, previouscol = 0, startpos = 0;
  for (i = 0; i < netsize; i++) {
    p = network[i];
    smallpos = i;
    smallval = p[1]; 

    for (j = i + 1; j < netsize; j++) {
      q = network[j];
      if (q[1] < smallval) { 
        smallpos = j;
        smallval = q[1]; 
      }
    }
    q = network[smallpos];

    if (i != smallpos) {
      j = q[0];   q[0] = p[0];   p[0] = j;
      j = q[1];   q[1] = p[1];   p[1] = j;
      j = q[2];   q[2] = p[2];   p[2] = j;
      j = q[3];   q[3] = p[3];   p[3] = j;
    }

    if (smallval != previouscol) {
      netindex[previouscol] = (startpos + i) >> 1;
      for (j = previouscol + 1; j < smallval; j++)
        netindex[j] = i;
      previouscol = smallval;
      startpos = i;
    }
  }
  netindex[previouscol] = (startpos + maxnetpos) >> 1;
  for (j = previouscol + 1; j < 256; j++)
    netindex[j] = maxnetpos; 
}

function inxsearch(b, g, r) {
  var a, p, dist;

  var bestd = 1000; 
  var best = -1;

  var i = netindex[g]; 
  var j = i - 1; 

  while ((i < netsize) || (j >= 0)) {
    if (i < netsize) {
      p = network[i];
      dist = p[1] - g; 
      if (dist >= bestd) i = netsize; 
      else {
        i++;
        if (dist < 0) dist = -dist;
        a = p[0] - b; if (a < 0) a = -a;
        dist += a;
        if (dist < bestd) {
          a = p[2] - r; if (a < 0) a = -a;
          dist += a;
          if (dist < bestd) {
            bestd = dist;
            best = p[3];
          }
        }
      }
    }
    if (j >= 0) {
      p = network[j];
      dist = g - p[1]; 
      if (dist >= bestd) j = -1; 
      else {
        j--;
        if (dist < 0) dist = -dist;
        a = p[0] - b; if (a < 0) a = -a;
        dist += a;
        if (dist < bestd) {
          a = p[2] - r; if (a < 0) a = -a;
          dist += a;
          if (dist < bestd) {
            bestd = dist;
            best = p[3];
          }
        }
      }
    }
  }

  return best;
}

function learn() {
  var i;

  var lengthcount = pixels.length;
  var alphadec = 30 + ((samplefac - 1) / 3);
  var samplepixels = lengthcount / (3 * samplefac);
  var delta = ~~(samplepixels / ncycles);
  var alpha = initalpha;
  var radius = initradius;

  var rad = radius >> radiusbiasshift;

  if (rad <= 1) rad = 0;
  for (i = 0; i < rad; i++)
    radpower[i] = alpha * (((rad * rad - i * i) * radbias) / (rad * rad));

  var step;
  if (lengthcount < minpicturebytes) {
    samplefac = 1;
    step = 3;
  } else if ((lengthcount % prime1) !== 0) {
    step = 3 * prime1;
  } else if ((lengthcount % prime2) !== 0) {
    step = 3 * prime2;
  } else if ((lengthcount % prime3) !== 0)  {
    step = 3 * prime3;
  } else {
    step = 3 * prime4;
  }

  var b, g, r, j;
  var pix = 0; 

  i = 0;
  while (i < samplepixels) {
    b = (pixels[pix] & 0xff) << netbiasshift;
    g = (pixels[pix + 1] & 0xff) << netbiasshift;
    r = (pixels[pix + 2] & 0xff) << netbiasshift;

    j = contest(b, g, r);

    altersingle(alpha, j, b, g, r);
    if (rad !== 0) alterneigh(rad, j, b, g, r); 

    pix += step;
    if (pix >= lengthcount) pix -= lengthcount;

    i++;

    if (delta === 0) delta = 1;
    if (i % delta === 0) {
      alpha -= alpha / alphadec;
      radius -= radius / radiusdec;
      rad = radius >> radiusbiasshift;

      if (rad <= 1) rad = 0;
      for (j = 0; j < rad; j++)
        radpower[j] = alpha * (((rad * rad - j * j) * radbias) / (rad * rad));
    }
  }
}

function buildColormap() {
  init();
  learn();
  unbiasnet();
  inxbuild();
}
this.buildColormap = buildColormap;

function getColormap() {
  var map = [];
  var index = [];

  for (var i = 0; i < netsize; i++)
    index[network[i][3]] = i;

  var k = 0;
  for (var l = 0; l < netsize; l++) {
    var j = index[l];
    map[k++] = (network[j][0]);
    map[k++] = (network[j][1]);
    map[k++] = (network[j][2]);
  }
  return map;
}
this.getColormap = getColormap;

this.lookupRGB = inxsearch;
}

var TypedNeuQuant = NeuQuant;

var EOF = -1;
var BITS = 12;
var HSIZE = 5003; 
var masks = [0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F,
           0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF,
           0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF];

function LZWEncoder(width, height, pixels, colorDepth) {
var initCodeSize = Math.max(2, colorDepth);

var accum = new Uint8Array(256);
var htab = new Int32Array(HSIZE);
var codetab = new Int32Array(HSIZE);

var cur_accum, cur_bits = 0;
var a_count;
var free_ent = 0;
var maxcode;
var clear_flg = false;
var g_init_bits, ClearCode, EOFCode, remaining, curPixel, n_bits;
function char_out(c, outs) {
  accum[a_count++] = c;
  if (a_count >= 254) flush_char(outs);
}

function cl_block(outs) {
  cl_hash(HSIZE);
  free_ent = ClearCode + 2;
  clear_flg = true;
  output(ClearCode, outs);
}

function cl_hash(hsize) {
  for (var i = 0; i < hsize; ++i) htab[i] = -1;
}

function compress(init_bits, outs) {
  var fcode, c, i, ent, disp, hsize_reg, hshift;

  g_init_bits = init_bits;

  clear_flg = false;
  n_bits = g_init_bits;
  maxcode = MAXCODE(n_bits);

  ClearCode = 1 << (init_bits - 1);
  EOFCode = ClearCode + 1;
  free_ent = ClearCode + 2;

  a_count = 0;

  ent = nextPixel();

  hshift = 0;
  for (fcode = HSIZE; fcode < 65536; fcode *= 2) ++hshift;
  hshift = 8 - hshift; 
  hsize_reg = HSIZE;
  cl_hash(hsize_reg);

  output(ClearCode, outs);

  outer_loop: while ((c = nextPixel()) != EOF) {
    fcode = (c << BITS) + ent;
    i = (c << hshift) ^ ent; 
    if (htab[i] === fcode) {
      ent = codetab[i];
      continue;
    } else if (htab[i] >= 0) {
      disp = hsize_reg - i;
      if (i === 0) disp = 1;
      do {
        if ((i -= disp) < 0) i += hsize_reg;
        if (htab[i] === fcode) {
          ent = codetab[i];
          continue outer_loop;
        }
      } while (htab[i] >= 0);
    }
    output(ent, outs);
    ent = c;
    if (free_ent < 1 << BITS) {
      codetab[i] = free_ent++;
      htab[i] = fcode;
    } else {
      cl_block(outs);
    }
  }

  output(ent, outs);
  output(EOFCode, outs);
}

function encode(outs) {
  outs.writeByte(initCodeSize);
  remaining = width * height;
  curPixel = 0;
  compress(initCodeSize + 1, outs);
  outs.writeByte(0); 
}

function flush_char(outs) {
  if (a_count > 0) {
    outs.writeByte(a_count);
    outs.writeBytes(accum, 0, a_count);
    a_count = 0;
  }
}

function MAXCODE(n_bits) {
  return (1 << n_bits) - 1;
}

function nextPixel() {
  if (remaining === 0) return EOF;
  --remaining;
  var pix = pixels[curPixel++];
  return pix & 0xff;
}

function output(code, outs) {
  cur_accum &= masks[cur_bits];

  if (cur_bits > 0) cur_accum |= (code << cur_bits);
  else cur_accum = code;

  cur_bits += n_bits;

  while (cur_bits >= 8) {
    char_out((cur_accum & 0xff), outs);
    cur_accum >>= 8;
    cur_bits -= 8;
  }

  if (free_ent > maxcode || clear_flg) {
    if (clear_flg) {
      maxcode = MAXCODE(n_bits = g_init_bits);
      clear_flg = false;
    } else {
      ++n_bits;
      if (n_bits == BITS) maxcode = 1 << BITS;
      else maxcode = MAXCODE(n_bits);
    }
  }

  if (code == EOFCode) {

    while (cur_bits > 0) {
      char_out((cur_accum & 0xff), outs);
      cur_accum >>= 8;
      cur_bits -= 8;
    }
    flush_char(outs);
  }
}

this.encode = encode;
}

var LZWEncoder_1 = LZWEncoder;

function ByteArray() {
this.page = -1;
this.pages = [];
this.newPage();
}

ByteArray.pageSize = 4096;
ByteArray.charMap = {};

for (var i = 0; i < 256; i++)
ByteArray.charMap[i] = String.fromCharCode(i);

ByteArray.prototype.newPage = function() {
this.pages[++this.page] = new Uint8Array(ByteArray.pageSize);
this.cursor = 0;
};

ByteArray.prototype.getData = function() {
var rv = '';
for (var p = 0; p < this.pages.length; p++) {
  for (var i = 0; i < ByteArray.pageSize; i++) {
    rv += ByteArray.charMap[this.pages[p][i]];
  }
}
return rv;
};

ByteArray.prototype.writeByte = function(val) {
if (this.cursor >= ByteArray.pageSize) this.newPage();
this.pages[this.page][this.cursor++] = val;
};

ByteArray.prototype.writeUTFBytes = function(string) {
for (var l = string.length, i = 0; i < l; i++)
  this.writeByte(string.charCodeAt(i));
};

ByteArray.prototype.writeBytes = function(array, offset, length) {
for (var l = length || array.length, i = offset || 0; i < l; i++)
  this.writeByte(array[i]);
};

function GIFEncoder(width, height) {

this.width = ~~width;
this.height = ~~height;

this.transparent = null;

this.transIndex = 0;

this.repeat = -1;

this.delay = 0;

this.image = null; 
this.pixels = null; 
this.indexedPixels = null; 
this.colorDepth = null; 
this.colorTab = null; 
this.neuQuant = null; 
this.usedEntry = new Array(); 
this.palSize = 7; 
this.dispose = -1; 
this.firstFrame = true;
this.sample = 10; 
this.dither = false; 
this.globalPalette = false;

this.out = new ByteArray();
}

GIFEncoder.prototype.setDelay = function(milliseconds) {
this.delay = Math.round(milliseconds / 10);
};

GIFEncoder.prototype.setFrameRate = function(fps) {
this.delay = Math.round(100 / fps);
};

GIFEncoder.prototype.setDispose = function(disposalCode) {
if (disposalCode >= 0) this.dispose = disposalCode;
};

GIFEncoder.prototype.setRepeat = function(repeat) {
this.repeat = repeat;
};

GIFEncoder.prototype.setTransparent = function(color) {
this.transparent = color;
};

GIFEncoder.prototype.addFrame = function(imageData) {
this.image = imageData;

this.colorTab = this.globalPalette && this.globalPalette.slice ? this.globalPalette : null;

this.getImagePixels(); 
this.analyzePixels(); 

if (this.globalPalette === true) this.globalPalette = this.colorTab;

if (this.firstFrame) {
  this.writeLSD(); 
  this.writePalette(); 
  if (this.repeat >= 0) {

    this.writeNetscapeExt();
  }
}

this.writeGraphicCtrlExt(); 
this.writeImageDesc(); 
if (!this.firstFrame && !this.globalPalette) this.writePalette(); 
this.writePixels(); 

this.firstFrame = false;
};

GIFEncoder.prototype.finish = function() {
this.out.writeByte(0x3b); 
};

GIFEncoder.prototype.setQuality = function(quality) {
if (quality < 1) quality = 1;
this.sample = quality;
};

GIFEncoder.prototype.setDither = function(dither) {
if (dither === true) dither = 'FloydSteinberg';
this.dither = dither;
};

GIFEncoder.prototype.setGlobalPalette = function(palette) {
this.globalPalette = palette;
};

GIFEncoder.prototype.getGlobalPalette = function() {
return (this.globalPalette && this.globalPalette.slice && this.globalPalette.slice(0)) || this.globalPalette;
};

GIFEncoder.prototype.writeHeader = function() {
this.out.writeUTFBytes("GIF89a");
};

GIFEncoder.prototype.analyzePixels = function() {
if (!this.colorTab) {
  this.neuQuant = new TypedNeuQuant(this.pixels, this.sample);
  this.neuQuant.buildColormap(); 
  this.colorTab = this.neuQuant.getColormap();
}

if (this.dither) {
  this.ditherPixels(this.dither.replace('-serpentine', ''), this.dither.match(/-serpentine/) !== null);
} else {
  this.indexPixels();
}

this.pixels = null;
this.colorDepth = 8;
this.palSize = 7;

if (this.transparent !== null) {
  this.transIndex = this.findClosest(this.transparent, true);
}
};

GIFEncoder.prototype.indexPixels = function(imgq) {
var nPix = this.pixels.length / 3;
this.indexedPixels = new Uint8Array(nPix);
var k = 0;
for (var j = 0; j < nPix; j++) {
  var index = this.findClosestRGB(
    this.pixels[k++] & 0xff,
    this.pixels[k++] & 0xff,
    this.pixels[k++] & 0xff
  );
  this.usedEntry[index] = true;
  this.indexedPixels[j] = index;
}
};

GIFEncoder.prototype.ditherPixels = function(kernel, serpentine) {
var kernels = {
  FalseFloydSteinberg: [
    [3 / 8, 1, 0],
    [3 / 8, 0, 1],
    [2 / 8, 1, 1]
  ],
  FloydSteinberg: [
    [7 / 16, 1, 0],
    [3 / 16, -1, 1],
    [5 / 16, 0, 1],
    [1 / 16, 1, 1]
  ],
  Stucki: [
    [8 / 42, 1, 0],
    [4 / 42, 2, 0],
    [2 / 42, -2, 1],
    [4 / 42, -1, 1],
    [8 / 42, 0, 1],
    [4 / 42, 1, 1],
    [2 / 42, 2, 1],
    [1 / 42, -2, 2],
    [2 / 42, -1, 2],
    [4 / 42, 0, 2],
    [2 / 42, 1, 2],
    [1 / 42, 2, 2]
  ],
  Atkinson: [
    [1 / 8, 1, 0],
    [1 / 8, 2, 0],
    [1 / 8, -1, 1],
    [1 / 8, 0, 1],
    [1 / 8, 1, 1],
    [1 / 8, 0, 2]
  ]
};

if (!kernel || !kernels[kernel]) {
  throw 'Unknown dithering kernel: ' + kernel;
}

var ds = kernels[kernel];
var index = 0,
  height = this.height,
  width = this.width,
  data = this.pixels;
var direction = serpentine ? -1 : 1;

this.indexedPixels = new Uint8Array(this.pixels.length / 3);

for (var y = 0; y < height; y++) {

  if (serpentine) direction = direction * -1;

  for (var x = (direction == 1 ? 0 : width - 1), xend = (direction == 1 ? width : 0); x !== xend; x += direction) {

    index = (y * width) + x;

    var idx = index * 3;
    var r1 = data[idx];
    var g1 = data[idx + 1];
    var b1 = data[idx + 2];

    idx = this.findClosestRGB(r1, g1, b1);
    this.usedEntry[idx] = true;
    this.indexedPixels[index] = idx;
    idx *= 3;
    var r2 = this.colorTab[idx];
    var g2 = this.colorTab[idx + 1];
    var b2 = this.colorTab[idx + 2];

    var er = r1 - r2;
    var eg = g1 - g2;
    var eb = b1 - b2;

    for (var i = (direction == 1 ? 0: ds.length - 1), end = (direction == 1 ? ds.length : 0); i !== end; i += direction) {
      var x1 = ds[i][1]; 
      var y1 = ds[i][2];
      if (x1 + x >= 0 && x1 + x < width && y1 + y >= 0 && y1 + y < height) {
        var d = ds[i][0];
        idx = index + x1 + (y1 * width);
        idx *= 3;

        data[idx] = Math.max(0, Math.min(255, data[idx] + er * d));
        data[idx + 1] = Math.max(0, Math.min(255, data[idx + 1] + eg * d));
        data[idx + 2] = Math.max(0, Math.min(255, data[idx + 2] + eb * d));
      }
    }
  }
}
};

GIFEncoder.prototype.findClosest = function(c, used) {
return this.findClosestRGB((c & 0xFF0000) >> 16, (c & 0x00FF00) >> 8, (c & 0x0000FF), used);
};

GIFEncoder.prototype.findClosestRGB = function(r, g, b, used) {
if (this.colorTab === null) return -1;

if (this.neuQuant && !used) {
  return this.neuQuant.lookupRGB(r, g, b);
}

var minpos = 0;
var dmin = 256 * 256 * 256;
var len = this.colorTab.length;

for (var i = 0, index = 0; i < len; index++) {
  var dr = r - (this.colorTab[i++] & 0xff);
  var dg = g - (this.colorTab[i++] & 0xff);
  var db = b - (this.colorTab[i++] & 0xff);
  var d = dr * dr + dg * dg + db * db;
  if ((!used || this.usedEntry[index]) && (d < dmin)) {
    dmin = d;
    minpos = index;
  }
}

return minpos;
};

GIFEncoder.prototype.getImagePixels = function() {
var w = this.width;
var h = this.height;
this.pixels = new Uint8Array(w * h * 3);

var data = this.image;
var srcPos = 0;
var count = 0;

for (var i = 0; i < h; i++) {
  for (var j = 0; j < w; j++) {
    this.pixels[count++] = data[srcPos++];
    this.pixels[count++] = data[srcPos++];
    this.pixels[count++] = data[srcPos++];
    srcPos++;
  }
}
};

GIFEncoder.prototype.writeGraphicCtrlExt = function() {
this.out.writeByte(0x21); 
this.out.writeByte(0xf9); 
this.out.writeByte(4); 

var transp, disp;
if (this.transparent === null) {
  transp = 0;
  disp = 0; 
} else {
  transp = 1;
  disp = 2; 
}

if (this.dispose >= 0) {
  disp = this.dispose & 7; 
}
disp <<= 2;

this.out.writeByte(
  0 | 
  disp | 
  0 | 
  transp 
);

this.writeShort(this.delay); 
this.out.writeByte(this.transIndex); 
this.out.writeByte(0); 
};

GIFEncoder.prototype.writeImageDesc = function() {
this.out.writeByte(0x2c); 
this.writeShort(0); 
this.writeShort(0);
this.writeShort(this.width); 
this.writeShort(this.height);

if (this.firstFrame || this.globalPalette) {

  this.out.writeByte(0);
} else {

  this.out.writeByte(
    0x80 | 
    0 | 
    0 | 
    0 | 
    this.palSize 
  );
}
};

GIFEncoder.prototype.writeLSD = function() {

this.writeShort(this.width);
this.writeShort(this.height);

this.out.writeByte(
  0x80 | 
  0x70 | 
  0x00 | 
  this.palSize 
);

this.out.writeByte(0); 
this.out.writeByte(0); 
};

GIFEncoder.prototype.writeNetscapeExt = function() {
this.out.writeByte(0x21); 
this.out.writeByte(0xff); 
this.out.writeByte(11); 
this.out.writeUTFBytes('NETSCAPE2.0'); 
this.out.writeByte(3); 
this.out.writeByte(1); 
this.writeShort(this.repeat); 
this.out.writeByte(0); 
};

GIFEncoder.prototype.writePalette = function() {
this.out.writeBytes(this.colorTab);
var n = (3 * 256) - this.colorTab.length;
for (var i = 0; i < n; i++)
  this.out.writeByte(0);
};

GIFEncoder.prototype.writeShort = function(pValue) {
this.out.writeByte(pValue & 0xFF);
this.out.writeByte((pValue >> 8) & 0xFF);
};

GIFEncoder.prototype.writePixels = function() {
var enc = new LZWEncoder_1(this.width, this.height, this.indexedPixels, this.colorDepth);
enc.encode(this.out);
};

GIFEncoder.prototype.stream = function() {
return this.out;
};

var GIFEncoder_1 = GIFEncoder;

var require$0 = getCjsExportFromNamespace(_polyfillNode_events);

var gif = createCommonjsModule(function (module) {

(function() {
var EventEmitter, GIF,
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf;

({EventEmitter} = require$0);

GIF = (function() {
  var defaults, frameDefaults, GIFEncoder, renderFrame;

  GIFEncoder = GIFEncoder_1;

  renderFrame = function(frame) {
    var encoder, stream;
    encoder = new GIFEncoder(frame.width, frame.height);
    if (frame.index === 0) {
      encoder.writeHeader();
    } else {
      encoder.firstFrame = false;
    }
    encoder.setTransparent(frame.transparent);
    encoder.setDispose(frame.dispose);
    encoder.setRepeat(frame.repeat);
    encoder.setDelay(frame.delay);
    encoder.setQuality(frame.quality);
    encoder.setDither(frame.dither);
    encoder.setGlobalPalette(frame.globalPalette);
    encoder.addFrame(frame.data);
    if (frame.last) {
      encoder.finish();
    }
    if (frame.globalPalette === true) {
      frame.globalPalette = encoder.getGlobalPalette();
    }
    stream = encoder.stream();
    frame.data = stream.pages;
    frame.cursor = stream.cursor;
    frame.pageSize = stream.constructor.pageSize;
    return frame;
  };

  class GIF extends EventEmitter {
    constructor(options) {
      var base, key, value;
      super();
      this.running = false;
      this.options = {};
      this.frames = [];
      this.setOptions(options);
      for (key in defaults) {
        value = defaults[key];
        if ((base = this.options)[key] == null) {
          base[key] = value;
        }
      }
    }

    setOption(key, value) {
      this.options[key] = value;
      if ((this._canvas != null) && (key === 'width' || key === 'height')) {
        return this._canvas[key] = value;
      }
    }

    setOptions(options) {
      var key, results, value;
      results = [];
      for (key in options) {
        if (!hasProp.call(options, key)) continue;
        value = options[key];
        results.push(this.setOption(key, value));
      }
      return results;
    }

    addFrame(image, options = {}) {
      var frame, key;
      frame = {};
      frame.transparent = this.options.transparent;
      for (key in frameDefaults) {
        frame[key] = options[key] || frameDefaults[key];
      }
      if (this.options.width == null) {

        this.setOption('width', image.width);
      }
      if (this.options.height == null) {
        this.setOption('height', image.height);
      }
      if ((typeof ImageData !== "undefined" && ImageData !== null) && image instanceof ImageData) {
        frame.data = image.data;
      } else if (((typeof CanvasRenderingContext2D !== "undefined" && CanvasRenderingContext2D !== null) && image instanceof CanvasRenderingContext2D) || ((typeof WebGLRenderingContext !== "undefined" && WebGLRenderingContext !== null) && image instanceof WebGLRenderingContext)) {
        if (options.copy) {
          frame.data = this.getContextData(image);
        } else {
          frame.context = image;
        }
      } else if (image.childNodes != null) {
        if (options.copy) {
          frame.data = this.getImageData(image);
        } else {
          frame.image = image;
        }
      } else {
        throw new Error('Invalid image');
      }
      return this.frames.push(frame);
    }

    render() {
      if (this.running) {
        throw new Error('Already running');
      }
      if ((this.options.width == null) || (this.options.height == null)) {
        throw new Error('Width and height must be set prior to rendering');
      }
      this.running = true;
      this.nextFrame = 0;
      this.finishedFrames = 0;
      this.imageParts = (function() {
        var j, ref, results;
        results = [];
        for (j = 0, ref = this.frames.length; (0 <= ref ? j < ref : j > ref); 0 <= ref ? ++j : --j) {
          results.push(null);
        }
        return results;
      }).call(this);

      this.renderNextFrame();
      this.emit('start');
      return this.emit('progress', 0);
    }

    abort() {
      this.running = false;
      return this.emit('abort');
    }

    frameFinished(frame) {
      this.log(`frame ${frame.index} finished`);
      this.finishedFrames++;
      this.emit('progress', this.finishedFrames / this.frames.length);
      this.imageParts[frame.index] = frame;

      if (this.options.globalPalette === true) {
        this.options.globalPalette = frame.globalPalette;
        this.log('global palette analyzed');
        if (this.frames.length > 2) {
          this.renderNextFrame();
        }
      }
      if (indexOf.call(this.imageParts, null) >= 0) {
        return this.renderNextFrame();
      } else {
        return this.finishRendering();
      }
    }

    finishRendering() {
      var data, frame, i, image, j, k, l, len, len1, len2, len3, offset, page, ref, ref1, ref2;
      len = 0;
      ref = this.imageParts;
      for (j = 0, len1 = ref.length; j < len1; j++) {
        frame = ref[j];
        len += (frame.data.length - 1) * frame.pageSize + frame.cursor;
      }
      len += frame.pageSize - frame.cursor;
      this.log(`rendering finished - filesize ${Math.round(len / 1000)}kb`);
      data = new Uint8Array(len);
      offset = 0;
      ref1 = this.imageParts;
      for (k = 0, len2 = ref1.length; k < len2; k++) {
        frame = ref1[k];
        ref2 = frame.data;
        for (i = l = 0, len3 = ref2.length; l < len3; i = ++l) {
          page = ref2[i];
          data.set(page, offset);
          if (i === frame.data.length - 1) {
            offset += frame.cursor;
          } else {
            offset += frame.pageSize;
          }
        }
      }
      image = new Blob([data], {
        type: 'image/gif'
      });
      return this.emit('finished', image, data);
    }

    async renderNextFrame() {
      var frame, task;
      if (this.nextFrame >= this.frames.length) { 
        return;
      }
      frame = this.frames[this.nextFrame++];
      task = this.getTask(frame);
      this.log(`starting frame ${task.index + 1} of ${this.frames.length}`);
      let event = renderFrame(task);

      await new Promise(resolve => setTimeout(resolve, 0));
      this.frameFinished(event);
    }

    getContextData(ctx) {
      return ctx.getImageData(0, 0, this.options.width, this.options.height).data;
    }

    getImageData(image) {
      var ctx;
      if (this._canvas == null) {
        this._canvas = document.createElement('canvas');
        this._canvas.width = this.options.width;
        this._canvas.height = this.options.height;
      }
      ctx = this._canvas.getContext('2d');
      ctx.fillStyle = this.options.background;
      ctx.fillRect(0, 0, this.options.width, this.options.height);
      ctx.drawImage(image, 0, 0);
      return this.getContextData(ctx);
    }

    getTask(frame) {
      var index, task;
      index = this.frames.indexOf(frame);
      task = {
        index: index,
        last: index === (this.frames.length - 1),
        delay: frame.delay,
        dispose: frame.dispose,
        transparent: frame.transparent,
        width: this.options.width,
        height: this.options.height,
        quality: this.options.quality,
        dither: this.options.dither,
        globalPalette: this.options.globalPalette,
        repeat: this.options.repeat
      };
      if (frame.data != null) {
        task.data = frame.data;
      } else if (frame.context != null) {
        task.data = this.getContextData(frame.context);
      } else if (frame.image != null) {
        task.data = this.getImageData(frame.image);
      } else {
        throw new Error('Invalid frame');
      }
      return task;
    }

    log(...args) {
      if (!this.options.debug) {
        return;
      }
      return console.log(...args);
    }

  }
  defaults = {
    repeat: 0, 
    background: '#fff',
    quality: 10,
    width: null,
    height: null,
    transparent: null,
    debug: false,
    dither: false
  };

  frameDefaults = {
    delay: 500, 
    copy: false,
    dispose: -1
  };

  return GIF;

}).call(this);

module.exports = GIF;

}).call(commonjsGlobal);
});

var css = "#progressDialog {\r\n    width: 100vw;\r\n    height: 100vh;\r\n    background-color: rgba(0, 0, 0, 0.5);\r\n    text-align: center;\r\n    color: white;\r\n    font-size: 80px;\r\n    outline: none;\r\n    border: none;\r\n}\r\n\r\n#cancelRender {\r\n    background-color: red;\r\n    border-radius: 9999px;\r\n    font-size: 30px;\r\n    padding: 10px;\r\n    padding-left: 35px;\r\n    padding-right: 35px;\r\n}\r\n\r\n.gif-captioner-btn {\r\n    position: absolute;\r\n    z-index: 4;\r\n    top: 0px;\r\n    left: 0px;\r\n    background-color: transparent;\r\n    border: none;\r\n    outline: none;\r\n    color: white;\r\n    padding: 0px;\r\n}\r\n\r\n.caption-creator {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    width: 100%;\r\n    color: white;\r\n}\r\n\r\n.settings {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    width: 100%;\r\n    margin-bottom: 20px;\r\n}\r\n\r\n.caption-input {\r\n    flex-grow: 1;\r\n    margin-right: 10px;\r\n}\r\n\r\n.font-size-slider {\r\n    width: 100px;\r\n}\r\n\r\n.caption-canvas {\r\n    border: 1px solid #000;\r\n    width: 100%;\r\n    border: none;\r\n    outline: none;\r\n}\r\n\r\n.caption-preview {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    width: 100%;\r\n    border: 2px solid black;\r\n}\r\n\r\n.caption-video {\r\n    width: 100%;\r\n}";

var CaptionBtnSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
<rect x="2" y="4" width="20" height="16" fill="black"></rect>
<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="5" font-weight="bold" fill="white">Speech</text>
</svg>
`;

let rendering = false;
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
      const overlayImage = 'data:image/png;base64,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'
      renderGif(gif.src, overlayImage);
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
async function renderGif(originalSrc, base64Image, fontSize) {
if (rendering)
    return;
rendering = true;
const channel = getChannelId();
if (!channel)
    return;

let progressDialog = document.createElement("dialog");
progressDialog.id = "progressDialog";
progressDialog.addEventListener("close", (e) => e.preventDefault());
progressDialog.innerHTML = `
    <label for="renderProgress">Preparing...</label>
    <progress id="renderProgress" value="0" max="1"></progress> <br />
    <button id="cancelRender">Cancel</button>
`;
let progress = progressDialog.querySelector("#renderProgress");
document.body.appendChild(progressDialog);
progressDialog.showModal();

let video = document.createElement("video");
video.src = originalSrc;
video.crossOrigin = "anonymous";

await new Promise((res) => {
    video.addEventListener('canplaythrough', res, { once: true });
});

video.currentTime = 0;
video.playbackRate = 16;
video.play();
await new Promise((res) => video.addEventListener('ended', res, { once: true }));
video.pause();

let quality = video.getVideoPlaybackQuality();
const frames = quality.totalVideoFrames;
console.log("Frames:", frames);

let overlayImage = new Image();
overlayImage.src = base64Image;

await new Promise((res) => {
    overlayImage.onload = res;
});

let renderCanvas = document.createElement("canvas");
renderCanvas.width = video.videoWidth;
let renderCtx = renderCanvas.getContext("2d");

renderCanvas.height = video.videoHeight; 
const newWidth = Math.floor(renderCanvas.width);
const newHeight = Math.floor(renderCanvas.height);

let gif$1 = new gif({
    quality: 10,
    width: newWidth,
    height: newHeight,
});

let aborted = false;
progressDialog.querySelector("#cancelRender").addEventListener("click", () => {
    if (gif$1.running)
        gif$1.abort();
    aborted = true;
    document.body.removeChild(progressDialog);
});

gif$1.on('progress', (e) => {
    console.log("Rendering progress:", e);
    progress.value = e;
});

gif$1.on('finished', (blob) => {
    rendering = false;
    document.body.removeChild(progressDialog);
    console.log("Final size:", blob.size);
    let file = new File([blob], 'rendered.gif', { type: 'image/gif' });
    uploadFile(channel, file);
});

let fps = frames / video.duration;
let scaledCanvas = document.createElement("canvas");
let scaledCtx = scaledCanvas.getContext("2d");
scaledCanvas.width = newWidth;
scaledCanvas.height = newHeight;

progressDialog.querySelector("label").innerHTML = "Rendering...";

for (let frame = 0; frame < frames; frame++) {
    if (aborted) break;

    video.currentTime = frame * 1 / fps + Number.MIN_VALUE;
    await new Promise((res) => video.addEventListener('seeked', res, { once: true }));

    renderCtx.clearRect(0, 0, renderCanvas.width, renderCanvas.height);

    renderCtx.drawImage(video, 0, 0);

    let overlayHeight = renderCanvas.height / 5;

    renderCtx.drawImage(overlayImage, 0, 0, renderCanvas.width, overlayHeight);

    scaledCtx.drawImage(renderCanvas, 0, 0, newWidth, newHeight);
    gif$1.addFrame(scaledCtx, { delay: 1 / fps * 1000, copy: true });

    progress.value = frame / frames;
}

progressDialog.querySelector("label").innerHTML = "Encoding...";
gif$1.render();
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
