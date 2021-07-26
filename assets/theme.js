window.theme = window.theme || {};

/* ================ SLATE ================ */
window.theme = window.theme || {};

theme.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document)
    .on('shopify:section:load', this._onSectionLoad.bind(this))
    .on('shopify:section:unload', this._onSectionUnload.bind(this))
    .on('shopify:section:select', this._onSelect.bind(this))
    .on('shopify:section:deselect', this._onDeselect.bind(this))
    .on('shopify:block:select', this._onBlockSelect.bind(this))
    .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
  _createInstance: function(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (_.isUndefined(constructor)) {
      return;
    }

    var instance = _.assignIn(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._createInstance(container);
    }
  },

  _onSectionUnload: function(evt) {
    this.instances = _.filter(this.instances, function(instance) {
      var isEventInstance = instance.id === evt.detail.sectionId;

      if (isEventInstance) {
        if (_.isFunction(instance.onUnload)) {
          instance.onUnload(evt);
        }
      }

      return !isEventInstance;
    });
  },

  _onSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
      instance.onDeselect(evt);
    }
  },

  _onBlockSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
      instance.onBlockDeselect(evt);
    }
  },

  register: function(type, constructor) {
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(
      function(index, container) {
        this._createInstance(container, constructor);
      }.bind(this)
    );
  }
});

window.slate = window.slate || {};

/**
 * Slate utilities
 * -----------------------------------------------------------------------------
 * A collection of useful utilities to help build your theme
 *
 *
 * @namespace utils
 */

slate.utils = {
  /**
   * Get the query params in a Url
   * Ex
   * https://mysite.com/search?q=noodles&b
   * getParameterByName('q') = "noodles"
   * getParameterByName('b') = "" (empty value)
   * getParameterByName('test') = null (absent)
   */
  getParameterByName: function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  },

  keyboardKeys: {
    TAB: 9,
    ENTER: 13,
    LEFTARROW: 37,
    RIGHTARROW: 39
  }
};

window.slate = window.slate || {};

/**
 * iFrames
 * -----------------------------------------------------------------------------
 * Wrap videos in div to force responsive layout.
 *
 * @namespace iframes
 */

slate.rte = {
  /**
   * Wrap tables in a container div to make them scrollable when needed
   *
   * @param {object} options - Options to be used
   * @param {jquery} options.$tables - jquery object(s) of the table(s) to wrap
   * @param {string} options.tableWrapperClass - table wrapper class name
   */
  wrapTable: function(options) {
    options.$tables.wrap(
      '<div class="' + options.tableWrapperClass + '"></div>'
    );
  },

  /**
   * Wrap iframes in a container div to make them responsive
   *
   * @param {object} options - Options to be used
   * @param {jquery} options.$iframes - jquery object(s) of the iframe(s) to wrap
   * @param {string} options.iframeWrapperClass - class name used on the wrapping div
   */
  wrapIframe: function(options) {
    options.$iframes.each(function() {
      // Add wrapper to make video responsive
      $(this).wrap('<div class="' + options.iframeWrapperClass + '"></div>');

      // Re-set the src attribute on each iframe after page load
      // for Chrome's "incorrect iFrame content on 'back'" bug.
      // https://code.google.com/p/chromium/issues/detail?id=395791
      // Need to specifically target video and admin bar
      this.src = this.src;
    });
  }
};

window.slate = window.slate || {};

/**
 * A11y Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help make your theme more accessible
 * to users with visual impairments.
 *
 *
 * @namespace a11y
 */

slate.a11y = {
  /**
   * For use when focus shifts to a container rather than a link
   * eg for In-page links, after scroll, focus shifts to content area so that
   * next `tab` is where user expects if focusing a link, just $link.focus();
   *
   * @param {JQuery} $element - The element to be acted upon
   */
  pageLinkFocus: function($element) {
    var focusClass = 'js-focus-hidden';

    $element
      .first()
      .attr('tabIndex', '-1')
      .focus()
      .addClass(focusClass)
      .one('blur', callback);

    function callback() {
      $element
        .first()
        .removeClass(focusClass)
        .removeAttr('tabindex');
    }
  },

  /**
   * If there's a hash in the url, focus the appropriate element
   */
  focusHash: function() {
    var hash = window.location.hash;

    // is there a hash in the url? is it an element on the page?
    if (hash && document.getElementById(hash.slice(1))) {
      this.pageLinkFocus($(hash));
    }
  },

  /**
   * When an in-page (url w/hash) link is clicked, focus the appropriate element
   */
  bindInPageLinks: function() {
    $('a[href*=#]').on(
      'click',
      function(evt) {
        this.pageLinkFocus($(evt.currentTarget.hash));
      }.bind(this)
    );
  },

  /**
   * Traps the focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {jQuery} options.$elementToFocus - Element to be focused when focus leaves container
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  trapFocus: function(options) {
    var eventsName = {
      focusin: options.namespace ? 'focusin.' + options.namespace : 'focusin',
      focusout: options.namespace
        ? 'focusout.' + options.namespace
        : 'focusout',
      keydown: options.namespace
        ? 'keydown.' + options.namespace
        : 'keydown.handleFocus'
    };

    /**
     * Get every possible visible focusable element
     */
    var $focusableElements = options.$container.find(
      $(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex^="-"])'
      ).filter(':visible')
    );
    var firstFocusable = $focusableElements[0];
    var lastFocusable = $focusableElements[$focusableElements.length - 1];

    if (!options.$elementToFocus) {
      options.$elementToFocus = options.$container;
    }

    function _manageFocus(evt) {
      if (evt.keyCode !== slate.utils.keyboardKeys.TAB) return;

      /**
       * On the last focusable element and tab forward,
       * focus the first element.
       */
      if (evt.target === lastFocusable && !evt.shiftKey) {
        evt.preventDefault();
        firstFocusable.focus();
      }
      /**
       * On the first focusable element and tab backward,
       * focus the last element.
       */
      if (evt.target === firstFocusable && evt.shiftKey) {
        evt.preventDefault();
        lastFocusable.focus();
      }
    }

    options.$container.attr('tabindex', '-1');
    options.$elementToFocus.focus();

    $(document).off('focusin');

    $(document).on(eventsName.focusout, function() {
      $(document).off(eventsName.keydown);
    });

    $(document).on(eventsName.focusin, function(evt) {
      if (evt.target !== lastFocusable && evt.target !== firstFocusable) return;

      $(document).on(eventsName.keydown, function(evt) {
        _manageFocus(evt);
      });
    });
  },

  /**
   * Removes the trap of focus in a particular container
   *
   * @param {object} options - Options to be used
   * @param {jQuery} options.$container - Container to trap focus within
   * @param {string} options.namespace - Namespace used for new focus event handler
   */
  removeTrapFocus: function(options) {
    var eventName = options.namespace
      ? 'focusin.' + options.namespace
      : 'focusin';

    if (options.$container && options.$container.length) {
      options.$container.removeAttr('tabindex');
    }

    $(document).off(eventName);
  },

  /**
   * Add aria-describedby attribute to external and new window links
   *
   * @param {object} options - Options to be used
   * @param {object} options.messages - Custom messages to be used
   * @param {jQuery} options.$links - Specific links to be targeted
   */
  accessibleLinks: function(options) {
    var body = document.querySelector('body');

    var idSelectors = {
      newWindow: 'a11y-new-window-message',
      external: 'a11y-external-message',
      newWindowExternal: 'a11y-new-window-external-message'
    };

    if (options.$links === undefined || !options.$links.jquery) {
      options.$links = $('a[href]:not([aria-describedby])');
    }

    function generateHTML(customMessages) {
      if (typeof customMessages !== 'object') {
        customMessages = {};
      }

      var messages = $.extend(
        {
          newWindow: 'Opens in a new window.',
          external: 'Opens external website.',
          newWindowExternal: 'Opens external website in a new window.'
        },
        customMessages
      );

      var container = document.createElement('ul');
      var htmlMessages = '';

      for (var message in messages) {
        htmlMessages +=
          '<li id=' + idSelectors[message] + '>' + messages[message] + '</li>';
      }

      container.setAttribute('hidden', true);
      container.innerHTML = htmlMessages;

      body.appendChild(container);
    }

    function _externalSite($link) {
      var hostname = window.location.hostname;

      return $link[0].hostname !== hostname;
    }

    $.each(options.$links, function() {
      var $link = $(this);
      var target = $link.attr('target');
      var rel = $link.attr('rel');
      var isExternal = _externalSite($link);
      var isTargetBlank = target === '_blank';

      if (isExternal) {
        $link.attr('aria-describedby', idSelectors.external);
      }
      if (isTargetBlank) {
        if (rel === undefined || rel.indexOf('noopener') === -1) {
          $link.attr('rel', 'noopener');
        }
        $link.attr('aria-describedby', idSelectors.newWindow);
      }
      if (isExternal && isTargetBlank) {
        $link.attr('aria-describedby', idSelectors.newWindowExternal);
      }
    });

    generateHTML(options.messages);
  }
};

/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * A collection of functions that help with basic image operations.
 *
 */

theme.Images = (function() {
  /**
   * Preloads an image in memory and uses the browsers cache to store it until needed.
   *
   * @param {Array} images - A list of image urls
   * @param {String} size - A shopify image size attribute
   */

  function preload(images, size) {
    if (typeof images === 'string') {
      images = [images];
    }

    for (var i = 0; i < images.length; i++) {
      var image = images[i];
      this.loadImage(this.getSizedImageUrl(image, size));
    }
  }

  /**
   * Loads and caches an image in the browsers cache.
   * @param {string} path - An image url
   */
  function loadImage(path) {
    new Image().src = path;
  }

  /**
   * Swaps the src of an image for another OR returns the imageURL to the callback function
   * @param image
   * @param element
   * @param callback
   */
  function switchImage(image, element, callback) {
    var size = this.imageSize(element.src);
    var imageUrl = this.getSizedImageUrl(image.src, size);

    if (callback) {
      callback(imageUrl, image, element); // eslint-disable-line callback-return
    } else {
      element.src = imageUrl;
    }
  }

  /**
   * +++ Useful
   * Find the Shopify image attribute size
   *
   * @param {string} src
   * @returns {null}
   */
  function imageSize(src) {
    var match = src.match(
      /.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\\.@]/
    );

    if (match !== null) {
      if (match[2] !== undefined) {
        return match[1] + match[2];
      } else {
        return match[1];
      }
    } else {
      return null;
    }
  }

  /**
   * +++ Useful
   * Adds a Shopify size attribute to a URL
   *
   * @param src
   * @param size
   * @returns {*}
   */
  function getSizedImageUrl(src, size) {
    if (size === null) {
      return src;
    }

    if (size === 'master') {
      return this.removeProtocol(src);
    }

    var match = src.match(
      /\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i
    );

    if (match !== null) {
      var prefix = src.split(match[0]);
      var suffix = match[0];

      return this.removeProtocol(prefix[0] + '_' + size + suffix);
    }

    return null;
  }

  function removeProtocol(path) {
    return path.replace(/http(s)?:/, '');
  }

  return {
    preload: preload,
    loadImage: loadImage,
    switchImage: switchImage,
    imageSize: imageSize,
    getSizedImageUrl: getSizedImageUrl,
    removeProtocol: removeProtocol
  };
})();

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 * Alternatives
 * - Accounting.js - http://openexchangerates.github.io/accounting.js/
 *
 */

theme.Currency = (function() {
  var moneyFormat = '${{amount}}'; // eslint-disable-line camelcase

  function formatMoney(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = format || moneyFormat;

    function formatWithDelimiters(number, precision, thousands, decimal) {
      thousands = thousands || ',';
      decimal = decimal || '.';

      if (isNaN(number) || number === null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        '$1' + thousands
      );
      var centsAmount = parts[1] ? decimal + parts[1] : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ');
        break;
      case 'amount_with_apostrophe_separator':
        value = formatWithDelimiters(cents, 2, "'");
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }

  return {
    formatMoney: formatMoney
  };
})();

/**
 * Variant Selection scripts
 * ------------------------------------------------------------------------------
 *
 * Handles change events from the variant inputs in any `cart/add` forms that may
 * exist.  Also updates the master select and triggers updates when the variants
 * price or image changes.
 *
 * @namespace variants
 */

slate.Variants = (function() {
  /**
   * Variant constructor
   *
   * @param {object} options - Settings from `product.js`
   */
  function Variants(options) {
    this.$container = options.$container;
    this.product = options.product;
    this.singleOptionSelector = options.singleOptionSelector;
    this.originalSelectorId = options.originalSelectorId;
    this.enableHistoryState = options.enableHistoryState;
    this.currentVariant = this._getVariantFromOptions();

    $(this.singleOptionSelector, this.$container).on(
      'change',
      this._onSelectChange.bind(this)
    );
  }

  Variants.prototype = _.assignIn({}, Variants.prototype, {
    /**
     * Get the currently selected options from add-to-cart form. Works with all
     * form input elements.
     *
     * @return {array} options - Values of currently selected variants
     */
    _getCurrentOptions: function() {
      var currentOptions = _.map(
        $(this.singleOptionSelector, this.$container),
        function(element) {
          var $element = $(element);
          var type = $element.attr('type');
          var currentOption = {};

          if (type === 'radio' || type === 'checkbox') {
            if ($element[0].checked) {
              currentOption.value = $element.val();
              currentOption.index = $element.data('index');

              return currentOption;
            } else {
              return false;
            }
          } else {
            currentOption.value = $element.val();
            currentOption.index = $element.data('index');

            return currentOption;
          }
        }
      );

      // remove any unchecked input values if using radio buttons or checkboxes
      currentOptions = _.compact(currentOptions);

      return currentOptions;
    },

    /**
     * Find variant based on selected values.
     *
     * @param  {array} selectedValues - Values of variant inputs
     * @return {object || undefined} found - Variant object from product.variants
     */
    _getVariantFromOptions: function() {
      var selectedValues = this._getCurrentOptions();
      var variants = this.product.variants;

      var found = _.find(variants, function(variant) {
        return selectedValues.every(function(values) {
          return _.isEqual(variant[values.index], values.value);
        });
      });

      return found;
    },

    /**
    * Add Notify Me
    */
    _addNotifyme: function(v) {
      if (v) {
        var variant = v;
      } else {
        var variant = this._getVariantFromOptions();
      }
      if(variant != undefined) {
        // option first
        var obj = {"option1": "prettydropdown-SingleOptionSelector-0","option2": "prettydropdown-SingleOptionSelector-1"};
        var counter = 0;
        $.each(obj, function( index1, value ) {
          var opt = variant.option1;
          if(counter == 1) { var opt = variant.option2;}
          var el = document.querySelectorAll('#' + value + ' ul li');
          el && el.forEach(function(element) {
            var sel = element.getAttribute('data-value');
            if(variant.available == false && variant.option2) {
              var sel = "li[data-value='" + opt + "']";
              var el = document.querySelector(sel);
              el.classList.add('notify-me')
              var itxt = el.innerText;
              el.innerText = opt.toUpperCase() + " - Notify me";
            }
            else {
                if(element.innerText.indexOf("Notify") != -1) {
                  element.classList.remove('notify-me');
                  var itxt = element.innerText.replace(" - Notify me",'');
                  element.innerText = itxt;
                }
            }
          });
        counter++;
        });
      }
    },
    /**
     * Event handler for when a variant input changes.
     */
    _onSelectChange: function() {
      //this._addNotifyme();
      var variant = this._getVariantFromOptions();
      this.$container.trigger({
        type: 'variantChange',
        variant: variant
      });

      if (!variant) {
        return;
      }

      this._updateMasterSelect(variant);
      this._updateImages(variant);
      this._updatePrice(variant);
      this._updateSKU(variant);
      this.currentVariant = variant;

      if (this.enableHistoryState) {
        this._updateHistoryState(variant);
      }
    },

    /**
     * Trigger event when variant image changes
     *
     * @param  {object} variant - Currently selected variant
     * @return {event}  variantImageChange
     */
    _updateImages: function(variant) {
      var variantImage = variant.featured_image || {};
      var currentVariantImage = this.currentVariant.featured_image || {};

      if (
        !variant.featured_image ||
        variantImage.src === currentVariantImage.src
      ) {
        return;
      }

      this.$container.trigger({
        type: 'variantImageChange',
        variant: variant
      });
    },

    /**
     * Trigger event when variant price changes.
     *
     * @param  {object} variant - Currently selected variant
     * @return {event} variantPriceChange
     */
    _updatePrice: function(variant) {
      if (
        variant.price === this.currentVariant.price &&
        variant.compare_at_price === this.currentVariant.compare_at_price
      ) {
        return;
      }
		console.log("Price diff "+variant.price );

      this.$container.trigger({
        type: 'variantPriceChange',
        variant: variant
      });
    },

    /**
     * Trigger event when variant sku changes.
     *
     * @param  {object} variant - Currently selected variant
     * @return {event} variantSKUChange
     */
    _updateSKU: function(variant) {
      if (variant.sku === this.currentVariant.sku) {
        return;
      }

      this.$container.trigger({
        type: 'variantSKUChange',
        variant: variant
      });
    },

    /**
     * Update history state for product deeplinking
     *
     * @param  {variant} variant - Currently selected variant
     * @return {k}         [description]
     */
    _updateHistoryState: function(variant) {
      if (!history.replaceState || !variant) {
        return;
      }

      var newurl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        '?variant=' +
        variant.id;
      window.history.replaceState({ path: newurl }, '', newurl);
    },

    /**
     * Update hidden master select of variant change
     *
     * @param  {variant} variant - Currently selected variant
     */
    _updateMasterSelect: function(variant) {
      $(this.originalSelectorId, this.$container).val(variant.id);
    }
  });

  return Variants;
})();


/* ================ GLOBAL ================ */
/*============================================================================
  Drawer modules
==============================================================================*/
theme.Drawers = (function() {
  function Drawer(id, position, options) {
    var defaults = {
      close: '.js-drawer-close',
      open: '.js-drawer-open-' + position,
      openClass: 'js-drawer-open',
      dirOpenClass: 'js-drawer-open-' + position
    };

    this.nodes = {
      $parent: $('html').add('body'),
      $page: $('#PageContainer')
    };

    this.config = $.extend(defaults, options);
    this.position = position;

    this.$drawer = $('#' + id);

    if (!this.$drawer.length) {
      return false;
    }

    this.drawerIsOpen = false;
    this.init();
  }

  Drawer.prototype.init = function() {
    $(this.config.open).on('click', $.proxy(this.open, this));
    this.$drawer.on('click', this.config.close, $.proxy(this.close, this));
  };

  Drawer.prototype.open = function(evt) {
    // Keep track if drawer was opened from a click, or called by another function
    var externalCall = false;

    // Prevent following href if link is clicked
    if (evt) {
      evt.preventDefault();
    } else {
      externalCall = true;
    }

    // Without this, the drawer opens, the click event bubbles up to nodes.$page
    // which closes the drawer.
    if (evt && evt.stopPropagation) {
      evt.stopPropagation();
      // save the source of the click, we'll focus to this on close
      this.$activeSource = $(evt.currentTarget);
    }

    if (this.drawerIsOpen && !externalCall) {
      return this.close();
    }

    // Add is-transitioning class to moved elements on open so drawer can have
    // transition for close animation
    this.$drawer.prepareTransition();

    this.nodes.$parent.addClass(
      this.config.openClass + ' ' + this.config.dirOpenClass
    );
    this.drawerIsOpen = true;

    // Set focus on drawer
    slate.a11y.trapFocus({
      $container: this.$drawer,
      namespace: 'drawer_focus'
    });

    // Run function when draw opens if set
    if (
      this.config.onDrawerOpen &&
      typeof this.config.onDrawerOpen === 'function'
    ) {
      if (!externalCall) {
        this.config.onDrawerOpen();
      }
    }

    if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
      this.$activeSource.attr('aria-expanded', 'true');
    }

    this.bindEvents();

    return this;
  };

  Drawer.prototype.close = function() {
    if (!this.drawerIsOpen) {
      // don't close a closed drawer
      return;
    }

    // deselect any focused form elements
    $(document.activeElement).trigger('blur');

    // Ensure closing transition is applied to moved elements, like the nav
    this.$drawer.prepareTransition();

    this.nodes.$parent.removeClass(
      this.config.dirOpenClass + ' ' + this.config.openClass
    );

    if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
      this.$activeSource.attr('aria-expanded', 'false');
    }

    this.drawerIsOpen = false;

    // Remove focus on drawer
    slate.a11y.removeTrapFocus({
      $container: this.$drawer,
      namespace: 'drawer_focus'
    });

    this.unbindEvents();

    // Run function when draw closes if set
    if (
      this.config.onDrawerClose &&
      typeof this.config.onDrawerClose === 'function'
    ) {
      this.config.onDrawerClose();
    }
  };

  Drawer.prototype.bindEvents = function() {
    this.nodes.$parent.on(
      'keyup.drawer',
      $.proxy(function(evt) {
        // close on 'esc' keypress
        if (evt.keyCode === 27) {
          this.close();
          return false;
        } else {
          return true;
        }
      }, this)
    );

    // Lock scrolling on mobile
    this.nodes.$page.on('touchmove.drawer', function() {
      return false;
    });

    this.nodes.$page.on(
      'click.drawer',
      $.proxy(function() {
        this.close();
        return false;
      }, this)
    );
  };

  Drawer.prototype.unbindEvents = function() {
    this.nodes.$page.off('.drawer');
    this.nodes.$parent.off('.drawer');
  };

  return Drawer;
})();


/* ================ MODULES ================ */
window.theme = window.theme || {};

theme.Header = (function() {
  var selectors = {
    body: 'body',
    multicurrencySelector: '[data-currency-selector]',
    navigation: '#AccessibleNav',
    siteNavHasDropdown: '.site-nav--has-dropdown',
    siteNavChildLinks: '.site-nav__child-link',
    siteNavActiveDropdown: '.site-nav--active-dropdown',
    siteNavLinkMain: '.site-nav__link--main',
    siteNavChildLink: '.site-nav__link--last'
  };

  var config = {
    activeClass: 'site-nav--active-dropdown',
    childLinkClass: 'site-nav__child-link'
  };

  var cache = {};

  function init() {
    cacheSelectors();

    cache.$parents.on('click.siteNav', function() {
      var $el = $(this);

      $el.hasClass(config.activeClass) ? hideDropdown($el) : showDropdown($el);
    });

    // check when we're leaving a dropdown and close the active dropdown
    $(selectors.siteNavChildLink).on('focusout.siteNav', function() {
      setTimeout(function() {
        if (
          $(document.activeElement).hasClass(config.childLinkClass) ||
          !cache.$activeDropdown.length
        ) {
          return;
        }

        hideDropdown(cache.$activeDropdown);
      });
    });

    // close dropdowns when on top level nav
    cache.$topLevel.on('focus.siteNav', function() {
      if (cache.$activeDropdown.length) {
        hideDropdown(cache.$activeDropdown);
      }
    });

    cache.$subMenuLinks.on('click.siteNav', function(evt) {
      // Prevent click on body from firing instead of link
      evt.stopImmediatePropagation();
    });

    $(selectors.multicurrencySelector).on('change', function() {
      $(this)
        .parents('form')
        .submit();
    });
  }

  function cacheSelectors() {
    cache = {
      $nav: $(selectors.navigation),
      $topLevel: $(selectors.siteNavLinkMain),
      $parents: $(selectors.navigation).find(selectors.siteNavHasDropdown),
      $subMenuLinks: $(selectors.siteNavChildLinks),
      $activeDropdown: $(selectors.siteNavActiveDropdown)
    };
  }

  function showDropdown($el) {
    $el.addClass(config.activeClass);

    // close open dropdowns
    if (cache.$activeDropdown.length) {
      hideDropdown(cache.$activeDropdown);
    }

    cache.$activeDropdown = $el;

    // set expanded on open dropdown
    $el.find(selectors.siteNavLinkMain).attr('aria-expanded', 'true');

    setTimeout(function() {
      $(window).on('keyup.siteNav', function(evt) {
        if (evt.keyCode === 27) {
          hideDropdown($el);
        }
      });

      $(selectors.body).on('click.siteNav', function() {
        hideDropdown($el);
      });
    }, 250);
  }

  function hideDropdown($el) {
    // remove aria on open dropdown
    $el.find(selectors.siteNavLinkMain).attr('aria-expanded', 'false');
    $el.removeClass(config.activeClass);

    // reset active dropdown
    cache.$activeDropdown = $(selectors.siteNavActiveDropdown);

    $(selectors.body).off('click.siteNav');
    $(window).off('keyup.siteNav');
  }

  function unload() {
    $(window).off('.siteNav');
    cache.$parents.off('.siteNav');
    cache.$subMenuLinks.off('.siteNav');
    cache.$topLevel.off('.siteNav');
    $(selectors.siteNavChildLink).off('.siteNav');
    $(selectors.body).off('.siteNav');
  }

  return {
    init: init,
    unload: unload
  };
})();

window.theme = window.theme || {};

theme.MobileNav = (function(){
  var mediaQuerySmall = 'screen and (max-width: 749px)';
  function init() {
    mobileMenuOpen();
    closeMobileNav();
    // Close mobile nav when unmatching mobile breakpoint
    enquire.register(mediaQuerySmall, {
      unmatch: function() {

      }
    });
  }
  function mobileMenuOpen() {
    $(".mobile_menu").slideMobileMenu({
      onMenuLoad: function(menu) {},
      onMenuToggle: function(menu, opened) {}
    });
  }
  function closeMobileNav() {
    // var mc = document.querySelector('.menu-close');
    // mc.addEventListener('click', function (event) {
    //   event.preventDefault();
    //   document.querySelector('.sm_menu_outer').classList.remove('active');
    //   document.querySelector('body').classList.remove('mmactive');
    // });
  }

  return {
    init: init,
    closeMobileNav: closeMobileNav
  };

})(jQuery);

theme.MobileNavOrg = (function() {
  var classes = {
    mobileNavOpenIcon: 'mobile-nav--open',
    mobileNavCloseIcon: 'mobile-nav--close',
    navLinkWrapper: 'mobile-nav__item',
    navLink: 'mobile-nav__link',
    subNavLink: 'mobile-nav__sublist-link',
    return: 'mobile-nav__return-btn',
    subNavActive: 'is-active',
    subNavClosing: 'is-closing',
    navOpen: 'js-menu--is-open',
    subNavShowing: 'sub-nav--is-open',
    thirdNavShowing: 'third-nav--is-open',
    subNavToggleBtn: 'js-toggle-submenu'
  };
  var cache = {};
  var isTransitioning;
  var $activeSubNav;
  var $activeTrigger;
  var menuLevel = 1;
  // Breakpoints from src/stylesheets/global/variables.scss.liquid
  var mediaQuerySmall = 'screen and (max-width: 749px)';

  function init() {
    cacheSelectors();

    cache.$mobileNavToggle.on('click', toggleMobileNav);
    cache.$subNavToggleBtn.on('click.subNav', toggleSubNav);

    // Close mobile nav when unmatching mobile breakpoint
    enquire.register(mediaQuerySmall, {
      unmatch: function() {
        if (cache.$mobileNavContainer.hasClass(classes.navOpen)) {
          closeMobileNav();
        }
      }
    });
  }

  function toggleMobileNav() {
    if (cache.$mobileNavToggle.hasClass(classes.mobileNavCloseIcon)) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  function cacheSelectors() {
    cache = {
      $pageContainer: $('#PageContainer'),
      $siteHeader: $('.site-header'),
      $mobileNavToggle: $('.js-mobile-nav-toggle'),
      $mobileNavContainer: $('.mobile-nav-wrapper'),
      $mobileNav: $('#MobileNav'),
      $sectionHeader: $('#shopify-section-header'),
      $subNavToggleBtn: $('.' + classes.subNavToggleBtn)
    };
  }

  function openMobileNav() {
    var translateHeaderHeight = cache.$siteHeader.outerHeight();

    cache.$mobileNavContainer.prepareTransition().addClass(classes.navOpen);

    cache.$mobileNavContainer.css({
      transform: 'translateY(' + translateHeaderHeight + 'px)'
    });

    cache.$pageContainer.css({
      transform:
        'translate3d(0, ' + cache.$mobileNavContainer[0].scrollHeight + 'px, 0)'
    });

    slate.a11y.trapFocus({
      $container: cache.$sectionHeader,
      $elementToFocus: cache.$mobileNavToggle,
      namespace: 'navFocus'
    });

    cache.$mobileNavToggle
      .addClass(classes.mobileNavCloseIcon)
      .removeClass(classes.mobileNavOpenIcon)
      .attr('aria-expanded', true);

    // close on escape
    $(window).on('keyup.mobileNav', function(evt) {
      if (evt.which === 27) {
        closeMobileNav();
      }
    });
  }

  function closeMobileNav() {
    cache.$mobileNavContainer.prepareTransition().removeClass(classes.navOpen);

    cache.$mobileNavContainer.css({
      transform: 'translateY(-100%)'
    });

    cache.$pageContainer.removeAttr('style');

    slate.a11y.trapFocus({
      $container: $('html'),
      $elementToFocus: $('body')
    });

    cache.$mobileNavContainer.one(
      'TransitionEnd.navToggle webkitTransitionEnd.navToggle transitionend.navToggle oTransitionEnd.navToggle',
      function() {
        slate.a11y.removeTrapFocus({
          $container: cache.$mobileNav,
          namespace: 'navFocus'
        });
      }
    );

    cache.$mobileNavToggle
      .addClass(classes.mobileNavOpenIcon)
      .removeClass(classes.mobileNavCloseIcon)
      .attr('aria-expanded', false)
      .focus();

    $(window).off('keyup.mobileNav');

    scrollTo(0, 0);
  }

  function toggleSubNav(evt) {
    if (isTransitioning) {
      return;
    }

    var $toggleBtn = $(evt.currentTarget);
    var isReturn = $toggleBtn.hasClass(classes.return);
    isTransitioning = true;

    if (isReturn) {
      // Close all subnavs by removing active class on buttons
      $(
        '.' + classes.subNavToggleBtn + '[data-level="' + (menuLevel - 1) + '"]'
      ).removeClass(classes.subNavActive);

      if ($activeTrigger && $activeTrigger.length) {
        $activeTrigger.removeClass(classes.subNavActive);
      }
    } else {
      $toggleBtn.addClass(classes.subNavActive);
    }

    $activeTrigger = $toggleBtn;

    goToSubnav($toggleBtn.data('target'));
  }

  function goToSubnav(target) {
    /*eslint-disable shopify/jquery-dollar-sign-reference */

    var $targetMenu = target
      ? $('.mobile-nav__dropdown[data-parent="' + target + '"]')
      : cache.$mobileNav;

    menuLevel = $targetMenu.data('level') ? $targetMenu.data('level') : 1;

    if ($activeSubNav && $activeSubNav.length) {
      $activeSubNav.prepareTransition().addClass(classes.subNavClosing);
    }

    $activeSubNav = $targetMenu;

    /*eslint-enable shopify/jquery-dollar-sign-reference */

    var translateMenuHeight = $targetMenu.outerHeight();

    var openNavClass =
      menuLevel > 2 ? classes.thirdNavShowing : classes.subNavShowing;

    cache.$mobileNavContainer
      .css('height', translateMenuHeight)
      .removeClass(classes.thirdNavShowing)
      .addClass(openNavClass);

    if (!target) {
      // Show top level nav
      cache.$mobileNavContainer
        .removeClass(classes.thirdNavShowing)
        .removeClass(classes.subNavShowing);
    }

    /* if going back to first subnav, focus is on whole header */
    var $container = menuLevel === 1 ? cache.$sectionHeader : $targetMenu;

    var $menuTitle = $targetMenu.find('[data-menu-title=' + menuLevel + ']');
    var $elementToFocus = $menuTitle ? $menuTitle : $targetMenu;

    // Focusing an item in the subnav early forces element into view and breaks the animation.
    cache.$mobileNavContainer.one(
      'TransitionEnd.subnavToggle webkitTransitionEnd.subnavToggle transitionend.subnavToggle oTransitionEnd.subnavToggle',
      function() {
        slate.a11y.trapFocus({
          $container: $container,
          $elementToFocus: $elementToFocus,
          namespace: 'subNavFocus'
        });

        cache.$mobileNavContainer.off('.subnavToggle');
        isTransitioning = false;
      }
    );

    // Match height of subnav
    cache.$pageContainer.css({
      transform: 'translateY(' + translateMenuHeight + 'px)'
    });

    $activeSubNav.removeClass(classes.subNavClosing);
  }

  return {
    init: init,
    closeMobileNav: closeMobileNav
  };
})(jQuery);

window.theme = window.theme || {};

theme.Search = (function() {
  var selectors = {
    search: '.search',
    searchSubmit: '.search__submit',
    searchInput: '.search__input',

    siteHeader: '.site-header',
    siteHeaderSearchToggle: '.site-header__search-toggle',
    siteHeaderSearch: '.site-header__search',

    searchDrawer: '.search-bar',
    searchDrawerInput: '.search-bar__input',

    searchHeader: '.search-header',
    searchHeaderInput: '.search-header__input',
    searchHeaderSubmit: '.search-header__submit',

    searchResultSubmit: '#SearchResultSubmit',
    searchResultInput: '#SearchInput',
    searchResultMessage: '[data-search-error-message]',

    mobileNavWrapper: '.mobile-nav-wrapper'
  };

  var classes = {
    focus: 'search--focus',
    hidden: 'hide',
    mobileNavIsOpen: 'js-menu--is-open'
  };

  function init() {
    if (!$(selectors.siteHeader).length) {
      return;
    }

    this.$searchResultInput = $(selectors.searchResultInput);
    this.$searchErrorMessage = $(selectors.searchResultMessage);

    initDrawer();

    var isSearchPage =
      slate.utils.getParameterByName('q') !== null &&
      window.location.pathname === '/search';

    if (isSearchPage) {
      validateSearchResultForm.call(this);
    }

    $(selectors.searchResultSubmit).on(
      'click',
      validateSearchResultForm.bind(this)
    );

    $(selectors.searchHeaderInput)
      .add(selectors.searchHeaderSubmit)
      .on('focus blur', function() {
        $(selectors.searchHeader).toggleClass(classes.focus);
      });

    $(selectors.siteHeaderSearchToggle).on('click', function() {
      var searchHeight = $(selectors.siteHeader).outerHeight();
      var searchOffset = $(selectors.siteHeader).offset().top - searchHeight;

      $(selectors.searchDrawer).css({
        height: searchHeight + 'px',
        top: searchOffset + 'px'
      });
    });
  }

  function initDrawer() {
    // Add required classes to HTML
    $('#PageContainer').addClass('drawer-page-content');
    $('.js-drawer-open-top')
      .attr('aria-controls', 'SearchDrawer')
      .attr('aria-expanded', 'false')
      .attr('aria-haspopup', 'dialog');

    theme.SearchDrawer = new theme.Drawers('SearchDrawer', 'top', {
      onDrawerOpen: searchDrawerFocus,
      onDrawerClose: searchDrawerFocusClose
    });
  }

  function searchDrawerFocus() {
    searchFocus($(selectors.searchDrawerInput));

    if ($(selectors.mobileNavWrapper).hasClass(classes.mobileNavIsOpen)) {
      theme.MobileNav.closeMobileNav();
    }
  }

  function searchFocus($el) {
    $el.focus();
    // set selection range hack for iOS
    $el[0].setSelectionRange(0, $el[0].value.length);
  }

  function searchDrawerFocusClose() {
    $(selectors.siteHeaderSearchToggle).focus();
  }

  /**
   * Remove the aria-attributes and hide the error messages
   */
  function hideErrorMessage() {
    this.$searchErrorMessage.addClass(classes.hidden);
    this.$searchResultInput
      .removeAttr('aria-describedby')
      .removeAttr('aria-invalid');
  }

  /**
   * Add the aria-attributes and show the error messages
   */
  function showErrorMessage() {
    this.$searchErrorMessage.removeClass(classes.hidden);
    this.$searchResultInput
      .attr('aria-describedby', 'error-search-form')
      .attr('aria-invalid', true);
  }

  function validateSearchResultForm(evt) {
    if (!document.querySelectorAll('.search-result-list li')) {

    }
    // var isInputValueEmpty = this.$searchResultInput.val().trim().length === 0;
    //
    // if (!isInputValueEmpty) {
    //   hideErrorMessage.call(this);
    //   return;
    // }
    //
    // if (typeof evt !== 'undefined') {
    //   evt.preventDefault();
    // }
    //
    // searchFocus(this.$searchResultInput);
    // showErrorMessage.call(this);
  }

  return {
    init: init
  };
})();

(function() {
  var selectors = {
    backButton: '.return-link'
  };

  var $backButton = $(selectors.backButton);

  if (!document.referrer || !$backButton.length || !window.history.length) {
    return;
  }

  $backButton.one('click', function(evt) {
    evt.preventDefault();

    var referrerDomain = urlDomain(document.referrer);
    var shopDomain = urlDomain(window.location.href);

    if (shopDomain === referrerDomain) {
      history.back();
    }

    return false;
  });

  function urlDomain(url) {
    var anchor = document.createElement('a');
    anchor.ref = url;

    return anchor.hostname;
  }
})();

theme.Slideshow = (function() {
  this.$slideshow = null;
  var classes = {
    slideshow: 'slideshow',
    slickActiveMobile: 'slick-active-mobile',
    controlsHover: 'slideshow__controls--hover',
    isPaused: 'is-paused'
  };

  var selectors = {
    section: '.shopify-section',
    wrapper: '#SlideshowWrapper-',
    slides: '.slideshow__slide',
    textWrapperMobile: '.slideshow__text-wrap--mobile',
    textContentMobile: '.slideshow__text-content--mobile',
    controls: '.slideshow__controls',
    pauseButton: '.slideshow__pause',
    dots: '.slick-dots',
    arrows: '.slideshow__arrows',
    arrowsMobile: '.slideshow__arrows--mobile',
    arrowLeft: '.slideshow__arrow-left',
    arrowRight: '.slideshow__arrow-right'
  };

  function slideshow(el, sectionId) {
    var $slideshow = (this.$slideshow = $(el));
    this.adaptHeight = this.$slideshow.data('adapt-height');
    this.$wrapper = this.$slideshow.closest(selectors.wrapper + sectionId);
    this.$section = this.$wrapper.closest(selectors.section);
    this.$controls = this.$wrapper.find(selectors.controls);
    this.$arrows = this.$section.find(selectors.arrows);
    this.$arrowsMobile = this.$section.find(selectors.arrowsMobile);
    this.$pause = this.$controls.find(selectors.pauseButton);
    this.$textWrapperMobile = this.$section.find(selectors.textWrapperMobile);
    this.autorotate = this.$slideshow.data('autorotate');
    var autoplaySpeed = this.$slideshow.data('speed');
    var loadSlideA11yString = this.$slideshow.data('slide-nav-a11y');

    this.settings = {
      accessibility: true,
      arrows: false,
      dots: true,
      fade: true,
      draggable: true,
      touchThreshold: 20,
      autoplay: this.autorotate,
      autoplaySpeed: autoplaySpeed,
      // eslint-disable-next-line shopify/jquery-dollar-sign-reference
      appendDots: this.$arrows,
      customPaging: function(slick, index) {
        return (
          '<a href="' +
          selectors.wrapper +
          sectionId +
          '" aria-label="' +
          loadSlideA11yString.replace('[slide_number]', index + 1) +
          '" data-slide-number="' +
          index +
          '"></a>'
        );
      }
    };

    this.$slideshow.on('beforeChange', beforeChange.bind(this));
    this.$slideshow.on('init', slideshowA11ySetup.bind(this));

    // Add class to style mobile dots & show the correct text content for the
    // first slide on mobile when the slideshow initialises
    this.$slideshow.on(
      'init',
      function() {
        this.$mobileDots
          .find('li:first-of-type')
          .addClass(classes.slickActiveMobile);
        this.showMobileText(0);
      }.bind(this)
    );

    // Stop the autorotate when you scroll past the mobile controls, resume when
    // they are scrolled back into view
    if (this.autorotate) {
      $(document).scroll(
        $.debounce(
          250,
          function() {
            if (
              this.$arrowsMobile.offset().top +
                this.$arrowsMobile.outerHeight() <
              window.pageYOffset
            ) {
              $slideshow.slick('slickPause');
            } else if (!this.$pause.hasClass(classes.isPaused)) {
              $slideshow.slick('slickPlay');
            }
          }.bind(this)
        )
      );
    }

    if (this.adaptHeight) {
      this.setSlideshowHeight();
      $(window).resize($.debounce(50, this.setSlideshowHeight.bind(this)));
    }

    this.$slideshow.slick(this.settings);

    // This can't be called when the slick 'init' event fires due to how slick
    // adds a11y features.
    slideshowPostInitA11ySetup.bind(this)();

    this.$arrows.find(selectors.arrowLeft).on('click', function() {
      $slideshow.slick('slickPrev');
    });
    this.$arrows.find(selectors.arrowRight).on('click', function() {
      $slideshow.slick('slickNext');
    });

    this.$pause.on('click', this.togglePause.bind(this));
  }

  function slideshowA11ySetup(event, obj) {
    var $slider = obj.$slider;
    var $list = obj.$list;
    this.$dots = this.$section.find(selectors.dots);
    this.$mobileDots = this.$dots.eq(1);

    // Remove default Slick aria-live attr until slider is focused
    $list.removeAttr('aria-live');

    this.$wrapper.on('keyup', keyboardNavigation.bind(this));
    this.$controls.on('keyup', keyboardNavigation.bind(this));
    this.$textWrapperMobile.on('keyup', keyboardNavigation.bind(this));

    // When an element in the slider is focused
    // pause slideshow and set aria-live.
    this.$wrapper
      .on(
        'focusin',
        function(evt) {
          if (!this.$wrapper.has(evt.target).length) {
            return;
          }

          $list.attr('aria-live', 'polite');
          if (this.autorotate) {
            $slider.slick('slickPause');
          }
        }.bind(this)
      )
      .on(
        'focusout',
        function(evt) {
          if (!this.$wrapper.has(evt.target).length) {
            return;
          }

          $list.removeAttr('aria-live');
          if (this.autorotate) {
            // Only resume playing if the user hasn't paused using the pause
            // button
            if (!this.$pause.is('.is-paused')) {
              $slider.slick('slickPlay');
            }
          }
        }.bind(this)
      );

    // Add arrow key support when focused
    if (this.$dots) {
      this.$dots
        .find('a')
        .each(function() {
          var $dot = $(this);
          $dot.on('click keyup', function(evt) {
            if (
              evt.type === 'keyup' &&
              evt.which !== slate.utils.keyboardKeys.ENTER
            )
              return;

            evt.preventDefault();

            var slideNumber = $(evt.target).data('slide-number');

            $slider.attr('tabindex', -1).slick('slickGoTo', slideNumber);

            if (evt.type === 'keyup') {
              $slider.focus();
            }
          });
        })
        .eq(0)
        .attr('aria-current', 'true');
    }

    this.$controls
      .on('focusin', highlightControls.bind(this))
      .on('focusout', unhighlightControls.bind(this));
  }

  function slideshowPostInitA11ySetup() {
    var $slides = this.$slideshow.find(selectors.slides);

    $slides.removeAttr('role').removeAttr('aria-labelledby');
    this.$dots
      .removeAttr('role')
      .find('li')
      .removeAttr('role')
      .removeAttr('aria-selected')
      .each(function() {
        var $dot = $(this);
        var ariaControls = $dot.attr('aria-controls');
        $dot
          .removeAttr('aria-controls')
          .find('a')
          .attr('aria-controls', ariaControls);
      });
  }

  function beforeChange(event, slick, currentSlide, nextSlide) {
    var $dotLinks = this.$dots.find('a');
    var $mobileDotLinks = this.$mobileDots.find('li');

    $dotLinks
      .removeAttr('aria-current')
      .eq(nextSlide)
      .attr('aria-current', 'true');

    $mobileDotLinks
      .removeClass(classes.slickActiveMobile)
      .eq(nextSlide)
      .addClass(classes.slickActiveMobile);
    this.showMobileText(nextSlide);
  }

  function keyboardNavigation() {
    if (event.keyCode === slate.utils.keyboardKeys.LEFTARROW) {
      this.$slideshow.slick('slickPrev');
    }
    if (event.keyCode === slate.utils.keyboardKeys.RIGHTARROW) {
      this.$slideshow.slick('slickNext');
    }
  }

  function highlightControls() {
    this.$controls.addClass(classes.controlsHover);
  }

  function unhighlightControls() {
    this.$controls.removeClass(classes.controlsHover);
  }

  slideshow.prototype.togglePause = function() {
    var slideshowSelector = getSlideshowId(this.$pause);
    if (this.$pause.hasClass(classes.isPaused)) {
      this.$pause.removeClass(classes.isPaused).attr('aria-pressed', 'false');
      if (this.autorotate) {
        $(slideshowSelector).slick('slickPlay');
      }
    } else {
      this.$pause.addClass(classes.isPaused).attr('aria-pressed', 'true');
      if (this.autorotate) {
        $(slideshowSelector).slick('slickPause');
      }
    }
  };

  slideshow.prototype.setSlideshowHeight = function() {
    var minAspectRatio = this.$slideshow.data('min-aspect-ratio');
    this.$slideshow.height($(document).width() / minAspectRatio);
  };

  slideshow.prototype.showMobileText = function(slideIndex) {
    var $allTextContent = this.$textWrapperMobile.find(
      selectors.textContentMobile
    );
    var currentTextContentSelector =
      selectors.textContentMobile + '-' + slideIndex;
    var $currentTextContent = this.$textWrapperMobile.find(
      currentTextContentSelector
    );
    if (
      !$currentTextContent.length &&
      this.$slideshow.find(selectors.slides).length === 1
    ) {
      this.$textWrapperMobile.hide();
    } else {
      this.$textWrapperMobile.show();
    }
    $allTextContent.hide();
    $currentTextContent.show();
  };

  function getSlideshowId($el) {
    return '#Slideshow-' + $el.data('id');
  }

  return slideshow;
})();

window.theme = window.theme || {};

theme.FormStatus = (function() {
  var selectors = {
    statusMessage: '[data-form-status]'
  };

  function init() {
    this.$statusMessage = $(selectors.statusMessage);

    if (!this.$statusMessage) return;

    this.$statusMessage.focus();
  }

  return {
    init: init
  };
})();


/* ================ TEMPLATES ================ */
(function() {
  var $filterBy = $('#BlogTagFilter');

  if (!$filterBy.length) {
    return;
  }

  $filterBy.on('change', function() {
    location.href = $(this).val();
  });
})();

window.theme = theme || {};

theme.customerTemplates = (function() {
  function initEventListeners() {
    // Show reset password form
    $('#RecoverPassword').on('click', function(evt) {
      evt.preventDefault();
      toggleRecoverPasswordForm();
    });

    // Hide reset password form
    $('#HideRecoverPasswordLink').on('click', function(evt) {
      evt.preventDefault();
      toggleRecoverPasswordForm();
    });
  }

  /**
   *
   *  Show/Hide recover password form
   *
   */
  function toggleRecoverPasswordForm() {
    $('#RecoverPasswordForm').toggleClass('hide');
    $('#CustomerLoginForm').toggleClass('hide');
  }

  /**
   *
   *  Show reset password success message
   *
   */
  function resetPasswordSuccess() {
    var $formState = $('.reset-password-success');

    // check if reset password form was successfully submited.
    if (!$formState.length) {
      return;
    }

    // show success message
    $('#ResetSuccess').removeClass('hide');
  }

  /**
   *
   *  Show/hide customer address forms
   *
   */
  function customerAddressForm() {
    var $newAddressForm = $('#AddressNewForm');

    if (!$newAddressForm.length) {
      return;
    }

    // Initialize observers on address selectors, defined in shopify_common.js
    if (Shopify) {
      // eslint-disable-next-line no-new
      new Shopify.CountryProvinceSelector(
        'AddressCountryNew',
        'AddressProvinceNew',
        {
          hideElement: 'AddressProvinceContainerNew'
        }
      );
    }

    // Initialize each edit form's country/province selector
    $('.address-country-option').each(function() {
      var formId = $(this).data('form-id');
      var countrySelector = 'AddressCountry_' + formId;
      var provinceSelector = 'AddressProvince_' + formId;
      var containerSelector = 'AddressProvinceContainer_' + formId;

      // eslint-disable-next-line no-new
      new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
        hideElement: containerSelector
      });
    });

    // Toggle new/edit address forms
    $('.address-new-toggle').on('click', function() {
      $newAddressForm.toggleClass('hide');
    });

    $('.address-edit-toggle').on('click', function() {
      var formId = $(this).data('form-id');
      $('#EditAddress_' + formId).toggleClass('hide');
    });

    $('.address-delete').on('click', function() {
      var $el = $(this);
      var formId = $el.data('form-id');
      var confirmMessage = $el.data('confirm-message');

      // eslint-disable-next-line no-alert
      if (
        confirm(
          confirmMessage || 'Are you sure you wish to delete this address?'
        )
      ) {
        Shopify.postLink('/account/addresses/' + formId, {
          parameters: { _method: 'delete' }
        });
      }
    });
  }

  /**
   *
   *  Check URL for reset password hash
   *
   */
  function checkUrlHash() {
    var hash = window.location.hash;

    // Allow deep linking to recover password form
    if (hash === '#recover') {
      toggleRecoverPasswordForm();
    }
  }

  return {
    init: function() {
      checkUrlHash();
      initEventListeners();
      resetPasswordSuccess();
      customerAddressForm();
    }
  };
})();


/*================ SECTIONS ================*/
window.theme = window.theme || {};
theme.Custom = {
  drawertoggle: function(cls) {
    document.querySelector(cls).classList.toggle('active');
    document.querySelector('body').classList.toggle('drawer-open');
    //tidio-chat / toggle if needed
    /*
    if($('body').hasClass('drawer-open')){
    	$('#tidio-chat').addClass('hide-tidio');
    }else{
    	$('#tidio-chat').removeClass('hide-tidio');
    }
    */
    return document.querySelector('.overlay').classList.toggle('active');
  }

};

window.theme = window.theme || {};

theme.Cart = (function() {
  var selectors = {
    edit: '.js-edit-toggle',
    inputQty: '.cart__qty-input',
    thumbnails: '.cart__image',
    item: '.cart__row'
  };

  var config = {
    showClass: 'cart__update--show',
    showEditClass: 'cart__edit--active',
    cartNoCookies: 'cart--no-cookies'
  };

  function Cart(container) {
    this.$container = $(container);
    this.$edit = $(selectors.edit, this.$container);
    this.$inputQuantities = $(selectors.inputQty, this.$container);
    this.$thumbnails = $(selectors.thumbnails, this.$container);

    if (!this.cookiesEnabled()) {
      this.$container.addClass(config.cartNoCookies);
    }

    this.$edit.on('click', this._onEditClick);
    this.$inputQuantities.on('change', this._handleInputQty);

    this.$thumbnails.css('cursor', 'pointer');
    this.$thumbnails.on('click', this._handleThumbnailClick);
  }

  Cart.prototype = _.assignIn({}, Cart.prototype, {
    onUnload: function() {
      this.$edit.off('click', this._onEditClick);
    },

    _onEditClick: function(evt) {
      var $evtTarget = $(evt.target);
      var $updateLine = $('.' + $evtTarget.data('target'));
      var isExpanded = $evtTarget.attr('aria-expanded') === 'true';

      $evtTarget
        .toggleClass(config.showEditClass)
        .attr('aria-expanded', !isExpanded);
      $updateLine.toggleClass(config.showClass);
    },

    _handleInputQty: function(evt) {
      var $input = $(evt.target);
      var value = $input.val();
      var itemKey = $input.data('quantity-item');
      var $itemQtyInputs = $('[data-quantity-item=' + itemKey + ']');
      $itemQtyInputs.val(value);
    },

    _handleThumbnailClick: function(evt) {
      var url = $(evt.target).data('item-url');

      window.location.href = url;
    },

    cookiesEnabled: function() {
      var cookieEnabled = navigator.cookieEnabled;

      if (!cookieEnabled) {
        document.cookie = 'testcookie';
        cookieEnabled = document.cookie.indexOf('testcookie') !== -1;
      }
      return cookieEnabled;
    }
  });

  return Cart;
})();

window.theme = window.theme || {};

theme.Filters = (function() {
  var settings = {
    // Breakpoints from src/stylesheets/global/variables.scss.liquid
    mediaQueryMediumUp: 'screen and (min-width: 750px)'
  };

  var constants = {
    SORT_BY: 'sort_by'
  };

  var selectors = {
    mainContent: '#MainContent',
    filterSelection: '#FilterTags',
    sortSelection: '#SortBy',
    defaultSort: '#DefaultSortBy'
  };

  function Filters(container) {
    var $container = (this.$container = $(container));

    this.$filterSelect = $(selectors.filterSelection, $container);
    this.$sortSelect = $(selectors.sortSelection, $container);
    this.$selects = $(selectors.filterSelection, $container).add(
      $(selectors.sortSelection, $container)
    );

    this.defaultSort = this._getDefaultSortValue();
    this.$selects.removeClass('hidden');

    this.$filterSelect.on('change', this._onFilterChange.bind(this));
    this.$sortSelect.on('change', this._onSortChange.bind(this));
    this._initBreakpoints();
  }

  Filters.prototype = _.assignIn({}, Filters.prototype, {
    _initBreakpoints: function() {
      var self = this;

      enquire.register(settings.mediaQueryMediumUp, {
        match: function() {
          self._resizeSelect(self.$selects);
        }
      });
    },

    _onSortChange: function() {
      var sort = this._sortValue();
      var url = window.location.href.replace(window.location.search, '');
      var queryStringValue = slate.utils.getParameterByName('q');
      var query = queryStringValue !== null ? queryStringValue : '';

      if (sort.length) {
        var urlStripped = url.replace(window.location.hash, '');
        query = query !== '' ? '?q=' + query + '&' : '?';

        window.location.href =
          urlStripped + query + sort + selectors.mainContent;
      } else {
        // clean up our url if the sort value is blank for default
        window.location.href = url;
      }
    },

    _onFilterChange: function() {
      var filter = this._getFilterValue();

      // remove the 'page' parameter to go to the first page of results
      var search = document.location.search.replace(/\?(page=\w+)?&?/, '');

      // only add the search parameters to the url if they exist
      search = search !== '' ? '?' + search : '';

      document.location.href = filter + search + selectors.mainContent;
    },

    _getFilterValue: function() {
      return this.$filterSelect.val();
    },

    _getSortValue: function() {
      return this.$sortSelect.val() || this.defaultSort;
    },

    _getDefaultSortValue: function() {
      return $(selectors.defaultSort, this.$container).val();
    },

    _sortValue: function() {
      var sort = this._getSortValue();
      var query = '';

      if (sort !== this.defaultSort) {
        query = constants.SORT_BY + '=' + sort;
      }

      return query;
    },

    _resizeSelect: function($selection) {
      $selection.each(function() {
        var $this = $(this);
        var arrowWidth = 10;
        // create test element
        var text = $this.find('option:selected').text();
        var $test = $('<span>').html(text);

        // add to body, get width, and get out
        $test.appendTo('body');
        var width = $test.width();
        $test.remove();

        // set select width
        $this.width(width + arrowWidth);
      });
    },

    onUnload: function() {
      this.$filterSelect.off('change', this._onFilterChange);
      this.$sortSelect.off('change', this._onSortChange);
    }
  });

  return Filters;
})();

theme.CustomFilters = {};
theme.CustomFilters = (function() {
  var constants = {
    SORT_BY: 'sort_by'
  };
  var selectors = {
    filterSelection: '#SortTags',
    sortSelection: '#SortBy',
    defaultSort: '#DefaultSortBy',
    filterWrapper: '.filter-option',
    filterOptions: '.filters-list',
    filterPopupClose: '.filter-close',
    filterRemove: '.rt-text a.remove_tags',
    filterRemoveAll: 'a.clear',
    autofilter: true,
    productBlock: '.product-block',
    activeFilter: '.filters-list'
  };

  function CustomFilters(container) {
    this.settings = {
      // Breakpoints from src/stylesheets/global/variables.scss.liquid
      mediaQueryMediumUp: 'screen and (min-width: 750px)',
      mediaQuerySmall: 'screen and (max-width: 749px)'
    };
    var $container = (this.$container = $(container));

    this.$customFilter = $(selectors.filterOptions, $container);
    this.$customFilterDisplay = $(selectors.filterPopupClose, $container);
    this.$customFilterRemove = $(selectors.filterRemove, $container);
    this.$customFilterRemoveAll = $(selectors.filterRemoveAll, $container);
    this.$filterSelect = $(selectors.filterSelection, $container);
    this.$sortSelect = $(selectors.sortSelection, $container);
    this.$selects = $(selectors.filterSelection, $container).add(
      $(selectors.sortSelection, $container)
    );
    this.defaultSort = this._getDefaultSortValue();
    this._resizeSelect(this.$selects);
    this.$selects.removeClass('hidden');
    self = this;

    //self._initBreakpoints();

    this.$customFilter.on('change', function(e){
      e.preventDefault();
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
      } else {
        $(this).addClass('active');
      }
      self._CustomFilter();
    });

    this.$customFilterDisplay.on('click', function(e){
      e.preventDefault();
      //close popup
      $(this).removeClass('active');
      self._CustomFilter();
    });

  $(document).on('click', selectors.filterRemoveAll, function(e){
      e.preventDefault();
     /* var filters = document.querySelectorAll(selectors.activeFilter);
      $.each(filters, function(i,item) {
        $(this).removeClass('active');
      });
    $("#layout_expended").addClass('active');*/
    var sl = document.querySelectorAll( ".filters-list" );
      sl&&$.each(sl, function(i, t){
        t.value = t.name;
      });
      $('.pretty').prettyDropdown({classic: true, selectedMarker: '' }).refresh();
      self._CustomFilter();
      //self._SavedFilter();
    });

    $(document).on('click', selectors.filterRemove, function(e){
      e.preventDefault();
      var tag =  $(this).attr('data-value');
      var filters = document.querySelectorAll(selectors.activeFilter);
      $.each(filters, function(i,item) {
        var pcls = $(this).parent().attr('class');
        //console.log(pcls+'>>>>>>>>'+tag);
        //if(pcls == tag) {
          if(pcls.indexOf(tag) != -1) {
          //console.log('called');
          $(this).removeClass('active');
        }
      });
      self._CustomFilter();
      self._SavedFilter();
    });

    if (selectors.autofilter) {
      this._autoFilter();
      //this._SavedFilter("hide");
    }

    this.$filterSelect.on('change', this._onFilterChange.bind(this));
    this.$sortSelect.on('change', this._onSortChange.bind(this));
  }

  CustomFilters.prototype = $.extend({}, CustomFilters.prototype, {
    _initBreakpoints: function() {
      var self = this;
      enquire.register(this.settings.mediaQuerySmall, {
        match: function() {
          console.log("mediaQuerySmall");
          document.querySelector('.filter-toggle-block').classList.remove('active');
          document.querySelector('.filter').classList.remove('active');
        },
        unmatch: function() {
          console.log("mediaQuerySmall unmatch");
          document.querySelector('.filter-toggle-block').classList.add('active');
          document.querySelector('.filter').classList.add('active');
        }
      });

      enquire.register(this.settings.mediaQueryMediumUp, {
        match: function() {
          document.querySelector('.filter-toggle-block').classList.add('active');
          document.querySelector('.filter').classList.add('active');

        }
      });
    },

    _autoFilterTemplate: function() {
      var a = sessionStorage.getItem("autofilter"), el = a.split('/'), f = el[el.length-1];
      if(a) {
        f = f.split('?')[0];
        f = f.split('+');
        $.each(f, function(i,v) {
          v && document.querySelector('li.' + v + ' a').classList.add('active');
        });
        self._CustomFilter();
        } else {
        self._showFilteredItems();
        }
    },

    _autoFilter: function() {

      var key = 'autofilter' + document.location.pathname.split('/').join('_');
      a = sessionStorage.getItem(key);
      if(a) {
        this._showActiveFilters(a);
        this._customFiltersByClass(a);
        //this._hideAllProductBlocks();
        //this._showFilteredItems(a);
      }
      else {
        this._showAllProductBlocks();
      }
    },

    _CustomFilter: function() {
      self = this;
      var filters = document.querySelectorAll(selectors.activeFilter);
      var selEl = [];
      //console.log(filters);
      $.each(filters, function(i,item) {
        console.log(item.value + 'mydata');
        //var result = item.href.split('/');
       //if(item.value.indexOf("_") != -1) {
          selEl.push(item.value);
        //}
      });
      var selectedFilters = selEl.join("+");
      var key = 'autofilter' + document.location.pathname.split('/').join('_');
      sessionStorage.setItem(key, selectedFilters);
      // Filter products via default shopify filter with custom view template
      //self._customTemplateFilter(selectedFilters);
      if(selectedFilters.indexOf("_") != -1) {
      self._customFiltersByClass(selectedFilters);
      //self._SavedFilter("hide");
      }
      else {
         self._showAllProductBlocks();
         sessionStorage.removeItem(key);
      }
    },

    _SavedFilter: function(actions) {

        var filters = document.querySelectorAll(selectors.activeFilter);
        var selEl = [];
       var xArray = [];
       var yArray = [];
        $.each(filters, function(i,item) {

          var result = item.href.split('/');
          var options = result[5].split('_');
          selEl.push(result[5]);
          if(options[0] == 'size') {
            xArray.push(result[5]);
          } else {
            yArray.push(result[5]);
          }
        });
        //console.log(selEl);
        var links = [];

        // Colors
        if(yArray.length) {
          links.push('<div class="filter-option"><h2>Colour</h2><ul>');
          $.each(yArray, function(i,item) {
            var result1 = item.split('_');
            links.push('<li class="rt-text check-custom '+ item +'"><a data-value='+item+' href="#" class="remove_tags active">'+result1[1]+'</a></li>')
          });
          links.push("</ul></div>");
        }
        //Size
        if(xArray.length) {
          links.push('<div class="filter-option"><h2>Size</h2><ul>');
          $.each(xArray, function(i,item) {
            var result1 = item.split('_');
            links.push('<li class="rt-text check-custom '+ item +'"><a data-value='+item+' href="#" class="remove_tags active">'+result1[1]+'</a></li>')
          });
          links.push("</ul></div>");
        }
        $(".mobile-clear-filters").addClass("hide");
        if (links.length != 0) {
          links.push('<div class="rt-text"><span class="clear" style="cursor: pointer;">Clear Filters</span></div>');
          $(".mobile-clear-filters").removeClass("hide");
          $(".mobile-clear-filters").addClass("show");
        }
        var LinkfullUrl = links.join("");
        var lnk = document.querySelector("#filter_update");
        if(actions == 'hide') {
          $("#filter_update").html('');
          return true;
        }
        lnk.innerHTML = LinkfullUrl;
    },

    _customFiltersByClass: function(selectedFilters){
      if (selectedFilters.length>0){
        self._hideAllProductBlocks();


        var filterSizes = [];
        var filterColours = [];
        var sizeClasses ='';

        //split by Colour and Size
        $.each(selectedFilters.split('+'), function(i,filter) {
          if (filter.includes('colour_')){filterColours.push(filter);}
          if (filter.includes('size_')){
              filterSizes.push(filter);
              sizeClasses += '.filt_'+filter+' ';
          }
        });
        //console.log(filterSizes);
        //console.log(filterColours);
        if((filterSizes.length > 0)&&(filterColours.length > 0)){
          //show colours that are in the requested sizes.
          $.each(filterColours, function(i,colour) {
            $.each(filterSizes, function(i,size) {
              seekClass = ('.filt_'+colour+', .filt_'+size);
              console.log(seekClass);
              $(seekClass).closest('.product-block').removeClass('hide');
            })
          });
        }else if(filterColours.length > 0){
          $.each(filterColours, function(i,colour) {
            seekClass = ('.filt_'+colour);
            $(seekClass).closest('.product-block').removeClass('hide');
          });
        }else if(filterSizes.length > 0){
          $.each(filterSizes, function(i,size) {
            seekClass = ('.filt_'+size);
            $(seekClass).closest('.product-block').removeClass('hide');
          });
        }

        //self._showFilteredItems(selectedFilters);
      } else {
        self._showAllProductBlocks();
      }
    },

    _customTemplateFilter: function(selectedFilters) {
      var view = '?view=grid', vt = document.querySelectorAll('.view-type');
      vt && $.each(vt, function(e,t){
        if (t.classList.contains('active')) {
          view = '?view=' + t.getAttribute('data-view-type');
        }
      });

      var url = window.location.pathname +'/'+ selectedFilters + view;
      localStorage.setItem("autofilter", url);
      var e = document.querySelector(".product-list-block");

      $.ajax({
        type: "GET",
        url:url,
        success: function(t) {
          //console.log(t);
          e && (e.innerHTML = t);
          //Currency.convertAll('GBP', jQuery('[name=currencies]').val());
        },
        complete: function(r) {
          self._showFilteredItemsTemplate();
        //   window.doReScroll();
         }
      });

    },

    _hideAllProductBlocks: function(){
      var pb = document.querySelectorAll(selectors.productBlock);
      pb && $.each(pb, function(e,t) {
        if(!t.classList.contains('hide')) {
          t.classList.add('hide');
        }
      });
    },

    _showAllProductBlocks: function(){
      var pb = document.querySelectorAll(selectors.productBlock);
      pb && $.each(pb, function(e,t) {
        t.classList.remove('hide');
      });
    },

    _showActiveFilters:function(selectedFilters) {
      var filtersAry = selectedFilters.split('+');
      var sl = document.querySelectorAll( ".filters-list" );
      sl&&$.each(sl, function(i, t){
        t.value = filtersAry[i];
      });
      $('.pretty').prettyDropdown({classic: true,selectedMarker: ''}).refresh();
    },

    _showFilteredItems: function(selectedFilters) {
      if(!selectedFilters) {
        this._showAllProductBlocks();
      }
      var blocksAry = [], i = document.querySelectorAll(selectors.productBlock),
      filtersAry = selectedFilters.split('+');
      i && $.each(i, function(j,k) {
        var el = k.querySelector('.img-block');
        for (var i = 0; i < filtersAry.length; i++) {
          var cls = 'filt_' + filtersAry[i];
          if (el.classList.contains(cls)) {
            blocksAry.push(el.getAttribute("data-product-id"));
          }
        }
      });

      //unique Array
      blocksAry = $.grep(blocksAry, function(v, k){
          return $.inArray(v ,blocksAry) === k;
      });

      $.each(blocksAry, function(e,i){
        var sel = '.product-' + i;
        document.querySelector(sel).classList.remove('hide');
      });
    },

    _showFilteredItemsTemplate: function(){
      var i = document.querySelectorAll(selectors.productBlock),
      b =  document.querySelectorAll('.pgv-block.grid-view-item');
      i && $.each(i, function(j,k){
        k.classList.remove('hide');
      });
      b && $.each(b, function(j,k){
        k.classList.remove('hide');
      });
    },

    _onSortChange: function(evt) {
      var sort = this._sortValue();
      if (sort.length) {
        window.location.search = sort;
      } else {
        // clean up our url if the sort value is blank for default
        window.location.href = window.location.href.replace(
          window.location.search,
          ''
        );
      }
      this._resizeSelect($(evt.target));
    },

    _onFilterChange: function(evt) {
      var filter = this._getFilterValue();

      // remove the 'page' parameter to go to the first page of results
      var search = document.location.search.replace(/\?(page=\w+)?&?/, '');

      // only add the search parameters to the url if they exist
      search = search !== '' ? '?' + search : '';
     // console.log('search');
     // console.log(search);

      document.location.href = filter + search;
      this._resizeSelect($(evt.target));
    },

    _getFilterValue: function() {
      return this.$filterSelect.val();
    },

    _getSortValue: function() {
      return this.$sortSelect.val() || this.defaultSort;
    },

    _getDefaultSortValue: function() {
      return $(selectors.defaultSort, this.$container).val();
    },

    _sortValue: function() {
      var sort = this._getSortValue();
      var query = '';

      if (sort !== this.defaultSort) {
        query = constants.SORT_BY + '=' + sort;
      }

      return query;
    },

    _resizeSelect: function($selection) {
      $selection.each(function() {
        var $this = $(this);
        var arrowWidth = 10;
        // create test element
        var text = $this.find('option:selected').text();
        var $test = $('<span>').html(text);

        // add to body, get width, and get out
        $test.appendTo('body');
        var width = $test.width();
        $test.remove();

        // set select width
        $this.width(width + arrowWidth);
      });
    },

    onUnload: function() {
      this.$filterSelect.off('change', this._onFilterChange);
      this.$sortSelect.off('change', this._onSortChange);
    }
  });

  return CustomFilters;
})();

window.theme = window.theme || {};

theme.HeaderSection = (function() {
  function Header() {
    theme.Header.init();
    theme.MobileNav.init();
    theme.Search.init();
  }

  Header.prototype = _.assignIn({}, Header.prototype, {
    onUnload: function() {
      theme.Header.unload();
    }
  });

  return Header;
})();

theme.Maps = (function() {
  var config = {
    zoom: 14
  };
  var apiStatus = null;
  var mapsToLoad = [];

  var errors = {
    addressNoResults: theme.strings.addressNoResults,
    addressQueryLimit: theme.strings.addressQueryLimit,
    addressError: theme.strings.addressError,
    authError: theme.strings.authError
  };

  var selectors = {
    section: '[data-section-type="map"]',
    map: '[data-map]',
    mapOverlay: '[data-map-overlay]'
  };

  var classes = {
    mapError: 'map-section--load-error',
    errorMsg: 'map-section__error errors text-center'
  };

  // Global function called by Google on auth errors.
  // Show an auto error message on all map instances.
  // eslint-disable-next-line camelcase, no-unused-vars
  window.gm_authFailure = function() {
    if (!Shopify.designMode) {
      return;
    }

    $(selectors.section).addClass(classes.mapError);
    $(selectors.map).remove();
    $(selectors.mapOverlay).after(
      '<div class="' +
        classes.errorMsg +
        '">' +
        theme.strings.authError +
        '</div>'
    );
  };

  function Map(container) {
    this.$container = $(container);
    this.$map = this.$container.find(selectors.map);
    this.key = this.$map.data('api-key');

    if (typeof this.key === 'undefined') {
      return;
    }

    if (apiStatus === 'loaded') {
      this.createMap();
    } else {
      mapsToLoad.push(this);

      if (apiStatus !== 'loading') {
        apiStatus = 'loading';
        if (typeof window.google === 'undefined') {
          $.getScript(
            'https://maps.googleapis.com/maps/api/js?key=' + this.key
          ).then(function() {
            apiStatus = 'loaded';
            initAllMaps();
          });
        }
      }
    }
  }

  function initAllMaps() {
    // API has loaded, load all Map instances in queue
    $.each(mapsToLoad, function(index, instance) {
      instance.createMap();
    });
  }

  function geolocate($map) {
    var deferred = $.Deferred();
    var geocoder = new google.maps.Geocoder();
    var address = $map.data('address-setting');

    geocoder.geocode({ address: address }, function(results, status) {
      if (status !== google.maps.GeocoderStatus.OK) {
        deferred.reject(status);
      }

      deferred.resolve(results);
    });

    return deferred;
  }

  Map.prototype = _.assignIn({}, Map.prototype, {
    createMap: function() {
      var $map = this.$map;

      return geolocate($map)
        .then(
          function(results) {
            var mapOptions = {
              zoom: config.zoom,
              center: results[0].geometry.location,
              draggable: false,
              clickableIcons: false,
              scrollwheel: false,
              disableDoubleClickZoom: true,
              disableDefaultUI: true
            };

            var map = (this.map = new google.maps.Map($map[0], mapOptions));
            var center = (this.center = map.getCenter());

            //eslint-disable-next-line no-unused-vars
            var marker = new google.maps.Marker({
              map: map,
              position: map.getCenter()
            });

            google.maps.event.addDomListener(
              window,
              'resize',
              $.debounce(250, function() {
                google.maps.event.trigger(map, 'resize');
                map.setCenter(center);
                $map.removeAttr('style');
              })
            );
          }.bind(this)
        )
        .fail(function() {
          var errorMessage;

          switch (status) {
            case 'ZERO_RESULTS':
              errorMessage = errors.addressNoResults;
              break;
            case 'OVER_QUERY_LIMIT':
              errorMessage = errors.addressQueryLimit;
              break;
            case 'REQUEST_DENIED':
              errorMessage = errors.authError;
              break;
            default:
              errorMessage = errors.addressError;
              break;
          }

          // Show errors only to merchant in the editor.
          if (Shopify.designMode) {
            $map
              .parent()
              .addClass(classes.mapError)
              .html(
                '<div class="' +
                  classes.errorMsg +
                  '">' +
                  errorMessage +
                  '</div>'
              );
          }
        });
    },

    onUnload: function() {
      if (this.$map.length === 0) {
        return;
      }
      google.maps.event.clearListeners(this.map, 'resize');
    }
  });

  return Map;
})();

/* eslint-disable no-new */
theme.Product = (function() {
  function Product(container) {
    var $container = (this.$container = $(container));
    var sectionId = $container.attr('data-section-id');

    this.settings = {
      // Breakpoints from src/stylesheets/global/variables.scss.liquid
      mediaQueryMediumUp: 'screen and (min-width: 750px)',
      mediaQuerySmall: 'screen and (max-width: 749px)',
      bpSmall: false,
      enableHistoryState: $container.data('enable-history-state') || false,
      namespace: '.slideshow-' + sectionId,
      sectionId: sectionId,
      sliderActive: false,
      zoomEnabled: false
    };

    this.selectors = {
      addToCart: '#AddToCart-' + sectionId,
      addToCartText: '#AddToCartText-' + sectionId,
      errorQuantityMessage: '#error-quantity-' + sectionId,
      quantity: '#Quantity-' + sectionId,
      SKU: '.variant-sku',
      productStatus: '[data-product-status]',
      originalSelectorId: '#ProductSelect-' + sectionId,
      productImageWraps: '.product-single__photo',
      productThumbImages: '.product-single__thumbnail--' + sectionId,
      productThumbs: '.product-single__thumbnails-' + sectionId,
      productFeaturedImage: '.product-featured-img',
      productSlider: '.product-slider',
      productThumbsWrapper: '.thumbnails-wrapper',
      saleLabel: '.product-price__sale-label-' + sectionId,
      singleOptionSelector: '.single-option-selector-' + sectionId,
      shopifyPaymentButton: '.shopify-payment-button',
      priceContainer: '[data-price]',
      regularPrice: '[data-regular-price]',
      salePrice: '[data-sale-price]'
    };

    this.classes = {
      hidden: 'hide',
      productOnSale: 'price--on-sale',
      productUnavailable: 'price--unavailable'
    };

    // Stop parsing if we don't have the product json script tag when loading
    // section in the Theme Editor
    if (!$('#ProductJson-' + sectionId).html()) {
      return;
    }

    this.productSingleObject = JSON.parse(
      document.getElementById('ProductJson-' + sectionId).innerHTML
    );

    this.settings.zoomEnabled = $(this.selectors.productImageWraps).hasClass(
      'js-zoom-enabled'
    );

    this._initBreakpoints();
    this._stringOverrides();
    this._initVariants();
    this._initSexySelect();
    this._initImageSwitch();
    this._initAddToCart();
    this._setActiveThumbnail();
    //this._initImageViewer();
  }

  Product.prototype = _.assignIn({}, Product.prototype, {
    _stringOverrides: function() {
      theme.productStrings = theme.productStrings || {};
      $.extend(theme.strings, theme.productStrings);
    },

    _initBreakpoints: function() {
      var self = this;

      enquire.register(this.settings.mediaQuerySmall, {
        match: function() {
          // initialize thumbnail slider on mobile if more than three thumbnails
          self._initProductSlider();
          if ($(self.selectors.productThumbImages).length > 3) {
            self._initThumbnailSlider();
          }

          // destroy image zooming if enabled
          if (self.settings.zoomEnabled) {
            $(self.selectors.productImageWraps).each(function() {
              _destroyZoom(this);
            });
          }

          self.settings.bpSmall = true;

          // reset text block height
          self._resetTextBlockHeight();
        },
        unmatch: function() {
          if (self.settings.sliderActive) {
            self._destroyThumbnailSlider();
          }
          self._destroyProductSlider();
          self.settings.bpSmall = false;
          self._setTextBlockHeight();
        }
      });

      enquire.register(this.settings.mediaQueryMediumUp, {
        match: function() {
          if (self.settings.zoomEnabled) {
            $(self.selectors.productImageWraps).each(function() {
              _enableZoom(this);
            });
          }
        self._setTextBlockHeight();
        }
      });
    },

    _setTextBlockHeight: function() {
      var lib = document.querySelector('.last-img-block'),
      pic = document.querySelector('.product-image-container'),
      cb = document.querySelector('.custom-box');
      if (lib) {
        lih = lib.offsetHeight / 2;
        if (pic) {
          cb.style.height = (pic.offsetHeight - lih) + 'px';
        }
      }
    },

    _setTextBlockHeightDelay: function() {
      setTimeout(function(){
        var lib = document.querySelector('.last-img-block'),
        pic = document.querySelector('.product-image-container'),
        cb = document.querySelector('.custom-box');
        if (lib) {
          var lih = lib.offsetHeight / 2;
          console.log(lih);
          if (pic) {
            cb.style.height = (pic.offsetHeight - lih) + 'px';
          }
        }
      }, 3000);


      // $.debounce(500, function(){
      //   var lih =document.querySelector('.last-img-block').offsetHeight / 2;
      //   document.querySelector('.custom-box').style.height = (document.querySelector('.product-image-container').offsetHeight - lih) + '.px';

      // });

    },

    _resetTextBlockHeight: function() {
      document.querySelector('.custom-box').style.height = 'auto';
    },

    _initVariants: function() {
      var options = {
        $container: this.$container,
        enableHistoryState:
          this.$container.data('enable-history-state') || false,
        singleOptionSelector: this.selectors.singleOptionSelector,
        originalSelectorId: this.selectors.originalSelectorId,
        product: this.productSingleObject
      };

      this.variants = new slate.Variants(options);

      this.$container.on(
        'variantChange' + this.settings.namespace,
        this._updateAvailability.bind(this)
      );

      this.$container.on(
        'variantImageChange' + this.settings.namespace,
        this._updateImages.bind(this)
      );
      this.$container.on(
        'variantPriceChange' + this.settings.namespace,
        this._updatePrice.bind(this)
      );
      this.$container.on(
        'variantSKUChange' + this.settings.namespace,
        this._updateSKU.bind(this)
      );
    },

    _initProductSlider: function() {
     console.log('_initProductSlider');
     var self = this,
        options = {
        dots: true,
        arrows: false,
        infinite: false,
        //centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable:true,
        vertical: false,
        verticalSwiping: false
      };

      setTimeout(function(el) {
        //document.addEventListener('lazybeforeunveil', function(e){
        var imobj = document.querySelectorAll(self.selectors.productFeaturedImage);
        imobj&& $.each(imobj, function(e,t){
          e>0&&t.classList.remove('img-hide');
          e>0&&t.classList.remove('hide');
        });
        var imobj = document.querySelectorAll('.product-single__photo-wrapper');
        imobj&& $.each(imobj, function(e,t){
          if (e>0&&t.classList.contains('hide')) {
            t.classList.remove('hide');
          }
        });
          $(el).slick(options);
       // });
      }, 500, this.selectors.productSlider);
    },

    _destroyProductSlider: function() {
      var imobj = document.querySelectorAll('.product-single__photo-wrapper');
      imobj&& $.each(imobj, function(e,t){
        if (e>0) {
          t.classList.add('hide');
        }
      });
      $(this.selectors.productSlider).slick('unslick');
    },

    _initImageViewer: function(self) {
     console.log('_initImageViewer');
      var owlSlide = '';

      var images = [];

      if (window.images_list){
      	images = window.images_list;
      }else{
        $(self.productSingleObject.images).each(function(i, e){
          var x = {
            big : e
          }
          images.push(x);
        });
      }

      console.log(images);

      $(document).on("click", ".iv-close", function(event) {
        event.preventDefault();
        var i = document.querySelectorAll('#image-gallery-2 img');
        i && $.each(i, function(i,t) {
          t.classList.add('hide');
        });
      });

      var curImageIdx = 1,
      total = images.length;
      var wrapper = $('#image-gallery-2'),
        curSpan = wrapper.find('.current');
      //var viewer = ImageViewer(wrapper.find('.image-container'));

      function showImage(){
          var imgObj = images[curImageIdx - 1];
          viewer.show(imgObj.big);
          var i = document.querySelectorAll('#image-gallery-2 img');
          i && $.each(i, function(i,t) {
            t.classList.remove('hide');
          });
      }

      wrapper.find('.next-img').click(function(){
           curImageIdx++;
          if(curImageIdx > total) curImageIdx = 1;
          showImage();
      });

      wrapper.find('.prev-img').click(function(){
           curImageIdx--;
          if(curImageIdx < 0) curImageIdx = total;
          showImage();
      });

      //showImage();

      var viewer = ImageViewer({
          zoomValue: 150,
          snapView: true,
          maxZoom: 200,
          movable: true,
          refreshOnResize: true,
          zoomOnMouseWheel : true
        });

      $(document).on("click", '.product--img', function () {
        var count = $(this).data('imgcount');
        var imgObj = images[count];
        showImage();
      });
    },

    _initSexySelect: function() {
      console.log(this.selectors.singleOptionSelector);
      $(this.selectors.singleOptionSelector).prettyDropdown({
        classic: true,
        selectedMarker: ''
      });
      //currencySwitch();
      this._addNotifyMe();
      /*Notify me with color options*/
      //this._addNotifyme1();
    },

    _addNotifyMe: function() {
      var variants = this.productSingleObject.variants;
      var el = document.querySelector('#prettydropdown-SingleOptionSelector-0');
      el && variants.forEach(function(variant) {
        //console.log(variant.inventory_policy);
        if(variant.available == true) {
          var sel = "li[data-value='" + variant.option1 + "']";
          var opt = document.querySelectorAll('#ProductSelect-product-template option');
          var el = document.querySelector(sel);
          el && variants.forEach(function(variant) {
            if(variant.available == false) {
              var sel = "li[data-value='" + variant.option1 + "']";
              var el = document.querySelector(sel);
              el.classList.add('notify-me')
              var itxt = el.innerText;
              el.innerText = variant.option1.toUpperCase() + " - Notify me";
            }
          })
          opt && $.each(opt, function(i, element) {
              var qty = element.getAttribute('data-qty'),
              policy = element.getAttribute('data-policy'),
              val = element.getAttribute('data-value');
              if(qty == 0 &&  policy == "continue" && val == variant.option1) {
                el.classList.add('notify-me')
                var itxt = el.innerText;
                el.innerText = variant.option1.toUpperCase() + " - Out of stock";
              }
          });
        }
      });
    },

    _addNotifyme1: function(v) {
      var variant = this.variants.currentVariant;
      if(variant != undefined) {
        // option first
        var obj = {"option1": "prettydropdown-SingleOptionSelector-0","option2": "prettydropdown-SingleOptionSelector-1"};
        var counter = 0;
        $.each(obj, function( index1, value ) {
          var opt = variant.option1;
          if(counter == 1) { var opt = variant.option2;}
          var el = document.querySelectorAll('#' + value + ' ul li');
          el && el.forEach(function(element) {
            var sel = element.getAttribute('data-value');
            if(variant.available == false && variant.option2) {
              var sel = "li[data-value='" + opt + "']";
              var el = document.querySelector(sel);
              el.classList.add('notify-me')
              var itxt = el.innerText;
              el.innerText = opt.toUpperCase() + " - Notify me";
            }
            else {
                if(element.innerText.indexOf("Notify") != -1) {
                  element.classList.remove('notify-me');
                  var itxt = element.innerText.replace(" - Notify me",'');
                  element.innerText = itxt;
                }
            }
          });
        counter++;
        });
      }
    },

    _initImageSwitch: function() {
      if (!$(this.selectors.productThumbImages).length) {
        return;
      }

      var self = this;

      $(this.selectors.productThumbImages)
        .on('click', function(evt) {
          evt.preventDefault();
          var $el = $(this);

          var imageId = $el.data('thumbnail-id');

          self._switchImage(imageId);
          self._setActiveThumbnail(imageId);
        })
        .on('keyup', self._handleImageFocus.bind(self));
    },

    _initAddToCart: function() {
      var self = this;
      var $quantityInput = $(self.selectors.quantity);

      if ($quantityInput.length === 0) return;

      $(self.selectors.addToCart).on('click', function(evt) {
        var isInvalidQuantity = $quantityInput.val() <= 0;

        $(self.selectors.errorQuantityMessage).toggleClass(
          self.classes.hidden,
          !isInvalidQuantity
        );

        if (isInvalidQuantity) {
          $quantityInput
            .attr(
              'aria-describedby',
              'error-quantity-' + self.settings.sectionId
            )
            .attr('aria-invalid', true);
          $(self.selectors.errorQuantityMessage).focus();
          evt.preventDefault();
        } else {
          $quantityInput
            .removeAttr('aria-describedby')
            .removeAttr('aria-invalid');
        }
      });
    },

    _setActiveThumbnail: function(imageId) {
      var activeClass = 'active-thumb';

      // If there is no element passed, find it by the current product image
      if (typeof imageId === 'undefined') {
        imageId = $(this.selectors.productImageWraps + ":not('.hide')").data(
          'image-id'
        );
      }

      var $thumbnail = $(
        this.selectors.productThumbImages +
          "[data-thumbnail-id='" +
          imageId +
          "']"
      );

      $(this.selectors.productThumbImages)
        .removeClass(activeClass)
        .removeAttr('aria-current');

      $thumbnail.addClass(activeClass);
      $thumbnail.attr('aria-current', true);
    },

    _switchImage: function(imageId) {
      var $newImage = $(
        this.selectors.productImageWraps + "[data-image-id='" + imageId + "']",
        this.$container
      );
      var $otherImages = $(
        this.selectors.productImageWraps +
          ":not([data-image-id='" +
          imageId +
          "'])",
        this.$container
      );

      $newImage.removeClass(this.classes.hidden);
      $otherImages.addClass(this.classes.hidden);
    },

    _handleImageFocus: function(evt) {
      if (evt.keyCode !== slate.utils.keyboardKeys.ENTER) return;

      $(this.selectors.productFeaturedImage + ':visible').focus();
    },

    _initThumbnailSlider: function() {
      var options = {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: false,
        prevArrow: '.thumbnails-slider__prev--' + this.settings.sectionId,
        nextArrow: '.thumbnails-slider__next--' + this.settings.sectionId,
        responsive: [
          {
            breakpoint: 321,
            settings: {
              slidesToShow: 3
            }
          }
        ]
      };

      $(this.selectors.productThumbs).slick(options);

      // Accessibility concerns not yet fixed in Slick Slider
      $(this.selectors.productThumbsWrapper, this.$container)
        .find('.slick-list')
        .removeAttr('aria-live');
      $(this.selectors.productThumbsWrapper, this.$container)
        .find('.slick-disabled')
        .removeAttr('aria-disabled');

      this.settings.sliderActive = true;
    },

    _destroyThumbnailSlider: function() {
      $(this.selectors.productThumbs).slick('unslick');
      this.settings.sliderActive = false;

      // Accessibility concerns not yet fixed in Slick Slider
      $(this.selectors.productThumbsWrapper, this.$container)
        .find('[tabindex="-1"]')
        .removeAttr('tabindex');
    },

    _liveRegionText: function(variant) {
      // Dummy content for live region
      var liveRegionText = '[Availability] [Regular] [$$] [Sale] [$]';

      if (!variant) {
        liveRegionText = theme.strings.unavailable;
        return liveRegionText;
      }

      // Update availability
      var availability = variant.available ? '' : theme.strings.soldOut + ',';
      liveRegionText = liveRegionText.replace('[Availability]', availability);

      // Update pricing information
      var regularLabel = '';
      var regularPrice = theme.Currency.formatMoney(
        variant.price,
        theme.moneyFormat
      );
      var saleLabel = '';
      var salePrice = '';

      if (variant.compare_at_price > variant.price) {
        regularLabel = theme.strings.regularPrice;
        regularPrice =
          theme.Currency.formatMoney(
            variant.compare_at_price,
            theme.moneyFormat
          ) + ',';
        saleLabel = theme.strings.sale;
        salePrice = theme.Currency.formatMoney(
          variant.price,
          theme.moneyFormat
        );
      }

      liveRegionText = liveRegionText
        .replace('[Regular]', regularLabel)
        .replace('[$$]', regularPrice)
        .replace('[Sale]', saleLabel)
        .replace('[$]', salePrice)
        .trim();

      return liveRegionText;
    },

    _updateLiveRegion: function(evt) {
      var variant = evt.variant;
      var liveRegion = this.container.querySelector(
        this.selectors.productStatus
      );
      liveRegion.textContent = this._liveRegionText(variant);
      liveRegion.setAttribute('aria-hidden', false);

      // hide content from accessibility tree after announcement
      setTimeout(function() {
        liveRegion.setAttribute('aria-hidden', true);
      }, 1000);
    },

    _updateAddToCart: function(evt) {
      var variant = evt.variant;

      if (variant) {
        if (variant.available) {
          $(this.selectors.addToCart).show();
          $(this.selectors.addToCart).prop('disabled', false);
          var nfl = document.querySelector('.notify-me-link');
          nfl && nfl.remove();
          $(this.selectors.addToCartText).text(theme.strings.addToCart);
          $(this.selectors.shopifyPaymentButton, this.$container).show();
        } else {
          // The variant doesn't exist, disable submit button and change the text.
          // This may be an error or notice that a specific variant is not available.
          $(this.selectors.addToCart).prop('disabled', true);
          $(this.selectors.addToCart).hide();
          //var htmllink = '<a href="mailto:'+ theme.strings.notifyEmail +'?subject=Notify me when PRODUCT '+ variant.name +' is back in stock" class="notify-me-link btn btn-dark">'+theme.strings.soldOut+'</a>';
          var htmllink = '<a href="#" class="klaviyo-bis-trigger notify-me-link btn btn-dark">'+'Notify me when available'+'</a>';
          //$(this.selectors.addToCart).html(htmllink);
          if($('.notify-me-link').length <1){
            $(this.selectors.addToCart).parent().append(htmllink);
          }

          //$(this.selectors.addToCartText).text(theme.strings.soldOut);
          $(this.selectors.shopifyPaymentButton, this.$container).hide();
        }
      } else {
        $(this.selectors.addToCart).prop('disabled', true);
        $(this.selectors.addToCartText).text(theme.strings.unavailable);
        $(this.selectors.shopifyPaymentButton, this.$container).hide();
      }
    },

    _updateAvailability: function(evt) {
      // update form submit
      this._updateAddToCart(evt);
      // update live region
      this._updateLiveRegion(evt);

      this._updatePrice(evt);
    },

    _updateImages: function(evt) {
      var variant = evt.variant;
      var imageId = variant.featured_image.id;

      this._switchImage(imageId);
      this._setActiveThumbnail(imageId);
    },

    _updatePrice: function(evt) {
      var variant = evt.variant;

      var $priceContainer = $(this.selectors.priceContainer, this.$container);
      var $regularPrice = $(this.selectors.regularPrice, $priceContainer);
      var $salePrice = $(this.selectors.salePrice, $priceContainer);

      // Reset product price state
      $priceContainer
        .removeClass(this.classes.productUnavailable)
        .removeClass(this.classes.productOnSale)
        .removeAttr('aria-hidden');

      // Unavailable
      if (!variant) {
        $priceContainer
          .addClass(this.classes.productUnavailable)
          .attr('aria-hidden', true);
        return;
      }

      // On sale
      /*
      if (variant.compare_at_price > variant.price) {
        $regularPrice.html(
          theme.Currency.formatMoney(
            variant.compare_at_price,
            theme.moneyFormat
          )
        );
        $salePrice.html(
          theme.Currency.formatMoney(variant.price, theme.moneyFormat)
        );
        $priceContainer.addClass(this.classes.productOnSale);
      } else {
        // Regular price
        $regularPrice.html(
          theme.Currency.formatMoney(variant.price, theme.moneyFormat)
        );
      }
      */

      /* UPDATED phil@thebarnagency : add VAT to prices */
      var tb_vat = 1.2;

      if (variant.compare_at_price > variant.price) {
        $regularPrice.html(
          theme.Currency.formatMoney(
            variant.compare_at_price * tb_vat,
            theme.moneyFormat
          )
        );
        $salePrice.html(
          theme.Currency.formatMoney(variant.price * tb_vat, theme.moneyFormat)
        );
        $priceContainer.addClass(this.classes.productOnSale);
      } else {
        // Regular price
        $regularPrice.html(
          theme.Currency.formatMoney(variant.price * tb_vat, theme.moneyFormat)
        );
      }

      Currency.convertAll('GBP', jQuery('[name=currencies]').val());
    },

    _updateSKU: function(evt) {
      var variant = evt.variant;

      // Update the sku
      $(this.selectors.SKU).html(variant.sku);
    },

    onUnload: function() {
      this.$container.off(this.settings.namespace);
    }
  });

  function _enableZoom(el) {
    var zoomUrl = $(el).data('zoom');
    $(el).zoom({
      url: zoomUrl
    });
  }

  function _destroyZoom(el) {
    $(el).trigger('zoom.destroy');
  }

  return Product;
})();

theme.Quotes = (function() {
  var config = {
    mediaQuerySmall: 'screen and (max-width: 749px)',
    mediaQueryMediumUp: 'screen and (min-width: 750px)',
    slideCount: 0
  };
  var defaults = {
    accessibility: true,
    arrows: false,
    dots: true,
    autoplay: false,
    touchThreshold: 20,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  function Quotes(container) {
    var $container = (this.$container = $(container));
    var sectionId = $container.attr('data-section-id');
    var wrapper = (this.wrapper = '.quotes-wrapper');
    var slider = (this.slider = '#Quotes-' + sectionId);
    var $slider = $(slider, wrapper);

    var sliderActive = false;
    var mobileOptions = $.extend({}, defaults, {
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true
    });

    config.slideCount = $slider.data('count');

    // Override slidesToShow/Scroll if there are not enough blocks
    if (config.slideCount < defaults.slidesToShow) {
      defaults.slidesToShow = config.slideCount;
      defaults.slidesToScroll = config.slideCount;
    }

    $slider.on('init', this.a11y.bind(this));

    enquire.register(config.mediaQuerySmall, {
      match: function() {
        initSlider($slider, mobileOptions);
      }
    });

    enquire.register(config.mediaQueryMediumUp, {
      match: function() {
        initSlider($slider, defaults);
      }
    });

    function initSlider(sliderObj, args) {
      if (sliderActive) {
        sliderObj.slick('unslick');
        sliderActive = false;
      }

      sliderObj.slick(args);
      sliderActive = true;
    }
  }

  Quotes.prototype = _.assignIn({}, Quotes.prototype, {
    onUnload: function() {
      enquire.unregister(config.mediaQuerySmall);
      enquire.unregister(config.mediaQueryMediumUp);

      $(this.slider, this.wrapper).slick('unslick');
    },

    onBlockSelect: function(evt) {
      // Ignore the cloned version
      var $slide = $(
        '.quotes-slide--' + evt.detail.blockId + ':not(.slick-cloned)'
      );
      var slideIndex = $slide.data('slick-index');

      // Go to selected slide, pause autoplay
      $(this.slider, this.wrapper).slick('slickGoTo', slideIndex);
    },

    a11y: function(event, obj) {
      var $list = obj.$list;
      var $wrapper = $(this.wrapper, this.$container);

      // Remove default Slick aria-live attr until slider is focused
      $list.removeAttr('aria-live');

      // When an element in the slider is focused set aria-live
      $wrapper.on('focusin', function(evt) {
        if ($wrapper.has(evt.target).length) {
          $list.attr('aria-live', 'polite');
        }
      });

      // Remove aria-live
      $wrapper.on('focusout', function(evt) {
        if ($wrapper.has(evt.target).length) {
          $list.removeAttr('aria-live');
        }
      });
    }
  });

  return Quotes;
})();

theme.slideshows = {};

theme.SlideshowSection = (function() {
  function SlideshowSection(container) {
    var $container = (this.$container = $(container));
    var sectionId = $container.attr('data-section-id');
    var slideshow = (this.slideshow = '#Slideshow-' + sectionId);

    theme.slideshows[slideshow] = new theme.Slideshow(slideshow, sectionId);
  }

  return SlideshowSection;
})();

theme.SlideshowSection.prototype = _.assignIn(
  {},
  theme.SlideshowSection.prototype,
  {
    onUnload: function() {
      delete theme.slideshows[this.slideshow];
    },

    onBlockSelect: function(evt) {
      var $slideshow = $(this.slideshow);
      var adaptHeight = $slideshow.data('adapt-height');

      if (adaptHeight) {
        theme.slideshows[this.slideshow].setSlideshowHeight();
      }

      // Ignore the cloned version
      var $slide = $(
        '.slideshow__slide--' + evt.detail.blockId + ':not(.slick-cloned)'
      );
      var slideIndex = $slide.data('slick-index');

      // Go to selected slide, pause auto-rotate
      $slideshow.slick('slickGoTo', slideIndex).slick('slickPause');
    },

    onBlockDeselect: function() {
      // Resume auto-rotate
      $(this.slideshow).slick('slickPlay');
    }
  }
);


/*
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(b,j,m){if(typeof j!="undefined"){m=m||{};if(j===null){j="";m.expires=-1}var e="";if(m.expires&&(typeof m.expires=="number"||m.expires.toUTCString)){var f;if(typeof m.expires=="number"){f=new Date();f.setTime(f.getTime()+(m.expires*24*60*60*1000))}else{f=m.expires}e="; expires="+f.toUTCString()}var l=m.path?"; path="+(m.path):"";var g=m.domain?"; domain="+(m.domain):"";var a=m.secure?"; secure":"";document.cookie=[b,"=",encodeURIComponent(j),e,l,g,a].join("")}else{var d=null;if(document.cookie&&document.cookie!=""){var k=document.cookie.split(";");for(var h=0;h<k.length;h++){var c=jQuery.trim(k[h]);if(c.substring(0,b.length+1)==(b+"=")){d=decodeURIComponent(c.substring(b.length+1));break}}}return d}};
/*
*
* jquery.imageslaoded.min.js
*/
!function(a,b){var c="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";a.fn.imagesLoaded=function(d){function e(){var b=a(m),c=a(n);i&&(n.length?i.reject(k,b,c):i.resolve(k)),a.isFunction(d)&&d.call(h,k,b,c)}function f(a){g(a.target,"error"===a.type)}function g(b,d){b.src===c||-1!==a.inArray(b,l)||(l.push(b),d?n.push(b):m.push(b),a.data(b,"imagesLoaded",{isBroken:d,src:b.src}),j&&i.notifyWith(a(b),[d,k,a(m),a(n)]),k.length===l.length&&(setTimeout(e),k.unbind(".imagesLoaded",f)))}var h=this,i=a.isFunction(a.Deferred)?a.Deferred():0,j=a.isFunction(i.notify),k=h.find("img").add(h.filter("img")),l=[],m=[],n=[];return a.isPlainObject(d)&&a.each(d,function(a,b){"callback"===a?d=b:i&&i[a](b)}),k.length?k.bind("load.imagesLoaded error.imagesLoaded",f).each(function(d,e){var f=e.src,h=a.data(e,"imagesLoaded");h&&h.src===f?g(e,h.isBroken):e.complete&&e.naturalWidth!==b?g(e,0===e.naturalWidth||0===e.naturalHeight):(e.readyState||e.complete)&&(e.src=c,e.src=f)}):e(),i?i.promise(h):h}}(jQuery);


var SUZANNAH = SUZANNAH || {};
(function($) {

  // USE STRICT
  "use strict";
  var log, cache = {}, classes = {};
  log = function(value) {
    if (typeof console !== "undefined") {
      return console.log(value);
    }
  };

  SUZANNAH.widget = {
    init: function() {
      SUZANNAH.widget.searchToggle();
      SUZANNAH.widget.reOpenSearchPopup();
      SUZANNAH.widget.popup();
      //SUZANNAH.widget.requestReturn();
      SUZANNAH.widget.closeOverlayPopup();
      SUZANNAH.widget.dataSlickSlider()
      SUZANNAH.widget.vipRegistrationForm();
    },
    searchToggle: function() {
      $('.search-toggle').click(function(e) {
        e.preventDefault();
        document.querySelector('.search-no-result-block').classList.remove('active');
        document.querySelector('.search-block').classList.toggle('active');
      });
    },
    reOpenSearchPopup: function() {
      var isSearchPage =
        slate.utils.getParameterByName('q') !== null &&
        window.location.pathname === '/search';
      if (isSearchPage) {
        if (!document.querySelectorAll('.search-result-list li').length) {
          document.querySelector('.search-no-result-block').classList.toggle('active');
          document.querySelector('.search-block').classList.toggle('active');
        }

      }
    },
    popup: function() {
      var checkContentOverflow, closeDialog, eventListeners, fillPopupDialog, fillSizeChartDialog, getCustomClasses, closeMeIcon, getImage, getNewsletter, getPageContent, getSocialIcons, getWrapper, centerPopUP, hideMask, ieCenter, isExpired, mask, maskIsActive, modal, modal_clazz, openDialog, passesExpiration, resetExpiration, showMask, storeExpiration;
      modal = null;

      mask = $('.popup-modal-mask');
      storeExpiration = function() {
        var date, expires, object, seconds_from_now;
        date = new Date();
        seconds_from_now = 1000 * 60 * 60 * 24 * popup_config.days_until;
        expires = date.setTime(date.getTime() + seconds_from_now);
        object = {
          expires: expires
        };
        localStorage.removeItem('SUZANNAH_pageclick');
        return localStorage[popup_config.storage_key] = JSON.stringify(object);
      };
      resetExpiration = function() {
        console.log("expireddd");
        localStorage.removeItem(popup_config.storage_key);
        localStorage.removeItem('SUZANNAH_pageclick');
        return storeExpiration();
      };
      isExpired = function() {
        if (typeof localStorage[popup_config.storage_key] === "undefined" ) {
          return false;
        }
        var expires, now, object;
        object = JSON.parse(localStorage[popup_config.storage_key]);
        expires = object.expires;
        now = new Date().getTime();
        if (parseFloat(expires - now) <= 0) {
          console.log("expiressss111");
          resetExpiration();
          return true;
        }
        return false;
      };
      passesExpiration = function() {
        var passed, ObjClickCount;
        passed = false;
        if (Storage === "undefined" || popup_config.days_until === "test_mode") {
          passed = true;
        } else if (typeof localStorage[popup_config.storage_key] === "undefined") {
          passed = true;
          storeExpiration();
        } else {
          //console.log("I am herer")
          passed = isExpired();
        }
        return passed;
      };
      maskIsActive = function() {
        return $('.popup-modal').is(':visible') || $('.modal-mask').length > 0 && $('.modal-mask').is(':visible');
      };
      showMask = function() {
        mask.show();
        return $('body').addClass("modal-on body-fade");
      };
      hideMask = function() {
        mask.hide();
        return $('body').removeClass("modal-on body-fade");
      };
      closeMeIcon = function() {
        return $('<button class="popup-modal-close newsletter-close">✕</button>');
      };
      getImage = function() {
        if (popup_config.show_image_enabled !== true) {
          return "";
        }
        if (popup_config.image_link.length > 0) {
          return $('<div class="imgblock"><a href="' + popup_config.image_link + '"><img src="' + popup_config.show_image_url + '" alt=""></a></div>');
        } else {
          return $('<div class="imgblock">').append("<img src='" + popup_config.show_image_url + "' alt=''>");
        }
      };
      getNewsletter = function() {
        var subscribe_module;
        if (popup_config.newsletter_enabled === false) {
          return "";
        }

        subscribe_module = $("<div id='subscribe_module' class='sign-up-popup'></div>")
        //.append( "<h2>" + popup_config.popup_heading + "</h2>")
        .append($("#mc-embedded-subscribe-form").clone());

        return subscribe_module;
      };
      getSocialIcons = function() {
        if (popup_config.social_icons_enabled === false) {
          return "";
        }
        return $(".social-follow").clone();
      };
      getCustomClasses = function() {
        var class_list;
        class_list = "";
        class_list += popup_config.show_image_enabled === true ? " has-image" : " has-no-image";
        class_list += popup_config.popup_heading.length > 0 ? " has-page-content" : " has-no-page-content";
        class_list += popup_config.newsletter_enabled ? " has-newsletter" : " has-no-newsletter";
        class_list += popup_config.social_icons_enabled ? " has-social-icons" : " has-no-social-icons";
        class_list += " popup-overlay newsletter-modal home-newsletter active";
        return class_list;
      };
      getWrapper = function() {
        return '<dialog class="popup-modal newsletter-popup-modal' + getCustomClasses() + '" id="homepage-newsletter" />';
      };
      centerPopUP = function(){
        return $('<div class="popup-center"/>').append('<div class="newsletter-popup" />');
      };
      getPageContent = function() {
        var popup_heading;
        popup_heading = null;
        if (popup_config.popup_heading.length < 1) {
          return "";
        }
        $.getJSON('/pages/' + popup_config.popup_heading + '.json', function(data, textStatus) {
          return popup_heading = "<div class='page-contents'>" + data.page.body_html + "</div>";
        });
        return popup_heading;
      };
      fillSizeChartDialog = function() {
        var dialog;
        if ($('.popup-modal.size-chart').length < 1) {
          dialog = {
            wrapper: getWrapper()
          };
          $('body').append($(dialog.wrapper).append($('.size-chart')));
        }
        return openDialog();
      };
      fillPopupDialog = function() {
        var dialog, getInnerContent,  render;
        dialog = {
          wrapper: getWrapper(),
          closeMe: closeMeIcon(),
          image: getImage(),
          newsletter: getNewsletter(),
          social_icons: getSocialIcons()
        };
        getInnerContent = function() {
          if (popup_config.popup_heading.length < 1 && popup_config.newsletter_enabled === false && popup_config.social_icons_enabled === false) {
            return "";
          }
          return $("<div class='half-col  text-center padlr-80' />").append(dialog.body, dialog.newsletter, dialog.social_icons);
        };

        render = function() {
          //$('body').append($(dialog.wrapper));
           $('body').append($(dialog.wrapper).append(dialog.closeMe));
          $('<div class="form-block newsletter-popup-box clearfix"></div></div>').appendTo(".newsletter-modal" );
          $('.newsletter-popup-box').append(dialog.image, getInnerContent());
          return openDialog();
        };

        if (popup_config.popup_heading.length > 0) {
            return render();
          //return $.getJSON('/pages/' + popup_config.popup_heading + '.json', function(data, textStatus) {});
        } else {
          return render();
        }
      };
      checkContentOverflow = function() {
        return setTimeout((function() {
          if (modal.length > 0 && $('.popup-modal-mask').is(':visible')) {
            return modal.imagesLoaded(function() {
              if (modal.outerHeight() >= $window.height()) {
                return $('body').addClass('modal-unfix');
              } else {
                return $('body').removeClass('modal-unfix');
              }
            });
          }
        }), 0);
      };
      ieCenter = function() {
        return modal.css({
          marginTop: -(modal.outerHeight() * 0.5) + "px",
          marginLeft: -(modal.outerWidth() * 0.5) + "px"
        });
      };
      openDialog = function() {
        console.log('openDialog');
        modal = $('dialog[class*="newsletter-popup-modal"]');
        if ($("html").hasClass("ie9")) {
          ieCenter();
        }
        eventListeners();
        modal.addClass("opened").removeClass("closed");
        checkContentOverflow();
        return showMask();
      };
      eventListeners = function() {
        var removeAnimation;
        removeAnimation = function(event) {
          if (event.originalEvent.animationName === 'modal-close') {
            if (modal_clazz === 'popup') {
              return modal.remove();
            } else {
              return modal.removeClass('closed, completed');
            }
          } else {
            return modal.addClass('completed').removeClass('opened');
          }
        };
        DOC.on('click', '.popup-modal', function(e) {
          e.stopPropagation();
          if (e.target === this) {
            return closeDialog();
          }
        });
        $('.popup-modal-close').click(closeDialog);
        $('.modal-close').click(function(e){
          e.preventDefault();
          return closeDialog();
        });
        mask.click(closeDialog);
        modal.on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', removeAnimation);
        $window.resize(checkContentOverflow);
        DOC.keydown(function(e) {
          if (modal.hasClass('completed') && e.keyCode === 27) {
            return closeDialog();
          }
        });
        return $('dialog.popup-modal #contact_form').on('submit', function(event) {
          var form;
          form = this;
          modal = $(this).closest('.popup-modal');
          modal.find('.error, .success').remove();
          event.preventDefault();
          if (modal.find('input[type="email"]').val().length === 0) {
            modal.find('.inner').prepend('<p class="error">' + popup_config.newsletter_email_blank + '</p>');
            return false;
          } else {
            modal.find('.inner > *').hide();
            modal.find('.inner').prepend('<p class="success">' + popup_config.newsletter_success_message + '</p>').show();
            setTimeout(function() {
              return form.submit();
            }, 500);
          }
          return false;
        });
      };
      closeDialog = function() {
        modal.addClass('closed').removeClass('completed').removeClass('opened').removeClass("active");
        return hideMask();
      };

      //console.log('Popup Starts form here');
      // var notfront = true;
      // if (document.querySelector('body').classList.contains('template-index')) {
      //    notfront = false;
      // }
      if (popup_config.enabled && passesExpiration() && (popup_config.popup_heading.length > 0 || popup_config.newsletter_enabled || popup_config.show_image_enabled || popup_config.social_icons_enabled)) {
        return setTimeout((function() {
          if (!(maskIsActive() === true || $('.popup-modal-mask').length < 1)) {
            return fillPopupDialog();
          }
        }), popup_config.seconds_until * 1000);
      }

    },
    vipRegistrationForm: function() {
      var $vipForm = $('form.vip-registration-form');
      if (!$vipForm.length) {
        return;
      }
      $vipForm.on('submit', function(e) {
        //e.preventDefault();
        var cls = document.querySelectorAll('form.vip-registration-form .form-control');
        for (var i = 0; i < cls.length; i++) {
          console.log(cls[i]);
          console.log(cls[i].value);
         if(!cls[i].value) {
           cls[i].classList.add('custom-form-error');
         }
         else if (cls[i].value == 'none') {
          var el = '#prettydropdown-' + cls[i].name + ' ul',
          pel = document.querySelector(el);
          pel&&pel.classList.add('custom-form-error');
           cls[i].classList.add('custom-form-error');
         }
         else {
            cls[i].classList.remove('custom-form-error');
            var el = '#prettydropdown-' + cls[i].name + ' ul',
            pel = document.querySelector(el);
            pel&&pel.classList.remove('custom-form-error');
         }
         if(cls[i].type == 'email') {
            var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (filter.test(cls[i].value)) {
                cls[i].classList.remove('custom-form-error');
            }
            else {
                cls[i].classList.add('custom-form-error');
            }
         }
        }
        if($('.custom-form-error').length == 0) {
          return true;
          // $.ajax({
          //   url: $(this).attr('action'),
          //   dataType: 'text',
          //   type: 'post',
          //   contentType: 'application/x-www-form-urlencoded',
          //   data: $(this).serialize(),
          //   success: function( data, textStatus, jQxhr ){
          //     console.log(jQxhr);
          //     console.log(textStatus);
          //     console.log(data);
          //   },
          //   error: function( jqXhr, textStatus, errorThrown ){
          //     console.log(jqXhr);
          //     console.log( errorThrown );
          //   }
          // });
        } else {
          return false;
        }

      });
    },
    checkFormData: function($form) {

    },
    requestReturn: function() {
      var rrl = '.request-return-module',
      el = document.querySelector(rrl),
      rb = document.querySelector('.return-block');
      if (el) {
      $('#ContactFormReason').prettyDropdown({
        classic: true
      })
        //needs to be passed to the snippet
        var order_date_string = el.getAttribute('data-orderdate'),
        //(should be 14 days) We could wire this up to theme settings
        number_of_days_for_an_exchange = el.getAttribute('data-maxreturn');
        var order_date = new Date(Date.parse(order_date_string));
        var now_date = new Date();
        var time_diff = Math.abs(now_date.getTime() - order_date.getTime());
        var diff_days = Math.ceil(time_diff / (1000 * 3600 * 24));

        //exchanges only allowed within 14 days.
        if(diff_days < number_of_days_for_an_exchange){
          el.classList.remove('hide');
        } else {
          document.querySelector('.return-expired').classList.remove('hide');
        }

        el.addEventListener('click', function (event) {
          event.preventDefault();
          rb && rb.classList.toggle('hide');
        });

      }
    },
    dataSlickSlider: function() {
      if($('.slick-carousel').length > 0) {
        $('.slick-carousel').slick();
      }
    },
    closeOverlayPopup: function() {
      var ov = document.querySelector('.overlay');
      ov && ov.addEventListener('click', function(event) {
        event.preventDefault();
        this.classList.remove('active');
        var bd = document.querySelector('body');
        if (bd.classList.contains('drawer-open')) {
          bd.classList.remove('drawer-open');
        }

        var mc = document.querySelectorAll('.mini-cart-slide');
        if (mc.length) {
          for (var i = 0; i < mc.length; i++) {
            mc[i].classList.remove('active');
          }
        }

        var op = document.querySelectorAll('.popup-overlay');
        for (var i = 0; i < op.length; i++) {
          op[i].classList.remove('active');
        }
        var fb = document.querySelector('.filter-toggle-block'),
        fl = document.querySelector('.filter');
        fb && fb.classList.contains('active')?fb.classList.remove('active'):'';
        fl && fl.classList.contains('active')?fl.classList.remove('active'):'';
      })
    }
  };

  SUZANNAH.documentOnReady = {
    init: function() {
      SUZANNAH.widget.init();
    }
  };

  var $window = $(window),
    $body = $('body'),
    DOC = $(document);

  $(document).ready( SUZANNAH.documentOnReady.init );
})(jQuery);

$(document).ready(function() {
  var sections = new theme.Sections();

  sections.register('cart-template', theme.Cart);
  sections.register('product', theme.Product);
  sections.register('video-section', theme.VideoSection);
  sections.register('collection-template', theme.Filters);
  sections.register('collection-template', theme.CustomFilters);
  sections.register('product-template', theme.Product);
  sections.register('header-section', theme.HeaderSection);
  sections.register('map', theme.Maps);
  sections.register('slideshow-section', theme.SlideshowSection);
  sections.register('quotes', theme.Quotes);

  $(document).on('cart.ready', function(event, cart) {
    minicartPrintTag(cart);
  });
  $(document).on('cart.requestComplete', function(event, cart) {
     minicartPrintTag(cart);

    if(!document.querySelector('body').classList.contains('template-cart')) {
      //theme.Custom.drawertoggle('.cart-popup');
      setTimeout(function(){
        document.querySelector('.mini-cart-slide').classList.add('active');
        document.querySelector('body').classList.add('drawer-open');
        if($(window).width() > 786){
          document.querySelector('.overlay').classList.add('active');
        }
      }, 550);
    }
    if(cart.item_count == 0) {
      $('.item-count').html('');
      document.querySelector('.mini-cart-slide').classList.remove('active');
      document.querySelector('body').classList.remove('drawer-open');
      document.querySelector('.overlay').classList.remove('active');
      setTimeout(function(){ $('.item-count').html('0'); }, 500);
    }
    else {
      $('.item-count').html(cart.item_count);
    }
  });

  function minicartPrintTag(cart){
    var total_discount = 0;
    $.each( cart.items, function( key, value ) {
      var product_handle = value.handle;
      var product_quantity = value.quantity;

      var product_id = value.id;
      var elementProductUrl = "/products/"+product_handle+".js";
      $.ajax({
          url: elementProductUrl,
          dataType: 'json',
          async: false,
          data: {format: "json"},
          success: function(product) {
            // ==== Script for remove item from cart if variant inventory_quantity 0 =====
            if(product.variants){
              $.each( product.variants, function( key, k ) {
                  if(k.id == product_id && k.available == false){
                    action_update_cart(0, product_id);    
                  }
              });
            }
            // ==== Script for remove item from cart if variant inventory_quantity 0 ======
          opt = [];
          if($.inArray( "print", product.tags )!= -1) {
            value["print"] = "";
          }
          else{ 
            value["print"] = "print"; 
          }
        },
        error: function(error) {
          action_update_cart(0, product_id); 
        }
      });

    });
    return "true";
  }
  $(document).on("click", 'a.sz-remove-cartitem', function(){
    var product_id = $(this).parents(".product-desc").find(".printsku").data("name");
    var dress_qty = $(this).parents(".product-desc").find(".printsku").data("quantity");
    var print_qty = $("div.sz-product-desc-info[data-id='"+product_id+"']").data("quantity");
    var update_qty =  parseInt(print_qty) - parseInt(dress_qty);
    if(product_id != undefined && product_id != '')
    action_update_cart(update_qty, product_id); 
  });

  function action_update_cart(qty,var_id){
    CartJS.updateItemById(var_id, qty);
  }
    $( document ).ajaxError(function( event, jqxhr, settings, thrownError ) {
      //console.log(event);
      if (jqxhr.responseJSON && jqxhr.responseJSON.status == 422) {
        var errmsg = jqxhr.responseJSON.description,
        em = document.querySelector('.err-msg');
        if (em) {
          em.remove;
        }
        var errdiv = document.querySelector('.mini-cart-slide h4').appendChild(document.createElement('div')).setAttribute('class', 'err-msg');
        var splitdash = errmsg.split(' - ');
        var removeAll = splitdash['0'];
        var qty_prod = removeAll.replace('All ','');
        var qty_no = qty_prod.split(' ')[0];
        var pro_title = qty_prod.substr(qty_prod.indexOf(" ") + 1);

        var customErrMsg = pro_title + 'is already in your basket, only ' + qty_no + ' available';

        document.querySelector('.err-msg').textContent= customErrMsg;;
        //console.log(errdiv);
      }
    });
});

$('select.pretty').prettyDropdown({
  classic: true,
  selectedMarker: ''
});

// autocomplete search box
var pdata = new Bloodhound({
  datumTokenizer: function(Obj) {
    return Bloodhound.tokenizers.whitespace([Obj.title+' ' + Obj.handle]);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: '/pages/product-json'
});
$('.search .typeahead').typeahead(
  {
    hint: false
  },
  {
    searchOnFocus: true,
    display: ["title"],
    // templates: {
    //   notFound: [
    //     '<div class="empty-message">',
    //       'unable to find any Best Picture winners that match the current query',
    //     '</div>'
    //   ].join('\n'),
    // },
    href: '/products/{{handle}}',
    source: pdata,
    limit: 4,
    debug: false
});

theme.init = function() {
  theme.customerTemplates.init();

  // Theme-specific selectors to make tables scrollable
  var tableSelectors = '.rte table,' + '.custom__item-inner--html table';

  slate.rte.wrapTable({
    $tables: $(tableSelectors),
    tableWrapperClass: 'scrollable-wrapper'
  });

  // Theme-specific selectors to make iframes responsive
  var iframeSelectors =
    '.rte iframe[src*="youtube.com/embed"],' +
    '.rte iframe[src*="player.vimeo"],' +
    '.custom__item-inner--html iframe[src*="youtube.com/embed"],' +
    '.custom__item-inner--html iframe[src*="player.vimeo"]';

  slate.rte.wrapIframe({
    $iframes: $(iframeSelectors),
    iframeWrapperClass: 'video-wrapper'
  });

  // Common a11y fixes
  slate.a11y.pageLinkFocus($(window.location.hash));

  $('.in-page-link').on('click', function(evt) {
    slate.a11y.pageLinkFocus($(evt.currentTarget.hash));
  });

  $('a[href="#"]').on('click', function(evt) {
    evt.preventDefault();
  });

  slate.a11y.accessibleLinks({
    messages: {
      newWindow: theme.strings.newWindow,
      external: theme.strings.external,
      newWindowExternal: theme.strings.newWindowExternal
    },
    $links: $('a[href]:not([aria-describedby], .product-single__thumbnail)')
  });

  theme.FormStatus.init();
};


blogLoading()
function blogLoading() {
  var $window = $(window),
  $body = $('body'),
  DOC = $(document),
  windowWidth = $window.width(),
  windowHeight= $window.height();
  // $(document).ready( SLOVERS.documentOnReady.init );
  // $window.on('load', SLOVERS.documentOnLoad.init);
  // $window.on('scroll', SLOVERS.documentOnScroll.init);
  // $window.on('resize', SLOVERS.documentOnResize.init );
  // Ajax Pagination auto load.
  var pInfScrLoading = false;
  var pInfScrDelay = 250;
  function pInfScrExecute() {
    var pInfScrNode = $('.more').last();
    console.log(pInfScrNode);
    var pInfScrURL = $('.more a').last().attr("href");
    if(pInfScrNode.length > 0 && pInfScrNode.css('display') != 'none') {
      $.ajax({
        type: 'GET',
        url: pInfScrURL,
        beforeSend: function() {
          pInfScrLoading = true;
          //pInfScrNode.clone().empty().insertAfter(pInfScrNode).append('<img src=\"//cdn.shopify.com/s/files/1/0068/2162/assets/loading.gif?105791\" />');
          pInfScrNode.hide();
        },
        success: function(data) {
          // remove loading feedback
          pInfScrNode.next().remove();
          pInfScrNode.remove();
          $('body,html').stop(true);
          var filteredData = $(data).find(".ajax-blog");
          var filteredMoreData = $(data).find(".more");
          filteredData.insertBefore( $("#product-list-foot") );
          filteredMoreData.insertAfter( $("#product-list-foot") );
          pInfScrLoading = false;
          attachClickEvent();
        },
        dataType: "html"
      });
    }
  }
  function attachClickEvent(){
    /*setTimeout(function() {
      SLOVERS.initialize.sameHeight();
    }, 5000);*/
    $('.more a').click(function(event){
      pInfScrExecute();
      event.stopPropagation();
      return false;
    });
    return false;
  }
  function autoScrollItem(event){
      pInfScrExecute();
      event.stopPropagation();
      return false;
  }
  attachClickEvent();
  if ($body.hasClass('template-blog')){
    $(window).on('scroll', $.debounce(250, function() {
      if($(document).height() - 800 < ($(document).scrollTop() + $(window).height())) {
        var pInfScrNode = $('.more').last();
        if (typeof pInfScrNode != 'undefined' && pInfScrNode) {
          $('.more a').last().trigger("click").remove();
        }
      }
    }));
  }
}


/* start home video section js  */

theme.VideoSection = (function() {
  function VideoSection(container) {
    var $container = (this.$container = $(container));

    const players = Array.from(document.querySelectorAll('.video-plyr')).map(p => new Plyr(p));

    // $('.video-plyr', $container).each(function() {
    //   var $el = $(this);
    //   theme.Video.init($el);
    //   theme.Video.editorLoadVideo($el.attr('id'));
    // });
    //
    // const player = new Plyr('#player');

	$(document).ready(function(){
	  var video1 = document.getElementById("player");
		video1.currentTime = 0;
		$(".mute-unmute").click(function(){
		     if($(this).hasClass("stop"))
		     {
		         var ban_video = document.getElementById("player");
		         $("#player").prop('muted', true);
		         $(this).removeClass("stop");
		     }
		     else{
		         var ban_video = document.getElementById("player");
		         $("#player").prop('muted', false);
		         $(this).addClass("stop");
		     }
		 });

		$(".unmute-bt").click(function(){
		  $(".unmute-bt").css("display", "none");
		  $(".mute-bt").css("display", "block");
		});
		$(".mute-bt").click(function(){
		  $(".unmute-bt").css("display", "block");
		  $(".mute-bt").css("display", "none");
		});
	    }); 

  }

  return VideoSection;
})();

theme.VideoSection.prototype = _.assignIn({}, theme.VideoSection.prototype, {
  onUnload: function() {
    const players = Array.from(document.querySelectorAll('.video-plyr')).map(p => new Plyr(p));
  }
});

/* end home video section js  */

$(theme.init);

/* -- old browser fixes */
if (!String.prototype.includes) {
    String.prototype.includes = function() {
        'use strict';
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}
 
/*footer newsletter*/

$("#Subscribe").click(function(event) {
    var messages = "";
    var email = $("#ContactFooter-email, #k_id_email").val();
    if (email == "")  {
        event.preventDefault();
        messages += "Email can't blank";
        $(".input-error-message, .error_message" ).html( messages ).css("display","block");

    }else{
        if (validateEmail(email)){}else{
        event.preventDefault();
        messages += "* Incorrect email";
        $(".input-error-message, .error_message" ).html( messages ).css("display","block");
        }
    }
});

 KlaviyoSubscribe.attachToForms('#email_signup', {
  hide_form_on_success: true,
  extra_properties: {
    $source: '$embed',
    $method_type: "Klaviyo Form",
    $method_id: 'embed',
    $consent_version: 'Embed default text'
  }
});


/*tea maker video*/

var vidClip = document.getElementById("myVideo"); 
function playVid() { 
    myVideo.play();
} 
function pauseVid() { 
  myVideo.pause(); 
}


var $video = $('#myVideo');
$video.on('mouseover', hide);
$video.on('mouseleave', hide);
function hide() {
    var isPlaying = false;
    this.onplaying = function() {
        isPlaying = true;
    }
    if (!isPlaying) {
        $(this).removeAttr('controls');
    }
}
$(".play").click(function () {
    $(".video-help-popup").css("display","block");
    $(".video-help-popup").addClass("active-popup");
    $(".play-icon-section").css("display","none");
    $(".pause-icon-section").css("display","block");
});
$("#pause").click(function () {
    $(".video-help-popup").css("display","none");
    $(".video-help-popup").removClass("active-popup");
    $(".play-icon-section").css("display","block");
    $(".pause-icon-section").css("display","none");
});
$(".pause-icon-section").click(function () {
    $(".play-icon-section").css("display","block");
    $(this).css("display","none");
});
$(".play-icon-section").click(function () {
    $(this).css("display","none");
    $(".pause-icon-section").css("display","block");
});


var mobileVideo = $('#myVideo').data('mobile');
var destopVideo = $('#myVideo').data('desktop');

var mainVideo = $('#myVideo');
if ($(window).width() < 764 ) {
  mainVideo.append("<source type='video/mp4' src='" + mobileVideo + "' />");
} else {
  mainVideo.append("<source type='video/mp4' src='"+ destopVideo +"' />");
}

