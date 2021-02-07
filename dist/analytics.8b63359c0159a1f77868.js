/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./analytics.js ***!
  \**********************/
eval("function createAnalytics() {\n\n    let counter = 0;\n    let destroyed = false;\n    const listener = () => {\n        counter++;\n    }\n\n    document.addEventListener('click', listener );\n    return {\n        destroy() {\n            document.removeEventListener('click' , listener);\n            isDestroyed = true;\n        },\n\n        getClicks() {\n            if(destroyed) {\n                return `Analytics is destroyed. Total clicks = ${counter}`;\n           }\n            return counter;\n\n        }\n    }\n}\n\nwindow.analytics = createAnalytics(); // в глобальную перменную, в объект analytics присваиваем значение данной функции\n// можем в консоли браузера прописывать ananlytics и пользоваться функциями, которые возвращает наша присвоенная функция\n\n//# sourceURL=webpack:///./analytics.js?");
/******/ })()
;