define(['models/ItemAffix', 'json!data/ItemTypes.json'], function(ItemAffix, ItemTypes){
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

	var ItemModel = function ItemModel(rawItem){
		Object.keys(rawItem).forEach(k => this[k] = rawItem[k]);

		_fixName.call(this);
		_fixRarity.call(this);
		_fixIdentified.call(this);
		_fixBaseType.call(this);
		_fixAffixes.call(this);
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

	function _fixBaseType() {
		// TODO
		// FIXME: Do Gems and stuff that doesn't fit the naming convention
		if(this.additionalProperties && this.additionalProperties.find(p => p.name == 'Experience')) {
			this.baseType = 'Gem';
		}
		else {
			this.baseType = "Fishing Rod";
		}
	}

	function _fixAffixes() {
		this.Affixes = {};
		this.Affixes.Implicit = this.implicitMods ? this.implicitMods.map(a => new ItemAffix(a)) : [];
		this.Affixes.Explicit = this.explicitMods ? this.explicitMods.map(a => new ItemAffix(a)) : [];

		if(this.unidentified) {
			this.Affixes.Explicit.push(new ItemAffix('Unidentified'));
		}
	}

	function _flattenObjectToArray(obj) {
		var toReturn = {};
		
		for (var i in ob) {
			if (!ob.hasOwnProperty(i)) continue;
			
			if ((typeof ob[i]) == 'object') {
				var flatObject = flattenObject(ob[i]);
				for (var x in flatObject) {
					if (!flatObject.hasOwnProperty(x)) continue;
					
					toReturn[i + '.' + x] = flatObject[x];
				}
			} else {
				toReturn[i] = ob[i];
			}
		}
		return toReturn;
	}

	return ItemModel;
});