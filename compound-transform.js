function CompoundTransform() { 
	if(arguments.length == 0)
        this.transforms[0] = Matrix.IDENTITY
	else if(arguments[0] instanceof Array)
        this.transforms = arguments[0];
	else
	    for(var i = 0; i < arguments.length; i++)
            this.transforms[i] = arguments[i];
}

AffineTransform.prototype = {
	clone: function() {
		return new CompoundTransform(this.transforms.splice());
	},
	toWorldSpace: function(objectVector) {
		for(var i = 0; i < this.transforms.length; i++)
		    objectVector = this.transforms[i].toWorldSpace(objectVector);
		return objectVector;
	},
	toObjectSpace: function(worldVector) {
		for(var i = this.transforms.length - 1; i >= 0; i--)
		    worldVector = this.transforms[i].toObjectSpace(worldVector);
		return worldVector;
	},
	vectorToWorldSpace: function(objectVector) {
		for(var i = 0; i < this.transforms.length; i++)
		    objectVector = this.transforms[i].vectorToWorldSpace(objectVector);
		return objectVector;
	},
	vectorToObjectSpace: function(worldVector) {
		for(var i = this.transforms.length - 1; i >= 0; i--)
		    worldVector = this.transforms[i].vectorToObjectSpace(worldVector);
		return worldVector;
	},
	inverse: function() {
		var inverses = [];
		for(var i = 0; i < this.transforms.length; i++)
		    inverses.shift(this.transforms.inverse());
		return inverse;
	},
	combine: function(that) {
		return new CompoundTransform(this, that);
	},
	evaluate: function() {
		var combined = AffineTransform.IDENTITY;
		for(var i = 0; i < this.transforms.length; i++)
		    combined = combined.combine(this.transforms[i].evaluate());
		return combined;
	},
	toSVGTransformString: function() {
		return this.evaluate().toSVGTransformString();
	}
};