var _excluded = ["event", "nextState", "props", "query", "refresh", "store"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { reshape } from './reshape';
import { preResolve, resolve, postResolve } from './resolve';
import { cancelable, createConcurrentSafePromise, getActiveItem } from './utils';
var lastStalledId = null;
var runConcurrentSafePromise = createConcurrentSafePromise();
export function onInput(_ref) {
  var event = _ref.event,
      _ref$nextState = _ref.nextState,
      nextState = _ref$nextState === void 0 ? {} : _ref$nextState,
      props = _ref.props,
      query = _ref.query,
      refresh = _ref.refresh,
      store = _ref.store,
      setters = _objectWithoutProperties(_ref, _excluded);

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
      return _objectSpread(_objectSpread({}, collection), {}, {
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

  var request = cancelable(runConcurrentSafePromise(props.getSources(_objectSpread({
    query: query,
    refresh: refresh,
    state: store.getState()
  }, setters)).then(function (sources) {
    return Promise.all(sources.map(function (source) {
      return Promise.resolve(source.getItems(_objectSpread({
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
      source.onActive(_objectSpread({
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