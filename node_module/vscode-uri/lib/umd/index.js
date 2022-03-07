!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r=e();for(var n in r)("object"==typeof exports?exports:t)[n]=r[n]}}(this,(function(){return(()=>{"use strict";var t={470:t=>{function e(t){if("string"!=typeof t)throw new TypeError("Path must be a string. Received "+JSON.stringify(t))}function r(t,e){for(var r,n="",o=0,i=-1,a=0,s=0;s<=t.length;++s){if(s<t.length)r=t.charCodeAt(s);else{if(47===r)break;r=47}if(47===r){if(i===s-1||1===a);else if(i!==s-1&&2===a){if(n.length<2||2!==o||46!==n.charCodeAt(n.length-1)||46!==n.charCodeAt(n.length-2))if(n.length>2){var h=n.lastIndexOf("/");if(h!==n.length-1){-1===h?(n="",o=0):o=(n=n.slice(0,h)).length-1-n.lastIndexOf("/"),i=s,a=0;continue}}else if(2===n.length||1===n.length){n="",o=0,i=s,a=0;continue}e&&(n.length>0?n+="/..":n="..",o=2)}else n.length>0?n+="/"+t.slice(i+1,s):n=t.slice(i+1,s),o=s-i-1;i=s,a=0}else 46===r&&-1!==a?++a:a=-1}return n}var n={resolve:function(){for(var t,n="",o=!1,i=arguments.length-1;i>=-1&&!o;i--){var a;i>=0?a=arguments[i]:(void 0===t&&(t=process.cwd()),a=t),e(a),0!==a.length&&(n=a+"/"+n,o=47===a.charCodeAt(0))}return n=r(n,!o),o?n.length>0?"/"+n:"/":n.length>0?n:"."},normalize:function(t){if(e(t),0===t.length)return".";var n=47===t.charCodeAt(0),o=47===t.charCodeAt(t.length-1);return 0!==(t=r(t,!n)).length||n||(t="."),t.length>0&&o&&(t+="/"),n?"/"+t:t},isAbsolute:function(t){return e(t),t.length>0&&47===t.charCodeAt(0)},join:function(){if(0===arguments.length)return".";for(var t,r=0;r<arguments.length;++r){var o=arguments[r];e(o),o.length>0&&(void 0===t?t=o:t+="/"+o)}return void 0===t?".":n.normalize(t)},relative:function(t,r){if(e(t),e(r),t===r)return"";if((t=n.resolve(t))===(r=n.resolve(r)))return"";for(var o=1;o<t.length&&47===t.charCodeAt(o);++o);for(var i=t.length,a=i-o,s=1;s<r.length&&47===r.charCodeAt(s);++s);for(var h=r.length-s,c=a<h?a:h,f=-1,u=0;u<=c;++u){if(u===c){if(h>c){if(47===r.charCodeAt(s+u))return r.slice(s+u+1);if(0===u)return r.slice(s+u)}else a>c&&(47===t.charCodeAt(o+u)?f=u:0===u&&(f=0));break}var l=t.charCodeAt(o+u);if(l!==r.charCodeAt(s+u))break;47===l&&(f=u)}var p="";for(u=o+f+1;u<=i;++u)u!==i&&47!==t.charCodeAt(u)||(0===p.length?p+="..":p+="/..");return p.length>0?p+r.slice(s+f):(s+=f,47===r.charCodeAt(s)&&++s,r.slice(s))},_makeLong:function(t){return t},dirname:function(t){if(e(t),0===t.length)return".";for(var r=t.charCodeAt(0),n=47===r,o=-1,i=!0,a=t.length-1;a>=1;--a)if(47===(r=t.charCodeAt(a))){if(!i){o=a;break}}else i=!1;return-1===o?n?"/":".":n&&1===o?"//":t.slice(0,o)},basename:function(t,r){if(void 0!==r&&"string"!=typeof r)throw new TypeError('"ext" argument must be a string');e(t);var n,o=0,i=-1,a=!0;if(void 0!==r&&r.length>0&&r.length<=t.length){if(r.length===t.length&&r===t)return"";var s=r.length-1,h=-1;for(n=t.length-1;n>=0;--n){var c=t.charCodeAt(n);if(47===c){if(!a){o=n+1;break}}else-1===h&&(a=!1,h=n+1),s>=0&&(c===r.charCodeAt(s)?-1==--s&&(i=n):(s=-1,i=h))}return o===i?i=h:-1===i&&(i=t.length),t.slice(o,i)}for(n=t.length-1;n>=0;--n)if(47===t.charCodeAt(n)){if(!a){o=n+1;break}}else-1===i&&(a=!1,i=n+1);return-1===i?"":t.slice(o,i)},extname:function(t){e(t);for(var r=-1,n=0,o=-1,i=!0,a=0,s=t.length-1;s>=0;--s){var h=t.charCodeAt(s);if(47!==h)-1===o&&(i=!1,o=s+1),46===h?-1===r?r=s:1!==a&&(a=1):-1!==r&&(a=-1);else if(!i){n=s+1;break}}return-1===r||-1===o||0===a||1===a&&r===o-1&&r===n+1?"":t.slice(r,o)},format:function(t){if(null===t||"object"!=typeof t)throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof t);return function(t,e){var r=e.dir||e.root,n=e.base||(e.name||"")+(e.ext||"");return r?r===e.root?r+n:r+"/"+n:n}(0,t)},parse:function(t){e(t);var r={root:"",dir:"",base:"",ext:"",name:""};if(0===t.length)return r;var n,o=t.charCodeAt(0),i=47===o;i?(r.root="/",n=1):n=0;for(var a=-1,s=0,h=-1,c=!0,f=t.length-1,u=0;f>=n;--f)if(47!==(o=t.charCodeAt(f)))-1===h&&(c=!1,h=f+1),46===o?-1===a?a=f:1!==u&&(u=1):-1!==a&&(u=-1);else if(!c){s=f+1;break}return-1===a||-1===h||0===u||1===u&&a===h-1&&a===s+1?-1!==h&&(r.base=r.name=0===s&&i?t.slice(1,h):t.slice(s,h)):(0===s&&i?(r.name=t.slice(1,a),r.base=t.slice(1,h)):(r.name=t.slice(s,a),r.base=t.slice(s,h)),r.ext=t.slice(a,h)),s>0?r.dir=t.slice(0,s-1):i&&(r.dir="/"),r},sep:"/",delimiter:":",win32:null,posix:null};n.posix=n,t.exports=n},465:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Utils=e.URI=void 0;var n=r(796);Object.defineProperty(e,"URI",{enumerable:!0,get:function(){return n.URI}});var o=r(679);Object.defineProperty(e,"Utils",{enumerable:!0,get:function(){return o.Utils}})},674:(t,e)=>{if(Object.defineProperty(e,"__esModule",{value:!0}),e.isWindows=void 0,"object"==typeof process)e.isWindows="win32"===process.platform;else if("object"==typeof navigator){var r=navigator.userAgent;e.isWindows=r.indexOf("Windows")>=0}},796:function(t,e,r){var n,o,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0}),e.uriToFsPath=e.URI=void 0;var a=r(674),s=/^\w[\w\d+.-]*$/,h=/^\//,c=/^\/\//;function f(t,e){if(!t.scheme&&e)throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "'.concat(t.authority,'", path: "').concat(t.path,'", query: "').concat(t.query,'", fragment: "').concat(t.fragment,'"}'));if(t.scheme&&!s.test(t.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(t.path)if(t.authority){if(!h.test(t.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(c.test(t.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}var u="",l="/",p=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,d=function(){function t(t,e,r,n,o,i){void 0===i&&(i=!1),"object"==typeof t?(this.scheme=t.scheme||u,this.authority=t.authority||u,this.path=t.path||u,this.query=t.query||u,this.fragment=t.fragment||u):(this.scheme=function(t,e){return t||e?t:"file"}(t,i),this.authority=e||u,this.path=function(t,e){switch(t){case"https":case"http":case"file":e?e[0]!==l&&(e=l+e):e=l}return e}(this.scheme,r||u),this.query=n||u,this.fragment=o||u,f(this,i))}return t.isUri=function(e){return e instanceof t||!!e&&"string"==typeof e.authority&&"string"==typeof e.fragment&&"string"==typeof e.path&&"string"==typeof e.query&&"string"==typeof e.scheme&&"string"==typeof e.fsPath&&"function"==typeof e.with&&"function"==typeof e.toString},Object.defineProperty(t.prototype,"fsPath",{get:function(){return C(this,!1)},enumerable:!1,configurable:!0}),t.prototype.with=function(t){if(!t)return this;var e=t.scheme,r=t.authority,n=t.path,o=t.query,i=t.fragment;return void 0===e?e=this.scheme:null===e&&(e=u),void 0===r?r=this.authority:null===r&&(r=u),void 0===n?n=this.path:null===n&&(n=u),void 0===o?o=this.query:null===o&&(o=u),void 0===i?i=this.fragment:null===i&&(i=u),e===this.scheme&&r===this.authority&&n===this.path&&o===this.query&&i===this.fragment?this:new v(e,r,n,o,i)},t.parse=function(t,e){void 0===e&&(e=!1);var r=p.exec(t);return r?new v(r[2]||u,x(r[4]||u),x(r[5]||u),x(r[7]||u),x(r[9]||u),e):new v(u,u,u,u,u)},t.file=function(t){var e=u;if(a.isWindows&&(t=t.replace(/\\/g,l)),t[0]===l&&t[1]===l){var r=t.indexOf(l,2);-1===r?(e=t.substring(2),t=l):(e=t.substring(2,r),t=t.substring(r)||l)}return new v("file",e,t,u,u)},t.from=function(t){var e=new v(t.scheme,t.authority,t.path,t.query,t.fragment);return f(e,!0),e},t.prototype.toString=function(t){return void 0===t&&(t=!1),A(this,t)},t.prototype.toJSON=function(){return this},t.revive=function(e){if(e){if(e instanceof t)return e;var r=new v(e);return r._formatted=e.external,r._fsPath=e._sep===g?e.fsPath:null,r}return e},t}();e.URI=d;var g=a.isWindows?1:void 0,v=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._formatted=null,e._fsPath=null,e}return i(e,t),Object.defineProperty(e.prototype,"fsPath",{get:function(){return this._fsPath||(this._fsPath=C(this,!1)),this._fsPath},enumerable:!1,configurable:!0}),e.prototype.toString=function(t){return void 0===t&&(t=!1),t?A(this,!0):(this._formatted||(this._formatted=A(this,!1)),this._formatted)},e.prototype.toJSON=function(){var t={$mid:1};return this._fsPath&&(t.fsPath=this._fsPath,t._sep=g),this._formatted&&(t.external=this._formatted),this.path&&(t.path=this.path),this.scheme&&(t.scheme=this.scheme),this.authority&&(t.authority=this.authority),this.query&&(t.query=this.query),this.fragment&&(t.fragment=this.fragment),t},e}(d),y=((o={})[58]="%3A",o[47]="%2F",o[63]="%3F",o[35]="%23",o[91]="%5B",o[93]="%5D",o[64]="%40",o[33]="%21",o[36]="%24",o[38]="%26",o[39]="%27",o[40]="%28",o[41]="%29",o[42]="%2A",o[43]="%2B",o[44]="%2C",o[59]="%3B",o[61]="%3D",o[32]="%20",o);function m(t,e){for(var r=void 0,n=-1,o=0;o<t.length;o++){var i=t.charCodeAt(o);if(i>=97&&i<=122||i>=65&&i<=90||i>=48&&i<=57||45===i||46===i||95===i||126===i||e&&47===i)-1!==n&&(r+=encodeURIComponent(t.substring(n,o)),n=-1),void 0!==r&&(r+=t.charAt(o));else{void 0===r&&(r=t.substr(0,o));var a=y[i];void 0!==a?(-1!==n&&(r+=encodeURIComponent(t.substring(n,o)),n=-1),r+=a):-1===n&&(n=o)}}return-1!==n&&(r+=encodeURIComponent(t.substring(n))),void 0!==r?r:t}function b(t){for(var e=void 0,r=0;r<t.length;r++){var n=t.charCodeAt(r);35===n||63===n?(void 0===e&&(e=t.substr(0,r)),e+=y[n]):void 0!==e&&(e+=t[r])}return void 0!==e?e:t}function C(t,e){var r;return r=t.authority&&t.path.length>1&&"file"===t.scheme?"//".concat(t.authority).concat(t.path):47===t.path.charCodeAt(0)&&(t.path.charCodeAt(1)>=65&&t.path.charCodeAt(1)<=90||t.path.charCodeAt(1)>=97&&t.path.charCodeAt(1)<=122)&&58===t.path.charCodeAt(2)?e?t.path.substr(1):t.path[1].toLowerCase()+t.path.substr(2):t.path,a.isWindows&&(r=r.replace(/\//g,"\\")),r}function A(t,e){var r=e?b:m,n="",o=t.scheme,i=t.authority,a=t.path,s=t.query,h=t.fragment;if(o&&(n+=o,n+=":"),(i||"file"===o)&&(n+=l,n+=l),i){var c=i.indexOf("@");if(-1!==c){var f=i.substr(0,c);i=i.substr(c+1),-1===(c=f.indexOf(":"))?n+=r(f,!1):(n+=r(f.substr(0,c),!1),n+=":",n+=r(f.substr(c+1),!1)),n+="@"}-1===(c=(i=i.toLowerCase()).indexOf(":"))?n+=r(i,!1):(n+=r(i.substr(0,c),!1),n+=i.substr(c))}if(a){if(a.length>=3&&47===a.charCodeAt(0)&&58===a.charCodeAt(2))(u=a.charCodeAt(1))>=65&&u<=90&&(a="/".concat(String.fromCharCode(u+32),":").concat(a.substr(3)));else if(a.length>=2&&58===a.charCodeAt(1)){var u;(u=a.charCodeAt(0))>=65&&u<=90&&(a="".concat(String.fromCharCode(u+32),":").concat(a.substr(2)))}n+=r(a,!0)}return s&&(n+="?",n+=r(s,!1)),h&&(n+="#",n+=e?h:m(h,!1)),n}function w(t){try{return decodeURIComponent(t)}catch(e){return t.length>3?t.substr(0,3)+w(t.substr(3)):t}}e.uriToFsPath=C;var _=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function x(t){return t.match(_)?t.replace(_,(function(t){return w(t)})):t}},679:function(t,e,r){var n=this&&this.__spreadArray||function(t,e,r){if(r||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))};Object.defineProperty(e,"__esModule",{value:!0}),e.Utils=void 0;var o,i=r(470),a=i.posix||i;(o=e.Utils||(e.Utils={})).joinPath=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return t.with({path:a.join.apply(a,n([t.path],e,!1))})},o.resolvePath=function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];var o=t.path||"/";return t.with({path:a.resolve.apply(a,n([o],e,!1))})},o.dirname=function(t){var e=a.dirname(t.path);return 1===e.length&&46===e.charCodeAt(0)?t:t.with({path:e})},o.basename=function(t){return a.basename(t.path)},o.extname=function(t){return a.extname(t.path)}}},e={};return function r(n){if(e[n])return e[n].exports;var o=e[n]={exports:{}};return t[n].call(o.exports,o,o.exports,r),o.exports}(465)})()}));
//# sourceMappingURL=index.js.map