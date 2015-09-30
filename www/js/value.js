// Anything that can be put on the stack is value.
// All values are immutable.
Value = function () {
    this.vt = 'the type of the value';
}

// The simplest kind of a value. Represents a JavaScript/IEEE 7854 float.
FloatValue = function (value) {
    this.value = value;
}

// The stack of values, possibly empty.
// The top of the stack is the value being edited.
Stack = function () {
}

function matchBinaryFloat (values) {
    if (values.length < 2) {
        return false;
    }
    return values.slice(0, 2).map(function (v) {
        return v instanceof FloatValue;
    });
}

var addFloat = {
    description: 'Add float values',
    apply: function (values) {
        var sum = values.reduce(function (m, v) {
            return v.value + m;
        }, 0);
        return new FloatValue(sum);
    },
    match: matchBinaryFloat
};

var subFloat = {
    description: 'Subtract float values',
    apply: function (values) {
        var a = values[0].value;
        var b = values[1].value;
        return new FloatValue(b - a);
    },
    match: matchBinaryFloat
};

var mulFloat = {
    description: 'Multiply float values',
    apply: function (values) {
        var sum = values.reduce(function (m, v) {
            return v.value * m;
        }, 0);
        return new FloatValue(sum);
    },
    match: matchBinaryFloat
};

var divFloat = {
    description: 'Divide float values',
    apply: function (values) {
        var a = values[0].value;
        var b = values[1].value;
        return new FloatValue(b / a);
    },
    match: matchBinaryFloat
};

Operation = function () {
    /* run the operation with the given number of items from the stack */
    /* returns either a single value or an array of values */
    this.description = function () {};
    // Actually do the operation.
    // The default number of arguments consumed.
    // A value of -1 means to consume everything on the stack.
    this.defaultSize = 2;
    this.apply = function (values) {
    }
    // Returns an array of true/false indicating if the values are allowed.
    // Can return a false value if the construct is prohibited entirely, such
    // as when the length restriction is not met.
    this.match = function (values) {
    }
}

var Operations = new function () {};
Operations.ops = {};

Operations.define = function (name, op) {
    // Add an operation with the given name
    if (!this.ops[name]) {
        this.ops[name] = [];
    }
    this.ops[name].push(op);
}
Operations.resolve = function (name, values) {
    // Resolve the operation with the name that 'best matches'.
    var ops = this.ops[name] || [];
    for (var i = 0; i < ops.length; i++) {
        var op = ops[i];
        var res = op.match(values);
        if (res && res.every(function (f) { return f; })) {
            // Valid op matches values
            return {
                op: op,
                size: res.length
            }
        }
    }
}

Operations.define('+', addFloat);
Operations.define('-', subFloat);
Operations.define('*', mulFloat);
Operations.define('/', divFloat);

