export default class Section {
	constructor ( {items, itemSelector, renderer}, selectorContainer ) {
		this._renderer = renderer;
		this._itemSelector = itemSelector;
		this._items = items;
		this._container = document.querySelector(selectorContainer);
	}

	placeInto(item, prepand) {
		const element = this._renderer(item);
		if(prepand) {
			this._container.prepend(element);
		} else {
			this._container.append(element);
		}
	}

	render() {
		this._container.innerHTML = '';
		this._items.forEach(item => {
			this.placeInto(item, false);		
		});
	}	

	removeItem(id) {
		const item = document.querySelector(`${this._itemSelector}[data-id="${id}"]`);	
		item.remove();		
	}
}