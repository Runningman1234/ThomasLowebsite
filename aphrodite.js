module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};

/******/    // The require function
/******/    function __webpack_require__(moduleId) {

/******/        // Check if module is in cache
/******/        if(installedModules[moduleId])
/******/            return installedModules[moduleId].exports;

/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            exports: {},
/******/            id: moduleId,
/******/            loaded: false
/******/        };

/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/        // Flag the module as loaded
/******/        module.loaded = true;

/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }


/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;

/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;

/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "";

/******/    // Load entry module and return exports
/******/    return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

    module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

    var _util = __webpack_require__(2);

    var _inject = __webpack_require__(3);

    var StyleSheet = {
        create: function create(sheetDefinition) {
            return (0, _util.mapObj)(sheetDefinition, function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2);

                var key = _ref2[0];
                var val = _ref2[1];

                return [key, {
                    // TODO(emily): Make a 'production' mode which doesn't prepend
                    // the class name here, to make the generated CSS smaller.
                    _name: key + '_' + (0, _util.hashObject)(val),
                    _definition: val
                }];
            });
        },

        rehydrate: function rehydrate() {
            var renderedClassNames = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            (0, _inject.addRenderedClassNames)(renderedClassNames);
        }
    };

    var StyleSheetServer = {
        renderStatic: function renderStatic(renderFunc) {
            (0, _inject.reset)();
            (0, _inject.startBuffering)();
            var html = renderFunc();
            var cssContent = (0, _inject.flushToString)();

            return {
                html: html,
                css: {
                    content: cssContent,
                    renderedClassNames: (0, _inject.getRenderedClassNames)()
                }
            };
        }
    };

    var css = function css() {
        for (var _len = arguments.length, styleDefinitions = Array(_len), _key = 0; _key < _len; _key++) {
            styleDefinitions[_key] = arguments[_key];
        }

        // Filter out falsy values from the input, to allow for
        // `css(a, test && c)`
        var validDefinitions = styleDefinitions.filter(function (def) {
            return def;
        });

        // Break if there aren't any valid styles.
        if (validDefinitions.length === 0) {
            return "";
        }

        var className = validDefinitions.map(function (s) {
            return s._name;
        }).join("-o_O-");
        (0, _inject.injectStyleOnce)(className, '.' + className, validDefinitions.map(function (d) {
            return d._definition;
        }));

        return className;
    };

    exports['default'] = {
        StyleSheet: StyleSheet,
        StyleSheetServer: StyleSheetServer,
        css: css
    };
    module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

    // {K1: V1, K2: V2, ...} -> [[K1, V1], [K2, V2]]
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

    var objectToPairs = function objectToPairs(obj) {
        return Object.keys(obj).map(function (key) {
            return [key, obj[key]];
        });
    };

    exports.objectToPairs = objectToPairs;
    // [[K1, V1], [K2, V2]] -> {K1: V1, K2: V2, ...}
    var pairsToObject = function pairsToObject(pairs) {
        var result = {};
        pairs.forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2);

            var key = _ref2[0];
            var val = _ref2[1];

            result[key] = val;
        });
        return result;
    };

    var mapObj = function mapObj(obj, fn) {
        return pairsToObject(objectToPairs(obj).map(fn));
    };

    exports.mapObj = mapObj;
    var UPPERCASE_RE = /([A-Z])/g;
    var MS_RE = /^ms-/;

    var kebabify = function kebabify(string) {
        return string.replace(UPPERCASE_RE, '-$1').toLowerCase();
    };
    var kebabifyStyleName = function kebabifyStyleName(string) {
        return kebabify(string).replace(MS_RE, '-ms-');
    };

    exports.kebabifyStyleName = kebabifyStyleName;
    var recursiveMerge = function recursiveMerge(a, b) {
        // TODO(jlfwong): Handle malformed input where a and b are not the same
        // type.

        if (typeof a !== 'object') {
            return b;
        }

        var ret = _extends({}, a);

        Object.keys(b).forEach(function (key) {
            if (ret.hasOwnProperty(key)) {
                ret[key] = recursiveMerge(a[key], b[key]);
            } else {
                ret[key] = b[key];
            }
        });

        return ret;
    };

    exports.recursiveMerge = recursiveMerge;
    /**
     * CSS properties which accept numbers but are not in units of "px".
     * Taken from React's CSSProperty.js
     */
    var isUnitlessNumber = {
        animationIterationCount: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridRow: true,
        gridColumn: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,

        // SVG-related properties
        fillOpacity: true,
        stopOpacity: true,
        strokeDashoffset: true,
        strokeOpacity: true,
        strokeWidth: true
    };

    /**
     * Taken from React's CSSProperty.js
     *
     * @param {string} prefix vendor-specific prefix, eg: Webkit
     * @param {string} key style name, eg: transitionDuration
     * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
     * WebkitTransitionDuration
     */
    function prefixKey(prefix, key) {
        return prefix + key.charAt(0).toUpperCase() + key.substring(1);
    }

    /**
     * Support style names that may come passed in prefixed by adding permutations
     * of vendor prefixes.
     * Taken from React's CSSProperty.js
     */
    var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

    // Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
    // infinite loop, because it iterates over the newly added props too.
    // Taken from React's CSSProperty.js
    Object.keys(isUnitlessNumber).forEach(function (prop) {
        prefixes.forEach(function (prefix) {
            isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
        });
    });

    var stringifyValue = function stringifyValue(key, prop) {
        if (typeof prop === "number") {
            if (isUnitlessNumber[key]) {
                return "" + prop;
            } else {
                return prop + "px";
            }
        } else {
            return prop;
        }
    };

    exports.stringifyValue = stringifyValue;
    /**
     * JS Implementation of MurmurHash2
     *
     * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
     * @see http://github.com/garycourt/murmurhash-js
     * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
     * @see http://sites.google.com/site/murmurhash/
     *
     * @param {string} str ASCII only
     * @return {string} Base 36 encoded hash result
     */
    function murmurhash2_32_gc(str) {
        var l = str.length;
        var h = l;
        var i = 0;
        var k = undefined;

        while (l >= 4) {
            k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;

            k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
            k ^= k >>> 24;
            k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);

            h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;

            l -= 4;
            ++i;
        }

        switch (l) {
            case 3:
                h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
            case 2:
                h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
            case 1:
                h ^= str.charCodeAt(i) & 0xff;
                h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
        }

        h ^= h >>> 13;
        h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
        h ^= h >>> 15;

        return (h >>> 0).toString(36);
    }

    // Hash a javascript object using JSON.stringify. This is very fast, about 3
    // microseconds on my computer for a sample object:
    // http://jsperf.com/test-hashfnv32a-hash/5
    //
    // Note that this uses JSON.stringify to stringify the objects so in order for
    // this to produce consistent hashes browsers need to have a consistent
    // ordering of objects. Ben Alpert says that Facebook depends on this, so we
    // can probably depend on this too.
    var hashObject = function hashObject(object) {
        return murmurhash2_32_gc(JSON.stringify(object));
    };

    exports.hashObject = hashObject;
    var importantRegexp = /^([^:]+:.*?)( !important)?$/;

    // Given a style string like "a: b; c: d;", adds !important to each of the
    // properties to generate "a: b !important; c: d !important;".
    var importantify = function importantify(string) {
        return string.split(";").map(function (str) {
            return str.replace(importantRegexp, function (_, base, important) {
                return base + " !important";
            });
        }).join(";");
    };
    exports.importantify = importantify;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _asap = __webpack_require__(4);

    var _asap2 = _interopRequireDefault(_asap);

    var _generate = __webpack_require__(6);

    // The current <style> tag we are inserting into, or null if we haven't
    // inserted anything yet. We could find this each time using
    // `document.querySelector("style[data-aphrodite"])`, but holding onto it is
    // faster.
    var styleTag = null;

    // Inject a string of styles into a <style> tag in the head of the document. This
    // will automatically create a style tag and then continue to use it for
    // multiple injections. It will also use a style tag with the `data-aphrodite`
    // tag on it if that exists in the DOM. This could be used for e.g. reusing the
    // same style tag that server-side rendering inserts.
    var injectStyleTag = function injectStyleTag(cssContents) {
        if (styleTag == null) {
            // Try to find a style tag with the `data-aphrodite` attribute first.
            styleTag = document.querySelector("style[data-aphrodite]");

            // If that doesn't work, generate a new style tag.
            if (styleTag == null) {
                // Taken from
                // http://stackoverflow.com/questions/524696/how-to-create-a-style-tag-with-javascript
                var head = document.head || document.getElementsByTagName('head')[0];
                styleTag = document.createElement('style');

                styleTag.type = 'text/css';
                styleTag.setAttribute("data-aphrodite", "");
                head.appendChild(styleTag);
            }
        }

        if (styleTag.styleSheet) {
            styleTag.styleSheet.cssText += cssContents;
        } else {
            styleTag.appendChild(document.createTextNode(cssContents));
        }
    };

    // Custom handlers for stringifying CSS values that have side effects
    // (such as fontFamily, which can cause @font-face rules to be injected)
    var stringHandlers = {
        // With fontFamily we look for objects that are passed in and interpret
        // them as @font-face rules that we need to inject. The value of fontFamily
        // can either be a string (as normal), an object (a single font face), or
        // an array of objects and strings.
        fontFamily: function fontFamily(val) {
            if (Array.isArray(val)) {
                return val.map(fontFamily).join(",");
            } else if (typeof val === "object") {
                injectStyleOnce(val.fontFamily, "@font-face", [val], false);
                return '"' + val.fontFamily + '"';
            } else {
                return val;
            }
        }
    };

    // This is a map from Aphrodite's generated class names to `true` (acting as a
    // set of class names)
    var alreadyInjected = {};

    // This is the buffer of styles which have not yet been flushed.
    var injectionBuffer = "";

    // A flag to tell if we are already buffering styles. This could happen either
    // because we scheduled a flush call already, so newly added styles will
    // already be flushed, or because we are statically buffering on the server.
    var isBuffering = false;

    var injectStyleOnce = function injectStyleOnce(key, selector, definitions, useImportant) {
        if (!alreadyInjected[key]) {
            var generated = (0, _generate.generateCSS)(selector, definitions, stringHandlers, useImportant);

            if (!isBuffering) {
                // We should never be automatically buffering on the server (or any
                // place without a document), so guard against that.
                if (typeof document === "undefined") {
                    throw new Error("Cannot automatically buffer without a document");
                }

                // If we're not already buffering, schedule a call to flush the
                // current styles.
                isBuffering = true;
                (0, _asap2['default'])(flushToStyleTag);
            }

            injectionBuffer += generated;
            alreadyInjected[key] = true;
        }
    };

    exports.injectStyleOnce = injectStyleOnce;
    var reset = function reset() {
        injectionBuffer = "";
        alreadyInjected = {};
        isBuffering = false;
        styleTag = null;
    };

    exports.reset = reset;
    var startBuffering = function startBuffering() {
        if (isBuffering) {
            throw new Error("Cannot buffer while already buffering");
        }
        isBuffering = true;
    };

    exports.startBuffering = startBuffering;
    var flushToString = function flushToString() {
        isBuffering = false;
        var ret = injectionBuffer;
        injectionBuffer = "";
        return ret;
    };

    exports.flushToString = flushToString;
    var flushToStyleTag = function flushToStyleTag() {
        var cssContent = flushToString();
        if (cssContent.length > 0) {
            injectStyleTag(cssContent);
        }
    };

    exports.flushToStyleTag = flushToStyleTag;
    var getRenderedClassNames = function getRenderedClassNames() {
        return Object.keys(alreadyInjected);
    };

    exports.getRenderedClassNames = getRenderedClassNames;
    var addRenderedClassNames = function addRenderedClassNames(classNames) {
        classNames.forEach(function (className) {
            alreadyInjected[className] = true;
        });
    };
    exports.addRenderedClassNames = addRenderedClassNames;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

    "use strict";

    // rawAsap provides everything we need except exception management.
    var rawAsap = __webpack_require__(5);
    // RawTasks are recycled to reduce GC churn.
    var freeTasks = [];
    // We queue errors to ensure they are thrown in right order (FIFO).
    // Array-as-queue is good enough here, since we are just dealing with exceptions.
    var pendingErrors = [];
    var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

    function throwFirstError() {
        if (pendingErrors.length) {
            throw pendingErrors.shift();
        }
    }

    /**
     * Calls a task as soon as possible after returning, in its own event, with priority
     * over other events like animation, reflow, and repaint. An error thrown from an
     * event will not interrupt, nor even substantially slow down the processing of
     * other events, but will be rather postponed to a lower priority event.
     * @param {{call}} task A callable object, typically a function that takes no
     * arguments.
     */
    module.exports = asap;
    function asap(task) {
        var rawTask;
        if (freeTasks.length) {
            rawTask = freeTasks.pop();
        } else {
            rawTask = new RawTask();
        }
        rawTask.task = task;
        rawAsap(rawTask);
    }

    // We wrap tasks with recyclable task objects.  A task object implements
    // `call`, just like a function.
    function RawTask() {
        this.task = null;
    }

    // The sole purpose of wrapping the task is to catch the exception and recycle
    // the task object after its single use.
    RawTask.prototype.call = function () {
        try {
            this.task.call();
        } catch (error) {
            if (asap.onerror) {
                // This hook exists purely for testing purposes.
                // Its name will be periodically randomized to break any code that
                // depends on its existence.
                asap.onerror(error);
            } else {
                // In a web browser, exceptions are not fatal. However, to avoid
                // slowing down the queue of pending tasks, we rethrow the error in a
                // lower priority turn.
                pendingErrors.push(error);
                requestErrorThrow();
            }
        } finally {
            this.task = null;
            freeTasks[freeTasks.length] = this;
        }
    };


/***/ },
/* 5 */
/***/ function(module, exports) {

    /* WEBPACK VAR INJECTION */(function(global) {"use strict";

    // Use the fastest means possible to execute a task in its own turn, with
    // priority over other events including IO, animation, reflow, and redraw
    // events in browsers.
    //
    // An exception thrown by a task will permanently interrupt the processing of
    // subsequent tasks. The higher level `asap` function ensures that if an
    // exception is thrown by a task, that the task queue will continue flushing as
    // soon as possible, but if you use `rawAsap` directly, you are responsible to
    // either ensure that no exceptions are thrown from your task, or to manually
    // call `rawAsap.requestFlush` if an exception is thrown.
    module.exports = rawAsap;
    function rawAsap(task) {
        if (!queue.length) {
            requestFlush();
            flushing = true;
        }
        // Equivalent to push, but avoids a function call.
        queue[queue.length] = task;
    }

    var queue = [];
    // Once a flush has been requested, no further calls to `requestFlush` are
    // necessary until the next `flush` completes.
    var flushing = false;
    // `requestFlush` is an implementation-specific method that attempts to kick
    // off a `flush` event as quickly as possible. `flush` will attempt to exhaust
    // the event queue before yielding to the browser's own event loop.
    var requestFlush;
    // The position of the next task to execute in the task queue. This is
    // preserved between calls to `flush` so that it can be resumed if
    // a task throws an exception.
    var index = 0;
    // If a task schedules additional tasks recursively, the task queue can grow
    // unbounded. To prevent memory exhaustion, the task queue will periodically
    // truncate already-completed tasks.
    var capacity = 1024;

    // The flush function processes all tasks that have been scheduled with
    // `rawAsap` unless and until one of those tasks throws an exception.
    // If a task throws an exception, `flush` ensures that its state will remain
    // consistent and will resume where it left off when called again.
    // However, `flush` does not make any arrangements to be called again if an
    // exception is thrown.
    function flush() {
        while (index < queue.length) {
            var currentIndex = index;
            // Advance the index before calling the task. This ensures that we will
            // begin flushing on the next task the task throws an error.
            index = index + 1;
            queue[currentIndex].call();
            // Prevent leaking memory for long chains of recursive calls to `asap`.
            // If we call `asap` within tasks scheduled by `asap`, the queue will
            // grow, but to avoid an O(n) walk for every task we execute, we don't
            // shift tasks off the queue after they have been executed.
            // Instead, we periodically shift 1024 tasks off the queue.
            if (index > capacity) {
                // Manually shift all values starting at the index back to the
                // beginning of the queue.
                for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                    queue[scan] = queue[scan + index];
                }
                queue.length -= index;
                index = 0;
            }
        }
        queue.length = 0;
        index = 0;
        flushing = false;
    }

    // `requestFlush` is implemented using a strategy based on data collected from
    // every available SauceLabs Selenium web driver worker at time of writing.
    // https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

    // Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
    // have WebKitMutationObserver but not un-prefixed MutationObserver.
    // Must use `global` instead of `window` to work in both frames and web
    // workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
    var BrowserMutationObserver = window.global &&
        (window.global.MutationObserver || window.global.WebKitMutationObserver);

    // MutationObservers are desirable because they have high priority and work
    // reliably everywhere they are implemented.
    // They are implemented in all modern browsers.
    //
    // - Android 4-4.3
    // - Chrome 26-34
    // - Firefox 14-29
    // - Internet Explorer 11
    // - iPad Safari 6-7.1
    // - iPhone Safari 7-7.1
    // - Safari 6-7
    if (typeof BrowserMutationObserver === "function") {
        requestFlush = makeRequestCallFromMutationObserver(flush);

    // MessageChannels are desirable because they give direct access to the HTML
    // task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
    // 11-12, and in web workers in many engines.
    // Although message channels yield to any queued rendering and IO tasks, they
    // would be better than imposing the 4ms delay of timers.
    // However, they do not work reliably in Internet Explorer or Safari.

    // Internet Explorer 10 is the only browser that has setImmediate but does
    // not have MutationObservers.
    // Although setImmediate yields to the browser's renderer, it would be
    // preferrable to falling back to setTimeout since it does not have
    // the minimum 4ms penalty.
    // Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
    // Desktop to a lesser extent) that renders both setImmediate and
    // MessageChannel useless for the purposes of ASAP.
    // https://github.com/kriskowal/q/issues/396

    // Timers are implemented universally.
    // We fall back to timers in workers in most engines, and in foreground
    // contexts in the following browsers.
    // However, note that even this simple case requires nuances to operate in a
    // broad spectrum of browsers.
    //
    // - Firefox 3-13
    // - Internet Explorer 6-9
    // - iPad Safari 4.3
    // - Lynx 2.8.7
    } else {
        requestFlush = makeRequestCallFromTimer(flush);
    }

    // `requestFlush` requests that the high priority event queue be flushed as
    // soon as possible.
    // This is useful to prevent an error thrown in a task from stalling the event
    // queue if the exception handled by Node.js’s
    // `process.on("uncaughtException")` or by a domain.
    rawAsap.requestFlush = requestFlush;

    // To request a high priority event, we induce a mutation observer by toggling
    // the text of a text node between "1" and "-1".
    function makeRequestCallFromMutationObserver(callback) {
        var toggle = 1;
        var observer = new BrowserMutationObserver(callback);
        var node = document.createTextNode("");
        observer.observe(node, {characterData: true});
        return function requestCall() {
            toggle = -toggle;
            node.data = toggle;
        };
    }

    // The message channel technique was discovered by Malte Ubl and was the
    // original foundation for this library.
    // http://www.nonblocking.io/2011/06/windownexttick.html

    // Safari 6.0.5 (at least) intermittently fails to create message ports on a
    // page's first load. Thankfully, this version of Safari supports
    // MutationObservers, so we don't need to fall back in that case.

    // function makeRequestCallFromMessageChannel(callback) {
    //     var channel = new MessageChannel();
    //     channel.port1.onmessage = callback;
    //     return function requestCall() {
    //         channel.port2.postMessage(0);
    //     };
    // }

    // For reasons explained above, we are also unable to use `setImmediate`
    // under any circumstances.
    // Even if we were, there is another bug in Internet Explorer 10.
    // It is not sufficient to assign `setImmediate` to `requestFlush` because
    // `setImmediate` must be called *by name* and therefore must be wrapped in a
    // closure.
    // Never forget.

    // function makeRequestCallFromSetImmediate(callback) {
    //     return function requestCall() {
    //         setImmediate(callback);
    //     };
    // }

    // Safari 6.0 has a problem where timers will get lost while the user is
    // scrolling. This problem does not impact ASAP because Safari 6.0 supports
    // mutation observers, so that implementation is used instead.
    // However, if we ever elect to use timers in Safari, the prevalent work-around
    // is to add a scroll event listener that calls for a flush.

    // `setTimeout` does not call the passed callback if the delay is less than
    // approximately 7 in web workers in Firefox 8 through 18, and sometimes not
    // even then.

    function makeRequestCallFromTimer(callback) {
        return function requestCall() {
            // We dispatch a timeout with a specified delay of 0 for engines that
            // can reliably accommodate that request. This will usually be snapped
            // to a 4 milisecond delay, but once we're flushing, there's no delay
            // between events.
            var timeoutHandle = setTimeout(handleTimer, 0);
            // However, since this timer gets frequently dropped in Firefox
            // workers, we enlist an interval handle that will try to fire
            // an event 20 times per second until it succeeds.
            var intervalHandle = setInterval(handleTimer, 50);

            function handleTimer() {
                // Whichever timer succeeds will cancel both timers and
                // execute the callback.
                clearTimeout(timeoutHandle);
                clearInterval(intervalHandle);
                callback();
            }
        };
    }

    // This is for `asap.js` only.
    // Its name will be periodically randomized to break any code that depends on
    // its existence.
    rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

    // ASAP was originally a nextTick shim included in Q. This was factored out
    // into this ASAP package. It was later adapted to RSVP which made further
    // amendments. These decisions, particularly to marginalize MessageChannel and
    // to capture the MutationObserver implementation in a closure, were integrated
    // back into ASAP proper.
    // https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

    /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _inlineStylePrefixer = __webpack_require__(7);

    var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

    var _util = __webpack_require__(2);

    var generateCSS = function generateCSS(selector, styleTypes, stringHandlers, useImportant) {
        var merged = styleTypes.reduce(_util.recursiveMerge);

        var declarations = {};
        var mediaQueries = {};
        var pseudoStyles = {};

        Object.keys(merged).forEach(function (key) {
            if (key[0] === ':') {
                pseudoStyles[key] = merged[key];
            } else if (key[0] === '@') {
                mediaQueries[key] = merged[key];
            } else {
                declarations[key] = merged[key];
            }
        });

        return generateCSSRuleset(selector, declarations, stringHandlers, useImportant) + Object.keys(pseudoStyles).map(function (pseudoSelector) {
            return generateCSSRuleset(selector + pseudoSelector, pseudoStyles[pseudoSelector], stringHandlers, useImportant);
        }).join("") + Object.keys(mediaQueries).map(function (mediaQuery) {
            var ruleset = generateCSS(selector, [mediaQueries[mediaQuery]], stringHandlers, useImportant);
            return mediaQuery + '{' + ruleset + '}';
        }).join("");
    };

    exports.generateCSS = generateCSS;
    var runStringHandlers = function runStringHandlers(declarations, stringHandlers) {
        var result = {};

        Object.keys(declarations).forEach(function (key) {
            // If a handler exists for this particular key, let it interpret
            // that value first before continuing
            if (stringHandlers && stringHandlers.hasOwnProperty(key)) {
                result[key] = stringHandlers[key](declarations[key]);
            } else {
                result[key] = declarations[key];
            }
        });

        return result;
    };

    var generateCSSRuleset = function generateCSSRuleset(selector, declarations, stringHandlers, useImportant) {
        var handledDeclarations = runStringHandlers(declarations, stringHandlers);

        var prefixedDeclarations = _inlineStylePrefixer2['default'].prefixAll(handledDeclarations);

        var rules = (0, _util.objectToPairs)(prefixedDeclarations).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2);

            var key = _ref2[0];
            var value = _ref2[1];

            var stringValue = (0, _util.stringifyValue)(key, value);
            var ret = (0, _util.kebabifyStyleName)(key) + ':' + stringValue + ';';
            return useImportant === false ? ret : (0, _util.importantify)(ret);
        }).join("");

        if (rules) {
            return selector + '{' + rules + '}';
        } else {
            return "";
        }
    };
    exports.generateCSSRuleset = generateCSSRuleset;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var _utilsGetBrowserInformation = __webpack_require__(8);

    var _utilsGetBrowserInformation2 = _interopRequireDefault(_utilsGetBrowserInformation);

    var _utilsCapitalizeString = __webpack_require__(9);

    var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);

    var _utilsAssign = __webpack_require__(10);

    var _utilsAssign2 = _interopRequireDefault(_utilsAssign);

    var _caniuseData = __webpack_require__(11);

    var _caniuseData2 = _interopRequireDefault(_caniuseData);

    var _Plugins = __webpack_require__(12);

    var _Plugins2 = _interopRequireDefault(_Plugins);

    var prefixes = _caniuseData2['default'];
    var browserInfo = (0, _utilsGetBrowserInformation2['default'])();

    var Prefixer = (function () {
      function Prefixer() {
        _classCallCheck(this, Prefixer);
      }

      _createClass(Prefixer, null, [{
        key: 'prefixAll',

        /**
         * Returns a prefixed version of the style object using all vendor prefixes
         * @param {Object} styles - Style object that gets prefixed properties added
         * @returns {Object} - Style object with prefixed properties and values
         */
        value: function prefixAll(styles) {
          styles = (0, _utilsAssign2['default'])({}, styles);

          Object.keys(styles).forEach(function (property) {
            var value = styles[property];
            if (value instanceof Object) {
              // recurse through nested style objects
              styles[property] = Prefixer.prefixAll(value);
            } else {
              var browsers = Object.keys(browserInfo.prefixes);
              browsers.forEach(function (browser) {
                var style = browserInfo.prefixes[browser];
                // add prefixes if needed
                if (prefixes[property] != null) {
                  styles[style.inline + (0, _utilsCapitalizeString2['default'])(property)] = value;
                }
              });

              // resolve plugins for each browser
              _Plugins2['default'].forEach(function (plugin) {
                var resolvedStyles = plugin({
                  property: property,
                  value: value,
                  styles: styles,
                  prefix: {},
                  keepUnprefixed: true,
                  requiresPrefix: prefixes
                });
                (0, _utilsAssign2['default'])(styles, resolvedStyles);
              });
            }
          });

          return styles;
        }
      }]);

      return Prefixer;
    })();

    exports['default'] = Prefixer;
    module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    var vendorPrefixes = {
      Webkit: ['chrome', 'safari', 'ios', 'android', 'phantom', 'opera', 'webos', 'blackberry', 'bada', 'tizen'],
      Moz: ['firefox', 'seamonkey', 'sailfish'],
      ms: ['msie', 'msedge']
    };

    var browsers = {
      chrome: [['chrome']],
      safari: [['safari']],
      firefox: [['firefox']],
      ie: [['msie']],
      edge: [['msedge']],
      opera: [['opera']],
      ios_saf: [['ios', 'mobile'], ['ios', 'tablet']],
      ie_mob: [['windowsphone', 'mobile', 'msie'], ['windowsphone', 'tablet', 'msie'], ['windowsphone', 'mobile', 'msedge'], ['windowsphone', 'tablet', 'msedge']],
      op_mini: [['opera', 'mobile'], ['opera', 'tablet']],
      and_uc: [['android', 'mobile'], ['android', 'tablet']],
      android: [['android', 'mobile'], ['android', 'tablet']]
    };

    /**
     * Returns an object containing prefix data associated with a browser
     * @param {string} browser - browser to find a prefix for
     */
    var getPrefixes = function getPrefixes(browser) {
      var prefixKeys = undefined;
      var prefix = undefined;
      var vendors = undefined;
      var conditions = undefined;
      var prefixVendor = undefined;
      var browserVendors = undefined;

      // Find the prefix for this browser (if any)
      prefixKeys = Object.keys(vendorPrefixes);
      for (var i = 0; i < prefixKeys.length; i++) {
        prefix = prefixKeys[i];

        // Find a matching vendor
        vendors = vendorPrefixes[prefix];
        conditions = browsers[browser];

        for (var j = 0; j < vendors.length; j++) {
          prefixVendor = vendors[j];

          for (var k = 0; k < conditions.length; k++) {
            browserVendors = conditions[k];

            if (browserVendors.indexOf(prefixVendor) !== -1) {
              return {
                inline: prefix,
                css: '-' + prefix.toLowerCase() + '-'
              };
            }
          }
        }
      }

      // No prefix found for this browser
      return { inline: '', css: '' };
    };

    /**
     * Uses bowser to get default browser information such as version and name
     * Evaluates bowser info and adds vendorPrefix information
     * @param {string} userAgent - userAgent that gets evaluated
     */

    exports['default'] = function () {
      var info = {};

      // Return an array of supported browsers
      info.browsers = Object.keys(browsers);

      // Return prefixes associated by browser
      info.prefixes = {};

      // Iterate browser list, assign prefix to each
      info.browsers.forEach(function (browser) {
        info.prefixes[browser] = getPrefixes(browser);
      });

      return info;
    };

    module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

    // helper to capitalize strings
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports["default"] = function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    module.exports = exports["default"];

/***/ },
/* 10 */
/***/ function(module, exports) {

    // leight polyfill for Object.assign
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports["default"] = function (base) {
      var extend = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      Object.keys(extend).forEach(function (key) {
        return base[key] = extend[key];
      });
      return base;
    };

    module.exports = exports["default"];

/***/ },
/* 11 */
/***/ function(module, exports) {

    module.exports = {"transform":0,"transformOrigin":0,"transformOriginX":0,"transformOriginY":0,"backfaceVisibility":0,"perspective":0,"perspectiveOrigin":0,"transformStyle":0,"transformOriginZ":0,"animation":0,"animationDelay":0,"animationDirection":0,"animationFillMode":0,"animationDuration":0,"animationIterationCount":0,"animationName":0,"animationPlayState":0,"animationTimingFunction":0,"appearance":0,"userSelect":0,"fontKerning":0,"textEmphasisPosition":0,"textEmphasis":0,"textEmphasisStyle":0,"textEmphasisColor":0,"boxDecorationBreak":0,"clipPath":0,"maskImage":0,"maskMode":0,"maskRepeat":0,"maskPosition":0,"maskClip":0,"maskOrigin":0,"maskSize":0,"maskComposite":0,"mask":0,"maskBorderSource":0,"maskBorderMode":0,"maskBorderSlice":0,"maskBorderWidth":0,"maskBorderOutset":0,"maskBorderRepeat":0,"maskBorder":0,"maskType":0,"textDecorationStyle":0,"textDecorationSkip":0,"textDecorationLine":0,"textDecorationColor":0,"filter":0,"fontFeatureSettings":0,"breakAfter":0,"breakBefore":0,"breakInside":0,"columnCount":0,"columnFill":0,"columnGap":0,"columnRule":0,"columnRuleColor":0,"columnRuleStyle":0,"columnRuleWidth":0,"columns":0,"columnSpan":0,"columnWidth":0,"flex":0,"flexBasis":0,"flexDirection":0,"flexGrow":0,"flexFlow":0,"flexShrink":0,"flexWrap":0,"alignContent":0,"alignItems":0,"alignSelf":0,"justifyContent":0,"order":0,"transition":0,"transitionDelay":0,"transitionDuration":0,"transitionProperty":0,"transitionTimingFunction":0,"backdropFilter":0,"scrollSnapType":0,"scrollSnapPointsX":0,"scrollSnapPointsY":0,"scrollSnapDestination":0,"scrollSnapCoordinate":0,"shapeImageThreshold":0,"shapeImageMargin":0,"shapeImageOutside":0,"hyphens":0,"flowInto":0,"flowFrom":0,"regionFragment":0,"boxSizing":0,"textAlignLast":0,"tabSize":0,"grid":0,"gridColumnStart":0,"gridRow":0,"gridTemplateColumns":0,"gridRowStart":0,"gridRowEnd":0,"gridTemplateRows":0,"gridAutoRows":0,"wrapThrough":0,"wrapFlow":0,"gridColumnGap":0,"touchAction":0,"gridRowGap":0,"gridAutoFlow":0,"gridColumn":0,"gridGap":0,"gridTemplateAreas":0,"gridTemplate":0,"gridArea":0,"wrapMargin":0,"gridAutoColumns":0,"gridColumnEnd":0,"textSizeAdjust":0,"borderImage":0,"borderImageOutset":0,"borderImageRepeat":0,"borderImageSlice":0,"borderImageSource":0,"borderImageWidth":0,"objectFit":0,"objectPosition":0};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _pluginsCalc = __webpack_require__(13);

    var _pluginsCalc2 = _interopRequireDefault(_pluginsCalc);

    var _pluginsCursor = __webpack_require__(15);

    var _pluginsCursor2 = _interopRequireDefault(_pluginsCursor);

    var _pluginsFlex = __webpack_require__(16);

    var _pluginsFlex2 = _interopRequireDefault(_pluginsFlex);

    var _pluginsSizing = __webpack_require__(17);

    var _pluginsSizing2 = _interopRequireDefault(_pluginsSizing);

    var _pluginsGradient = __webpack_require__(18);

    var _pluginsGradient2 = _interopRequireDefault(_pluginsGradient);

    var _pluginsTransition = __webpack_require__(19);

    var _pluginsTransition2 = _interopRequireDefault(_pluginsTransition);

    // special flexbox specifications

    var _pluginsFlexboxIE = __webpack_require__(20);

    var _pluginsFlexboxIE2 = _interopRequireDefault(_pluginsFlexboxIE);

    var _pluginsFlexboxOld = __webpack_require__(21);

    var _pluginsFlexboxOld2 = _interopRequireDefault(_pluginsFlexboxOld);

    exports['default'] = [_pluginsCalc2['default'], _pluginsCursor2['default'], _pluginsSizing2['default'], _pluginsGradient2['default'], _pluginsTransition2['default'], _pluginsFlexboxIE2['default'], _pluginsFlexboxOld2['default'],
    // this must be run AFTER the flexbox specs
    _pluginsFlex2['default']];
    module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    exports['default'] = calc;

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    var _utilsCamelToDashCase = __webpack_require__(14);

    var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

    function calc(pluginInterface) {
      var property = pluginInterface.property;
      var value = pluginInterface.value;
      var prefix = pluginInterface.prefix;
      var keepUnprefixed = pluginInterface.keepUnprefixed;

      if (typeof value === 'string' && value.indexOf('calc(') > -1) {
        var dashCaseProperty = (0, _utilsCamelToDashCase2['default'])(property);

        var newValue = ['-webkit-', '-moz-'].map(function (prefix) {
          return value.replace(/calc\(/g, prefix + 'calc(');
        }).join(';' + dashCaseProperty + ':');
        return _defineProperty({}, property, newValue + (keepUnprefixed ? ';' + dashCaseProperty + ':' + value : ''));
      }
    }

    module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

    /**
     * Converts a camel-case string to a dash-case string
     * @param {string} str - str that gets converted to dash-case
     */
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    exports['default'] = function (str) {
      return str.replace(/([a-z]|^)([A-Z])/g, function (match, p1, p2) {
        return p1 + '-' + p2.toLowerCase();
      }).replace('ms-', '-ms-');
    };

    module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports) {

    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    exports['default'] = cursor;
    var values = {
      'zoom-in': true,
      'zoom-out': true,
      grab: true,
      grabbing: true
    };

    function cursor(pluginInterface) {
      var property = pluginInterface.property;
      var value = pluginInterface.value;
      var prefix = pluginInterface.prefix;
      var keepUnprefixed = pluginInterface.keepUnprefixed;

      if (property === 'cursor' && values[value]) {
        var newValue = ['-webkit-', '-moz-'].map(function (prefix) {
          return prefix + value;
        }).join(';' + property + ':');
        return {
          cursor: newValue + (keepUnprefixed ? ';' + property + ':' + value : '')
        };
      }
    }

    module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    exports['default'] = flex;
    var values = { flex: true, 'inline-flex': true };

    function flex(pluginInterface) {
      var property = pluginInterface.property;
      var value = pluginInterface.value;
      var prefix = pluginInterface.prefix;
      var keepUnprefixed = pluginInterface.keepUnprefixed;

      if (property === 'display' && values[value]) {
        var newValue = ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value].join(';' + property + ':');
        return {
          display: newValue + (keepUnprefixed ? ';' + property + ':' + value : '')
        };
      }
    }

    module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    exports['default'] = sizing;

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    var _utilsCamelToDashCase = __webpack_require__(14);

    var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

    var properties = {
      maxHeight: true,
      maxWidth: true,
      width: true,
      height: true,
      columnWidth: true,
      minWidth: true,
      minHeight: true
    };
    var values = {
      'min-content': true,
      'max-content': true,
      'fill-available': true,
      'fit-content': true,
      'contain-floats': true
    };

    function sizing(pluginInterface) {
      var property = pluginInterface.property;
      var value = pluginInterface.value;
      var prefix = pluginInterface.prefix;
      var keepUnprefixed = pluginInterface.keepUnprefixed;

      // This might change in the future
      // Keep an eye on it
      if (properties[property] && values[value]) {
        var dashCaseProperty = (0, _utilsCamelToDashCase2['default'])(property);

        var newValue = ['-webkit-', '-moz-'].map(function (prefix) {
          return prefix + value;
        }).join(';' + dashCaseProperty + ':');
        return _defineProperty({}, property, newValue + (keepUnprefixed ? ';' + dashCaseProperty + ':' + value : ''));
      }
    }

    module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    exports['default'] = gradient;

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    var _utilsCamelToDashCase = __webpack_require__(14);

    var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

    var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

    function gradient(pluginInterface) {
      var property = pluginInterface.property;
      var value = pluginInterface.value;
      var prefix = pluginInterface.prefix;
      var keepUnprefixed = pluginInterface.keepUnprefixed;

      if (typeof value === 'string' && value.match(values) !== null) {
        var dashCaseProperty = (0, _utilsCamelToDashCase2['default'])(property);

        var newValue = ['-webkit-', '-moz-'].map(function (prefix) {
          return prefix + value;
        }).join(';' + dashCaseProperty + ':');
        return _defineProperty({}, property, newValue + (keepUnprefixed ? ';' + dashCaseProperty + ':' + value : ''));
      }
    }

    module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    exports['default'] = calc;

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    var _utilsCamelToDashCase = __webpack_require__(14);

    var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

    var _utilsCapitalizeString = __webpack_require__(9);

    var _utilsCapitalizeString2 = _interopRequireDefault(_utilsCapitalizeString);

    var propertyRegexp = /^(WebkitT|MozT|msT|t)ransition(Property|)$/;

    function calc(pluginInterface) {
      var property = pluginInterface.property;
      var value = pluginInterface.value;
      var prefix = pluginInterface.prefix;
      var keepUnprefixed = pluginInterface.keepUnprefixed;
      var requiresPrefix = pluginInterface.requiresPrefix;

      var match = undefined;

      if (typeof value === 'string' && (match = property.match(propertyRegexp))) {
        var _ref;

        var _ret = (function () {
          var newProperty = 'transition' + match[2];
          var requiresPrefixDashCased = Object.keys(requiresPrefix).map(function (newProperty) {
            return (0, _utilsCamelToDashCase2['default'])(newProperty);
          });
          var newValue = value;

          // only split multi values, not cubic beziers
          var multipleValues = newValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

          requiresPrefixDashCased.forEach(function (newProperty) {
            multipleValues.forEach(function (val, index) {
              if (val.indexOf(newProperty) > -1) {
                var newVal = ['-webkit-', '-moz-', '-ms-'].map(function (prefix) {
                  return val.replace(newProperty, prefix + newProperty);
                }).join(',');
                multipleValues[index] = newVal + (keepUnprefixed ? ',' + val : '');
              }
            });
          });
          var outputValue = multipleValues.join(',');
          return {
            v: (_ref = {}, _defineProperty(_ref, 'Webkit' + (0, _utilsCapitalizeString2['default'])(newProperty), outputValue), _defineProperty(_ref, 'Moz' + (0, _utilsCapitalizeString2['default'])(newProperty), outputValue), _defineProperty(_ref, 'ms' + (0, _utilsCapitalizeString2['default'])(newProperty), outputValue), _defineProperty(_ref, newProperty, outputValue), _ref)
          };
        })();

        if (typeof _ret === 'object') return _ret.v;
      }
    }

    module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

    exports['default'] = flexboxIE;

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    var _utilsCamelToDashCase = __webpack_require__(14);

    var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

    var alternativeValues = {
      'space-around': 'distribute',
      'space-between': 'justify',
      'flex-start': 'start',
      'flex-end': 'end',
      flex: '-ms-flexbox',
      'inline-flex': '-ms-inline-flexbox'
    };
    var alternativeProps = {
      alignContent: 'msFlexLinePack',
      alignSelf: 'msFlexItemAlign',
      alignItems: 'msFlexAlign',
      justifyContent: 'msFlexPack',
      order: 'msFlexOrder',
      flexGrow: 'msFlexPositive',
      flexShrink: 'msFlexNegative',
      flexBasis: 'msPreferredSize'
    };

    var properties = Object.keys(alternativeProps).concat('display').reduce(function (result, prop) {
      return _extends({}, result, _defineProperty({}, prop, true));
    }, {});

    function flexboxIE(pluginInterface) {
      var property = pluginInterface.property;
      var value = pluginInterface.value;
      var styles = pluginInterface.styles;
      var prefix = pluginInterface.prefix;
      var keepUnprefixed = pluginInterface.keepUnprefixed;

      if (properties[property]) {
        var dashCaseProperty = (0, _utilsCamelToDashCase2['default'])(property);

        if (!keepUnprefixed) {
          delete styles[property];
        }

        if (alternativeProps[property]) {
          return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
        }
        if (alternativeValues[value]) {
          return _defineProperty({}, property, alternativeValues[value] + (keepUnprefixed ? ';' + dashCaseProperty + ':' + value : ''));
        }
      }
    }

    module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

    exports['default'] = flexboxOld;

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    var _utilsCamelToDashCase = __webpack_require__(14);

    var _utilsCamelToDashCase2 = _interopRequireDefault(_utilsCamelToDashCase);

    var alternativeValues = {
      'space-around': 'justify',
      'space-between': 'justify',
      'flex-start': 'start',
      'flex-end': 'end',
      'wrap-reverse': 'multiple',
      wrap: 'multiple',
      flex: 'box',
      'inline-flex': 'inline-box'
    };

    var alternativeProps = {
      alignItems: 'WebkitBoxAlign',
      justifyContent: 'WebkitBoxPack',
      flexWrap: 'WebkitBoxLines'
    };

    var properties = Object.keys(alternativeProps).concat(['alignContent', 'alignSelf', 'display', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection']).reduce(function (result, prop) {
      return _extends({}, result, _defineProperty({}, prop, true));
    }, {});

    function flexboxOld(pluginInterface) {
      var property = pluginInterface.property;
      var value = pluginInterface.value;
      var styles = pluginInterface.styles;
      var prefix = pluginInterface.prefix;
      var keepUnprefixed = pluginInterface.keepUnprefixed;

      if (properties[property]) {
        var dashCaseProperty = (0, _utilsCamelToDashCase2['default'])(property);

        if (!keepUnprefixed) {
          delete styles[property];
        }
        if (property === 'flexDirection') {
          return {
            WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
            WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
          };
        }
        if (property === 'display' && alternativeValues[value]) {
          return {
            display: prefix.css + alternativeValues[value] + (keepUnprefixed ? ';' + dashCaseProperty + ':' + value : '')
          };
        }
        if (alternativeProps[property]) {
          return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
        }
        if (alternativeValues[value]) {
          return _defineProperty({}, property, alternativeValues[value] + (keepUnprefixed ? ';' + dashCaseProperty + ':' + value : ''));
        }
      }
    }

    module.exports = exports['default'];

/***/ }
/******/ ]);