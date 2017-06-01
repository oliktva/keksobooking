/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (function () {
  /** @enum {number} */
  var KeyCode = {
    ESC_KEY_CODE: 27,
    ENTER_KEY_CODE: 13
  };

  /**
   * @param {Event} evt
   * @return {boolean}
   */
  var isEnter = function (evt) {
    return evt.keyCode === KeyCode.ENTER_KEY_CODE;
  };

  /**
   * @param {Event} evt
   * @return {boolean}
   */
  var isEsc = function (evt) {
    return evt.keyCode === KeyCode.ESC_KEY_CODE;
  };

  return {
    isEnter: isEnter,
    isEsc: isEsc
  };
})();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (function () {
  /** @constant {Object} */
  var TYPES_MAP = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

  /**
   * generates integer random value from min to max inclusive
   * @param  {number} min
   * @param  {number} max
   * @return {number}
   */
  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  /**
   * exchanges two elements of array
   * @param  {Array} array
   * @param  {number} i
   * @param  {number} j
   */
  var exchangeArrayElements = function (array, i, j) {
    var tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  };

  /**
   * shuffles of array by "Fisher–Yates shuffle (The modern algorithm)"
   * @param  {Array} array
   * @return {Array}
   */
  var shuffleArray = function (array) {
    var localArray = array.slice(0);
    for (var i = localArray.length - 1; i > 0; i--) {
      var j = getRandom(0, i + 1);
      exchangeArrayElements(localArray, i, j);
    }
    return localArray;
  };

  /**
   * sorting array of places by location.y
   * @param {Array<Place>} array
   */
  var sortPlacesByLocationY = function (array) {
    array.sort(function (a, b) {
      return a.location.y - b.location.y;
    });
  };

  /**
   * formats value dividing into digits
   * @param {number} price
   * @return {string}
   */
  var getFormattedPrice = function (price) {
    if (price >= 10000) {
      return price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    } else {
      return price.toString();
    }
  };

  /**
   * @param {Element} element
   * @return {string}
   */
  var getValueFromFilter = function (element) {
    return element.options[element.selectedIndex].value;
  };

  return {
    TYPES_MAP: TYPES_MAP,
    shuffleArray: shuffleArray,
    getFormattedPrice: getFormattedPrice,
    sortPlacesByLocationY: sortPlacesByLocationY,
    getValueFromFilter: getValueFromFilter
  };
})();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mainPin = __webpack_require__(6);
var synchronizeFields = __webpack_require__(12);
var setDraggable = __webpack_require__(11);
var uploadImages = __webpack_require__(13);

(function () {
  /** @constant {Array} */
  var TYPES = ['flat', 'hovel', 'palace'];

  /** @constant {Array} */
  var PRICES = ['1000', '0', '10000'];

  /** @constant {Array} */
  var ROOMS = ['room_1', 'rooms_2', 'rooms_100'];

  /** @constant {Array} */
  var GUESTS = ['no_guests', 'guests_3', 'guests_3'];

  /** @constant {Array} */
  var TIME = ['12', '13', '14'];

  /** @constant {number} */
  var MAX_NUMBER = 16;

  var noticeForm = document.querySelector('.notice__form');
  var price = noticeForm.querySelector('#price');
  var type = noticeForm.querySelector('#type');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var time = noticeForm.querySelector('#time');
  var timeout = noticeForm.querySelector('#timeout');
  var address = noticeForm.querySelector('#address');

  var map = document.querySelector('.tokyo img');

  var avatarFileChooser = document.querySelector('.notice__photo .upload input[type=file]');
  var avatarPreviewList = document.querySelectorAll('.notice__preview-image');
  var photoFileChooser = document.querySelector('.form__photo-container .upload input[type=file]');
  var photoPreviewList = document.querySelectorAll('.form__photo');

  /**
   * @param {Event} evt
   */
  var setInputValid = function (evt) {
    if (evt.target.value.length > 0) {
      evt.target.classList.remove('invalid');
      evt.target.removeEventListener('keyup', setInputValid);
    }
  };

  /**
   * @param {Element} element
   * @param {string} value
   */
  var setMinValue = function (element, value) {
    element.setAttribute('min', value);
    element.setAttribute('placeholder', value);
  };

  /**
   * @param {Element} element
   * @param {string} value
   */
  var setValueToElement = function (element, value) {
    element.value = value;
  };

  /**
   * @param {Event} evt
   */
  var onInvalidForm = function (evt) {
    var invalidElements = noticeForm.querySelectorAll(':invalid');
    for (var i = 0; i < invalidElements.length; i++) {
      invalidElements[i].classList.add('invalid');
      invalidElements[i].addEventListener('keyup', setInputValid);
    }
  };

  /**
   * @return {string}
   */
  var getCoordsValue = function () {
    return 'x: ' + mainPin.getCoords().x + ' y: ' + mainPin.getCoords().y;
  };

  address.setAttribute('readonly', 'readonly');
  address.value = getCoordsValue();

  type.addEventListener('change', function () {
    synchronizeFields(type, price, TYPES, PRICES, setMinValue);
  });

  roomNumber.addEventListener('change', function () {
    synchronizeFields(roomNumber, capacity, ROOMS, GUESTS, setValueToElement);
  });

  capacity.addEventListener('change', function () {
    synchronizeFields(capacity, roomNumber, GUESTS, ROOMS, setValueToElement);
  });

  time.addEventListener('change', function () {
    synchronizeFields(time, timeout, TIME, TIME, setValueToElement);
  });

  timeout.addEventListener('change', function () {
    synchronizeFields(timeout, time, TIME, TIME, setValueToElement);
  });

  noticeForm.addEventListener('invalid', onInvalidForm, true);
  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    noticeForm.reset();
  });

  setDraggable(mainPin.element, map);
  mainPin.addDropListener(address, getCoordsValue);

/**
   * @param {Array<Element>} elements
   * @param {FileReader} reader
   */
  var loadImage = function (elements, reader) {
    reader.addEventListener('load', function () {
      elements[0].src = reader.result;
    });
  };

  /**
   * @param {Array<Element>} elements
   * @param {FileReader} reader
   * @param {number} index
   */
  var loadNextImage = function (elements, reader, index) {
    reader.addEventListener('load', function () {
      elements[index].innerHTML = '<img src="' + reader.result + '"/>';
    });
  };

  uploadImages(avatarFileChooser, avatarPreviewList, 1, loadImage);
  uploadImages(photoFileChooser, photoPreviewList, MAX_NUMBER, loadNextImage);
})();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PinClass = __webpack_require__(7);
var CardClass = __webpack_require__(5);
var dataUtils = __webpack_require__(1);
var filter = __webpack_require__(9);
var load = __webpack_require__(10);

var debounce = __webpack_require__(8);

(function () {
  /** @constant {string} */
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  /** @constant {number} */
  var MAX_NUMBER = 3;

  var pinMap = document.querySelector('.tokyo__pin-map');
  var filterForm = document.querySelector('.tokyo__filters');
  var type = filterForm.querySelector('#housing_type');
  var price = filterForm.querySelector('#housing_price');
  var roomNumber = filterForm.querySelector('#housing_room-number');
  var guestsNumber = filterForm.querySelector('#housing_guests-number');
  var featuresList = filterForm.querySelectorAll('input[name="feature"]');

  var pinsList = [];
  var cardsList = [];

  /**
   * render pins on the page
   * @param {Array<Place>} places
   * @param {Function} callback
   */
  var renderPins = function (places, callback) {
    pinsList.forEach(function (item) {
      item.element.remove();
    });

    var fragment = document.createDocumentFragment();
    places.forEach(function (item) {
      var pin = new PinClass(item, callback);
      pinsList.push(pin);
      cardsList.push(new CardClass(pin));
      fragment.appendChild(pin.element);
    });

    pinMap.appendChild(fragment);
  };

  /**
   * @param {Array<Object>} array
   * @return {Array<Element>}
   */
  var getActivePin = function (array) {
    return array.filter(function (item) {
      return item.active === true;
    })[0];
  };

  /**
   * @param {Object} pin
   * @param {Object} data
   */
  var showPinsAndCard = function (pin) {
    var active = getActivePin(pinsList);
    if (active) {
      active.unsetActive();
    }
    pin.setActive();
    cardsList[pinsList.indexOf(pin)].show();
  };

  /**
   * @param  {Array<Objects>} places
   * @return {Array<Objects>}
   */
  var getFilteredData = function (places) {
    var filteredPlaces = filter.byEquality(places, 'type', dataUtils.getValueFromFilter(type));
    filteredPlaces = filter.bySuitablePrice(filteredPlaces, 'price', dataUtils.getValueFromFilter(price));
    filteredPlaces = filter.byEquality(filteredPlaces, 'rooms', dataUtils.getValueFromFilter(roomNumber));
    filteredPlaces = filter.byEquality(filteredPlaces, 'guests', dataUtils.getValueFromFilter(guestsNumber));
    filteredPlaces = [].reduce.call(featuresList, function (previousValue, currentItem) {
      if (currentItem.checked) {
        var value = currentItem.getAttribute('value');
        return filter.byPresence(previousValue, 'features', value);
      } else {
        return previousValue;
      }
    }, filteredPlaces);
    return filteredPlaces;
  };

  /**
   * @param {Array<Object>} places
   */
  var renderFilteredData = function (places) {
    var active = getActivePin(pinsList);
    if (active) {
      cardsList[pinsList.indexOf(active)].close();
      active.unsetActive();
    }
    renderPins(places, function (pin) {
      showPinsAndCard(pin);
    });
  };

  /**
   * @param {Array<Object>} places
   */
  var addPinsToMap = function (places) {
    dataUtils.sortPlacesByLocationY(places);
    if (places.length > 0) {
      var randomPlaces = dataUtils.shuffleArray(places).slice(0, MAX_NUMBER);
      renderPins(randomPlaces, function (pin) {
        showPinsAndCard(pin);
      });
      showPinsAndCard(pinsList[0]);
    }
    filterForm.addEventListener('change', function () {
      debounce(function () {
        renderFilteredData(getFilteredData(places));
      }, 500);
    });
  };

  load(URL, addPinsToMap);
})();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (function () {
  var map = __webpack_require__(3);
  var form = __webpack_require__(2);

  return {
    map: map,
    form: form
  };
})();


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dataUtils = __webpack_require__(1);
var visibility = __webpack_require__(14);
var checkKey = __webpack_require__(0);

(function () {
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');

  /**
   * generates element: window with certain element of places
   * @param {Place} place
   * @return {Element}
   */
  var getElement = function (place) {
    var lodgeElement = lodgeTemplate.cloneNode(true);
    lodgeElement.querySelector('.lodge__title').textContent = place.offer.title;
    lodgeElement.querySelector('.lodge__address').textContent = place.offer.address;
    lodgeElement.querySelector('.lodge__price').innerHTML = dataUtils.getFormattedPrice(place.offer.price) + ' &#x20bd;/ночь';
    lodgeElement.querySelector('.lodge__type').textContent = dataUtils.TYPES_MAP[place.offer.type];
    lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + place.offer.guests + ' гостей в ' + place.offer.rooms + ' комнатах';
    lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + place.offer.checkin + ', выезд до ' + place.offer.checkout;
    for (var i = 0; i < place.offer.features.length; i++) {
      var html = '<span class = "feature__image feature__image--' + place.offer.features[i] + '"></span>';
      lodgeElement.querySelector('.lodge__features').insertAdjacentHTML('beforeEnd', html);
    }
    lodgeElement.querySelector('.lodge__description').textContent = place.offer.description;
    return lodgeElement;
  };
  /**
   * generates element: window with certain element of places
   * @param {Place} place
   * @return {string}
   */
  var getAvatar = function (place) {
    return place.author.avatar;
  };

  var Card = function (pin) {
    var card = this;
    this.pin = pin;
    this.element = getElement(pin.data);
    this.onCardCloseClick = function (evt) {
      evt.preventDefault();
      card.close();
      card.pin.unsetActive();
    };
    this.onDocumentEscKeydown = function (evt) {
      if (checkKey.isEsc(evt)) {
        card.close();
        card.pin.unsetActive();
      }
    };
    this.onCardKeydown = function (evt) {
      if (checkKey.isEnter(evt)) {
        card.close();
        card.pin.unsetActive();
      }
    };
  };

  Card.prototype.render = function () {
    offerDialog.replaceChild(this.element.cloneNode(true), offerDialog.querySelector('.dialog__panel'));
    offerDialog.querySelector('.dialog__title').querySelector('img').setAttribute('src', getAvatar(this.pin.data));
  };

  Card.prototype.show = function () {
    this.render();
    if (visibility.isElementInvisible(offerDialog)) {
      visibility.setElementVisible(offerDialog, true);
    }

    dialogClose.addEventListener('click', this.onCardCloseClick);
    dialogClose.addEventListener('keydown', this.onCardKeydown);
    document.addEventListener('keydown', this.onDocumentEscKeydown);
  };

  Card.prototype.close = function () {
    visibility.setElementVisible(offerDialog, false);

    dialogClose.removeEventListener('keydown', this.onCardKeydown);
    document.removeEventListener('keydown', this.onDocumentEscKeydown);
  };
  module.exports = Card;
})();


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (function () {
  /** @enum {number} */
  var PlaceDimension = {
    WIDTH: 75,
    HEIGHT: 94
  };

  var mainPin = document.querySelector('.pin__main');

  /**
   * @return {Object}
   */
  var getCoords = function () {
    return {
      x: mainPin.offsetLeft + Math.floor(PlaceDimension.WIDTH / 2),
      y: mainPin.offsetTop + PlaceDimension.HEIGHT
    };
  };

  /**
   * @param {Element} element
   * @param {Function} callback
   */
  var addDropListener = function (element, callback) {
    mainPin.addEventListener('mousemove', function (evt) {
      element.value = callback();
    });
  };

  return {
    element: mainPin,
    getCoords: getCoords,
    addDropListener: addDropListener
  };
})();


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var checkKey = __webpack_require__(0);

(function () {
  /** @enum {number} */
  var PlaceDimension = {
    PIN_WIDTH: 56,
    PIN_HEIGHT: 72
  };

  /**
   * @param  {Array<Object>} data
   * @param  {Function} callback
   */
  var Pin = function (data, callback) {
    this.element = (function () {
      var element = document.createElement('div');
      var img = '<img src="' + data.author.avatar + '" class="rounded" width="40" height="40">';
      element.classList.add('pin');
      element.setAttribute('tabindex', '0');
      element.style.left = (data.location.x - Math.floor(PlaceDimension.PIN_WIDTH / 2)) + 'px';
      element.style.top = (data.location.y - PlaceDimension.PIN_HEIGHT) + 'px';
      element.insertAdjacentHTML('afterBegin', img);
      return element;
    })();
    this.data = data;
    this.active = false;
    this.onClick = function () {
      callback(this);
    };
    this.onKeydown = function (evt) {
      if (checkKey.isEnter(evt)) {
        callback(this);
      }
    };

    this.element.addEventListener('click', this.onClick.bind(this));
    this.element.addEventListener('keydown', this.onKeydown.bind(this));
  };

  Pin.prototype.remove = function () {
    this.element.removeEventListener('click', this.onClick);
    this.element.removeEventListener('keydown', this.onKeydown);
  };

  /**
   * delete pin--active class if is exist
   */
  Pin.prototype.unsetActive = function () {
    this.element.classList.remove('pin--active');
    this.active = false;
  };

  /**
   * add pin--active class
   */
  Pin.prototype.setActive = function () {
    this.element.classList.add('pin--active');
    this.active = true;
  };

  module.exports = Pin;
})();


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (function () {
  var DEBOUNCE_INTERVAL = 300; // ms
  var lastTimeout = null;

  /**
   * @param {Function} callback
   * @param {number} interval
   */
  return function (callback, interval) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    var timeout = interval || DEBOUNCE_INTERVAL;
    lastTimeout = window.setTimeout(callback, timeout);
  };
})();


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



module.exports = (function () {
  /**
   * @param {Object} item
   * @param {string} field
   * @param {string} value
   * @return {boolean}
   */
  var isSuitablePrice = function (item, field, value) {
    switch (value) {
      case 'middle':
        return item.offer[field] >= 10000 && item.offer[field] <= 50000;
      case 'low':
        return item.offer[field] <= 10000;
      case 'high':
        return item.offer[field] >= 50000;
      default:
        return false;
    }
  };

  /**
   * @param {Array<Object>} array
   * @param {string} field
   * @param {string} value
   * @return {boolean}
   */
  var byEquality = function (array, field, value) {
    if (value === 'any') {
      return array;
    } else {
      return array.filter(function (item) {
        return item.offer[field] + '' === value + '';
      });
    }
  };

  /**
   * @param {Array<Object>} array
   * @param {string} field
   * @param {string} value
   * @return {boolean}
   */
  var byPresence = function (array, field, value) {
    if (value === 'any') {
      return array;
    } else {
      return array.filter(function (item) {
        return item.offer[field].indexOf(value) !== -1;
      });
    }
  };

  /**
   * @param {Array<Object>} array
   * @param {string} field
   * @param {string} value
   * @return {boolean}
   */
  var bySuitablePrice = function (array, field, value) {
    if (value === 'any') {
      return array;
    } else {
      return array.filter(function (item) {
        return isSuitablePrice(item, field, value);
      });
    }
  };

  return {
    byEquality: byEquality,
    byPresence: byPresence,
    bySuitablePrice: bySuitablePrice
  };
})();


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (function () {
  /**
   * @param {number} status
   * @return {string}
   */
  var getMessage = function (status) {
    switch (status) {
      case 403:
        return 'Сервер нашел, что искал ты, но не покажет.';
      case 404:
        return 'Не найдено то, что ищешь ты.';
      case 500:
        return 'Не отвечает сервер, позже прийди ты.';
      default:
        return 'Ошибка неопознанная, подскажет к решению путь администратор.';
    }
  };

  /**
   * @param {string} url
   * @param {Function} onLoad
   */
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        window.showErrorWindow(getMessage(xhr.status));
      }
    });
    xhr.send();
  };
})();


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (function () {
  var element = null;
  var boundElement = null;
  var elementWidth = 0;
  var elementHeight = 0;

  /**
   * @param {Event} moveEvt
   */
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var x = moveEvt.clientX - boundElement.getBoundingClientRect().left - Math.floor(elementWidth / 2);
    var y = moveEvt.clientY - boundElement.getBoundingClientRect().top - Math.floor(elementHeight / 2);

    if (x >= elementWidth && x <= boundElement.clientWidth - elementWidth &&
        y >= elementHeight && y <= boundElement.clientHeight - elementHeight) {
      element.style.left = x + 'px';
      element.style.top = y + 'px';
    }
  };

  /**
   * @param {Event} upEvt
   */
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  /**
   * @param {Event} evt
   */
  var onDrag = function (evt) {
    evt.preventDefault();
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  /**
   * @param {Element} draggableElement
   * @param {Element} borderElement
   */
  var setDraggable = function (draggableElement, borderElement) {
    element = draggableElement;
    boundElement = borderElement;
    elementWidth = element.clientWidth;
    elementHeight = element.clientHeight;
    element.addEventListener('mousedown', onDrag);
  };

  return setDraggable;
})();


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (function () {
  /**
   * @param {Element} field
   * @param {Array} array
   * @return {number}
   */
  var getSelectedIndex = function (field, array) {
    return array.indexOf(field.options[field.selectedIndex].value);
  };

  /**
   * @param {ELement} elementFrom
   * @param {Element} elementTo
   * @param {Array} arrayKey
   * @param {Array} arrayValue
   * @param {Function} callback
   */
  return function (elementFrom, elementTo, arrayKey, arrayValue, callback) {
    var value = arrayValue[getSelectedIndex(elementFrom, arrayKey)];
    callback(elementTo, value);
  };
})();


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  /**
   * @param {string} fileName
   * @return {string}
   */
  var getMatches = function (fileName) {
    return FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
  };

  /**
   * @param {Element} inputFileElement
   * @param {Array<Element>} previewElements
   * @param {number} max
   * @param {Function} callback
   */
  return function (inputFileElement, previewElements, max, callback) {
    var currentPreviewIndex = 0;
    inputFileElement.addEventListener('change', function () {
      if (max < inputFileElement.files.length) {
        window.showErrorWindow('Количество выбранных фотографий превосходит максимальное допустимое значение. Будет загружено ' + max + ' фотографий.');
      }

      for (var i = 0; i < Math.min(max, inputFileElement.files.length); i++) {
        var file = inputFileElement.files[i];
        var fileName = file.name.toLowerCase();

        if (getMatches(fileName)) {
          var reader = new FileReader();
          callback(previewElements, reader, currentPreviewIndex);
          reader.readAsDataURL(file);
          currentPreviewIndex++;
        } else {
          window.showErrorWindow('Загружаемый файл не является фотографией :(');
        }
      }
      if (currentPreviewIndex === max) {
        currentPreviewIndex = 0;
        inputFileElement.value = '';
      }
    });
  };
})();


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (function () {
  /** @constant {string} */
  var HIDDEN_CLASS = 'hidden';

  /**
   * set element visible
   * @param {Element}  element
   * @param {boolean} isVisible
   */
  var setElementVisible = function (element, isVisible) {
    element.classList.toggle(HIDDEN_CLASS, !isVisible);
  };

  /**
   * @param {Element} element
   * @return {boolean}
   */
  var isElementInvisible = function (element) {
    return element.classList.contains(HIDDEN_CLASS);
  };

  return {
    setElementVisible: setElementVisible,
    isElementInvisible: isElementInvisible
  };
})();


/***/ })
/******/ ]);