/*! @algolia/autocomplete-core 1.5.2 | MIT License | © Algolia, Inc. and contributors | https://github.com/algolia/autocomplete */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@algolia/autocomplete-core"] = {}));
})(this, (function (exports) { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _typeof$1(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof$1 = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof$1 = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof$1(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
  }

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }
  /**
   * Decycles objects with circular references.
   * This is used to print cyclic structures in development environment only.
   */


  function decycle(obj) {
    var seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Set();

    if (!obj || _typeof(obj) !== 'object') {
      return obj;
    }

    if (seen.has(obj)) {
      return '[Circular]';
    }

    var newSeen = seen.add(obj);

    if (Array.isArray(obj)) {
      return obj.map(function (x) {
        return decycle(x, newSeen);
      });
    }

    return Object.fromEntries(Object.entries(obj).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return [key, decycle(value, newSeen)];
    }));
  }

  function flatten(values) {
    return values.reduce(function (a, b) {
      return a.concat(b);
    }, []);
  }

  var autocompleteId = 0;
  function generateAutocompleteId() {
    return "autocomplete-".concat(autocompleteId++);
  }

  function getItemsCount(state) {
    if (state.collections.length === 0) {
      return 0;
    }

    return state.collections.reduce(function (sum, collection) {
      return sum + collection.items.length;
    }, 0);
  }

  /**
   * Throws an error if the condition is not met in development mode.
   * This is used to make development a better experience to provide guidance as
   * to where the error comes from.
   */
  function invariant(condition, message) {

    if (!condition) {
      throw new Error("[Autocomplete] ".concat(typeof message === 'function' ? message() : message));
    }
  }

  var noop = function noop() {};

  var version = '1.5.2';

  var userAgents = [{
    segment: 'autocomplete-core',
    version: version
  }];

  var warnCache = {
    current: {}
  };
  /**
   * Logs a warning if the condition is not met.
   * This is used to log issues in development environment only.
   */

  function warn(condition, message) {

    if (condition) {
      return;
    }

    var sanitizedMessage = message.trim();
    var hasAlreadyPrinted = warnCache.current[sanitizedMessage];

    if (!hasAlreadyPrinted) {
      warnCache.current[sanitizedMessage] = true; // eslint-disable-next-line no-console

      console.warn("[Autocomplete] ".concat(sanitizedMessage));
    }
  }

  function checkOptions(options) {
    "development" !== 'production' ? warn(!options.debug, 'The `debug` option is meant for development debugging and should not be used in production.') : void 0;
  }

  function createInternalCancelablePromise(promise, initialState) {
    var state = initialState;
    return {
      then: function then(onfulfilled, onrejected) {
        return createInternalCancelablePromise(promise.then(createCallback(onfulfilled, state, promise), createCallback(onrejected, state, promise)), state);
      },
      catch: function _catch(onrejected) {
        return createInternalCancelablePromise(promise.catch(createCallback(onrejected, state, promise)), state);
      },
      finally: function _finally(onfinally) {
        if (onfinally) {
          state.onCancelList.push(onfinally);
        }

        return createInternalCancelablePromise(promise.finally(createCallback(onfinally && function () {
          state.onCancelList = [];
          return onfinally();
        }, state, promise)), state);
      },
      cancel: function cancel() {
        state.isCanceled = true;
        var callbacks = state.onCancelList;
        state.onCancelList = [];
        callbacks.forEach(function (callback) {
          callback();
        });
      },
      isCanceled: function isCanceled() {
        return state.isCanceled === true;
      }
    };
  }

  function cancelable(promise) {
    return createInternalCancelablePromise(promise, {
      isCanceled: false,
      onCancelList: []
    });
  }

  function createCallback(onResult, state, fallback) {
    if (!onResult) {
      return fallback;
    }

    return function callback(arg) {
      if (state.isCanceled) {
        return arg;
      }

      return onResult(arg);
    };
  }

  function createCancelablePromiseList() {
    var list = [];
    return {
      add: function add(cancelablePromise) {
        list.push(cancelablePromise);
        return cancelablePromise.finally(function () {
          list = list.filter(function (item) {
            return item !== cancelablePromise;
          });
        });
      },
      cancelAll: function cancelAll() {
        list.forEach(function (promise) {
          return promise.cancel();
        });
      },
      isEmpty: function isEmpty() {
        return list.length === 0;
      }
    };
  }

  /**
   * Creates a runner that executes promises in a concurrent-safe way.
   *
   * This is useful to prevent older promises to resolve after a newer promise,
   * otherwise resulting in stale resolved values.
   */
  function createConcurrentSafePromise() {
    var basePromiseId = -1;
    var latestResolvedId = -1;
    var latestResolvedValue = undefined;
    return function runConcurrentSafePromise(promise) {
      basePromiseId++;
      var currentPromiseId = basePromiseId;
      return Promise.resolve(promise).then(function (x) {
        // The promise might take too long to resolve and get outdated. This would
        // result in resolving stale values.
        // When this happens, we ignore the promise value and return the one
        // coming from the latest resolved value.
        //
        // +----------------------------------+
        // |        100ms                     |
        // | run(1) +--->  R1                 |
        // |        300ms                     |
        // | run(2) +-------------> R2 (SKIP) |
        // |        200ms                     |
        // | run(3) +--------> R3             |
        // +----------------------------------+
        if (latestResolvedValue && currentPromiseId < latestResolvedId) {
          return latestResolvedValue;
        }

        latestResolvedId = currentPromiseId;
        latestResolvedValue = x;
        return x;
      });
    };
  }

  /**
   * Returns the next active item ID from the current state.
   *
   * We allow circular keyboard navigation from the base index.
   * The base index can either be `null` (nothing is highlighted) or `0`
   * (the first item is highlighted).
   * The base index is allowed to get assigned `null` only if
   * `props.defaultActiveItemId` is `null`. This pattern allows to "stop"
   * by the actual query before navigating to other suggestions as seen on
   * Google or Amazon.
   *
   * @param moveAmount The offset to increment (or decrement) the last index
   * @param baseIndex The current index to compute the next index from
   * @param itemCount The number of items
   * @param defaultActiveItemId The default active index to fallback to
   */
  function getNextActiveItemId(moveAmount, baseIndex, itemCount, defaultActiveItemId) {
    if (!itemCount) {
      return null;
    }

    if (moveAmount < 0 && (baseIndex === null || defaultActiveItemId !== null && baseIndex === 0)) {
      return itemCount + moveAmount;
    }

    var numericIndex = (baseIndex === null ? -1 : baseIndex) + moveAmount;

    if (numericIndex <= -1 || numericIndex >= itemCount) {
      return defaultActiveItemId === null ? null : 0;
    }

    return numericIndex;
  }

  function getNormalizedSources(getSources, params) {
    var seenSourceIds = [];
    return Promise.resolve(getSources(params)).then(function (sources) {
      invariant(Array.isArray(sources), function () {
        return "The `getSources` function must return an array of sources but returned type ".concat(JSON.stringify(_typeof$1(sources)), ":\n\n").concat(JSON.stringify(decycle(sources), null, 2));
      });
      return Promise.all(sources // We allow `undefined` and `false` sources to allow users to use
      // `Boolean(query) && source` (=> `false`).
      // We need to remove these values at this point.
      .filter(function (maybeSource) {
        return Boolean(maybeSource);
      }).map(function (source) {
        invariant(typeof source.sourceId === 'string', 'A source must provide a `sourceId` string.');

        if (seenSourceIds.includes(source.sourceId)) {
          throw new Error("[Autocomplete] The `sourceId` ".concat(JSON.stringify(source.sourceId), " is not unique."));
        }

        seenSourceIds.push(source.sourceId);

        var normalizedSource = _objectSpread2({
          getItemInputValue: function getItemInputValue(_ref) {
            var state = _ref.state;
            return state.query;
          },
          getItemUrl: function getItemUrl() {
            return undefined;
          },
          onSelect: function onSelect(_ref2) {
            var setIsOpen = _ref2.setIsOpen;
            setIsOpen(false);
          },
          onActive: noop
        }, source);

        return Promise.resolve(normalizedSource);
      }));
    });
  }

  // We don't have access to the autocomplete source when we call `onKeyDown`
  // or `onClick` because those are native browser events.
  // However, we can get the source from the suggestion index.
  function getCollectionFromActiveItemId(state) {
    // Given 3 sources with respectively 1, 2 and 3 suggestions: [1, 2, 3]
    // We want to get the accumulated counts:
    // [1, 1 + 2, 1 + 2 + 3] = [1, 3, 3 + 3] = [1, 3, 6]
    var accumulatedCollectionsCount = state.collections.map(function (collections) {
      return collections.items.length;
    }).reduce(function (acc, collectionsCount, index) {
      var previousValue = acc[index - 1] || 0;
      var nextValue = previousValue + collectionsCount;
      acc.push(nextValue);
      return acc;
    }, []); // Based on the accumulated counts, we can infer the index of the suggestion.

    var collectionIndex = accumulatedCollectionsCount.reduce(function (acc, current) {
      if (current <= state.activeItemId) {
        return acc + 1;
      }

      return acc;
    }, 0);
    return state.collections[collectionIndex];
  }
  /**
   * Gets the highlighted index relative to a suggestion object (not the absolute
   * highlighted index).
   *
   * Example:
   *  [['a', 'b'], ['c', 'd', 'e'], ['f']]
   *                      ↑
   *         (absolute: 3, relative: 1)
   */


  function getRelativeActiveItemId(_ref) {
    var state = _ref.state,
        collection = _ref.collection;
    var isOffsetFound = false;
    var counter = 0;
    var previousItemsOffset = 0;

    while (isOffsetFound === false) {
      var currentCollection = state.collections[counter];

      if (currentCollection === collection) {
        isOffsetFound = true;
        break;
      }

      previousItemsOffset += currentCollection.items.length;
      counter++;
    }

    return state.activeItemId - previousItemsOffset;
  }

  function getActiveItem(state) {
    var collection = getCollectionFromActiveItemId(state);

    if (!collection) {
      return null;
    }

    var item = collection.items[getRelativeActiveItemId({
      state: state,
      collection: collection
    })];
    var source = collection.source;
    var itemInputValue = source.getItemInputValue({
      item: item,
      state: state
    });
    var itemUrl = source.getItemUrl({
      item: item,
      state: state
    });
    return {
      item: item,
      itemInputValue: itemInputValue,
      itemUrl: itemUrl,
      source: source
    };
  }

  function isOrContainsNode(parent, child) {
    return parent === child || parent.contains(child);
  }

  function mapToAlgoliaResponse(rawResults) {
    var results = rawResults.map(function (result) {
      var _hits;

      return _objectSpread2(_objectSpread2({}, result), {}, {
        hits: (_hits = result.hits) === null || _hits === void 0 ? void 0 : _hits.map(function (hit) {
          // Bring support for the Insights plugin.
          return _objectSpread2(_objectSpread2({}, hit), {}, {
            __autocomplete_indexName: result.index,
            __autocomplete_queryID: result.queryID
          });
        })
      });
    });
    return {
      results: results,
      hits: results.map(function (result) {
        return result.hits;
      }).filter(Boolean),
      facetHits: results.map(function (result) {
        var _facetHits;

        return (_facetHits = result.facetHits) === null || _facetHits === void 0 ? void 0 : _facetHits.map(function (facetHit) {
          // Bring support for the highlighting components.
          return {
            label: facetHit.value,
            count: facetHit.count,
            _highlightResult: {
              label: {
                value: facetHit.highlighted
              }
            }
          };
        });
      }).filter(Boolean)
    };
  }

  function createStore(reducer, props, onStoreStateChange) {
    var state = props.initialState;
    return {
      getState: function getState() {
        return state;
      },
      dispatch: function dispatch(action, payload) {
        var prevState = _objectSpread2({}, state);

        state = reducer(state, {
          type: action,
          props: props,
          payload: payload
        });
        onStoreStateChange({
          state: state,
          prevState: prevState
        });
      },
      pendingRequests: createCancelablePromiseList()
    };
  }

  function getAutocompleteSetters(_ref) {
    var store = _ref.store;

    var setActiveItemId = function setActiveItemId(value) {
      store.dispatch('setActiveItemId', value);
    };

    var setQuery = function setQuery(value) {
      store.dispatch('setQuery', value);
    };

    var setCollections = function setCollections(rawValue) {
      var baseItemId = 0;
      var value = rawValue.map(function (collection) {
        return _objectSpread2(_objectSpread2({}, collection), {}, {
          // We flatten the stored items to support calling `getAlgoliaResults`
          // from the source itself.
          items: flatten(collection.items).map(function (item) {
            return _objectSpread2(_objectSpread2({}, item), {}, {
              __autocomplete_id: baseItemId++
            });
          })
        });
      });
      store.dispatch('setCollections', value);
    };

    var setIsOpen = function setIsOpen(value) {
      store.dispatch('setIsOpen', value);
    };

    var setStatus = function setStatus(value) {
      store.dispatch('setStatus', value);
    };

    var setContext = function setContext(value) {
      store.dispatch('setContext', value);
    };

    return {
      setActiveItemId: setActiveItemId,
      setQuery: setQuery,
      setCollections: setCollections,
      setIsOpen: setIsOpen,
      setStatus: setStatus,
      setContext: setContext
    };
  }

  function getDefaultProps(props, pluginSubscribers) {
    var _props$id;

    /* eslint-disable no-restricted-globals */
    var environment = typeof window !== 'undefined' ? window : {};
    /* eslint-enable no-restricted-globals */

    var plugins = props.plugins || [];
    return _objectSpread2(_objectSpread2({
      debug: false,
      openOnFocus: false,
      placeholder: '',
      autoFocus: false,
      defaultActiveItemId: null,
      stallThreshold: 300,
      environment: environment,
      shouldPanelOpen: function shouldPanelOpen(_ref) {
        var state = _ref.state;
        return getItemsCount(state) > 0;
      },
      reshape: function reshape(_ref2) {
        var sources = _ref2.sources;
        return sources;
      }
    }, props), {}, {
      // Since `generateAutocompleteId` triggers a side effect (it increments
      // an internal counter), we don't want to execute it if unnecessary.
      id: (_props$id = props.id) !== null && _props$id !== void 0 ? _props$id : generateAutocompleteId(),
      plugins: plugins,
      // The following props need to be deeply defaulted.
      initialState: _objectSpread2({
        activeItemId: null,
        query: '',
        completion: null,
        collections: [],
        isOpen: false,
        status: 'idle',
        context: {}
      }, props.initialState),
      onStateChange: function onStateChange(params) {
        var _props$onStateChange;

        (_props$onStateChange = props.onStateChange) === null || _props$onStateChange === void 0 ? void 0 : _props$onStateChange.call(props, params);
        plugins.forEach(function (x) {
          var _x$onStateChange;

          return (_x$onStateChange = x.onStateChange) === null || _x$onStateChange === void 0 ? void 0 : _x$onStateChange.call(x, params);
        });
      },
      onSubmit: function onSubmit(params) {
        var _props$onSubmit;

        (_props$onSubmit = props.onSubmit) === null || _props$onSubmit === void 0 ? void 0 : _props$onSubmit.call(props, params);
        plugins.forEach(function (x) {
          var _x$onSubmit;

          return (_x$onSubmit = x.onSubmit) === null || _x$onSubmit === void 0 ? void 0 : _x$onSubmit.call(x, params);
        });
      },
      onReset: function onReset(params) {
        var _props$onReset;

        (_props$onReset = props.onReset) === null || _props$onReset === void 0 ? void 0 : _props$onReset.call(props, params);
        plugins.forEach(function (x) {
          var _x$onReset;

          return (_x$onReset = x.onReset) === null || _x$onReset === void 0 ? void 0 : _x$onReset.call(x, params);
        });
      },
      getSources: function getSources(params) {
        return Promise.all([].concat(_toConsumableArray(plugins.map(function (plugin) {
          return plugin.getSources;
        })), [props.getSources]).filter(Boolean).map(function (getSources) {
          return getNormalizedSources(getSources, params);
        })).then(function (nested) {
          return flatten(nested);
        }).then(function (sources) {
          return sources.map(function (source) {
            return _objectSpread2(_objectSpread2({}, source), {}, {
              onSelect: function onSelect(params) {
                source.onSelect(params);
                pluginSubscribers.forEach(function (x) {
                  var _x$onSelect;

                  return (_x$onSelect = x.onSelect) === null || _x$onSelect === void 0 ? void 0 : _x$onSelect.call(x, params);
                });
              },
              onActive: function onActive(params) {
                source.onActive(params);
                pluginSubscribers.forEach(function (x) {
                  var _x$onActive;

                  return (_x$onActive = x.onActive) === null || _x$onActive === void 0 ? void 0 : _x$onActive.call(x, params);
                });
              }
            });
          });
        });
      },
      navigator: _objectSpread2({
        navigate: function navigate(_ref3) {
          var itemUrl = _ref3.itemUrl;
          environment.location.assign(itemUrl);
        },
        navigateNewTab: function navigateNewTab(_ref4) {
          var itemUrl = _ref4.itemUrl;
          var windowReference = environment.open(itemUrl, '_blank', 'noopener');
          windowReference === null || windowReference === void 0 ? void 0 : windowReference.focus();
        },
        navigateNewWindow: function navigateNewWindow(_ref5) {
          var itemUrl = _ref5.itemUrl;
          environment.open(itemUrl, '_blank', 'noopener');
        }
      }, props.navigator)
    });
  }

  function reshape(_ref) {
    var collections = _ref.collections,
        props = _ref.props,
        state = _ref.state;
    // Sources are grouped by `sourceId` to conveniently pick them via destructuring.
    // Example: `const { recentSearchesPlugin } = sourcesBySourceId`
    var sourcesBySourceId = collections.reduce(function (acc, collection) {
      return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, collection.source.sourceId, _objectSpread2(_objectSpread2({}, collection.source), {}, {
        getItems: function getItems() {
          // We provide the resolved items from the collection to the `reshape` prop.
          return flatten(collection.items);
        }
      })));
    }, {});
    var reshapeSources = props.reshape({
      sources: Object.values(sourcesBySourceId),
      sourcesBySourceId: sourcesBySourceId,
      state: state
    }); // We reconstruct the collections with the items modified by the `reshape` prop.

    return flatten(reshapeSources).filter(Boolean).map(function (source) {
      return {
        source: source,
        items: source.getItems()
      };
    });
  }

  function isDescription(item) {
    return Boolean(item.execute);
  }

  function isRequesterDescription(description) {
    return Boolean(description === null || description === void 0 ? void 0 : description.execute);
  }

  function preResolve(itemsOrDescription, sourceId) {
    if (isRequesterDescription(itemsOrDescription)) {
      return _objectSpread2(_objectSpread2({}, itemsOrDescription), {}, {
        requests: itemsOrDescription.queries.map(function (query) {
          return {
            query: query,
            sourceId: sourceId,
            transformResponse: itemsOrDescription.transformResponse
          };
        })
      });
    }

    return {
      items: itemsOrDescription,
      sourceId: sourceId
    };
  }
  function resolve(items) {
    var packed = items.reduce(function (acc, current) {
      if (!isDescription(current)) {
        acc.push(current);
        return acc;
      }

      var searchClient = current.searchClient,
          execute = current.execute,
          requests = current.requests;
      var container = acc.find(function (item) {
        return isDescription(current) && isDescription(item) && item.searchClient === searchClient && item.execute === execute;
      });

      if (container) {
        var _container$items;

        (_container$items = container.items).push.apply(_container$items, _toConsumableArray(requests));
      } else {
        var request = {
          execute: execute,
          items: requests,
          searchClient: searchClient
        };
        acc.push(request);
      }

      return acc;
    }, []);
    var values = packed.map(function (maybeDescription) {
      if (!isDescription(maybeDescription)) {
        return Promise.resolve(maybeDescription);
      }

      var _ref = maybeDescription,
          execute = _ref.execute,
          items = _ref.items,
          searchClient = _ref.searchClient;
      return execute({
        searchClient: searchClient,
        requests: items
      });
    });
    return Promise.all(values).then(function (responses) {
      return flatten(responses);
    });
  }
  function postResolve(responses, sources) {
    return sources.map(function (source) {
      var matches = responses.filter(function (response) {
        return response.sourceId === source.sourceId;
      });
      var results = matches.map(function (_ref2) {
        var items = _ref2.items;
        return items;
      });
      var transform = matches[0].transformResponse;
      var items = transform ? transform(mapToAlgoliaResponse(results)) : results;
      invariant(Array.isArray(items), function () {
        return "The `getItems` function from source \"".concat(source.sourceId, "\" must return an array of items but returned type ").concat(JSON.stringify(_typeof$1(items)), ":\n\n").concat(JSON.stringify(decycle(items), null, 2), ".\n\nSee: https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/sources/#param-getitems");
      });
      invariant(items.every(Boolean), "The `getItems` function from source \"".concat(source.sourceId, "\" must return an array of items but returned ").concat(JSON.stringify(undefined), ".\n\nDid you forget to return items?\n\nSee: https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/sources/#param-getitems"));
      return {
        source: source,
        items: items
      };
    });
  }

  var _excluded$2 = ["event", "nextState", "props", "query", "refresh", "store"];
  var lastStalledId = null;
  var runConcurrentSafePromise = createConcurrentSafePromise();
  function onInput(_ref) {
    var event = _ref.event,
        _ref$nextState = _ref.nextState,
        nextState = _ref$nextState === void 0 ? {} : _ref$nextState,
        props = _ref.props,
        query = _ref.query,
        refresh = _ref.refresh,
        store = _ref.store,
        setters = _objectWithoutProperties(_ref, _excluded$2);

    if (lastStalledId) {
      props.environment.clearTimeout(lastStalledId);
    }

    var setCollections = setters.setCollections,
        setIsOpen = setters.setIsOpen,
        setQuery = setters.setQuery,
        setActiveItemId = setters.setActiveItemId,
        setStatus = setters.setStatus;
    setQuery(query);
    setActiveItemId(props.defaultActiveItemId);

    if (!query && props.openOnFocus === false) {
      var _nextState$isOpen;

      var collections = store.getState().collections.map(function (collection) {
        return _objectSpread2(_objectSpread2({}, collection), {}, {
          items: []
        });
      });
      setStatus('idle');
      setCollections(collections);
      setIsOpen((_nextState$isOpen = nextState.isOpen) !== null && _nextState$isOpen !== void 0 ? _nextState$isOpen : props.shouldPanelOpen({
        state: store.getState()
      })); // We make sure to update the latest resolved value of the tracked
      // promises to keep late resolving promises from "cancelling" the state
      // updates performed in this code path.
      // We chain with a void promise to respect `onInput`'s expected return type.

      var _request = cancelable(runConcurrentSafePromise(collections).then(function () {
        return Promise.resolve();
      }));

      return store.pendingRequests.add(_request);
    }

    setStatus('loading');
    lastStalledId = props.environment.setTimeout(function () {
      setStatus('stalled');
    }, props.stallThreshold); // We track the entire promise chain triggered by `onInput` before mutating
    // the Autocomplete state to make sure that any state manipulation is based on
    // fresh data regardless of when promises individually resolve.
    // We don't track nested promises and only rely on the full chain resolution,
    // meaning we should only ever manipulate the state once this concurrent-safe
    // promise is resolved.

    var request = cancelable(runConcurrentSafePromise(props.getSources(_objectSpread2({
      query: query,
      refresh: refresh,
      state: store.getState()
    }, setters)).then(function (sources) {
      return Promise.all(sources.map(function (source) {
        return Promise.resolve(source.getItems(_objectSpread2({
          query: query,
          refresh: refresh,
          state: store.getState()
        }, setters))).then(function (itemsOrDescription) {
          return preResolve(itemsOrDescription, source.sourceId);
        });
      })).then(resolve).then(function (responses) {
        return postResolve(responses, sources);
      }).then(function (collections) {
        return reshape({
          collections: collections,
          props: props,
          state: store.getState()
        });
      });
    }))).then(function (collections) {
      var _nextState$isOpen2;

      // Parameters passed to `onInput` could be stale when the following code
      // executes, because `onInput` calls may not resolve in order.
      // If it becomes a problem we'll need to save the last passed parameters.
      // See: https://codesandbox.io/s/agitated-cookies-y290z
      setStatus('idle');
      setCollections(collections);
      var isPanelOpen = props.shouldPanelOpen({
        state: store.getState()
      });
      setIsOpen((_nextState$isOpen2 = nextState.isOpen) !== null && _nextState$isOpen2 !== void 0 ? _nextState$isOpen2 : props.openOnFocus && !query && isPanelOpen || isPanelOpen);
      var highlightedItem = getActiveItem(store.getState());

      if (store.getState().activeItemId !== null && highlightedItem) {
        var item = highlightedItem.item,
            itemInputValue = highlightedItem.itemInputValue,
            itemUrl = highlightedItem.itemUrl,
            source = highlightedItem.source;
        source.onActive(_objectSpread2({
          event: event,
          item: item,
          itemInputValue: itemInputValue,
          itemUrl: itemUrl,
          refresh: refresh,
          source: source,
          state: store.getState()
        }, setters));
      }
    }).finally(function () {
      setStatus('idle');

      if (lastStalledId) {
        props.environment.clearTimeout(lastStalledId);
      }
    });
    return store.pendingRequests.add(request);
  }

  var _excluded$1 = ["event", "props", "refresh", "store"];
  function onKeyDown(_ref) {
    var event = _ref.event,
        props = _ref.props,
        refresh = _ref.refresh,
        store = _ref.store,
        setters = _objectWithoutProperties(_ref, _excluded$1);

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      // eslint-disable-next-line no-inner-declarations
      var triggerScrollIntoView = function triggerScrollIntoView() {
        var nodeItem = props.environment.document.getElementById("".concat(props.id, "-item-").concat(store.getState().activeItemId));

        if (nodeItem) {
          if (nodeItem.scrollIntoViewIfNeeded) {
            nodeItem.scrollIntoViewIfNeeded(false);
          } else {
            nodeItem.scrollIntoView(false);
          }
        }
      }; // eslint-disable-next-line no-inner-declarations


      var triggerOnActive = function triggerOnActive() {
        var highlightedItem = getActiveItem(store.getState());

        if (store.getState().activeItemId !== null && highlightedItem) {
          var item = highlightedItem.item,
              itemInputValue = highlightedItem.itemInputValue,
              itemUrl = highlightedItem.itemUrl,
              source = highlightedItem.source;
          source.onActive(_objectSpread2({
            event: event,
            item: item,
            itemInputValue: itemInputValue,
            itemUrl: itemUrl,
            refresh: refresh,
            source: source,
            state: store.getState()
          }, setters));
        }
      }; // Default browser behavior changes the caret placement on ArrowUp and
      // ArrowDown.


      event.preventDefault(); // When re-opening the panel, we need to split the logic to keep the actions
      // synchronized as `onInput` returns a promise.

      if (store.getState().isOpen === false && (props.openOnFocus || Boolean(store.getState().query))) {
        onInput(_objectSpread2({
          event: event,
          props: props,
          query: store.getState().query,
          refresh: refresh,
          store: store
        }, setters)).then(function () {
          store.dispatch(event.key, {
            nextActiveItemId: props.defaultActiveItemId
          });
          triggerOnActive(); // Since we rely on the DOM, we need to wait for all the micro tasks to
          // finish (which include re-opening the panel) to make sure all the
          // elements are available.

          setTimeout(triggerScrollIntoView, 0);
        });
      } else {
        store.dispatch(event.key, {});
        triggerOnActive();
        triggerScrollIntoView();
      }
    } else if (event.key === 'Escape') {
      // This prevents the default browser behavior on `input[type="search"]`
      // from removing the query right away because we first want to close the
      // panel.
      event.preventDefault();
      store.dispatch(event.key, null); // Hitting the `Escape` key signals the end of a user interaction with the
      // autocomplete. At this point, we should ignore any requests that are still
      // pending and could reopen the panel once they resolve, because that would
      // result in an unsolicited UI behavior.

      store.pendingRequests.cancelAll();
    } else if (event.key === 'Enter') {
      // No active item, so we let the browser handle the native `onSubmit` form
      // event.
      if (store.getState().activeItemId === null || store.getState().collections.every(function (collection) {
        return collection.items.length === 0;
      })) {
        return;
      } // This prevents the `onSubmit` event to be sent because an item is
      // highlighted.


      event.preventDefault();

      var _ref2 = getActiveItem(store.getState()),
          item = _ref2.item,
          itemInputValue = _ref2.itemInputValue,
          itemUrl = _ref2.itemUrl,
          source = _ref2.source;

      if (event.metaKey || event.ctrlKey) {
        if (itemUrl !== undefined) {
          source.onSelect(_objectSpread2({
            event: event,
            item: item,
            itemInputValue: itemInputValue,
            itemUrl: itemUrl,
            refresh: refresh,
            source: source,
            state: store.getState()
          }, setters));
          props.navigator.navigateNewTab({
            itemUrl: itemUrl,
            item: item,
            state: store.getState()
          });
        }
      } else if (event.shiftKey) {
        if (itemUrl !== undefined) {
          source.onSelect(_objectSpread2({
            event: event,
            item: item,
            itemInputValue: itemInputValue,
            itemUrl: itemUrl,
            refresh: refresh,
            source: source,
            state: store.getState()
          }, setters));
          props.navigator.navigateNewWindow({
            itemUrl: itemUrl,
            item: item,
            state: store.getState()
          });
        }
      } else if (event.altKey) ; else {
        if (itemUrl !== undefined) {
          source.onSelect(_objectSpread2({
            event: event,
            item: item,
            itemInputValue: itemInputValue,
            itemUrl: itemUrl,
            refresh: refresh,
            source: source,
            state: store.getState()
          }, setters));
          props.navigator.navigate({
            itemUrl: itemUrl,
            item: item,
            state: store.getState()
          });
          return;
        }

        onInput(_objectSpread2({
          event: event,
          nextState: {
            isOpen: false
          },
          props: props,
          query: itemInputValue,
          refresh: refresh,
          store: store
        }, setters)).then(function () {
          source.onSelect(_objectSpread2({
            event: event,
            item: item,
            itemInputValue: itemInputValue,
            itemUrl: itemUrl,
            refresh: refresh,
            source: source,
            state: store.getState()
          }, setters));
        });
      }
    }
  }

  var _excluded = ["props", "refresh", "store"],
      _excluded2 = ["inputElement", "formElement", "panelElement"],
      _excluded3 = ["inputElement"],
      _excluded4 = ["inputElement", "maxLength"],
      _excluded5 = ["item", "source"];
  function getPropGetters(_ref) {
    var props = _ref.props,
        refresh = _ref.refresh,
        store = _ref.store,
        setters = _objectWithoutProperties(_ref, _excluded);

    var getEnvironmentProps = function getEnvironmentProps(providedProps) {
      var inputElement = providedProps.inputElement,
          formElement = providedProps.formElement,
          panelElement = providedProps.panelElement,
          rest = _objectWithoutProperties(providedProps, _excluded2);

      return _objectSpread2({
        // On touch devices, we do not rely on the native `blur` event of the
        // input to close the panel, but rather on a custom `touchstart` event
        // outside of the autocomplete elements.
        // This ensures a working experience on mobile because we blur the input
        // on touch devices when the user starts scrolling (`touchmove`).
        // @TODO: support cases where there are multiple Autocomplete instances.
        // Right now, a second instance makes this computation return false.
        onTouchStart: function onTouchStart(event) {
          // The `onTouchStart` event shouldn't trigger the `blur` handler when
          // it's not an interaction with Autocomplete. We detect it with the
          // following heuristics:
          // - the panel is closed AND there are no pending requests
          //   (no interaction with the autocomplete, no future state updates)
          // - OR the touched target is the input element (should open the panel)
          var isAutocompleteInteraction = store.getState().isOpen || !store.pendingRequests.isEmpty();

          if (!isAutocompleteInteraction || event.target === inputElement) {
            return;
          }

          var isTargetWithinAutocomplete = [formElement, panelElement].some(function (contextNode) {
            return isOrContainsNode(contextNode, event.target);
          });

          if (isTargetWithinAutocomplete === false) {
            store.dispatch('blur', null); // If requests are still pending when the user closes the panel, they
            // could reopen the panel once they resolve.
            // We want to prevent any subsequent query from reopening the panel
            // because it would result in an unsolicited UI behavior.

            if (!props.debug) {
              store.pendingRequests.cancelAll();
            }
          }
        },
        // When scrolling on touch devices (mobiles, tablets, etc.), we want to
        // mimic the native platform behavior where the input is blurred to
        // hide the virtual keyboard. This gives more vertical space to
        // discover all the suggestions showing up in the panel.
        onTouchMove: function onTouchMove(event) {
          if (store.getState().isOpen === false || inputElement !== props.environment.document.activeElement || event.target === inputElement) {
            return;
          }

          inputElement.blur();
        }
      }, rest);
    };

    var getRootProps = function getRootProps(rest) {
      return _objectSpread2({
        role: 'combobox',
        'aria-expanded': store.getState().isOpen,
        'aria-haspopup': 'listbox',
        'aria-owns': store.getState().isOpen ? "".concat(props.id, "-list") : undefined,
        'aria-labelledby': "".concat(props.id, "-label")
      }, rest);
    };

    var getFormProps = function getFormProps(providedProps) {
      providedProps.inputElement;
          var rest = _objectWithoutProperties(providedProps, _excluded3);

      return _objectSpread2({
        action: '',
        noValidate: true,
        role: 'search',
        onSubmit: function onSubmit(event) {
          var _providedProps$inputE;

          event.preventDefault();
          props.onSubmit(_objectSpread2({
            event: event,
            refresh: refresh,
            state: store.getState()
          }, setters));
          store.dispatch('submit', null);
          (_providedProps$inputE = providedProps.inputElement) === null || _providedProps$inputE === void 0 ? void 0 : _providedProps$inputE.blur();
        },
        onReset: function onReset(event) {
          var _providedProps$inputE2;

          event.preventDefault();
          props.onReset(_objectSpread2({
            event: event,
            refresh: refresh,
            state: store.getState()
          }, setters));
          store.dispatch('reset', null);
          (_providedProps$inputE2 = providedProps.inputElement) === null || _providedProps$inputE2 === void 0 ? void 0 : _providedProps$inputE2.focus();
        }
      }, rest);
    };

    var getInputProps = function getInputProps(providedProps) {
      function onFocus(event) {
        // We want to trigger a query when `openOnFocus` is true
        // because the panel should open with the current query.
        if (props.openOnFocus || Boolean(store.getState().query)) {
          onInput(_objectSpread2({
            event: event,
            props: props,
            query: store.getState().completion || store.getState().query,
            refresh: refresh,
            store: store
          }, setters));
        }

        store.dispatch('focus', null);
      }

      var isTouchDevice = ('ontouchstart' in props.environment);

      var _ref2 = providedProps || {};
          _ref2.inputElement;
          var _ref2$maxLength = _ref2.maxLength,
          maxLength = _ref2$maxLength === void 0 ? 512 : _ref2$maxLength,
          rest = _objectWithoutProperties(_ref2, _excluded4);

      var activeItem = getActiveItem(store.getState());
      return _objectSpread2({
        'aria-autocomplete': 'both',
        'aria-activedescendant': store.getState().isOpen && store.getState().activeItemId !== null ? "".concat(props.id, "-item-").concat(store.getState().activeItemId) : undefined,
        'aria-controls': store.getState().isOpen ? "".concat(props.id, "-list") : undefined,
        'aria-labelledby': "".concat(props.id, "-label"),
        value: store.getState().completion || store.getState().query,
        id: "".concat(props.id, "-input"),
        autoComplete: 'off',
        autoCorrect: 'off',
        autoCapitalize: 'off',
        enterKeyHint: activeItem !== null && activeItem !== void 0 && activeItem.itemUrl ? 'go' : 'search',
        spellCheck: 'false',
        autoFocus: props.autoFocus,
        placeholder: props.placeholder,
        maxLength: maxLength,
        type: 'search',
        onChange: function onChange(event) {
          onInput(_objectSpread2({
            event: event,
            props: props,
            query: event.currentTarget.value.slice(0, maxLength),
            refresh: refresh,
            store: store
          }, setters));
        },
        onKeyDown: function onKeyDown$1(event) {
          onKeyDown(_objectSpread2({
            event: event,
            props: props,
            refresh: refresh,
            store: store
          }, setters));
        },
        onFocus: onFocus,
        onBlur: function onBlur() {
          // We do rely on the `blur` event on touch devices.
          // See explanation in `onTouchStart`.
          if (!isTouchDevice) {
            store.dispatch('blur', null); // If requests are still pending when the user closes the panel, they
            // could reopen the panel once they resolve.
            // We want to prevent any subsequent query from reopening the panel
            // because it would result in an unsolicited UI behavior.

            if (!props.debug) {
              store.pendingRequests.cancelAll();
            }
          }
        },
        onClick: function onClick(event) {
          // When the panel is closed and you click on the input while
          // the input is focused, the `onFocus` event is not triggered
          // (default browser behavior).
          // In an autocomplete context, it makes sense to open the panel in this
          // case.
          // We mimic this event by catching the `onClick` event which
          // triggers the `onFocus` for the panel to open.
          if (providedProps.inputElement === props.environment.document.activeElement && !store.getState().isOpen) {
            onFocus(event);
          }
        }
      }, rest);
    };

    var getLabelProps = function getLabelProps(rest) {
      return _objectSpread2({
        htmlFor: "".concat(props.id, "-input"),
        id: "".concat(props.id, "-label")
      }, rest);
    };

    var getListProps = function getListProps(rest) {
      return _objectSpread2({
        role: 'listbox',
        'aria-labelledby': "".concat(props.id, "-label"),
        id: "".concat(props.id, "-list")
      }, rest);
    };

    var getPanelProps = function getPanelProps(rest) {
      return _objectSpread2({
        onMouseDown: function onMouseDown(event) {
          // Prevents the `activeElement` from being changed to the panel so
          // that the blur event is not triggered, otherwise it closes the
          // panel.
          event.preventDefault();
        },
        onMouseLeave: function onMouseLeave() {
          store.dispatch('mouseleave', null);
        }
      }, rest);
    };

    var getItemProps = function getItemProps(providedProps) {
      var item = providedProps.item,
          source = providedProps.source,
          rest = _objectWithoutProperties(providedProps, _excluded5);

      return _objectSpread2({
        id: "".concat(props.id, "-item-").concat(item.__autocomplete_id),
        role: 'option',
        'aria-selected': store.getState().activeItemId === item.__autocomplete_id,
        onMouseMove: function onMouseMove(event) {
          if (item.__autocomplete_id === store.getState().activeItemId) {
            return;
          }

          store.dispatch('mousemove', item.__autocomplete_id);
          var activeItem = getActiveItem(store.getState());

          if (store.getState().activeItemId !== null && activeItem) {
            var _item = activeItem.item,
                itemInputValue = activeItem.itemInputValue,
                itemUrl = activeItem.itemUrl,
                _source = activeItem.source;

            _source.onActive(_objectSpread2({
              event: event,
              item: _item,
              itemInputValue: itemInputValue,
              itemUrl: itemUrl,
              refresh: refresh,
              source: _source,
              state: store.getState()
            }, setters));
          }
        },
        onMouseDown: function onMouseDown(event) {
          // Prevents the `activeElement` from being changed to the item so it
          // can remain with the current `activeElement`.
          event.preventDefault();
        },
        onClick: function onClick(event) {
          var itemInputValue = source.getItemInputValue({
            item: item,
            state: store.getState()
          });
          var itemUrl = source.getItemUrl({
            item: item,
            state: store.getState()
          }); // If `getItemUrl` is provided, it means that the suggestion
          // is a link, not plain text that aims at updating the query.
          // We can therefore skip the state change because it will update
          // the `activeItemId`, resulting in a UI flash, especially
          // noticeable on mobile.

          var runPreCommand = itemUrl ? Promise.resolve() : onInput(_objectSpread2({
            event: event,
            nextState: {
              isOpen: false
            },
            props: props,
            query: itemInputValue,
            refresh: refresh,
            store: store
          }, setters));
          runPreCommand.then(function () {
            source.onSelect(_objectSpread2({
              event: event,
              item: item,
              itemInputValue: itemInputValue,
              itemUrl: itemUrl,
              refresh: refresh,
              source: source,
              state: store.getState()
            }, setters));
          });
        }
      }, rest);
    };

    return {
      getEnvironmentProps: getEnvironmentProps,
      getRootProps: getRootProps,
      getFormProps: getFormProps,
      getLabelProps: getLabelProps,
      getInputProps: getInputProps,
      getPanelProps: getPanelProps,
      getListProps: getListProps,
      getItemProps: getItemProps
    };
  }

  function getMetadata(_ref) {
    var _, _options$__autocomple, _options$__autocomple2, _options$__autocomple3;

    var plugins = _ref.plugins,
        options = _ref.options;
    var optionsKey = (_ = (((_options$__autocomple = options.__autocomplete_metadata) === null || _options$__autocomple === void 0 ? void 0 : _options$__autocomple.userAgents) || [])[0]) === null || _ === void 0 ? void 0 : _.segment;
    var extraOptions = optionsKey ? _defineProperty({}, optionsKey, Object.keys(((_options$__autocomple2 = options.__autocomplete_metadata) === null || _options$__autocomple2 === void 0 ? void 0 : _options$__autocomple2.options) || {})) : {};
    return {
      plugins: plugins.map(function (plugin) {
        return {
          name: plugin.name,
          options: Object.keys(plugin.__autocomplete_pluginOptions || [])
        };
      }),
      options: _objectSpread2({
        'autocomplete-core': Object.keys(options)
      }, extraOptions),
      ua: userAgents.concat(((_options$__autocomple3 = options.__autocomplete_metadata) === null || _options$__autocomple3 === void 0 ? void 0 : _options$__autocomple3.userAgents) || [])
    };
  }
  function injectMetadata(_ref3) {
    var _environment$navigato;

    var metadata = _ref3.metadata,
        environment = _ref3.environment;
    var isMetadataEnabled = (_environment$navigato = environment.navigator) === null || _environment$navigato === void 0 ? void 0 : _environment$navigato.userAgent.includes('Algolia Crawler');

    if (isMetadataEnabled) {
      var metadataContainer = environment.document.createElement('meta');
      var headRef = environment.document.querySelector('head');
      metadataContainer.name = 'algolia:metadata';
      setTimeout(function () {
        metadataContainer.content = JSON.stringify(metadata);
        headRef.appendChild(metadataContainer);
      }, 0);
    }
  }

  function getCompletion(_ref) {
    var _getActiveItem;

    var state = _ref.state;

    if (state.isOpen === false || state.activeItemId === null) {
      return null;
    }

    return ((_getActiveItem = getActiveItem(state)) === null || _getActiveItem === void 0 ? void 0 : _getActiveItem.itemInputValue) || null;
  }

  var stateReducer = function stateReducer(state, action) {
    switch (action.type) {
      case 'setActiveItemId':
        {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            activeItemId: action.payload
          });
        }

      case 'setQuery':
        {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            query: action.payload,
            completion: null
          });
        }

      case 'setCollections':
        {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            collections: action.payload
          });
        }

      case 'setIsOpen':
        {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            isOpen: action.payload
          });
        }

      case 'setStatus':
        {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            status: action.payload
          });
        }

      case 'setContext':
        {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            context: _objectSpread2(_objectSpread2({}, state.context), action.payload)
          });
        }

      case 'ArrowDown':
        {
          var nextState = _objectSpread2(_objectSpread2({}, state), {}, {
            activeItemId: action.payload.hasOwnProperty('nextActiveItemId') ? action.payload.nextActiveItemId : getNextActiveItemId(1, state.activeItemId, getItemsCount(state), action.props.defaultActiveItemId)
          });

          return _objectSpread2(_objectSpread2({}, nextState), {}, {
            completion: getCompletion({
              state: nextState
            })
          });
        }

      case 'ArrowUp':
        {
          var _nextState = _objectSpread2(_objectSpread2({}, state), {}, {
            activeItemId: getNextActiveItemId(-1, state.activeItemId, getItemsCount(state), action.props.defaultActiveItemId)
          });

          return _objectSpread2(_objectSpread2({}, _nextState), {}, {
            completion: getCompletion({
              state: _nextState
            })
          });
        }

      case 'Escape':
        {
          if (state.isOpen) {
            return _objectSpread2(_objectSpread2({}, state), {}, {
              activeItemId: null,
              isOpen: false,
              completion: null
            });
          }

          return _objectSpread2(_objectSpread2({}, state), {}, {
            activeItemId: null,
            query: '',
            status: 'idle',
            collections: []
          });
        }

      case 'submit':
        {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            activeItemId: null,
            isOpen: false,
            status: 'idle'
          });
        }

      case 'reset':
        {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            activeItemId: // Since we open the panel on reset when openOnFocus=true
            // we need to restore the highlighted index to the defaultActiveItemId. (DocSearch use-case)
            // Since we close the panel when openOnFocus=false
            // we lose track of the highlighted index. (Query-suggestions use-case)
            action.props.openOnFocus === true ? action.props.defaultActiveItemId : null,
            status: 'idle',
            query: ''
          });
        }

      case 'focus':
        {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            activeItemId: action.props.defaultActiveItemId,
            isOpen: (action.props.openOnFocus || Boolean(state.query)) && action.props.shouldPanelOpen({
              state: state
            })
          });
        }

      case 'blur':
        {
          if (action.props.debug) {
            return state;
          }

          return _objectSpread2(_objectSpread2({}, state), {}, {
            isOpen: false,
            activeItemId: null
          });
        }

      case 'mousemove':
        {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            activeItemId: action.payload
          });
        }

      case 'mouseleave':
        {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            activeItemId: action.props.defaultActiveItemId
          });
        }

      default:
        invariant(false, "The reducer action ".concat(JSON.stringify(action.type), " is not supported."));
        return state;
    }
  };

  function createAutocomplete(options) {
    checkOptions(options);
    var subscribers = [];
    var props = getDefaultProps(options, subscribers);
    var store = createStore(stateReducer, props, onStoreStateChange);
    var setters = getAutocompleteSetters({
      store: store
    });
    var propGetters = getPropGetters(_objectSpread2({
      props: props,
      refresh: refresh,
      store: store
    }, setters));

    function onStoreStateChange(_ref) {
      var prevState = _ref.prevState,
          state = _ref.state;
      props.onStateChange(_objectSpread2({
        prevState: prevState,
        state: state,
        refresh: refresh
      }, setters));
    }

    function refresh() {
      return onInput(_objectSpread2({
        event: new Event('input'),
        nextState: {
          isOpen: store.getState().isOpen
        },
        props: props,
        query: store.getState().query,
        refresh: refresh,
        store: store
      }, setters));
    }

    props.plugins.forEach(function (plugin) {
      var _plugin$subscribe;

      return (_plugin$subscribe = plugin.subscribe) === null || _plugin$subscribe === void 0 ? void 0 : _plugin$subscribe.call(plugin, _objectSpread2(_objectSpread2({}, setters), {}, {
        refresh: refresh,
        onSelect: function onSelect(fn) {
          subscribers.push({
            onSelect: fn
          });
        },
        onActive: function onActive(fn) {
          subscribers.push({
            onActive: fn
          });
        }
      }));
    });
    injectMetadata({
      metadata: getMetadata({
        plugins: props.plugins,
        options: options
      }),
      environment: props.environment
    });
    return _objectSpread2(_objectSpread2({
      refresh: refresh
    }, propGetters), setters);
  }

  exports.createAutocomplete = createAutocomplete;
  exports.getDefaultProps = getDefaultProps;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.development.js.map
