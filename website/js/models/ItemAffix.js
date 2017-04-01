define([], function(){ 
	var ItemAffix = function(rawAffix){
		this.Tier = 0;
		this.String = rawAffix;
		this.Values = [];
	}

	return ItemAffix;
});