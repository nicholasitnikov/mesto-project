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
		const element = this._renderer(item);
		this._placeInto(element, true);
		
	}

	render() {
		this._container.innerHTML = '';
		this._items.forEach(item => {
			const element = this._renderer(item);
			this._placeInto(element, false);		
		});
	}	

	removeItem(id) {
		const item = document.querySelector(`${this._itemSelector}[data-id="${id}"]`);	
		item.remove();		
	}
}