(function($) {
  var methods;
  methods = {
    init: function(element, options) {
      element.addClass('stack-menu');
      element.find('ul').addClass('stack-menu__list');
      element.find('ul:first').addClass('stack-menu__list--root').addClass('stack-menu__list--active');
      element.find('li').addClass('stack-menu__item');
      element.find('a').addClass('stack-menu__link');
      $('.stack-menu__item').each(function(index) {
        $(this).attr('data-id', index);
        if ($(this).find('.stack-menu__list').length > 0) {
          $(this).children('.stack-menu__link').addClass('stack-menu__link--parent');
        }
      });
      $('.stack-menu__list').each(function() {
        var allItemElement, allLinkElement, backItemElement, backLinkElement, url;
        if (!$(this).hasClass('stack-menu__list--root')) {
          if (options.all) {
            url = $(this).closest('.stack-menu__item').find('.stack-menu__link').attr('href');
            allItemElement = $('<li>', {
              "class": 'stack-menu__item'
            });
            allLinkElement = $('<a>', {
              "class": 'stack-menu__link',
              href: url,
              text: options.allTitle
            });
            allItemElement.append(allLinkElement);
            $(this).prepend(allItemElement);
          }
          backItemElement = $('<li>', {
            "class": 'stack-menu__item'
          });
          backLinkElement = $('<a>', {
            "class": 'stack-menu__link stack-menu__link--back',
            href: '#',
            html: '&nbsp;'
          });
          backItemElement.append(backLinkElement);
          $(this).prepend(backItemElement);
        }
      });
      element.find('.stack-menu__link').click(function(event) {
        var item, link, list, parent, sub;
        link = $(this);
        item = link.closest('.stack-menu__item');
        list = item.closest('.stack-menu__list');
        parent = list.closest('.stack-menu__item');
        sub = item.children('.stack-menu__list');
        if (link.hasClass('stack-menu__link--back')) {
          event.preventDefault();
          list.removeClass('stack-menu__list--active');
          list.removeClass('stack-menu__list--active');
          parent.removeClass('stack-menu__item--opened');
          parent.find('.stack-menu__link').removeClass('stack-menu__link--hidden');
          parent.closest('.stack-menu__list').children('.stack-menu__item').removeClass('stack-menu__item--hidden');
        } else {
          if (item.children('.stack-menu__list').length === 0) {
            return true;
          } else {
            event.preventDefault();
            parent.addClass('stack-menu__item--opened');
            link.addClass('stack-menu__link--hidden');
            sub.addClass('stack-menu__list--active');
            $(list.children('.stack-menu__item')).each(function() {
              if ($(this).data('id') !== item.data('id')) {
                $(this).addClass('stack-menu__item--hidden');
              }
            });
          }
        }
      });
    }
  };
  jQuery.fn.stackMenu = function(options) {
    options = $.extend({
      all: false,
      allTitle: 'All'
    }, options);
    methods.init(this, options);
    return {
      reset: function(element) {
        $(element).find('.stack-menu').removeClass('stack-menu--active');
        $(element).find('.stack-menu__list').removeClass('stack-menu__list--active');
        $(element).find('.stack-menu__item').removeClass('stack-menu__item--hidden').removeClass('stack-menu__item--opened');
        $(element).find('.stack-menu__link').removeClass('stack-menu__link--hidden');
        $(element).find('.stack-menu__list--root').addClass('stack-menu__list--active');
      }
    };
  };
})(jQuery);
