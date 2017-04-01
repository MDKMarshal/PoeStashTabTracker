define([], function (){
	Array.prototype.includes = function _includes(subset){
		return subset.every(i => this.indexOf(i) > -1)
	}
});