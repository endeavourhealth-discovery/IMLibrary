!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("preact")):"function"==typeof define&&define.amd?define(["exports","preact"],t):t(n.preactHooks={},n.preact)}(this,function(n,t){var u,o,r,i=0,c=[],f=t.options.__b,e=t.options.__r,a=t.options.diffed,v=t.options.__c,p=t.options.unmount;function l(n,u){t.options.__h&&t.options.__h(o,n,i||u),i=0;var r=o.__H||(o.__H={__:[],__h:[]});return n>=r.__.length&&r.__.push({}),r.__[n]}function m(n){return i=1,y(F,n)}function y(n,t,r){var i=l(u++,2);return i.t=n,i.__c||(i.__=[r?r(t):F(void 0,t),function(n){var t=i.t(i.__[0],n);i.__[0]!==t&&(i.__=[t,i.__[1]],i.__c.setState({}))}],i.__c=o),i.__}function d(n,r){var i=l(u++,4);!t.options.__s&&A(i.__H,r)&&(i.__=n,i.__H=r,o.__h.push(i))}function s(n,t){var o=l(u++,7);return A(o.__H,t)&&(o.__=n(),o.__H=t,o.__h=n),o.__}function h(){for(var n;n=c.shift();)if(n.__P)try{n.__H.__h.forEach(q),n.__H.__h.forEach(x),n.__H.__h=[]}catch(u){n.__H.__h=[],t.options.__e(u,n.__v)}}t.options.__b=function(n){o=null,f&&f(n)},t.options.__r=function(n){e&&e(n),u=0;var t=(o=n.__c).__H;t&&(t.__h.forEach(q),t.__h.forEach(x),t.__h=[])},t.options.diffed=function(n){a&&a(n);var u=n.__c;u&&u.__H&&u.__H.__h.length&&(1!==c.push(u)&&r===t.options.requestAnimationFrame||((r=t.options.requestAnimationFrame)||function(n){var t,u=function(){clearTimeout(o),_&&cancelAnimationFrame(t),setTimeout(n)},o=setTimeout(u,100);_&&(t=requestAnimationFrame(u))})(h)),o=null},t.options.__c=function(n,u){u.some(function(n){try{n.__h.forEach(q),n.__h=n.__h.filter(function(n){return!n.__||x(n)})}catch(o){u.some(function(n){n.__h&&(n.__h=[])}),u=[],t.options.__e(o,n.__v)}}),v&&v(n,u)},t.options.unmount=function(n){p&&p(n);var u,o=n.__c;o&&o.__H&&(o.__H.__.forEach(function(n){try{q(n)}catch(n){u=n}}),u&&t.options.__e(u,o.__v))};var _="function"==typeof requestAnimationFrame;function q(n){var t=o,u=n.__c;"function"==typeof u&&(n.__c=void 0,u()),o=t}function x(n){var t=o;n.__c=n.__(),o=t}function A(n,t){return!n||n.length!==t.length||t.some(function(t,u){return t!==n[u]})}function F(n,t){return"function"==typeof t?t(n):t}n.useState=m,n.useReducer=y,n.useEffect=function(n,r){var i=l(u++,3);!t.options.__s&&A(i.__H,r)&&(i.__=n,i.__H=r,o.__H.__h.push(i))},n.useLayoutEffect=d,n.useRef=function(n){return i=5,s(function(){return{current:n}},[])},n.useImperativeHandle=function(n,t,u){i=6,d(function(){"function"==typeof n?n(t()):n&&(n.current=t())},null==u?u:u.concat(n))},n.useMemo=s,n.useCallback=function(n,t){return i=8,s(function(){return n},t)},n.useContext=function(n){var t=o.context[n.__c],r=l(u++,9);return r.c=n,t?(null==r.__&&(r.__=!0,t.sub(o)),t.props.value):n.__},n.useDebugValue=function(n,u){t.options.useDebugValue&&t.options.useDebugValue(u?u(n):n)},n.useErrorBoundary=function(n){var t=l(u++,10),r=m();return t.__=n,o.componentDidCatch||(o.componentDidCatch=function(n){t.__&&t.__(n),r[1](n)}),[r[0],function(){r[1](void 0)}]}});
//# sourceMappingURL=hooks.umd.js.map
