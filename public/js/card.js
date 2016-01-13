function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}
var cards = {
	gain1Currency: {
		name: 'Currency',
		cost: 0,
		effects: [{
			name: 'gainCurrency',
			amount: 1
		}],
		rarity: 'basic',
		text: 'Gain 1 Currency.'
	}
};

function Card(config) {
	this.cost = config.cost || 0;
	this.effects = config.effects || [];
	this.name = config.name || 'NONAMECARD';
	this.rarity = config.rarity || 'NORARITY';
	this.text = config.text || 'NOTEXT';
	this.id = uuid();
}