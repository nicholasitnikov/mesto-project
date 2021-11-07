export default class Section {
	constructor ( {items, itemSelector, renderer}, selectorContainer ) {
		this._renderer = renderer;
		this._itemSelector = itemSelector;
		this._items = items;
		this._container = document.querySelector(selectorContainer);
	}

	_placeInto(item, prepand) {
		if(prepand) {
			this._container.prepend(item);
		} else {
			this._container.append(item);
		}
	}

	addItem(item) {
		this._items.push(item);
	}

	render() {
		this._container.innerHTML = '';
		this._items.forEach(item => {
			const element = this._renderer(item);
			this._placeInto(element, false);		
		});
	}

	renderLast() {
		const element = this._renderer(this._items[0]);
		this._placeInto(element, true);	
	}

	removeItem(id) {
		const items = document.querySelectorAll(this._itemSelector);
		console.log(this._itemSelector)
		items.forEach(el => {
			if(el.getAttribute('data-id') === id) {
				el.remove();
			}
		})
	}
}