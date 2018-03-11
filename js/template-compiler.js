
class TemplateCompiler {
	constructor (parent, data) {
		this.parent = parent

		if (Array.isArray(data)) {
			data.forEach(block => this.mountBlock(block))
		}
	}

	mountBlock(block) {
		const fragment = document.querySelector('#article_template').content
		const el = document.importNode(fragment, true)

		this.setSize(el, block.size)
		this.setTitle(el, block.title, block.titleColor)
		this.setImage(el, block.image, block.title)
		this.setDescription(el, block.description)
		this.setChannelName(el, block.channelName)

		this.parent.appendChild(el)

		return el
	}

	setSize (el, size) {
		const articleEl = el.querySelector('.article')

		articleEl.classList.add(`article--${size || 'sm'}`)
	}

	setTitle (el, title, color) {
		const titleEl = el.querySelector('.article__title')

		titleEl.innerHTML = title
		titleEl.style.color = color || '#000'
	}

	setImage (el, src, title) {
		const imgContainerEl = el.querySelector('.article__image')

		if (!imgContainerEl) {
			return
		}

		if (src) {
			const imgEl = document.createElement('img')

			const imageData = this._getImageData(src)

			imgEl.setAttribute('src', src)
			imgEl.setAttribute('srcset', imageData.srcset)
			imgEl.setAttribute('sizes', imageData.sizes)
			imgEl.setAttribute('alt', title)
			imgEl.setAttribute('title', title)

			imgContainerEl.appendChild(imgEl)
		} else {
			imgContainerEl.remove()
		}
	}

	setDescription (el, description) {
		const descriptionEl = el.querySelector('.article__desc')

		if (!descriptionEl) {
			return
		}

		if (description) {
			descriptionEl.innerHTML = description
		} else {
			descriptionEl.remove()
		}
	} 

	setChannelName (el, name) {
		const channelNameEl = el.querySelector('.article__channel-name')

		if (!channelNameEl) {
			return
		}

		if (name) {
			channelNameEl.innerHTML = name
		} else {
			channelNameEl.remove()
		}
	}

	_getImageData (src) {
		const dotIndex = src.indexOf('.')
		const name = src.slice(0, dotIndex)
		const ext = src.slice(dotIndex) 

		const srcset = `${name}${ext} 320w, ${name}@2x${ext} 480w, ${name}@3x${ext} 800w`
		const sizes = '(max-width: 320px) 280px, (max-width: 480px) 440px, 800px'

		return {
			srcset,
			sizes
		}
	}
}