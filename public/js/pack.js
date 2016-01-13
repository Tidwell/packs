function Pack() {
	this.name = 'Base Pack';
	this.breakdown = {
		common: 3,
		uncommon: 2,
		rare: 1
	};
	this.contents = [];

	this.generate();
}
Pack.prototype.generate = function() {
	var i;
	for (var rarity in this.breakdown) {
		i = 0;
		while (i < this.breakdown[rarity]) {
			this.contents.push(new Card({
				rarity: rarity
			}));
			i++;
		}
	}
};