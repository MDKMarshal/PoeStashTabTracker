define([], function(){
	var FrameToRarityMap = [
	    'Normal',
        'Magic',
        'Rare',
        'Unique',
        'Gem',
        'Currency',
        'Divination card',
        'Quest item',
        'Prophecy',
        'Relic'
    ];

    var ItemNameFixRegex = /^(?:<<set:[MS]{1,2}>>)*/;

    var ItemNameStrings = [
        '<<set:MS>>',
        '<<set:M>>',
        '<<set:S>>'
	];

	var ItemModel = function ItemModel(rawItem){
		Object.keys(rawItem).forEach(k => this[k] = rawItem[k]);

		_fixName.call(this);
		_fixRarity.call(this);
		_fixIdentified.call(this);
	}

	function _fixName() {
		if(!this.name) {
			this.name = this.typeLine;
			this.typeLine = '';
		}

		this.name = this.name.replace(ItemNameFixRegex, '');

		this.displayName = this.name;
		if(this.typeLine) {
			this.displayName += ' - ' + this.typeLine
		}
	}

	function _fixRarity(){
		this.rarity = FrameToRarityMap[this.frameType];
		this.rarityClass = this.rarity.replace(' ', '');
	}

	function _fixIdentified(){
		this.identified = !!this.identified;
		this.unidentified = !this.identified;
	}

	return ItemModel;
});