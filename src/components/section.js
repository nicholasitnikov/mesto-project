export default class Section {
	constructor ( {items, renderer}, selectorContainer ) {
		this._renderer = renderer;
		this._items = items;
		this._container = document.querySelector(selectorContainer);
	}

	_placeInto(prepand, item) {
		if (prepand) {
			this._container.prepend(item);
		} else {
			this._container.append(item);
		}
	}

	addAllItems() {
		this._items.forEach(item => {
			const element = this._renderer(item);
			this._placeInto(false, element);		
		});
	}

	addItem() {	
		const element = this._renderer(this._items[0]);
		this._placeInto(true, element);		
	}	

	removeItem(id) {
		// this._items = this._items.filter((el) => {
		// 	return el._id !== id;
		// })
		 console.log(this);
	}
}