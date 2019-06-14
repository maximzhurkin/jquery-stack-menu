(($) ->
	methods =
		init: (element, options) ->
			element.addClass 'stack-menu'
			element.find('ul').addClass 'stack-menu__list'
			element.find('ul:first')
				.addClass 'stack-menu__list--root'
				.addClass 'stack-menu__list--active'
			element.find('li').addClass 'stack-menu__item'
			element.find('a').addClass 'stack-menu__link'

			$('.stack-menu__item').each (index) ->
				$(@).attr('data-id', index)
				if $(@).find('.stack-menu__list').length > 0
					$(@).children('.stack-menu__link').addClass 'stack-menu__link--parent'
				return

			$('.stack-menu__list').each ->
				if not $(@).hasClass('stack-menu__list--root')
					if options.all
						url = $(@).closest('.stack-menu__item')
							.find('.stack-menu__link')
							.attr('href')
						allItemElement = $('<li>', class: 'stack-menu__item')
						allLinkElement = $('<a>', class: 'stack-menu__link', href: url, text: options.allTitle)
						allItemElement.append allLinkElement
						$(@).prepend allItemElement
					backItemElement = $('<li>', class: 'stack-menu__item')
					backLinkElement = $('<a>', class: 'stack-menu__link stack-menu__link--back', href: '#', html: '&nbsp;')
					backItemElement.append backLinkElement
					$(@).prepend backItemElement
				return

			element.find('.stack-menu__link').click (event) ->
				link = $(@)
				item = link.closest('.stack-menu__item')
				list = item.closest('.stack-menu__list')
				parent = list.closest('.stack-menu__item')
				sub = item.children('.stack-menu__list')

				if link.hasClass('stack-menu__link--back')
					event.preventDefault()
					list.removeClass('stack-menu__list--active')
					list.removeClass('stack-menu__list--active')
					parent.removeClass('stack-menu__item--opened')
					parent.find('.stack-menu__link')
						.removeClass('stack-menu__link--hidden')
					parent.closest('.stack-menu__list')
						.children('.stack-menu__item')
						.removeClass('stack-menu__item--hidden')
				else
					if item.children('.stack-menu__list').length == 0
						return true
					else
						event.preventDefault()
						parent.addClass('stack-menu__item--opened')
						link.addClass('stack-menu__link--hidden')
						sub.addClass('stack-menu__list--active')
						$(list.children('.stack-menu__item')).each ->
							if $(@).data('id') != item.data('id')
								$(@).addClass('stack-menu__item--hidden')
							return
				return
			return

	jQuery.fn.stackMenu = (options) ->
		options = $.extend({
			all: false
			allTitle: 'All'
		}, options)
		methods.init @, options
		return { reset: (element) ->
			$(element).find('.stack-menu').removeClass('stack-menu--active')
			$(element).find('.stack-menu__list').removeClass('stack-menu__list--active')
			$(element).find('.stack-menu__item').removeClass('stack-menu__item--hidden')
				.removeClass('stack-menu__item--opened')
			$(element).find('.stack-menu__link').removeClass('stack-menu__link--hidden')
			$(element).find('.stack-menu__list--root').addClass('stack-menu__list--active')
			return
		}

	return
) jQuery
