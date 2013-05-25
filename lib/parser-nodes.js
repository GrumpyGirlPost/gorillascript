(function (GLOBAL) {
  "use strict";
  var __async, __create, __curry, __in, __isArray, __keys, __name, __num,
      __once, __owns, __slice, __strnum, __toArray, __typeof, _ref,
      AccessMultiNode, AccessNode, ArgsNode, ArrayNode, AssignNode, BinaryNode,
      BlockNode, BreakNode, CallNode, CascadeNode, CommentNode, ConstNode,
      ContinueNode, DebuggerNode, DefNode, EmbedWriteNode, EvalNode, ForInNode,
      ForNode, FunctionNode, IdentNode, IfNode, inspect, isPrimordial,
      MacroAccessNode, MacroConstNode, mapAsync, Node, nodeToType, NothingNode,
      ObjectNode, ParamNode, quote, RegexpNode, ReturnNode, RootNode,
      SpreadNode, SuperNode, SwitchNode, SyntaxChoiceNode, SyntaxManyNode,
      SyntaxParamNode, SyntaxSequenceNode, ThisNode, ThrowNode, TmpNode,
      TmpWrapperNode, TryCatchNode, TryFinallyNode, Type, TypeFunctionNode,
      TypeGenericNode, TypeObjectNode, TypeUnionNode, UnaryNode, VarNode,
      YieldNode;
  __async = function (limit, length, hasResult, onValue, onComplete) {
    var broken, completed, index, result, slotsUsed, sync;
    if (typeof limit !== "number") {
      throw TypeError("Expected limit to be a Number, got " + __typeof(limit));
    }
    if (typeof length !== "number") {
      throw TypeError("Expected length to be a Number, got " + __typeof(length));
    }
    if (hasResult == null) {
      hasResult = false;
    } else if (typeof hasResult !== "boolean") {
      throw TypeError("Expected hasResult to be a Boolean, got " + __typeof(hasResult));
    }
    if (typeof onValue !== "function") {
      throw TypeError("Expected onValue to be a Function, got " + __typeof(onValue));
    }
    if (typeof onComplete !== "function") {
      throw TypeError("Expected onComplete to be a Function, got " + __typeof(onComplete));
    }
    if (hasResult) {
      result = [];
    } else {
      result = null;
    }
    if (length <= 0) {
      return onComplete(null, result);
    }
    if (limit < 1 || limit !== limit) {
      limit = 1/0;
    }
    broken = null;
    slotsUsed = 0;
    sync = false;
    completed = false;
    function onValueCallback(err, value) {
      if (completed) {
        return;
      }
      --slotsUsed;
      if (err != null && broken == null) {
        broken = err;
      }
      if (hasResult && broken == null && arguments.length > 1) {
        result.push(value);
      }
      if (!sync) {
        next();
      }
    }
    index = -1;
    function next() {
      while (!completed && broken == null && slotsUsed < limit && ++index < length) {
        ++slotsUsed;
        sync = true;
        onValue(index, __once(onValueCallback));
        sync = false;
      }
      if (!completed && (broken != null || slotsUsed === 0)) {
        completed = true;
        if (broken != null) {
          onComplete(broken);
        } else {
          onComplete(null, result);
        }
      }
    }
    next();
  };
  __create = typeof Object.create === "function" ? Object.create
    : function (x) {
      function F() {}
      F.prototype = x;
      return new F();
    };
  __curry = function (numArgs, f) {
    var currier;
    if (typeof numArgs !== "number") {
      throw TypeError("Expected numArgs to be a Number, got " + __typeof(numArgs));
    }
    if (typeof f !== "function") {
      throw TypeError("Expected f to be a Function, got " + __typeof(f));
    }
    if (numArgs > 1) {
      currier = function (args) {
        var ret;
        if (__num(args.length) >= numArgs) {
          return f.apply(this, args);
        } else {
          ret = function () {
            if (arguments.length === 0) {
              return ret;
            } else {
              return currier.call(this, args.concat(__slice.call(arguments)));
            }
          };
          return ret;
        }
      };
      return currier([]);
    } else {
      return f;
    }
  };
  __in = typeof Array.prototype.indexOf === "function"
    ? (function () {
      var indexOf;
      indexOf = Array.prototype.indexOf;
      return function (child, parent) {
        return indexOf.call(parent, child) !== -1;
      };
    }())
    : function (child, parent) {
      var i, len;
      len = +parent.length;
      i = -1;
      while (++i < len) {
        if (child === parent[i] && i in parent) {
          return true;
        }
      }
      return false;
    };
  __isArray = typeof Array.isArray === "function" ? Array.isArray
    : (function () {
      var _toString;
      _toString = Object.prototype.toString;
      return function (x) {
        return _toString.call(x) === "[object Array]";
      };
    }());
  __keys = typeof Object.keys === "function" ? Object.keys
    : function (x) {
      var key, keys;
      keys = [];
      for (key in x) {
        if (__owns.call(x, key)) {
          keys.push(key);
        }
      }
      return keys;
    };
  __name = function (func) {
    if (typeof func !== "function") {
      throw TypeError("Expected func to be a Function, got " + __typeof(func));
    }
    return func.displayName || func.name || "";
  };
  __num = function (num) {
    if (typeof num !== "number") {
      throw TypeError("Expected a number, got " + __typeof(num));
    } else {
      return num;
    }
  };
  __once = (function () {
    function replacement() {
      throw Error("Attempted to call function more than once");
    }
    function doNothing() {}
    return function (func, silentFail) {
      if (typeof func !== "function") {
        throw TypeError("Expected func to be a Function, got " + __typeof(func));
      }
      if (silentFail == null) {
        silentFail = false;
      } else if (typeof silentFail !== "boolean") {
        throw TypeError("Expected silentFail to be a Boolean, got " + __typeof(silentFail));
      }
      return function () {
        var f;
        f = func;
        if (silentFail) {
          func = doNothing;
        } else {
          func = replacement;
        }
        return f.apply(this, arguments);
      };
    };
  }());
  __owns = Object.prototype.hasOwnProperty;
  __slice = Array.prototype.slice;
  __strnum = function (strnum) {
    var type;
    type = typeof strnum;
    if (type === "string") {
      return strnum;
    } else if (type === "number") {
      return String(strnum);
    } else {
      throw TypeError("Expected a string or number, got " + __typeof(strnum));
    }
  };
  __toArray = function (x) {
    if (x == null) {
      throw TypeError("Expected an object, got " + __typeof(x));
    } else if (__isArray(x)) {
      return x;
    } else if (typeof x === "string") {
      return x.split("");
    } else {
      return __slice.call(x);
    }
  };
  __typeof = (function () {
    var _toString;
    _toString = Object.prototype.toString;
    return function (o) {
      if (o === void 0) {
        return "Undefined";
      } else if (o === null) {
        return "Null";
      } else {
        return o.constructor && o.constructor.name || _toString.call(o).slice(8, -1);
      }
    };
  }());
  Type = require("./types");
  nodeToType = (_ref = require("./parser-utils")).nodeToType;
  map = _ref.map;
  mapAsync = _ref.mapAsync;
  quote = (_ref = require("./utils")).quote;
  isPrimordial = _ref.isPrimordial;
  if ((_ref = require("util")) != null) {
    inspect = _ref.inspect;
  }
  function map(array, func, arg) {
    var _arr, _i, _len, changed, item, newItem, result;
    result = [];
    changed = false;
    for (_arr = __toArray(array), _i = 0, _len = _arr.length; _i < _len; ++_i) {
      item = _arr[_i];
      newItem = func(item, arg);
      result.push(newItem);
      if (item !== newItem) {
        changed = true;
      }
    }
    if (changed) {
      return result;
    } else {
      return array;
    }
  }
  Node = (function () {
    var _Node_prototype;
    function Node() {
      var _this;
      _this = this instanceof Node ? this : __create(_Node_prototype);
      throw Error("Node should not be instantiated directly");
    }
    _Node_prototype = Node.prototype;
    Node.displayName = "Node";
    _Node_prototype.type = function () {
      return Type.any;
    };
    _Node_prototype.walk = function (f) {
      return this;
    };
    _Node_prototype.walkAsync = function (f, callback) {
      return callback(null, this);
    };
    _Node_prototype.cacheable = true;
    _Node_prototype.withLabel = function (label) {
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      return BlockNode(
        this.line,
        this.column,
        this.scope,
        [this],
        label
      );
    };
    _Node_prototype._reduce = function (parser) {
      return this.walk(function (node) {
        return node.reduce(parser);
      });
    };
    _Node_prototype.reduce = function (parser) {
      var reduced;
      if (this._reduced != null) {
        return this._reduced;
      } else {
        reduced = this._reduce(parser);
        if (reduced === this) {
          return this._reduced = this;
        } else {
          return this._reduced = reduced.reduce(parser);
        }
      }
    };
    _Node_prototype.isConst = function () {
      return false;
    };
    _Node_prototype.constValue = function () {
      throw Error("Not a const: " + __typeof(this));
    };
    _Node_prototype.isConstType = function () {
      return false;
    };
    _Node_prototype.isConstValue = function () {
      return false;
    };
    _Node_prototype.isLiteral = function () {
      return this.isConst();
    };
    _Node_prototype.literalValue = function () {
      return this.constValue();
    };
    _Node_prototype.isNoop = function (o) {
      return this.reduce(o)._isNoop(o);
    };
    _Node_prototype._isNoop = function (o) {
      return false;
    };
    _Node_prototype.isStatement = function () {
      return false;
    };
    _Node_prototype.rescope = function (newScope) {
      var oldScope;
      if (this.scope === newScope) {
        return this;
      }
      oldScope = this.scope;
      this.scope = newScope;
      function walker(node) {
        var nodeScope, parent;
        nodeScope = node.scope;
        if (nodeScope === newScope) {
          return node;
        } else if (nodeScope === oldScope) {
          return node.rescope(newScope);
        } else {
          parent = nodeScope.parent;
          if (parent === oldScope) {
            nodeScope.reparent(newScope);
          }
          return node.walk(walker);
        }
      }
      return this.walk(walker);
    };
    _Node_prototype.doWrap = function (parser) {
      var innerScope, result;
      if (this.isStatement()) {
        innerScope = parser.pushScope(true, this.scope);
        result = CallNode(
          this.line,
          this.column,
          this.scope,
          FunctionNode(
            this.line,
            this.column,
            this.scope,
            [],
            this.rescope(innerScope),
            true,
            true
          ),
          []
        );
        parser.popScope();
        return result;
      } else {
        return this;
      }
    };
    return Node;
  }());
  function inspectHelper(depth, name, line, column) {
    var _arr, _i, _len, _some, arg, args, d, found, hasLarge, part, parts;
    args = __slice.call(arguments, 4);
    if (depth != null) {
      d = __num(depth) - 1;
    } else {
      d = null;
    }
    found = false;
    for (_i = args.length; _i--; ) {
      arg = args[_i];
      if (!arg || arg instanceof NothingNode || __isArray(arg) && arg.length === 0) {
        args.pop();
      } else {
        break;
      }
    }
    for (_arr = [], _i = 0, _len = args.length; _i < _len; ++_i) {
      arg = args[_i];
      _arr.push(inspect(arg, null, d));
    }
    parts = _arr;
    _some = false;
    for (_i = 0, _len = parts.length; _i < _len; ++_i) {
      part = parts[_i];
      if (parts.length > 50 || part.indexOf("\n") !== -1) {
        _some = true;
        break;
      }
    }
    hasLarge = _some;
    if (hasLarge) {
      for (_arr = [], _i = 0, _len = parts.length; _i < _len; ++_i) {
        part = parts[_i];
        _arr.push("  " + __strnum(part.split("\n").join("\n  ")));
      }
      parts = _arr;
      return __strnum(name) + "(\n" + __strnum(parts.join(",\n")) + ")";
    } else {
      return __strnum(name) + "(" + __strnum(parts.join(", ")) + ")";
    }
  }
  Node.Access = AccessNode = (function (Node) {
    var _AccessNode_prototype, _Node_prototype;
    function AccessNode(line, column, scope, parent, child) {
      var _this;
      _this = this instanceof AccessNode ? this : __create(_AccessNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(parent instanceof Node)) {
        throw TypeError("Expected parent to be a " + __name(Node) + ", got " + __typeof(parent));
      }
      if (!(child instanceof Node)) {
        throw TypeError("Expected child to be a " + __name(Node) + ", got " + __typeof(child));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.parent = parent;
      _this.child = child;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _AccessNode_prototype = AccessNode.prototype = __create(_Node_prototype);
    _AccessNode_prototype.constructor = AccessNode;
    AccessNode.displayName = "AccessNode";
    if (typeof Node.extended === "function") {
      Node.extended(AccessNode);
    }
    AccessNode.cappedName = "Access";
    AccessNode.argNames = ["parent", "child"];
    _AccessNode_prototype.type = function (o) {
      var _ref, _this;
      _this = this;
      if ((_ref = this._type) == null) {
        return this._type = (function () {
          var child, childType, childValue, isString, parentType;
          parentType = _this.parent.type(o);
          isString = parentType.isSubsetOf(Type.string);
          if (isString || parentType.isSubsetOf(Type.arrayLike)) {
            child = o.macroExpand1(_this.child).reduce(o);
            if (child.isConst()) {
              childValue = child.constValue();
              if (childValue === "length") {
                return Type.number;
              } else if (typeof childValue === "number") {
                if (__num(childValue) >= 0 && __num(childValue) % 1 === 0) {
                  if (isString) {
                    return Type.string.union(Type["undefined"]);
                  } else if (parentType.subtype) {
                    return parentType.subtype.union(Type["undefined"]);
                  } else {
                    return Type.any;
                  }
                } else {
                  return Type["undefined"];
                }
              }
            } else {
              childType = child.type(o);
              if (childType.isSubsetOf(Type.number)) {
                if (isString) {
                  return Type.string.union(Type["undefined"]);
                } else if (parentType.subtype) {
                  return parentType.subtype.union(Type["undefined"]);
                } else {
                  return Type.any;
                }
              }
            }
          } else if (parentType.isSubsetOf(Type.object) && typeof parentType.value === "function") {
            child = o.macroExpand1(_this.child).reduce(o);
            if (child.isConst()) {
              return parentType.value(String(child.constValue()));
            }
          }
          return Type.any;
        }());
      } else {
        return _ref;
      }
    };
    _AccessNode_prototype._reduce = function (o) {
      var _ref, args, cachedParent, child, cValue, end, hasEnd, hasStep,
          inclusive, parent, pValue, start, step, value;
      parent = this.parent.reduce(o).doWrap(o);
      cachedParent = null;
      function replaceLengthIdent(node) {
        var nodeParent;
        if (node instanceof IdentNode && node.name === "__currentArrayLength") {
          if (parent.cacheable && cachedParent == null) {
            cachedParent = o.makeTmp(
              o.indexFromPosition(node.line, node.column),
              "ref",
              parent.type(o)
            );
            cachedParent.scope = node.scope;
          }
          return AccessNode(
            node.line,
            node.column,
            node.scope,
            cachedParent != null ? cachedParent : parent,
            ConstNode(node.line, node.column, node.scope, "length")
          );
        } else if (node instanceof AccessNode) {
          nodeParent = replaceLengthIdent(node.parent);
          if (nodeParent !== node.parent) {
            return AccessNode(
              node.line,
              node.column,
              node.scope,
              nodeParent,
              node.child
            ).walk(replaceLengthIdent);
          } else {
            return node.walk(replaceLengthIdent);
          }
        } else {
          return node.walk(replaceLengthIdent);
        }
      }
      child = replaceLengthIdent(this.child.reduce(o).doWrap(o));
      if (cachedParent != null) {
        return TmpWrapperNode(
          this.line,
          this.column,
          this.scope,
          AccessNode(
            this.line,
            this.column,
            this.scope,
            AssignNode(
              this.line,
              this.column,
              this.scope,
              cachedParent,
              "=",
              parent
            ),
            child
          ),
          [cachedParent.id]
        );
      }
      if (parent.isConst() && child.isConst()) {
        pValue = parent.constValue();
        cValue = child.constValue();
        if (cValue in Object(pValue)) {
          value = pValue[cValue];
          if (value === null || value instanceof RegExp || (_ref = typeof value) === "string" || _ref === "number" || _ref === "boolean" || _ref === "undefined") {
            return ConstNode(this.line, this.column, this.scope, value);
          }
        }
      }
      if (child instanceof CallNode && child.func instanceof IdentNode && child.func.name === "__range") {
        start = (_ref = child.args)[0];
        end = _ref[1];
        step = _ref[2];
        inclusive = _ref[3];
        hasStep = !step.isConst() || step.constValue() !== 1;
        if (!hasStep) {
          if (inclusive.isConst()) {
            if (inclusive.constValue()) {
              if (end.isConst() && typeof end.constValue() === "number") {
                end = ConstNode(end.line, end.column, end.scope, __num(end.constValue()) + 1 || 1/0);
              } else {
                end = BinaryNode(
                  end.line,
                  end.column,
                  end.scope,
                  BinaryNode(
                    end.line,
                    end.column,
                    end.scope,
                    end,
                    "+",
                    ConstNode(inclusive.line, inclusive.column, inclusive.scope, 1)
                  ),
                  "||",
                  ConstNode(end.line, end.column, end.scope, 1/0)
                );
              }
            }
          } else {
            end = IfNode(
              end.line,
              end.column,
              end.scope,
              inclusive,
              BinaryNode(
                end.line,
                end.column,
                end.scope,
                BinaryNode(
                  end.line,
                  end.column,
                  end.scope,
                  end,
                  "+",
                  ConstNode(inclusive.line, inclusive.column, inclusive.scope, 1)
                ),
                "||",
                ConstNode(end.line, end.column, end.scope, 1/0)
              ),
              end
            );
          }
        }
        args = [parent];
        hasEnd = !end.isConst() || (_ref = end.constValue()) !== void 0 && _ref !== 1/0;
        if (!start.isConst() || start.constValue() !== 0 || hasEnd || hasStep) {
          args.push(start);
        }
        if (hasEnd || hasStep) {
          args.push(end);
        }
        if (hasStep) {
          args.push(step);
          if (!inclusive.isConst() || inclusive.constValue()) {
            args.push(inclusive);
          }
        }
        return CallNode(
          this.line,
          this.column,
          this.scope,
          IdentNode(this.line, this.column, this.scope, hasStep ? "__sliceStep" : "__slice"),
          args,
          false,
          !hasStep
        ).reduce(o);
      } else if (parent !== this.parent || child !== this.child) {
        return AccessNode(
          this.line,
          this.column,
          this.scope,
          parent,
          child
        );
      } else {
        return this;
      }
    };
    _AccessNode_prototype._isNoop = function (o) {
      var _ref;
      if ((_ref = this.__isNoop) == null) {
        return this.__isNoop = this.parent.isNoop(o) && this.child.isNoop(o);
      } else {
        return _ref;
      }
    };
    _AccessNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "AccessNode",
        this.line,
        this.column,
        this.parent,
        this.child
      );
    };
    _AccessNode_prototype.walk = function (f) {
      var child, parent;
      parent = f(this.parent);
      child = f(this.child);
      if (parent !== this.parent || child !== this.child) {
        return AccessNode(
          this.line,
          this.column,
          this.scope,
          parent,
          child
        );
      } else {
        return this;
      }
    };
    _AccessNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.parent, (_once = false, function (_e, parent) {
        var _once2;
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return f(_this.child, (_once2 = false, function (_e2, child) {
          if (_once2) {
            throw Error("Attempted to call function more than once");
          } else {
            _once2 = true;
          }
          if (_e2 != null) {
            return callback(_e2);
          }
          return callback(null, parent !== _this.parent || child !== _this.child
            ? AccessNode(
              _this.line,
              _this.column,
              _this.scope,
              parent,
              child
            )
            : _this);
        }));
      }));
    };
    return AccessNode;
  }(Node));
  Node.AccessMulti = AccessMultiNode = (function (Node) {
    var _AccessMultiNode_prototype, _Node_prototype;
    function AccessMultiNode(line, column, scope, parent, elements) {
      var _i, _this;
      _this = this instanceof AccessMultiNode ? this : __create(_AccessMultiNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(parent instanceof Node)) {
        throw TypeError("Expected parent to be a " + __name(Node) + ", got " + __typeof(parent));
      }
      if (!__isArray(elements)) {
        throw TypeError("Expected elements to be an Array, got " + __typeof(elements));
      } else {
        for (_i = elements.length; _i--; ) {
          if (!(elements[_i] instanceof Node)) {
            throw TypeError("Expected " + ("elements[" + _i + "]") + " to be a " + __name(Node) + ", got " + __typeof(elements[_i]));
          }
        }
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.parent = parent;
      _this.elements = elements;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _AccessMultiNode_prototype = AccessMultiNode.prototype = __create(_Node_prototype);
    _AccessMultiNode_prototype.constructor = AccessMultiNode;
    AccessMultiNode.displayName = "AccessMultiNode";
    if (typeof Node.extended === "function") {
      Node.extended(AccessMultiNode);
    }
    AccessMultiNode.cappedName = "AccessMulti";
    AccessMultiNode.argNames = ["parent", "elements"];
    _AccessMultiNode_prototype.type = function () {
      return Type.array;
    };
    _AccessMultiNode_prototype._reduce = function (o) {
      var _this, parent, result, setParent, tmp, tmpIds;
      _this = this;
      parent = this.parent.reduce(o);
      setParent = parent;
      tmpIds = [];
      if (parent.cacheable) {
        tmp = o.makeTmp(
          o.indexFromPosition(this.line, this.column),
          "ref",
          parent.type(o)
        );
        tmp.scope = this.scope;
        tmpIds.push(tmp.id);
        setParent = AssignNode(
          this.line,
          this.column,
          this.scope,
          tmp,
          "=",
          parent.doWrap(o)
        );
        parent = tmp;
      }
      result = ArrayNode(this.line, this.column, this.scope, (function () {
        var _arr, _arr2, _len, element, j;
        for (_arr = [], _arr2 = __toArray(_this.elements), j = 0, _len = _arr2.length; j < _len; ++j) {
          element = _arr2[j];
          _arr.push(AccessNode(
            _this.line,
            _this.column,
            _this.scope,
            j === 0 ? setParent : parent,
            element.reduce(o)
          ));
        }
        return _arr;
      }()));
      if (tmpIds.length) {
        return TmpWrapperNode(
          this.line,
          this.column,
          this.scope,
          result,
          tmpIds
        );
      } else {
        return result;
      }
    };
    _AccessMultiNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "AccessMultiNode",
        this.line,
        this.column,
        this.parent,
        this.elements
      );
    };
    _AccessMultiNode_prototype.walk = function (f) {
      var elements, parent;
      parent = f(this.parent);
      elements = map(this.elements, f);
      if (parent !== this.parent || elements !== this.elements) {
        return AccessMultiNode(
          this.line,
          this.column,
          this.scope,
          parent,
          elements
        );
      } else {
        return this;
      }
    };
    _AccessMultiNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.parent, (_once = false, function (_e, parent) {
        var _once2;
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return mapAsync(_this.elements, f, (_once2 = false, function (_e2, elements) {
          if (_once2) {
            throw Error("Attempted to call function more than once");
          } else {
            _once2 = true;
          }
          if (_e2 != null) {
            return callback(_e2);
          }
          return callback(null, parent !== _this.parent || elements !== _this.elements
            ? AccessMultiNode(
              _this.line,
              _this.column,
              _this.scope,
              parent,
              elements
            )
            : _this);
        }));
      }));
    };
    return AccessMultiNode;
  }(Node));
  Node.Args = ArgsNode = (function (Node) {
    var _ArgsNode_prototype, _Node_prototype;
    function ArgsNode(line, column, scope) {
      var _this;
      _this = this instanceof ArgsNode ? this : __create(_ArgsNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _ArgsNode_prototype = ArgsNode.prototype = __create(_Node_prototype);
    _ArgsNode_prototype.constructor = ArgsNode;
    ArgsNode.displayName = "ArgsNode";
    if (typeof Node.extended === "function") {
      Node.extended(ArgsNode);
    }
    ArgsNode.cappedName = "Args";
    ArgsNode.argNames = [];
    _ArgsNode_prototype.type = function () {
      return Type.args;
    };
    _ArgsNode_prototype.cacheable = false;
    _ArgsNode_prototype._isNoop = function () {
      return true;
    };
    _ArgsNode_prototype.inspect = function (depth) {
      return inspectHelper(depth, "ArgsNode", this.line, this.column);
    };
    return ArgsNode;
  }(Node));
  Node.Array = ArrayNode = (function (Node) {
    var _ArrayNode_prototype, _Node_prototype;
    function ArrayNode(line, column, scope, elements) {
      var _i, _this;
      _this = this instanceof ArrayNode ? this : __create(_ArrayNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!__isArray(elements)) {
        throw TypeError("Expected elements to be an Array, got " + __typeof(elements));
      } else {
        for (_i = elements.length; _i--; ) {
          if (!(elements[_i] instanceof Node)) {
            throw TypeError("Expected " + ("elements[" + _i + "]") + " to be a " + __name(Node) + ", got " + __typeof(elements[_i]));
          }
        }
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.elements = elements;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _ArrayNode_prototype = ArrayNode.prototype = __create(_Node_prototype);
    _ArrayNode_prototype.constructor = ArrayNode;
    ArrayNode.displayName = "ArrayNode";
    if (typeof Node.extended === "function") {
      Node.extended(ArrayNode);
    }
    ArrayNode.cappedName = "Array";
    ArrayNode.argNames = ["elements"];
    _ArrayNode_prototype.type = function () {
      return Type.array;
    };
    _ArrayNode_prototype._reduce = function (o) {
      var elements;
      elements = map(this.elements, function (x) {
        return x.reduce(o).doWrap(o);
      });
      if (elements !== this.elements) {
        return ArrayNode(this.line, this.column, this.scope, elements);
      } else {
        return this;
      }
    };
    _ArrayNode_prototype._isNoop = function (o) {
      var _arr, _every, _i, _len, _ref, element;
      if ((_ref = this.__isNoop) == null) {
        _every = true;
        for (_arr = __toArray(this.elements), _i = 0, _len = _arr.length; _i < _len; ++_i) {
          element = _arr[_i];
          if (!element.isNoop(o)) {
            _every = false;
            break;
          }
        }
        return this.__isNoop = _every;
      } else {
        return _ref;
      }
    };
    _ArrayNode_prototype.isLiteral = function () {
      var _arr, _every, _i, _len, _ref, element;
      if ((_ref = this._isLiteral) == null) {
        _every = true;
        for (_arr = __toArray(this.elements), _i = 0, _len = _arr.length; _i < _len; ++_i) {
          element = _arr[_i];
          if (!element.isLiteral()) {
            _every = false;
            break;
          }
        }
        return this._isLiteral = _every;
      } else {
        return _ref;
      }
    };
    _ArrayNode_prototype.literalValue = function () {
      var _arr, _arr2, _i, _len, element;
      for (_arr = [], _arr2 = __toArray(this.elements), _i = 0, _len = _arr2.length; _i < _len; ++_i) {
        element = _arr2[_i];
        _arr.push(element.literalValue());
      }
      return _arr;
    };
    _ArrayNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "ArrayNode",
        this.line,
        this.column,
        this.elements
      );
    };
    _ArrayNode_prototype.walk = function (f) {
      var elements;
      elements = map(this.elements, f);
      if (elements !== this.elements) {
        return ArrayNode(this.line, this.column, this.scope, elements);
      } else {
        return this;
      }
    };
    _ArrayNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return mapAsync(this.elements, f, (_once = false, function (_e, elements) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return callback(null, elements !== _this.elements ? ArrayNode(_this.line, _this.column, _this.scope, elements) : _this);
      }));
    };
    return ArrayNode;
  }(Node));
  Node.Assign = AssignNode = (function (Node) {
    var _AssignNode_prototype, _Node_prototype;
    function AssignNode(line, column, scope, left, op, right) {
      var _this;
      _this = this instanceof AssignNode ? this : __create(_AssignNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(left instanceof Node)) {
        throw TypeError("Expected left to be a " + __name(Node) + ", got " + __typeof(left));
      }
      if (typeof op !== "string") {
        throw TypeError("Expected op to be a String, got " + __typeof(op));
      }
      if (!(right instanceof Node)) {
        throw TypeError("Expected right to be a " + __name(Node) + ", got " + __typeof(right));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.left = left;
      _this.op = op;
      _this.right = right;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _AssignNode_prototype = AssignNode.prototype = __create(_Node_prototype);
    _AssignNode_prototype.constructor = AssignNode;
    AssignNode.displayName = "AssignNode";
    if (typeof Node.extended === "function") {
      Node.extended(AssignNode);
    }
    AssignNode.cappedName = "Assign";
    AssignNode.argNames = ["left", "op", "right"];
    _AssignNode_prototype.type = (function () {
      var ops;
      ops = {
        "=": function (left, right) {
          return right;
        },
        "+=": function (left, right) {
          if (left.isSubsetOf(Type.numeric) && right.isSubsetOf(Type.numeric)) {
            return Type.number;
          } else if (left.overlaps(Type.numeric) && right.overlaps(Type.numeric)) {
            return Type.stringOrNumber;
          } else {
            return Type.string;
          }
        },
        "-=": Type.number,
        "*=": Type.number,
        "/=": Type.number,
        "%=": Type.number,
        "<<=": Type.number,
        ">>=": Type.number,
        ">>>=": Type.number,
        "&=": Type.number,
        "^=": Type.number,
        "|=": Type.number
      };
      return function (o) {
        var _ref, _ref2, type;
        if ((_ref = this._type) == null) {
          if (__owns.call(ops, _ref2 = this.op)) {
            type = ops[_ref2];
          }
          if (!type) {
            return this._type = Type.any;
          } else if (typeof type === "function") {
            return this._type = type(this.left.type(o), this.right.type(o));
          } else {
            return this._type = type;
          }
        } else {
          return _ref;
        }
      };
    }());
    _AssignNode_prototype._reduce = function (o) {
      var left, right;
      left = this.left.reduce(o);
      right = this.right.reduce(o).doWrap(o);
      if (left !== this.left || right !== this.right) {
        return AssignNode(
          this.line,
          this.column,
          this.scope,
          left,
          this.op,
          right
        );
      } else {
        return this;
      }
    };
    _AssignNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "AssignNode",
        this.line,
        this.column,
        this.left,
        this.op,
        this.right
      );
    };
    _AssignNode_prototype.walk = function (f) {
      var left, right;
      left = f(this.left);
      right = f(this.right);
      if (left !== this.left || right !== this.right) {
        return AssignNode(
          this.line,
          this.column,
          this.scope,
          left,
          this.op,
          right
        );
      } else {
        return this;
      }
    };
    _AssignNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.left, (_once = false, function (_e, left) {
        var _once2;
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return f(_this.right, (_once2 = false, function (_e2, right) {
          if (_once2) {
            throw Error("Attempted to call function more than once");
          } else {
            _once2 = true;
          }
          if (_e2 != null) {
            return callback(_e2);
          }
          return callback(null, left !== _this.left || right !== _this.right
            ? AssignNode(
              _this.line,
              _this.column,
              _this.scope,
              left,
              _this.op,
              right
            )
            : _this);
        }));
      }));
    };
    return AssignNode;
  }(Node));
  Node.Binary = BinaryNode = (function (Node) {
    var _BinaryNode_prototype, _Node_prototype;
    function BinaryNode(line, column, scope, left, op, right) {
      var _this;
      _this = this instanceof BinaryNode ? this : __create(_BinaryNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(left instanceof Node)) {
        throw TypeError("Expected left to be a " + __name(Node) + ", got " + __typeof(left));
      }
      if (typeof op !== "string") {
        throw TypeError("Expected op to be a String, got " + __typeof(op));
      }
      if (!(right instanceof Node)) {
        throw TypeError("Expected right to be a " + __name(Node) + ", got " + __typeof(right));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.left = left;
      _this.op = op;
      _this.right = right;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _BinaryNode_prototype = BinaryNode.prototype = __create(_Node_prototype);
    _BinaryNode_prototype.constructor = BinaryNode;
    BinaryNode.displayName = "BinaryNode";
    if (typeof Node.extended === "function") {
      Node.extended(BinaryNode);
    }
    BinaryNode.cappedName = "Binary";
    BinaryNode.argNames = ["left", "op", "right"];
    _BinaryNode_prototype.type = (function () {
      var ops;
      ops = {
        "*": Type.number,
        "/": Type.number,
        "%": Type.number,
        "+": function (left, right) {
          if (left.isSubsetOf(Type.numeric) && right.isSubsetOf(Type.numeric)) {
            return Type.number;
          } else if (left.overlaps(Type.numeric) && right.overlaps(Type.numeric)) {
            return Type.stringOrNumber;
          } else {
            return Type.string;
          }
        },
        "-": Type.number,
        "<<": Type.number,
        ">>": Type.number,
        ">>>": Type.number,
        "<": Type.boolean,
        "<=": Type.boolean,
        ">": Type.boolean,
        ">=": Type.boolean,
        "in": Type.boolean,
        "instanceof": Type.boolean,
        "==": Type.boolean,
        "!=": Type.boolean,
        "===": Type.boolean,
        "!==": Type.boolean,
        "&": Type.number,
        "^": Type.number,
        "|": Type.number,
        "&&": function (left, right) {
          return left.intersect(Type.potentiallyFalsy).union(right);
        },
        "||": function (left, right) {
          return left.intersect(Type.potentiallyTruthy).union(right);
        }
      };
      return function (o) {
        var _ref, _ref2, type;
        if ((_ref = this._type) == null) {
          if (__owns.call(ops, _ref2 = this.op)) {
            type = ops[_ref2];
          }
          if (!type) {
            return this._type = Type.any;
          } else if (typeof type === "function") {
            return this._type = type(this.left.type(o), this.right.type(o));
          } else {
            return this._type = type;
          }
        } else {
          return _ref;
        }
      };
    }());
    _BinaryNode_prototype._reduce = (function () {
      var constOps, leftConstOps, nonConstOps, rightConstOps;
      constOps = {
        "*": __curry(2, function (x, y) {
          return x * y;
        }),
        "/": __curry(2, function (x, y) {
          return x / y;
        }),
        "%": __curry(2, function (x, y) {
          return x % y;
        }),
        "+": (function () {
          function isJSNumeric(x) {
            var _ref;
            return x === null || (_ref = typeof x) === "number" || _ref === "boolean" || _ref === "undefined";
          }
          return function (left, right) {
            if (isJSNumeric(left) && isJSNumeric(right)) {
              return left - -right;
            } else {
              return "" + left + right;
            }
          };
        }()),
        "-": __curry(2, function (x, y) {
          return x - y;
        }),
        "<<": __curry(2, function (x, y) {
          return x << y;
        }),
        ">>": __curry(2, function (x, y) {
          return x >> y;
        }),
        ">>>": __curry(2, function (x, y) {
          return x >>> y;
        }),
        "<": __curry(2, function (x, y) {
          return x < y;
        }),
        "<=": __curry(2, function (x, y) {
          return x <= y;
        }),
        ">": __curry(2, function (x, y) {
          return x > y;
        }),
        ">=": __curry(2, function (x, y) {
          return x >= y;
        }),
        "==": __curry(2, function (x, y) {
          return x == y;
        }),
        "!=": __curry(2, function (x, y) {
          return x != y;
        }),
        "===": __curry(2, function (x, y) {
          return x === y;
        }),
        "!==": __curry(2, function (x, y) {
          return x !== y;
        }),
        "&": __curry(2, function (x, y) {
          return x & y;
        }),
        "^": __curry(2, function (x, y) {
          return x ^ y;
        }),
        "|": __curry(2, function (x, y) {
          return x | y;
        }),
        "&&": __curry(2, function (x, y) {
          return x && y;
        }),
        "||": __curry(2, function (x, y) {
          return x || y;
        })
      };
      function leftConstNan(x, y) {
        var _ref;
        if ((_ref = x.constValue()) !== _ref) {
          return BlockNode(this.line, this.column, this.scope, [y, x]);
        }
      }
      leftConstOps = {
        "*": function (x, y) {
          var _ref;
          if (x.constValue() === 1) {
            return UnaryNode(
              this.line,
              this.column,
              this.scope,
              "+",
              y
            );
          } else if (x.constValue() === -1) {
            return UnaryNode(
              this.line,
              this.column,
              this.scope,
              "-",
              y
            );
          } else if ((_ref = x.constValue()) !== _ref) {
            return BlockNode(this.line, this.column, this.scope, [y, x]);
          }
        },
        "/": leftConstNan,
        "%": leftConstNan,
        "+": function (x, y, o) {
          var _ref;
          if (x.constValue() === 0 && y.type(o).isSubsetOf(Type.number)) {
            return UnaryNode(
              this.line,
              this.column,
              this.scope,
              "+",
              y
            );
          } else if (x.constValue() === "" && y.type(o).isSubsetOf(Type.string)) {
            return y;
          } else if (typeof x.constValue() === "string" && y instanceof BinaryNode && y.op === "+" && y.left.isConst() && typeof y.left.constValue() === "string") {
            return BinaryNode(
              this.line,
              this.column,
              this.scope,
              ConstNode(x.line, x.column, this.scope, __strnum(x.constValue()) + __strnum(y.left.constValue())),
              "+",
              y.right
            );
          } else if ((_ref = x.constValue()) !== _ref) {
            return BlockNode(this.line, this.column, this.scope, [y, x]);
          }
        },
        "-": function (x, y) {
          var _ref;
          if (x.constValue() === 0) {
            return UnaryNode(
              this.line,
              this.column,
              this.scope,
              "-",
              y
            );
          } else if ((_ref = x.constValue()) !== _ref) {
            return BlockNode(this.line, this.column, this.scope, [y, x]);
          }
        },
        "<<": leftConstNan,
        ">>": leftConstNan,
        ">>>": leftConstNan,
        "&": leftConstNan,
        "|": leftConstNan,
        "^": leftConstNan,
        "&&": function (x, y) {
          if (x.constValue()) {
            return y;
          } else {
            return x;
          }
        },
        "||": function (x, y) {
          if (x.constValue()) {
            return x;
          } else {
            return y;
          }
        }
      };
      function rightConstNan(x, y) {
        var _ref;
        if ((_ref = y.constValue()) !== _ref) {
          return BlockNode(this.line, this.column, this.scope, [x, y]);
        }
      }
      rightConstOps = {
        "*": function (x, y) {
          var _ref;
          if (y.constValue() === 1) {
            return UnaryNode(
              this.line,
              this.column,
              this.scope,
              "+",
              x
            );
          } else if (y.constValue() === -1) {
            return UnaryNode(
              this.line,
              this.column,
              this.scope,
              "-",
              x
            );
          } else if ((_ref = y.constValue()) !== _ref) {
            return BlockNode(this.line, this.column, this.scope, [x, y]);
          }
        },
        "/": function (x, y) {
          var _ref;
          if (y.constValue() === 1) {
            return UnaryNode(
              this.line,
              this.column,
              this.scope,
              "+",
              x
            );
          } else if (y.constValue() === -1) {
            return UnaryNode(
              this.line,
              this.column,
              this.scope,
              "-",
              x
            );
          } else if ((_ref = y.constValue()) !== _ref) {
            return BlockNode(this.line, this.column, this.scope, [x, y]);
          }
        },
        "%": rightConstNan,
        "+": function (x, y, o) {
          var _ref;
          if (y.constValue() === 0 && x.type(o).isSubsetOf(Type.number)) {
            return UnaryNode(
              this.line,
              this.column,
              this.scope,
              "+",
              x
            );
          } else if (typeof y.constValue() === "number" && __num(y.constValue()) < 0 && x.type(o).isSubsetOf(Type.number)) {
            return BinaryNode(
              this.line,
              this.column,
              this.scope,
              x,
              "-",
              ConstNode(y.line, y.column, this.scope, -__num(y.constValue()))
            );
          } else if (y.constValue() === "" && x.type(o).isSubsetOf(Type.string)) {
            return x;
          } else if (typeof y.constValue() === "string" && x instanceof BinaryNode && x.op === "+" && x.right.isConst() && typeof x.right.constValue() === "string") {
            return BinaryNode(
              this.line,
              this.column,
              this.scope,
              x.left,
              "+",
              ConstNode(x.right.line, x.right.column, this.scope, __strnum(x.right.constValue()) + __strnum(y.constValue()))
            );
          } else if ((_ref = y.constValue()) !== _ref) {
            return BlockNode(this.line, this.column, this.scope, [x, y]);
          }
        },
        "-": function (x, y, o) {
          var _ref;
          if (y.constValue() === 0) {
            return UnaryNode(
              this.line,
              this.column,
              this.scope,
              "+",
              x
            );
          } else if (typeof y.constValue() === "number" && __num(y.constValue()) < 0 && x.type(o).isSubsetOf(Type.number)) {
            return BinaryNode(
              this.line,
              this.column,
              this.scope,
              x,
              "+",
              ConstNode(y.line, y.column, this.scope, -__num(y.constValue()))
            );
          } else if ((_ref = y.constValue()) !== _ref) {
            return BlockNode(this.line, this.column, this.scope, [x, y]);
          }
        },
        "<<": rightConstNan,
        ">>": rightConstNan,
        ">>>": rightConstNan,
        "&": rightConstNan,
        "|": rightConstNan,
        "^": rightConstNan
      };
      nonConstOps = {
        "&&": function (x, y, o) {
          var truthy, xRightType, xType;
          xType = x.type(o);
          if (xType.isSubsetOf(Type.alwaysTruthy)) {
            return BlockNode(this.line, this.column, this.scope, [x, y]);
          } else if (xType.isSubsetOf(Type.alwaysFalsy)) {
            return x;
          } else if (x instanceof BinaryNode && x.op === "&&") {
            if (x.right.isConst()) {
              truthy = !!x.right.constValue();
            } else {
              xRightType = x.right.type(o);
              if (xRightType.isSubsetOf(Type.alwaysTruthy)) {
                truthy = true;
              } else if (xRightType.isSubsetOf(Type.alwaysFalsy)) {
                truthy = false;
              } else {
                truthy = null;
              }
            }
            if (truthy === true) {
              return BinaryNode(
                this.line,
                this.column,
                this.scope,
                x.left,
                "&&",
                BlockNode(x.right.line, x.right.column, this.scope, [x.right, y])
              );
            } else if (truthy === false) {
              return x;
            }
          }
        },
        "||": function (x, y, o) {
          var test, truthy, whenTrue, xRightType, xType;
          xType = x.type(o);
          if (xType.isSubsetOf(Type.alwaysTruthy)) {
            return x;
          } else if (xType.isSubsetOf(Type.alwaysFalsy)) {
            return BlockNode(this.line, this.column, this.scope, [x, y]);
          } else if (x instanceof BinaryNode && x.op === "||") {
            if (x.right.isConst()) {
              truthy = !!x.right.constValue();
            } else {
              xRightType = x.right.type(o);
              if (xRightType.isSubsetOf(Type.alwaysTruthy)) {
                truthy = true;
              } else if (xRightType.isSubsetOf(Type.alwaysFalsy)) {
                truthy = false;
              } else {
                truthy = null;
              }
            }
            if (truthy === true) {
              return x;
            } else if (truthy === false) {
              return BinaryNode(
                this.line,
                this.column,
                this.scope,
                x.left,
                "||",
                BlockNode(x.right.line, x.right.column, this.scope, [x.right, y])
              );
            }
          } else if (x instanceof IfNode && x.whenFalse.isConst() && !x.whenFalse.constValue()) {
            test = x.test;
            whenTrue = x.whenTrue;
            while (whenTrue instanceof IfNode && whenTrue.whenFalse.isConst() && !whenTrue.whenFalse.constValue()) {
              test = BinaryNode(
                x.line,
                x.column,
                x.scope,
                test,
                "&&",
                whenTrue.test
              );
              whenTrue = whenTrue.whenTrue;
            }
            return BinaryNode(
              this.line,
              this.column,
              this.scope,
              BinaryNode(
                x.line,
                x.column,
                x.scope,
                test,
                "&&",
                whenTrue
              ),
              "||",
              y
            );
          }
        }
      };
      return function (o) {
        var _ref, left, op, right;
        left = this.left.reduce(o).doWrap(o);
        right = this.right.reduce(o).doWrap(o);
        op = this.op;
        if (left.isConst()) {
          if (right.isConst() && __owns.call(constOps, op)) {
            return ConstNode(this.line, this.column, this.scope, constOps[op](left.constValue(), right.constValue()));
          }
          if (__owns.call(leftConstOps, op) && (_ref = leftConstOps[op].call(this, left, right, o)) != null) {
            return _ref;
          }
        }
        if (right.isConst() && __owns.call(rightConstOps, op) && (_ref = rightConstOps[op].call(this, left, right, o)) != null) {
          return _ref;
        }
        if (__owns.call(nonConstOps, op) && (_ref = nonConstOps[op].call(this, left, right, o)) != null) {
          return _ref;
        }
        if (left !== this.left || right !== this.right) {
          return BinaryNode(
            this.line,
            this.column,
            this.scope,
            left,
            op,
            right
          );
        } else {
          return this;
        }
      };
    }());
    _BinaryNode_prototype._isNoop = function (o) {
      var _ref;
      if ((_ref = this.__isNoop) == null) {
        return this.__isNoop = this.left.isNoop(o) && this.right.isNoop(o);
      } else {
        return _ref;
      }
    };
    _BinaryNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "BinaryNode",
        this.line,
        this.column,
        this.left,
        this.op,
        this.right
      );
    };
    _BinaryNode_prototype.walk = function (f) {
      var left, right;
      left = f(this.left);
      right = f(this.right);
      if (left !== this.left || right !== this.right) {
        return BinaryNode(
          this.line,
          this.column,
          this.scope,
          left,
          this.op,
          right
        );
      } else {
        return this;
      }
    };
    _BinaryNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.left, (_once = false, function (_e, left) {
        var _once2;
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return f(_this.right, (_once2 = false, function (_e2, right) {
          if (_once2) {
            throw Error("Attempted to call function more than once");
          } else {
            _once2 = true;
          }
          if (_e2 != null) {
            return callback(_e2);
          }
          return callback(null, left !== _this.left || right !== _this.right
            ? BinaryNode(
              _this.line,
              _this.column,
              _this.scope,
              left,
              _this.op,
              right
            )
            : _this);
        }));
      }));
    };
    return BinaryNode;
  }(Node));
  Node.Block = BlockNode = (function (Node) {
    var _BlockNode_prototype, _Node_prototype;
    function BlockNode(line, column, scope, nodes, label) {
      var _i, _this;
      _this = this instanceof BlockNode ? this : __create(_BlockNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!__isArray(nodes)) {
        throw TypeError("Expected nodes to be an Array, got " + __typeof(nodes));
      } else {
        for (_i = nodes.length; _i--; ) {
          if (!(nodes[_i] instanceof Node)) {
            throw TypeError("Expected " + ("nodes[" + _i + "]") + " to be a " + __name(Node) + ", got " + __typeof(nodes[_i]));
          }
        }
      }
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.nodes = nodes;
      _this.label = label;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _BlockNode_prototype = BlockNode.prototype = __create(_Node_prototype);
    _BlockNode_prototype.constructor = BlockNode;
    BlockNode.displayName = "BlockNode";
    if (typeof Node.extended === "function") {
      Node.extended(BlockNode);
    }
    BlockNode.cappedName = "Block";
    BlockNode.argNames = ["nodes", "label"];
    _BlockNode_prototype.type = function (o) {
      var nodes;
      nodes = this.nodes;
      if (nodes.length === 0) {
        return Type["undefined"];
      } else {
        return nodes[__num(nodes.length) - 1].type(o);
      }
    };
    _BlockNode_prototype.withLabel = function (label, o) {
      var _ref, _this;
      _this = this;
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      if (this.label == null) {
        if (this.nodes.length === 1) {
          return this.nodes[0].withLabel(label, o);
        } else if (__num(this.nodes.length) > 1 && (_ref = this.nodes)[__num(_ref.length) - 1] instanceof ForInNode && (function () {
          var _arr, _end, _every, _i, _len, node;
          _every = true;
          for (_arr = __toArray(_this.nodes), _i = 0, _len = _arr.length, _end = -1, _end += _len, _end > _len && (_end = _len); _i < _end; ++_i) {
            node = _arr[_i];
            if (!(node instanceof AssignNode) && !(node instanceof VarNode)) {
              _every = false;
              break;
            }
          }
          return _every;
        }())) {
          return BlockNode(this.line, this.column, this.scope, __slice.call(this.nodes, 0, -1).concat([(_ref = this.nodes)[__num(_ref.length) - 1].withLabel(label, o)]));
        }
      }
      return BlockNode(
        this.line,
        this.column,
        this.scope,
        this.nodes,
        label
      );
    };
    _BlockNode_prototype._reduce = function (o) {
      var _arr, body, changed, i, label, len, node, reduced;
      changed = false;
      body = [];
      for (_arr = __toArray(this.nodes), i = 0, len = _arr.length; i < len; ++i) {
        node = _arr[i];
        reduced = node.reduce(o);
        if (reduced instanceof BlockNode && reduced.label == null) {
          body.push.apply(body, __toArray(reduced.nodes));
          changed = true;
        } else if (reduced instanceof NothingNode) {
          changed = true;
        } else if (reduced instanceof BreakNode || reduced instanceof ContinueNode || reduced instanceof ThrowNode || reduced instanceof ReturnNode) {
          body.push(reduced);
          if (reduced !== node || i < len - 1) {
            changed = true;
          }
          break;
        } else {
          body.push(reduced);
          if (reduced !== node) {
            changed = true;
          }
        }
      }
      if (this.label != null) {
        label = this.label.reduce(o);
      } else {
        label = this.label;
      }
      if (body.length === 0) {
        return NothingNode(this.line, this.column, this.scope);
      } else if (label == null && body.length === 1) {
        return body[0];
      } else if (changed || label !== this.label) {
        return BlockNode(
          this.line,
          this.column,
          this.scope,
          body,
          label
        );
      } else {
        return this;
      }
    };
    _BlockNode_prototype.isStatement = function () {
      var _arr, _i, _some, node;
      _some = false;
      for (_arr = __toArray(this.nodes), _i = _arr.length; _i--; ) {
        node = _arr[_i];
        if (node.isStatement()) {
          _some = true;
          break;
        }
      }
      return _some;
    };
    _BlockNode_prototype._isNoop = function (o) {
      var _arr, _every, _i, _ref, node;
      if ((_ref = this.__isNoop) == null) {
        _every = true;
        for (_arr = __toArray(this.nodes), _i = _arr.length; _i--; ) {
          node = _arr[_i];
          if (!node.isNoop(o)) {
            _every = false;
            break;
          }
        }
        return this.__isNoop = _every;
      } else {
        return _ref;
      }
    };
    _BlockNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "BlockNode",
        this.line,
        this.column,
        this.nodes,
        this.label
      );
    };
    _BlockNode_prototype.walk = function (f) {
      var label, nodes;
      nodes = map(this.nodes, f);
      if (this.label instanceof Node) {
        label = f(this.label);
      } else {
        label = this.label;
      }
      if (nodes !== this.nodes || label !== this.label) {
        return BlockNode(
          this.line,
          this.column,
          this.scope,
          nodes,
          label
        );
      } else {
        return this;
      }
    };
    _BlockNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return mapAsync(this.nodes, f, (_once = false, function (_e, nodes) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return (_this.label instanceof Node
          ? function (next) {
            var _once2;
            return f(_this.label, (_once2 = false, function (_e2, label) {
              if (_once2) {
                throw Error("Attempted to call function more than once");
              } else {
                _once2 = true;
              }
              if (_e2 != null) {
                return callback(_e2);
              }
              return next(label);
            }));
          }
          : function (next) {
            return next(_this.label);
          })(function (label) {
          return callback(null, nodes !== _this.nodes || label !== _this.label
            ? BlockNode(
              _this.line,
              _this.column,
              _this.scope,
              nodes,
              label
            )
            : _this);
        });
      }));
    };
    return BlockNode;
  }(Node));
  Node.Break = BreakNode = (function (Node) {
    var _BreakNode_prototype, _Node_prototype;
    function BreakNode(line, column, scope, label) {
      var _this;
      _this = this instanceof BreakNode ? this : __create(_BreakNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.label = label;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _BreakNode_prototype = BreakNode.prototype = __create(_Node_prototype);
    _BreakNode_prototype.constructor = BreakNode;
    BreakNode.displayName = "BreakNode";
    if (typeof Node.extended === "function") {
      Node.extended(BreakNode);
    }
    BreakNode.cappedName = "Break";
    BreakNode.argNames = ["label"];
    _BreakNode_prototype.type = function () {
      return Type["undefined"];
    };
    _BreakNode_prototype.isStatement = function () {
      return true;
    };
    _BreakNode_prototype.withLabel = function (label) {
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      return BreakNode(this.line, this.column, this.scope, label);
    };
    _BreakNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "BreakNode",
        this.line,
        this.column,
        this.label
      );
    };
    _BreakNode_prototype.walk = function (f) {
      var label;
      if (this.label instanceof Node) {
        label = f(this.label);
      } else {
        label = this.label;
      }
      if (label !== this.label) {
        return BreakNode(this.line, this.column, this.scope, label);
      } else {
        return this;
      }
    };
    _BreakNode_prototype.walkAsync = function (f, callback) {
      var _this;
      _this = this;
      return (this.label instanceof Node
        ? function (next) {
          var _once;
          return f(_this.label, (_once = false, function (_e, label) {
            if (_once) {
              throw Error("Attempted to call function more than once");
            } else {
              _once = true;
            }
            if (_e != null) {
              return callback(_e);
            }
            return next(label);
          }));
        }
        : function (next) {
          return next(_this.label);
        })(function (label) {
        return callback(null, label !== _this.label ? BreakNode(_this.line, _this.column, _this.scope, label) : _this);
      });
    };
    return BreakNode;
  }(Node));
  Node.Call = CallNode = (function (Node) {
    var _CallNode_prototype, _Node_prototype;
    function CallNode(line, column, scope, func, args, isNew, isApply) {
      var _i, _this;
      _this = this instanceof CallNode ? this : __create(_CallNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(func instanceof Node)) {
        throw TypeError("Expected func to be a " + __name(Node) + ", got " + __typeof(func));
      }
      if (!__isArray(args)) {
        throw TypeError("Expected args to be an Array, got " + __typeof(args));
      } else {
        for (_i = args.length; _i--; ) {
          if (!(args[_i] instanceof Node)) {
            throw TypeError("Expected " + ("args[" + _i + "]") + " to be a " + __name(Node) + ", got " + __typeof(args[_i]));
          }
        }
      }
      if (isNew == null) {
        isNew = false;
      } else if (typeof isNew !== "boolean") {
        throw TypeError("Expected isNew to be a Boolean, got " + __typeof(isNew));
      }
      if (isApply == null) {
        isApply = false;
      } else if (typeof isApply !== "boolean") {
        throw TypeError("Expected isApply to be a Boolean, got " + __typeof(isApply));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.func = func;
      _this.args = args;
      _this.isNew = isNew;
      _this.isApply = isApply;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _CallNode_prototype = CallNode.prototype = __create(_Node_prototype);
    _CallNode_prototype.constructor = CallNode;
    CallNode.displayName = "CallNode";
    if (typeof Node.extended === "function") {
      Node.extended(CallNode);
    }
    CallNode.cappedName = "Call";
    CallNode.argNames = ["func", "args", "isNew", "isApply"];
    _CallNode_prototype.type = (function () {
      var PRIMORDIAL_FUNCTIONS, PRIMORDIAL_METHODS, PRIMORDIAL_SUBFUNCTIONS;
      PRIMORDIAL_FUNCTIONS = {
        Object: Type.object,
        String: Type.string,
        Number: Type.number,
        Boolean: Type.boolean,
        Function: Type["function"],
        Array: Type.array,
        Date: Type.string,
        RegExp: Type.regexp,
        Error: Type.error,
        RangeError: Type.error,
        ReferenceError: Type.error,
        SyntaxError: Type.error,
        TypeError: Type.error,
        URIError: Type.error,
        escape: Type.string,
        unescape: Type.string,
        parseInt: Type.number,
        parseFloat: Type.number,
        isNaN: Type.boolean,
        isFinite: Type.boolean,
        decodeURI: Type.string,
        decodeURIComponent: Type.string,
        encodeURI: Type.string,
        encodeURIComponent: Type.string
      };
      PRIMORDIAL_SUBFUNCTIONS = {
        Object: {
          getPrototypeOf: Type.object,
          getOwnPropertyDescriptor: Type.object,
          getOwnPropertyNames: Type.string.array(),
          create: Type.object,
          defineProperty: Type.object,
          defineProperties: Type.object,
          seal: Type.object,
          freeze: Type.object,
          preventExtensions: Type.object,
          isSealed: Type.boolean,
          isFrozen: Type.boolean,
          isExtensible: Type.boolean,
          keys: Type.string.array()
        },
        String: { fromCharCode: Type.string },
        Number: { isFinite: Type.boolean, isNaN: Type.boolean },
        Array: { isArray: Type.boolean },
        Math: {
          abs: Type.number,
          acos: Type.number,
          asin: Type.number,
          atan: Type.number,
          atan2: Type.number,
          ceil: Type.number,
          cos: Type.number,
          exp: Type.number,
          floor: Type.number,
          log: Type.number,
          max: Type.number,
          min: Type.number,
          pow: Type.number,
          random: Type.number,
          round: Type.number,
          sin: Type.number,
          sqrt: Type.number,
          tan: Type.number
        },
        JSON: { stringify: Type.string.union(Type["undefined"]), parse: Type.string.union(Type.number).union(Type.boolean).union(Type["null"]).union(Type.array).union(Type.object) },
        Date: { UTC: Type.number, now: Type.number }
      };
      PRIMORDIAL_METHODS = {
        String: {
          toString: Type.string,
          valueOf: Type.string,
          charAt: Type.string,
          charCodeAt: Type.number,
          concat: Type.string,
          indexOf: Type.number,
          lastIndexOf: Type.number,
          localeCompare: Type.number,
          match: Type.array.union(Type["null"]),
          replace: Type.string,
          search: Type.number,
          slice: Type.string,
          split: Type.string.array(),
          substring: Type.string,
          toLowerCase: Type.string,
          toLocaleLowerCase: Type.string,
          toUpperCase: Type.string,
          toLocaleUpperCase: Type.string,
          trim: Type.string
        },
        Boolean: { toString: Type.string, valueOf: Type.boolean },
        Number: {
          toString: Type.string,
          valueOf: Type.number,
          toLocaleString: Type.string,
          toFixed: Type.string,
          toExponential: Type.string,
          toPrecision: Type.string
        },
        Date: {
          toString: Type.string,
          toDateString: Type.string,
          toTimeString: Type.string,
          toLocaleString: Type.string,
          toLocaleDateString: Type.string,
          toLocaleTimeString: Type.string,
          valueOf: Type.number,
          getTime: Type.number,
          getFullYear: Type.number,
          getUTCFullYear: Type.number,
          getMonth: Type.number,
          getUTCMonth: Type.number,
          getDate: Type.number,
          getUTCDate: Type.number,
          getDay: Type.number,
          getUTCDay: Type.number,
          getHours: Type.number,
          getUTCHours: Type.number,
          getMinutes: Type.number,
          getUTCMinutes: Type.number,
          getSeconds: Type.number,
          getUTCSeconds: Type.number,
          getMilliseconds: Type.number,
          getUTCMilliseconds: Type.number,
          getTimezoneOffset: Type.number,
          setTime: Type.number,
          setMilliseconds: Type.number,
          setUTCMilliseconds: Type.number,
          setSeconds: Type.number,
          setUTCSeconds: Type.number,
          setMinutes: Type.number,
          setUTCMinutes: Type.number,
          setHours: Type.number,
          setUTCHours: Type.number,
          setDate: Type.number,
          setUTCDate: Type.number,
          setMonth: Type.number,
          setUTCMonth: Type.number,
          setFullYear: Type.number,
          setUTCFullYear: Type.number,
          toUTCString: Type.string,
          toISOString: Type.string,
          toJSON: Type.string
        },
        RegExp: { exec: Type.array.union(Type["null"]), test: Type.boolean, toString: Type.string },
        Error: { toString: Type.string }
      };
      return function (o) {
        var _ref, _this;
        _this = this;
        if ((_ref = this._type) == null) {
          return this._type = (function () {
            var _ref, _ref2, _ref3, _ref4, child, func, funcType, name, parent,
                parentType;
            func = _this.func;
            funcType = func.type(o);
            if (funcType.isSubsetOf(Type["function"])) {
              return funcType.args[0];
            } else if (func instanceof IdentNode) {
              name = func.name;
              if (__owns.call(PRIMORDIAL_FUNCTIONS, name)) {
                return PRIMORDIAL_FUNCTIONS[name];
              } else if (o != null ? o.macros.hasHelper(name) : void 0) {
                funcType = o.macros.helperType(name);
                if (funcType.isSubsetOf(Type["function"])) {
                  return funcType.args[0];
                }
              }
            } else if (func instanceof AccessNode) {
              parent = func.parent;
              child = func.child;
              if (child instanceof ConstNode) {
                if ((_ref = child.value) === "call" || _ref === "apply") {
                  parentType = parent.type(o);
                  if (parentType.isSubsetOf(Type["function"])) {
                    return parentType.args[0];
                  }
                } else if (parent instanceof IdentNode && __owns.call(PRIMORDIAL_SUBFUNCTIONS, _ref = parent.name) && __owns.call(_ref2 = PRIMORDIAL_SUBFUNCTIONS[_ref], _ref3 = child.value) && (_ref4 = _ref2[_ref3]) != null) {
                  return _ref4;
                }
              }
            }
            return Type.any;
          }());
        } else {
          return _ref;
        }
      };
    }());
    _CallNode_prototype._reduce = (function () {
      var PURE_PRIMORDIAL_FUNCTIONS, PURE_PRIMORDIAL_SUBFUNCTIONS;
      PURE_PRIMORDIAL_FUNCTIONS = {
        escape: true,
        unescape: true,
        parseInt: true,
        parseFloat: true,
        isNaN: true,
        isFinite: true,
        decodeURI: true,
        decodeURIComponent: true,
        encodeURI: true,
        encodeURIComponent: true,
        String: true,
        Boolean: true,
        Number: true,
        RegExp: true
      };
      PURE_PRIMORDIAL_SUBFUNCTIONS = {
        String: { fromCharCode: true },
        Number: { isFinite: true, isNaN: true },
        Math: {
          abs: true,
          acos: true,
          asin: true,
          atan: true,
          atan2: true,
          ceil: true,
          cos: true,
          exp: true,
          floor: true,
          log: true,
          max: true,
          min: true,
          pow: true,
          round: true,
          sin: true,
          sqrt: true,
          tan: true
        },
        JSON: { parse: true, stringify: true }
      };
      return function (o) {
        var _arr, _i, _len, _ref, _ref2, _ref3, allConst, arg, args, child,
            constArgs, cValue, func, parent, pValue, value;
        func = this.func.reduce(o).doWrap(o);
        args = map(this.args, function (node) {
          return node.reduce(o).doWrap(o);
        });
        if (!this.isNew && !this.isApply) {
          constArgs = [];
          allConst = true;
          for (_arr = __toArray(args), _i = 0, _len = _arr.length; _i < _len; ++_i) {
            arg = _arr[_i];
            if (arg.isConst()) {
              constArgs.push(arg.constValue());
            } else {
              allConst = false;
              break;
            }
          }
          if (allConst) {
            if (func instanceof IdentNode) {
              if (__owns.call(PURE_PRIMORDIAL_FUNCTIONS, func.name)) {
                try {
                  value = GLOBAL[func.name].apply(void 0, __toArray(constArgs));
                  return ConstNode(this.line, this.column, this.scope, value);
                } catch (e) {}
              }
            } else if (func instanceof AccessNode && func.child.isConst()) {
              parent = func.parent;
              child = func.child;
              cValue = child.constValue();
              if (parent.isConst()) {
                pValue = parent.constValue();
                if (typeof pValue[cValue] === "function") {
                  try {
                    value = pValue[cValue].apply(pValue, __toArray(constArgs));
                    return ConstNode(this.line, this.column, this.scope, value);
                  } catch (e) {}
                }
              } else if (parent instanceof IdentNode && (__owns.call(PURE_PRIMORDIAL_SUBFUNCTIONS, _ref = parent.name) && __owns.call(_ref2 = PURE_PRIMORDIAL_SUBFUNCTIONS[_ref], _ref3 = child.value) ? _ref2[_ref3] : void 0)) {
                try {
                  value = (_ref = GLOBAL[parent.name])[cValue].apply(_ref, __toArray(constArgs));
                  return ConstNode(this.line, this.column, this.scope, value);
                } catch (e) {}
              }
            }
          }
        }
        if (func !== this.func || args !== this.args) {
          return CallNode(
            this.line,
            this.column,
            this.scope,
            func,
            args,
            this.isNew,
            this.isApply
          );
        } else {
          return this;
        }
      };
    }());
    _CallNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "CallNode",
        this.line,
        this.column,
        this.func,
        this.args,
        this.isNew,
        this.isApply
      );
    };
    _CallNode_prototype.walk = function (f) {
      var args, func;
      func = f(this.func);
      args = map(this.args, f);
      if (func !== this.func || args !== this.args) {
        return CallNode(
          this.line,
          this.column,
          this.scope,
          func,
          args,
          this.isNew,
          this.isApply
        );
      } else {
        return this;
      }
    };
    _CallNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.func, (_once = false, function (_e, func) {
        var _once2;
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return mapAsync(_this.args, f, (_once2 = false, function (_e2, args) {
          if (_once2) {
            throw Error("Attempted to call function more than once");
          } else {
            _once2 = true;
          }
          if (_e2 != null) {
            return callback(_e2);
          }
          return callback(null, func !== _this.func || args !== _this.args
            ? CallNode(
              _this.line,
              _this.column,
              _this.scope,
              func,
              args,
              _this.isNew,
              _this.isApply
            )
            : _this);
        }));
      }));
    };
    return CallNode;
  }(Node));
  Node.Cascade = CascadeNode = (function (Node) {
    var _CascadeNode_prototype, _Node_prototype;
    function CascadeNode(line, column, scope, node, cascades) {
      var _this;
      _this = this instanceof CascadeNode ? this : __create(_CascadeNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(node instanceof Node)) {
        throw TypeError("Expected node to be a " + __name(Node) + ", got " + __typeof(node));
      }
      if (!__isArray(cascades)) {
        throw TypeError("Expected cascades to be an Array, got " + __typeof(cascades));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.node = node;
      _this.cascades = cascades;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _CascadeNode_prototype = CascadeNode.prototype = __create(_Node_prototype);
    _CascadeNode_prototype.constructor = CascadeNode;
    CascadeNode.displayName = "CascadeNode";
    if (typeof Node.extended === "function") {
      Node.extended(CascadeNode);
    }
    CascadeNode.cappedName = "Cascade";
    CascadeNode.argNames = ["node", "cascades"];
    _CascadeNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "CascadeNode",
        this.line,
        this.column,
        this.node,
        this.cascades
      );
    };
    _CascadeNode_prototype.walk = function (f) {
      var node;
      node = f(this.node);
      if (node !== this.node) {
        return CascadeNode(
          this.line,
          this.column,
          this.scope,
          node,
          this.cascades
        );
      } else {
        return this;
      }
    };
    _CascadeNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.node, (_once = false, function (_e, node) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return callback(null, node !== _this.node
          ? CascadeNode(
            _this.line,
            _this.column,
            _this.scope,
            node,
            _this.cascades
          )
          : _this);
      }));
    };
    return CascadeNode;
  }(Node));
  Node.Comment = CommentNode = (function (Node) {
    var _CommentNode_prototype, _Node_prototype;
    function CommentNode(line, column, scope, text) {
      var _this;
      _this = this instanceof CommentNode ? this : __create(_CommentNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (typeof text !== "string") {
        throw TypeError("Expected text to be a String, got " + __typeof(text));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.text = text;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _CommentNode_prototype = CommentNode.prototype = __create(_Node_prototype);
    _CommentNode_prototype.constructor = CommentNode;
    CommentNode.displayName = "CommentNode";
    if (typeof Node.extended === "function") {
      Node.extended(CommentNode);
    }
    CommentNode.cappedName = "Comment";
    CommentNode.argNames = ["text"];
    _CommentNode_prototype.type = function () {
      return Type["undefined"];
    };
    _CommentNode_prototype.cacheable = false;
    _CommentNode_prototype.isConst = function () {
      return true;
    };
    _CommentNode_prototype.constValue = function () {
      return;
    };
    _CommentNode_prototype._isNoop = function () {
      return true;
    };
    _CommentNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "CommentNode",
        this.line,
        this.column,
        this.text
      );
    };
    _CommentNode_prototype.walk = function (f) {
      return this;
    };
    _CommentNode_prototype.walkAsync = function (f, callback) {
      return callback(null, this);
    };
    return CommentNode;
  }(Node));
  Node.Const = ConstNode = (function (Node) {
    var _ConstNode_prototype, _Node_prototype;
    function ConstNode(line, column, scope, value) {
      var _this;
      _this = this instanceof ConstNode ? this : __create(_ConstNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (value != null && typeof value !== "number" && typeof value !== "string" && typeof value !== "boolean") {
        throw TypeError("Expected value to be one of Number or String or Boolean or undefined or null, got " + __typeof(value));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.value = value;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _ConstNode_prototype = ConstNode.prototype = __create(_Node_prototype);
    _ConstNode_prototype.constructor = ConstNode;
    ConstNode.displayName = "ConstNode";
    if (typeof Node.extended === "function") {
      Node.extended(ConstNode);
    }
    ConstNode.cappedName = "Const";
    ConstNode.argNames = ["value"];
    _ConstNode_prototype.type = function () {
      var value;
      value = this.value;
      if (value === null) {
        return Type["null"];
      } else {
        switch (typeof value) {
        case "number": return Type.number;
        case "string": return Type.string;
        case "boolean": return Type.boolean;
        case "undefined": return Type["undefined"];
        default: throw Error("Unknown type for " + String(value));
        }
      }
    };
    _ConstNode_prototype.cacheable = false;
    _ConstNode_prototype.isConst = function () {
      return true;
    };
    _ConstNode_prototype.constValue = function () {
      return this.value;
    };
    _ConstNode_prototype.isConstType = function (type) {
      return type === typeof this.value;
    };
    _ConstNode_prototype.isConstValue = function (value) {
      return value === this.value;
    };
    _ConstNode_prototype._isNoop = function () {
      return true;
    };
    _ConstNode_prototype.inspect = function (depth) {
      return "ConstNode(" + __strnum(inspect(this.value, null, depth != null ? __num(depth) - 1 : null)) + ")";
    };
    _ConstNode_prototype.walk = function (f) {
      return this;
    };
    _ConstNode_prototype.walkAsync = function (f, callback) {
      return callback(null, this);
    };
    return ConstNode;
  }(Node));
  Node.Continue = ContinueNode = (function (Node) {
    var _ContinueNode_prototype, _Node_prototype;
    function ContinueNode(line, column, scope, label) {
      var _this;
      _this = this instanceof ContinueNode ? this : __create(_ContinueNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.label = label;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _ContinueNode_prototype = ContinueNode.prototype = __create(_Node_prototype);
    _ContinueNode_prototype.constructor = ContinueNode;
    ContinueNode.displayName = "ContinueNode";
    if (typeof Node.extended === "function") {
      Node.extended(ContinueNode);
    }
    ContinueNode.cappedName = "Continue";
    ContinueNode.argNames = ["label"];
    _ContinueNode_prototype.type = function () {
      return Type["undefined"];
    };
    _ContinueNode_prototype.isStatement = function () {
      return true;
    };
    _ContinueNode_prototype.withLabel = function (label) {
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      return ContinueNode(this.line, this.column, this.scope, label);
    };
    _ContinueNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "ContinueNode",
        this.line,
        this.column,
        this.label
      );
    };
    _ContinueNode_prototype.walk = function (f) {
      var label;
      if (this.label instanceof Node) {
        label = f(this.label);
      } else {
        label = this.label;
      }
      if (label !== this.label) {
        return ContinueNode(this.line, this.column, this.scope, label);
      } else {
        return this;
      }
    };
    _ContinueNode_prototype.walkAsync = function (f, callback) {
      var _this;
      _this = this;
      return (this.label instanceof Node
        ? function (next) {
          var _once;
          return f(_this.label, (_once = false, function (_e, label) {
            if (_once) {
              throw Error("Attempted to call function more than once");
            } else {
              _once = true;
            }
            if (_e != null) {
              return callback(_e);
            }
            return next(label);
          }));
        }
        : function (next) {
          return next(_this.label);
        })(function (label) {
        return callback(null, label !== _this.label ? ContinueNode(_this.line, _this.column, _this.scope, label) : _this);
      });
    };
    return ContinueNode;
  }(Node));
  Node.Debugger = DebuggerNode = (function (Node) {
    var _DebuggerNode_prototype, _Node_prototype;
    function DebuggerNode(line, column, scope) {
      var _this;
      _this = this instanceof DebuggerNode ? this : __create(_DebuggerNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _DebuggerNode_prototype = DebuggerNode.prototype = __create(_Node_prototype);
    _DebuggerNode_prototype.constructor = DebuggerNode;
    DebuggerNode.displayName = "DebuggerNode";
    if (typeof Node.extended === "function") {
      Node.extended(DebuggerNode);
    }
    DebuggerNode.cappedName = "Debugger";
    DebuggerNode.argNames = [];
    _DebuggerNode_prototype.type = function () {
      return Type["undefined"];
    };
    _DebuggerNode_prototype.isStatement = function () {
      return true;
    };
    _DebuggerNode_prototype.inspect = function (depth) {
      return inspectHelper(depth, "DebuggerNode", this.line, this.column);
    };
    return DebuggerNode;
  }(Node));
  Node.Def = DefNode = (function (Node) {
    var _DefNode_prototype, _Node_prototype;
    function DefNode(line, column, scope, left, right) {
      var _this;
      _this = this instanceof DefNode ? this : __create(_DefNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(left instanceof Node)) {
        throw TypeError("Expected left to be a " + __name(Node) + ", got " + __typeof(left));
      }
      if (right == null) {
        right = void 0;
      } else if (!(right instanceof Node)) {
        throw TypeError("Expected right to be one of " + (__name(Node) + " or undefined") + ", got " + __typeof(right));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.left = left;
      _this.right = right;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _DefNode_prototype = DefNode.prototype = __create(_Node_prototype);
    _DefNode_prototype.constructor = DefNode;
    DefNode.displayName = "DefNode";
    if (typeof Node.extended === "function") {
      Node.extended(DefNode);
    }
    DefNode.cappedName = "Def";
    DefNode.argNames = ["left", "right"];
    _DefNode_prototype.type = function (o) {
      if (this.right != null) {
        return this.right.type(o);
      } else {
        return Type.any;
      }
    };
    _DefNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "DefNode",
        this.line,
        this.column,
        this.left,
        this.right
      );
    };
    _DefNode_prototype.walk = function (f) {
      var left, right;
      left = f(this.left);
      if (this.right instanceof Node) {
        right = f(this.right);
      } else {
        right = this.right;
      }
      if (left !== this.left || right !== this.right) {
        return DefNode(
          this.line,
          this.column,
          this.scope,
          left,
          right
        );
      } else {
        return this;
      }
    };
    _DefNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.left, (_once = false, function (_e, left) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return (_this.right instanceof Node
          ? function (next) {
            var _once2;
            return f(_this.right, (_once2 = false, function (_e2, right) {
              if (_once2) {
                throw Error("Attempted to call function more than once");
              } else {
                _once2 = true;
              }
              if (_e2 != null) {
                return callback(_e2);
              }
              return next(right);
            }));
          }
          : function (next) {
            return next(_this.right);
          })(function (right) {
          return callback(null, left !== _this.left || right !== _this.right
            ? DefNode(
              _this.line,
              _this.column,
              _this.scope,
              left,
              right
            )
            : _this);
        });
      }));
    };
    return DefNode;
  }(Node));
  Node.EmbedWrite = EmbedWriteNode = (function (Node) {
    var _EmbedWriteNode_prototype, _Node_prototype;
    function EmbedWriteNode(line, column, scope, text, escape) {
      var _this;
      _this = this instanceof EmbedWriteNode ? this : __create(_EmbedWriteNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(text instanceof Node)) {
        throw TypeError("Expected text to be a " + __name(Node) + ", got " + __typeof(text));
      }
      if (escape == null) {
        escape = false;
      } else if (typeof escape !== "boolean") {
        throw TypeError("Expected escape to be a Boolean, got " + __typeof(escape));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.text = text;
      _this.escape = escape;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _EmbedWriteNode_prototype = EmbedWriteNode.prototype = __create(_Node_prototype);
    _EmbedWriteNode_prototype.constructor = EmbedWriteNode;
    EmbedWriteNode.displayName = "EmbedWriteNode";
    if (typeof Node.extended === "function") {
      Node.extended(EmbedWriteNode);
    }
    EmbedWriteNode.cappedName = "EmbedWrite";
    EmbedWriteNode.argNames = ["text", "escape"];
    _EmbedWriteNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "EmbedWriteNode",
        this.line,
        this.column,
        this.text,
        this.escape
      );
    };
    _EmbedWriteNode_prototype.walk = function (f) {
      var text;
      text = f(this.text);
      if (text !== this.text) {
        return EmbedWriteNode(
          this.line,
          this.column,
          this.scope,
          text,
          this.escape
        );
      } else {
        return this;
      }
    };
    _EmbedWriteNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.text, (_once = false, function (_e, text) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return callback(null, text !== _this.text
          ? EmbedWriteNode(
            _this.line,
            _this.column,
            _this.scope,
            text,
            _this.escape
          )
          : _this);
      }));
    };
    return EmbedWriteNode;
  }(Node));
  Node.Eval = EvalNode = (function (Node) {
    var _EvalNode_prototype, _Node_prototype, simplifiers;
    function EvalNode(line, column, scope, code) {
      var _this;
      _this = this instanceof EvalNode ? this : __create(_EvalNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(code instanceof Node)) {
        throw TypeError("Expected code to be a " + __name(Node) + ", got " + __typeof(code));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.code = code;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _EvalNode_prototype = EvalNode.prototype = __create(_Node_prototype);
    _EvalNode_prototype.constructor = EvalNode;
    EvalNode.displayName = "EvalNode";
    if (typeof Node.extended === "function") {
      Node.extended(EvalNode);
    }
    EvalNode.cappedName = "Eval";
    EvalNode.argNames = ["code"];
    simplifiers = {
      "true": function () {
        return ConstNode(this.line, this.column, this.scope, true);
      },
      "false": function () {
        return ConstNode(this.line, this.column, this.scope, false);
      },
      "void 0": function () {
        return ConstNode(this.line, this.column, this.scope, void 0);
      },
      "null": function () {
        return ConstNode(this.line, this.column, this.scope, null);
      }
    };
    _EvalNode_prototype._reduce = function (o) {
      var _ref, code, simplifier;
      code = this.code.reduce(o).doWrap();
      if (code.isConst() && code.isConstType("string")) {
        if (__owns.call(simplifiers, _ref = code.constValue())) {
          simplifier = simplifiers[_ref];
        }
        if (simplifier) {
          return simplifier.call(this);
        }
      }
      if (code !== this.code) {
        return EvalNode(this.line, this.column, this.scope, code);
      } else {
        return this;
      }
    };
    _EvalNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "EvalNode",
        this.line,
        this.column,
        this.code
      );
    };
    _EvalNode_prototype.walk = function (f) {
      var code;
      code = f(this.code);
      if (code !== this.code) {
        return EvalNode(this.line, this.column, this.scope, code);
      } else {
        return this;
      }
    };
    _EvalNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.code, (_once = false, function (_e, code) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return callback(null, code !== _this.code ? EvalNode(_this.line, _this.column, _this.scope, code) : _this);
      }));
    };
    return EvalNode;
  }(Node));
  Node.For = ForNode = (function (Node) {
    var _ForNode_prototype, _Node_prototype;
    function ForNode(line, column, scope, init, test, step, body, label) {
      var _this;
      _this = this instanceof ForNode ? this : __create(_ForNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (init == null) {
        init = NothingNode(0, 0, scope);
      } else if (!(init instanceof Node)) {
        throw TypeError("Expected init to be a " + __name(Node) + ", got " + __typeof(init));
      }
      if (test == null) {
        test = ConstNode(0, 0, scope, true);
      } else if (!(test instanceof Node)) {
        throw TypeError("Expected test to be a " + __name(Node) + ", got " + __typeof(test));
      }
      if (step == null) {
        step = NothingNode(0, 0, scope);
      } else if (!(step instanceof Node)) {
        throw TypeError("Expected step to be a " + __name(Node) + ", got " + __typeof(step));
      }
      if (!(body instanceof Node)) {
        throw TypeError("Expected body to be a " + __name(Node) + ", got " + __typeof(body));
      }
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.init = init;
      _this.test = test;
      _this.step = step;
      _this.body = body;
      _this.label = label;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _ForNode_prototype = ForNode.prototype = __create(_Node_prototype);
    _ForNode_prototype.constructor = ForNode;
    ForNode.displayName = "ForNode";
    if (typeof Node.extended === "function") {
      Node.extended(ForNode);
    }
    ForNode.cappedName = "For";
    ForNode.argNames = [
      "init",
      "test",
      "step",
      "body",
      "label"
    ];
    _ForNode_prototype.type = function () {
      return Type["undefined"];
    };
    _ForNode_prototype.isStatement = function () {
      return true;
    };
    _ForNode_prototype.withLabel = function (label) {
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      return ForNode(
        this.line,
        this.column,
        this.scope,
        this.init,
        this.test,
        this.step,
        this.body,
        label
      );
    };
    _ForNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "ForNode",
        this.line,
        this.column,
        this.init,
        this.test,
        this.step,
        this.body,
        this.label
      );
    };
    _ForNode_prototype.walk = function (f) {
      var body, init, label, step, test;
      init = f(this.init);
      test = f(this.test);
      step = f(this.step);
      body = f(this.body);
      if (this.label instanceof Node) {
        label = f(this.label);
      } else {
        label = this.label;
      }
      if (init !== this.init || test !== this.test || step !== this.step || body !== this.body || label !== this.label) {
        return ForNode(
          this.line,
          this.column,
          this.scope,
          init,
          test,
          step,
          body,
          label
        );
      } else {
        return this;
      }
    };
    _ForNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.init, (_once = false, function (_e, init) {
        var _once2;
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return f(_this.test, (_once2 = false, function (_e2, test) {
          var _once3;
          if (_once2) {
            throw Error("Attempted to call function more than once");
          } else {
            _once2 = true;
          }
          if (_e2 != null) {
            return callback(_e2);
          }
          return f(_this.step, (_once3 = false, function (_e3, step) {
            var _once4;
            if (_once3) {
              throw Error("Attempted to call function more than once");
            } else {
              _once3 = true;
            }
            if (_e3 != null) {
              return callback(_e3);
            }
            return f(_this.body, (_once4 = false, function (_e4, body) {
              if (_once4) {
                throw Error("Attempted to call function more than once");
              } else {
                _once4 = true;
              }
              if (_e4 != null) {
                return callback(_e4);
              }
              return (_this.label instanceof Node
                ? function (next) {
                  var _once5;
                  return f(_this.label, (_once5 = false, function (_e5, label) {
                    if (_once5) {
                      throw Error("Attempted to call function more than once");
                    } else {
                      _once5 = true;
                    }
                    if (_e5 != null) {
                      return callback(_e5);
                    }
                    return next(label);
                  }));
                }
                : function (next) {
                  return next(_this.label);
                })(function (label) {
                return callback(null, init !== _this.init || test !== _this.test || step !== _this.step || body !== _this.body || label !== _this.label
                  ? ForNode(
                    _this.line,
                    _this.column,
                    _this.scope,
                    init,
                    test,
                    step,
                    body,
                    label
                  )
                  : _this);
              });
            }));
          }));
        }));
      }));
    };
    return ForNode;
  }(Node));
  Node.ForIn = ForInNode = (function (Node) {
    var _ForInNode_prototype, _Node_prototype;
    function ForInNode(line, column, scope, key, object, body, label) {
      var _this;
      _this = this instanceof ForInNode ? this : __create(_ForInNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(key instanceof Node)) {
        throw TypeError("Expected key to be a " + __name(Node) + ", got " + __typeof(key));
      }
      if (!(object instanceof Node)) {
        throw TypeError("Expected object to be a " + __name(Node) + ", got " + __typeof(object));
      }
      if (!(body instanceof Node)) {
        throw TypeError("Expected body to be a " + __name(Node) + ", got " + __typeof(body));
      }
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.key = key;
      _this.object = object;
      _this.body = body;
      _this.label = label;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _ForInNode_prototype = ForInNode.prototype = __create(_Node_prototype);
    _ForInNode_prototype.constructor = ForInNode;
    ForInNode.displayName = "ForInNode";
    if (typeof Node.extended === "function") {
      Node.extended(ForInNode);
    }
    ForInNode.cappedName = "ForIn";
    ForInNode.argNames = ["key", "object", "body", "label"];
    _ForInNode_prototype.type = function () {
      return Type["undefined"];
    };
    _ForInNode_prototype.isStatement = function () {
      return true;
    };
    _ForInNode_prototype.withLabel = function (label) {
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      return ForInNode(
        this.line,
        this.column,
        this.scope,
        this.key,
        this.object,
        this.body,
        label
      );
    };
    _ForInNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "ForInNode",
        this.line,
        this.column,
        this.key,
        this.object,
        this.body,
        this.label
      );
    };
    _ForInNode_prototype.walk = function (f) {
      var body, key, label, object;
      key = f(this.key);
      object = f(this.object);
      body = f(this.body);
      if (this.label instanceof Node) {
        label = f(this.label);
      } else {
        label = this.label;
      }
      if (key !== this.key || object !== this.object || body !== this.body || label !== this.label) {
        return ForInNode(
          this.line,
          this.column,
          this.scope,
          key,
          object,
          body,
          label
        );
      } else {
        return this;
      }
    };
    _ForInNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.key, (_once = false, function (_e, key) {
        var _once2;
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return f(_this.object, (_once2 = false, function (_e2, object) {
          var _once3;
          if (_once2) {
            throw Error("Attempted to call function more than once");
          } else {
            _once2 = true;
          }
          if (_e2 != null) {
            return callback(_e2);
          }
          return f(_this.body, (_once3 = false, function (_e3, body) {
            if (_once3) {
              throw Error("Attempted to call function more than once");
            } else {
              _once3 = true;
            }
            if (_e3 != null) {
              return callback(_e3);
            }
            return (_this.label instanceof Node
              ? function (next) {
                var _once4;
                return f(_this.label, (_once4 = false, function (_e4, label) {
                  if (_once4) {
                    throw Error("Attempted to call function more than once");
                  } else {
                    _once4 = true;
                  }
                  if (_e4 != null) {
                    return callback(_e4);
                  }
                  return next(label);
                }));
              }
              : function (next) {
                return next(_this.label);
              })(function (label) {
              return callback(null, key !== _this.key || object !== _this.object || body !== _this.body || label !== _this.label
                ? ForInNode(
                  _this.line,
                  _this.column,
                  _this.scope,
                  key,
                  object,
                  body,
                  label
                )
                : _this);
            });
          }));
        }));
      }));
    };
    return ForInNode;
  }(Node));
  Node.Function = FunctionNode = (function (Node) {
    var _FunctionNode_prototype, _Node_prototype;
    function FunctionNode(line, column, scope, params, body, autoReturn, bound, curry, asType, generator, generic) {
      var _i, _i2, _this;
      _this = this instanceof FunctionNode ? this : __create(_FunctionNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!__isArray(params)) {
        throw TypeError("Expected params to be an Array, got " + __typeof(params));
      } else {
        for (_i = params.length; _i--; ) {
          if (!(params[_i] instanceof Node)) {
            throw TypeError("Expected " + ("params[" + _i + "]") + " to be a " + __name(Node) + ", got " + __typeof(params[_i]));
          }
        }
      }
      if (!(body instanceof Node)) {
        throw TypeError("Expected body to be a " + __name(Node) + ", got " + __typeof(body));
      }
      if (autoReturn == null) {
        autoReturn = true;
      } else if (typeof autoReturn !== "boolean") {
        throw TypeError("Expected autoReturn to be a Boolean, got " + __typeof(autoReturn));
      }
      if (bound == null) {
        bound = false;
      } else if (!(bound instanceof Node) && typeof bound !== "boolean") {
        throw TypeError("Expected bound to be one of " + (__name(Node) + " or Boolean") + ", got " + __typeof(bound));
      }
      if (curry == null) {
        curry = false;
      } else if (typeof curry !== "boolean") {
        throw TypeError("Expected curry to be a Boolean, got " + __typeof(curry));
      }
      if (asType == null) {
        asType = void 0;
      } else if (!(asType instanceof Node)) {
        throw TypeError("Expected asType to be one of " + (__name(Node) + " or undefined") + ", got " + __typeof(asType));
      }
      if (generator == null) {
        generator = false;
      } else if (typeof generator !== "boolean") {
        throw TypeError("Expected generator to be a Boolean, got " + __typeof(generator));
      }
      if (generic == null) {
        generic = [];
      } else if (!__isArray(generic)) {
        throw TypeError("Expected generic to be an Array, got " + __typeof(generic));
      } else {
        for (_i2 = generic.length; _i2--; ) {
          if (!(generic[_i2] instanceof IdentNode)) {
            throw TypeError("Expected " + ("generic[" + _i2 + "]") + " to be a " + __name(IdentNode) + ", got " + __typeof(generic[_i2]));
          }
        }
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.params = params;
      _this.body = body;
      _this.autoReturn = autoReturn;
      _this.bound = bound;
      _this.curry = curry;
      _this.asType = asType;
      _this.generator = generator;
      _this.generic = generic;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _FunctionNode_prototype = FunctionNode.prototype = __create(_Node_prototype);
    _FunctionNode_prototype.constructor = FunctionNode;
    FunctionNode.displayName = "FunctionNode";
    if (typeof Node.extended === "function") {
      Node.extended(FunctionNode);
    }
    FunctionNode.cappedName = "Function";
    FunctionNode.argNames = [
      "params",
      "body",
      "autoReturn",
      "bound",
      "curry",
      "asType",
      "generator",
      "generic"
    ];
    _FunctionNode_prototype.type = function (o) {
      var _ref, returnType, walker;
      if ((_ref = this._type) == null) {
        if (this.asType != null) {
          return this._type = nodeToType(this.asType)["function"]();
        } else {
          if (this.autoReturn) {
            returnType = this.body.type(o);
          } else {
            returnType = Type["undefined"];
          }
          walker = function (node) {
            var _ref;
            if (node instanceof ReturnNode) {
              returnType = returnType.union(node.type(o));
              return node;
            } else if (node instanceof FunctionNode) {
              return node;
            } else if (node instanceof MacroAccessNode) {
              if ((_ref = node.data.macroName) === "return" || _ref === "return?") {
                if (node.data.macroData.node) {
                  returnType = returnType.union(node.data.macroData.node.type(o));
                } else {
                  returnType = returnType.union(Type["undefined"]);
                }
              }
              return node.walk(walker);
            } else {
              return node.walk(walker);
            }
          };
          walker(this.body);
          return this._type = returnType["function"]();
        }
      } else {
        return _ref;
      }
    };
    _FunctionNode_prototype._isNoop = function (o) {
      return true;
    };
    _FunctionNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "FunctionNode",
        this.line,
        this.column,
        this.params,
        this.body,
        this.autoReturn,
        this.bound,
        this.curry,
        this.asType,
        this.generator,
        this.generic
      );
    };
    _FunctionNode_prototype.walk = function (f) {
      var asType, body, bound, params;
      params = map(this.params, f);
      body = f(this.body);
      if (this.bound instanceof Node) {
        bound = f(this.bound);
      } else {
        bound = this.bound;
      }
      if (this.asType instanceof Node) {
        asType = f(this.asType);
      } else {
        asType = this.asType;
      }
      if (params !== this.params || body !== this.body || bound !== this.bound || asType !== this.asType) {
        return FunctionNode(
          this.line,
          this.column,
          this.scope,
          params,
          body,
          this.autoReturn,
          bound,
          this.curry,
          asType,
          this.generator,
          this.generic
        );
      } else {
        return this;
      }
    };
    _FunctionNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return mapAsync(this.params, f, (_once = false, function (_e, params) {
        var _once2;
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return f(_this.body, (_once2 = false, function (_e2, body) {
          if (_once2) {
            throw Error("Attempted to call function more than once");
          } else {
            _once2 = true;
          }
          if (_e2 != null) {
            return callback(_e2);
          }
          return (_this.bound instanceof Node
            ? function (next) {
              var _once3;
              return f(_this.bound, (_once3 = false, function (_e3, bound) {
                if (_once3) {
                  throw Error("Attempted to call function more than once");
                } else {
                  _once3 = true;
                }
                if (_e3 != null) {
                  return callback(_e3);
                }
                return next(bound);
              }));
            }
            : function (next) {
              return next(_this.bound);
            })(function (bound) {
            return (_this.asType instanceof Node
              ? function (next) {
                var _once3;
                return f(_this.asType, (_once3 = false, function (_e3, asType) {
                  if (_once3) {
                    throw Error("Attempted to call function more than once");
                  } else {
                    _once3 = true;
                  }
                  if (_e3 != null) {
                    return callback(_e3);
                  }
                  return next(asType);
                }));
              }
              : function (next) {
                return next(_this.asType);
              })(function (asType) {
              return callback(null, params !== _this.params || body !== _this.body || bound !== _this.bound || asType !== _this.asType
                ? FunctionNode(
                  _this.line,
                  _this.column,
                  _this.scope,
                  params,
                  body,
                  _this.autoReturn,
                  bound,
                  _this.curry,
                  asType,
                  _this.generator,
                  _this.generic
                )
                : _this);
            });
          });
        }));
      }));
    };
    return FunctionNode;
  }(Node));
  Node.Ident = IdentNode = (function (Node) {
    var _IdentNode_prototype, _Node_prototype;
    function IdentNode(line, column, scope, name) {
      var _this;
      _this = this instanceof IdentNode ? this : __create(_IdentNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (typeof name !== "string") {
        throw TypeError("Expected name to be a String, got " + __typeof(name));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.name = name;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _IdentNode_prototype = IdentNode.prototype = __create(_Node_prototype);
    _IdentNode_prototype.constructor = IdentNode;
    IdentNode.displayName = "IdentNode";
    if (typeof Node.extended === "function") {
      Node.extended(IdentNode);
    }
    IdentNode.cappedName = "Ident";
    IdentNode.argNames = ["name"];
    _IdentNode_prototype.cacheable = false;
    _IdentNode_prototype.type = function (o) {
      if (this.name === "__currentArrayLength") {
        return Type.number;
      } else if (o) {
        return this.scope.type(this);
      } else {
        return Type.any;
      }
    };
    _IdentNode_prototype._isNoop = function (o) {
      return true;
    };
    _IdentNode_prototype.isPrimordial = function () {
      return isPrimordial(this.name);
    };
    _IdentNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "IdentNode",
        this.line,
        this.column,
        this.name
      );
    };
    _IdentNode_prototype.walk = function (f) {
      return this;
    };
    _IdentNode_prototype.walkAsync = function (f, callback) {
      return callback(null, this);
    };
    return IdentNode;
  }(Node));
  Node.If = IfNode = (function (Node) {
    var _IfNode_prototype, _Node_prototype;
    function IfNode(line, column, scope, test, whenTrue, whenFalse, label) {
      var _this;
      _this = this instanceof IfNode ? this : __create(_IfNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(test instanceof Node)) {
        throw TypeError("Expected test to be a " + __name(Node) + ", got " + __typeof(test));
      }
      if (!(whenTrue instanceof Node)) {
        throw TypeError("Expected whenTrue to be a " + __name(Node) + ", got " + __typeof(whenTrue));
      }
      if (whenFalse == null) {
        whenFalse = NothingNode(0, 0, scope);
      } else if (!(whenFalse instanceof Node)) {
        throw TypeError("Expected whenFalse to be a " + __name(Node) + ", got " + __typeof(whenFalse));
      }
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.test = test;
      _this.whenTrue = whenTrue;
      _this.whenFalse = whenFalse;
      _this.label = label;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _IfNode_prototype = IfNode.prototype = __create(_Node_prototype);
    _IfNode_prototype.constructor = IfNode;
    IfNode.displayName = "IfNode";
    if (typeof Node.extended === "function") {
      Node.extended(IfNode);
    }
    IfNode.cappedName = "If";
    IfNode.argNames = ["test", "whenTrue", "whenFalse", "label"];
    _IfNode_prototype.type = function (o) {
      var _ref;
      if ((_ref = this._type) == null) {
        return this._type = this.whenTrue.type(o).union(this.whenFalse.type(o));
      } else {
        return _ref;
      }
    };
    _IfNode_prototype.withLabel = function (label) {
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      return IfNode(
        this.line,
        this.column,
        this.scope,
        this.test,
        this.whenTrue,
        this.whenFalse,
        label
      );
    };
    _IfNode_prototype._reduce = function (o) {
      var label, test, testType, whenFalse, whenTrue;
      test = this.test.reduce(o);
      whenTrue = this.whenTrue.reduce(o);
      whenFalse = this.whenFalse.reduce(o);
      if (this.label != null) {
        label = this.label.reduce(o);
      } else {
        label = this.label;
      }
      if (test.isConst()) {
        return BlockNode(
          this.line,
          this.column,
          this.scope,
          [test.constValue() ? whenTrue : whenFalse],
          label
        ).reduce(o);
      } else {
        testType = test.type(o);
        if (testType.isSubsetOf(Type.alwaysTruthy)) {
          return BlockNode(
            this.line,
            this.column,
            this.scope,
            [test, whenTrue],
            label
          ).reduce(o);
        } else if (testType.isSubsetOf(Type.alwaysFalsy)) {
          return BlockNode(
            this.line,
            this.column,
            this.scope,
            [test, whenFalse],
            label
          ).reduce(o);
        } else if (test !== this.test || whenTrue !== this.whenTrue || whenFalse !== this.whenFalse || label !== this.label) {
          return IfNode(
            this.line,
            this.column,
            this.scope,
            test,
            whenTrue,
            whenFalse,
            label
          );
        } else {
          return this;
        }
      }
    };
    _IfNode_prototype.isStatement = function () {
      var _ref;
      if ((_ref = this._isStatement) == null) {
        return this._isStatement = this.whenTrue.isStatement() || this.whenFalse.isStatement();
      } else {
        return _ref;
      }
    };
    _IfNode_prototype.doWrap = function (o) {
      var whenFalse, whenTrue;
      whenTrue = this.whenTrue.doWrap(o);
      whenFalse = this.whenFalse.doWrap(o);
      if (whenTrue !== this.whenTrue || whenFalse !== this.whenFalse) {
        return IfNode(
          this.line,
          this.column,
          this.scope,
          this.test,
          whenTrue,
          whenFalse,
          this.label
        );
      } else {
        return this;
      }
    };
    _IfNode_prototype._isNoop = function (o) {
      var _ref;
      if ((_ref = this.__isNoop) == null) {
        return this.__isNoop = this.test.isNoop(o) && this.whenTrue.isNoop(o) && this.whenFalse.isNoop(o);
      } else {
        return _ref;
      }
    };
    _IfNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "IfNode",
        this.line,
        this.column,
        this.test,
        this.whenTrue,
        this.whenFalse,
        this.label
      );
    };
    _IfNode_prototype.walk = function (f) {
      var label, test, whenFalse, whenTrue;
      test = f(this.test);
      whenTrue = f(this.whenTrue);
      whenFalse = f(this.whenFalse);
      if (this.label instanceof Node) {
        label = f(this.label);
      } else {
        label = this.label;
      }
      if (test !== this.test || whenTrue !== this.whenTrue || whenFalse !== this.whenFalse || label !== this.label) {
        return IfNode(
          this.line,
          this.column,
          this.scope,
          test,
          whenTrue,
          whenFalse,
          label
        );
      } else {
        return this;
      }
    };
    _IfNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.test, (_once = false, function (_e, test) {
        var _once2;
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return f(_this.whenTrue, (_once2 = false, function (_e2, whenTrue) {
          var _once3;
          if (_once2) {
            throw Error("Attempted to call function more than once");
          } else {
            _once2 = true;
          }
          if (_e2 != null) {
            return callback(_e2);
          }
          return f(_this.whenFalse, (_once3 = false, function (_e3, whenFalse) {
            if (_once3) {
              throw Error("Attempted to call function more than once");
            } else {
              _once3 = true;
            }
            if (_e3 != null) {
              return callback(_e3);
            }
            return (_this.label instanceof Node
              ? function (next) {
                var _once4;
                return f(_this.label, (_once4 = false, function (_e4, label) {
                  if (_once4) {
                    throw Error("Attempted to call function more than once");
                  } else {
                    _once4 = true;
                  }
                  if (_e4 != null) {
                    return callback(_e4);
                  }
                  return next(label);
                }));
              }
              : function (next) {
                return next(_this.label);
              })(function (label) {
              return callback(null, test !== _this.test || whenTrue !== _this.whenTrue || whenFalse !== _this.whenFalse || label !== _this.label
                ? IfNode(
                  _this.line,
                  _this.column,
                  _this.scope,
                  test,
                  whenTrue,
                  whenFalse,
                  label
                )
                : _this);
            });
          }));
        }));
      }));
    };
    return IfNode;
  }(Node));
  Node.MacroAccess = MacroAccessNode = (function (Node) {
    var _MacroAccessNode_prototype, _Node_prototype;
    function MacroAccessNode(line, column, scope, id, callLine, data, position, inGenerator, inEvilAst, doWrapped) {
      var _this;
      _this = this instanceof MacroAccessNode ? this : __create(_MacroAccessNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (typeof id !== "number") {
        throw TypeError("Expected id to be a Number, got " + __typeof(id));
      }
      if (typeof callLine !== "number") {
        throw TypeError("Expected callLine to be a Number, got " + __typeof(callLine));
      }
      if (typeof data !== "object" || data === null) {
        throw TypeError("Expected data to be an Object, got " + __typeof(data));
      }
      if (typeof position !== "string") {
        throw TypeError("Expected position to be a String, got " + __typeof(position));
      }
      if (inGenerator == null) {
        inGenerator = false;
      } else if (typeof inGenerator !== "boolean") {
        throw TypeError("Expected inGenerator to be a Boolean, got " + __typeof(inGenerator));
      }
      if (inEvilAst == null) {
        inEvilAst = false;
      } else if (typeof inEvilAst !== "boolean") {
        throw TypeError("Expected inEvilAst to be a Boolean, got " + __typeof(inEvilAst));
      }
      if (doWrapped == null) {
        doWrapped = false;
      } else if (typeof doWrapped !== "boolean") {
        throw TypeError("Expected doWrapped to be a Boolean, got " + __typeof(doWrapped));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.id = id;
      _this.callLine = callLine;
      _this.data = data;
      _this.position = position;
      _this.inGenerator = inGenerator;
      _this.inEvilAst = inEvilAst;
      _this.doWrapped = doWrapped;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _MacroAccessNode_prototype = MacroAccessNode.prototype = __create(_Node_prototype);
    _MacroAccessNode_prototype.constructor = MacroAccessNode;
    MacroAccessNode.displayName = "MacroAccessNode";
    if (typeof Node.extended === "function") {
      Node.extended(MacroAccessNode);
    }
    MacroAccessNode.cappedName = "MacroAccess";
    MacroAccessNode.argNames = [
      "id",
      "callLine",
      "data",
      "position",
      "inGenerator",
      "inEvilAst",
      "doWrapped"
    ];
    _MacroAccessNode_prototype.type = function (o) {
      var _ref, type;
      if ((_ref = this._type) == null) {
        type = o.macros.getTypeById(this.id);
        if (type != null) {
          if (typeof type === "string") {
            return this._type = this.data[type].type(o);
          } else {
            return this._type = type;
          }
        } else {
          return this._type = o.macroExpand1(this).type(o);
        }
      } else {
        return _ref;
      }
    };
    _MacroAccessNode_prototype.withLabel = function (label, o) {
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      return o.macroExpand1(this).withLabel(label, o);
    };
    _MacroAccessNode_prototype.walk = (function () {
      function walkObject(obj, func) {
        var changed, k, newV, result, v;
        result = {};
        changed = false;
        for (k in obj) {
          if (__owns.call(obj, k)) {
            v = obj[k];
            newV = walkItem(v, func);
            if (newV !== v) {
              changed = true;
            }
            result[k] = newV;
          }
        }
        if (changed) {
          return result;
        } else {
          return obj;
        }
      }
      function walkItem(item, func) {
        if (item instanceof Node) {
          return func(item);
        } else if (__isArray(item)) {
          return map(item, function (x) {
            return walkItem(x, func);
          });
        } else if (typeof item === "object" && item !== null) {
          return walkObject(item, func);
        } else {
          return item;
        }
      }
      return function (func) {
        var data;
        data = walkItem(this.data, func);
        if (data !== this.data) {
          return MacroAccessNode(
            this.line,
            this.column,
            this.scope,
            this.id,
            this.callLine,
            data,
            this.position,
            this.inGenerator,
            this.inEvilAst,
            this.doWrapped
          );
        } else {
          return this;
        }
      };
    }());
    _MacroAccessNode_prototype.walkAsync = (function () {
      function walkObject(obj, func, callback) {
        var _keys, changed, result;
        changed = false;
        result = {};
        _keys = __keys(obj);
        return __async(
          1,
          _keys.length,
          false,
          function (_i, next) {
            var _once, k, v;
            k = _keys[_i];
            v = obj[k];
            return walkItem(item, func, (_once = false, function (_e, newItem) {
              if (_once) {
                throw Error("Attempted to call function more than once");
              } else {
                _once = true;
              }
              if (_e != null) {
                return next(_e);
              }
              if (item !== newItem) {
                changed = true;
              }
              result[k] = newItem;
              return next(null);
            }));
          },
          function (err) {
            if (typeof err !== "undefined" && err !== null) {
              return callback(err);
            } else {
              return callback(null, changed ? result : obj);
            }
          }
        );
      }
      function walkItem(item, func, callback) {
        if (item instanceof Node) {
          return func(item, callback);
        } else if (__isArray(item)) {
          return mapAsync(
            item,
            function (x, cb) {
              return walkItem(x, func, cb);
            },
            callback
          );
        } else if (typeof item === "object" && item !== null) {
          return walkObject(item, func, callback);
        } else {
          return callback(null, item);
        }
      }
      return function (func, callback) {
        var _once, _this;
        _this = this;
        return walkItem(this.data, func, (_once = false, function (_e, data) {
          if (_once) {
            throw Error("Attempted to call function more than once");
          } else {
            _once = true;
          }
          if (_e != null) {
            return callback(_e);
          }
          return callback(null, data !== _this.data
            ? MacroAccessNode(
              _this.line,
              _this.column,
              _this.scope,
              _this.id,
              _this.callLine,
              data,
              _this.position,
              _this.inGenerator,
              _this.inEvilAst,
              _this.doWrapped
            )
            : _this);
        }));
      };
    }());
    _MacroAccessNode_prototype._isNoop = function (o) {
      return o.macroExpand1(this).isNoop(o);
    };
    _MacroAccessNode_prototype.doWrap = function () {
      if (this.doWrapped) {
        return this;
      } else {
        return MacroAccessNode(
          this.line,
          this.column,
          this.scope,
          this.id,
          this.callLine,
          this.data,
          this.position,
          this.inGenerator,
          this.inEvilAst,
          true
        );
      }
    };
    _MacroAccessNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "MacroAccessNode",
        this.line,
        this.column,
        this.id,
        this.callLine,
        this.data,
        this.position,
        this.inGenerator,
        this.inEvilAst,
        this.doWrapped
      );
    };
    return MacroAccessNode;
  }(Node));
  Node.MacroConst = MacroConstNode = (function (Node) {
    var _MacroConstNode_prototype, _Node_prototype;
    function MacroConstNode(line, column, scope, name) {
      var _this;
      _this = this instanceof MacroConstNode ? this : __create(_MacroConstNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (typeof name !== "string") {
        throw TypeError("Expected name to be a String, got " + __typeof(name));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.name = name;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _MacroConstNode_prototype = MacroConstNode.prototype = __create(_Node_prototype);
    _MacroConstNode_prototype.constructor = MacroConstNode;
    MacroConstNode.displayName = "MacroConstNode";
    if (typeof Node.extended === "function") {
      Node.extended(MacroConstNode);
    }
    MacroConstNode.cappedName = "MacroConst";
    MacroConstNode.argNames = ["name"];
    _MacroConstNode_prototype.type = function (o) {
      var _ref, c, value;
      if ((_ref = this._type) == null) {
        c = o.getConst(this.name);
        if (!c) {
          return this._type = Type.any;
        } else {
          value = c.value;
          if (value === null) {
            return this._type = Type["null"];
          } else {
            switch (typeof value) {
            case "number": return this._type = Type.number;
            case "string": return this._type = Type.string;
            case "boolean": return this._type = Type.boolean;
            case "undefined": return this._type = Type["undefined"];
            default: throw Error("Unknown type for " + String(c.value));
            }
          }
        }
      } else {
        return _ref;
      }
    };
    _MacroConstNode_prototype._isNoop = function (o) {
      return true;
    };
    _MacroConstNode_prototype.toConst = function (o) {
      var _ref;
      return ConstNode(this.line, this.column, this.scope, (_ref = o.getConst(this.name)) != null ? _ref.value : void 0);
    };
    _MacroConstNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "MacroConstNode",
        this.line,
        this.column,
        this.name
      );
    };
    _MacroConstNode_prototype.walk = function (f) {
      return this;
    };
    _MacroConstNode_prototype.walkAsync = function (f, callback) {
      return callback(null, this);
    };
    return MacroConstNode;
  }(Node));
  Node.Nothing = NothingNode = (function (Node) {
    var _Node_prototype, _NothingNode_prototype;
    function NothingNode(line, column, scope) {
      var _this;
      _this = this instanceof NothingNode ? this : __create(_NothingNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _NothingNode_prototype = NothingNode.prototype = __create(_Node_prototype);
    _NothingNode_prototype.constructor = NothingNode;
    NothingNode.displayName = "NothingNode";
    if (typeof Node.extended === "function") {
      Node.extended(NothingNode);
    }
    NothingNode.cappedName = "Nothing";
    NothingNode.argNames = [];
    _NothingNode_prototype.type = function () {
      return Type["undefined"];
    };
    _NothingNode_prototype.cacheable = false;
    _NothingNode_prototype.isConst = function () {
      return true;
    };
    _NothingNode_prototype.constValue = function () {
      return;
    };
    _NothingNode_prototype.isConstType = function (type) {
      return type === "undefined";
    };
    _NothingNode_prototype.isConstValue = function (value) {
      return value === void 0;
    };
    _NothingNode_prototype._isNoop = function () {
      return true;
    };
    _NothingNode_prototype.inspect = function (depth) {
      return inspectHelper(depth, "NothingNode", this.line, this.column);
    };
    return NothingNode;
  }(Node));
  Node.Object = ObjectNode = (function (Node) {
    var _Node_prototype, _ObjectNode_prototype;
    function ObjectNode(line, column, scope, pairs, prototype) {
      var _i, _this;
      _this = this instanceof ObjectNode ? this : __create(_ObjectNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!__isArray(pairs)) {
        throw TypeError("Expected pairs to be an Array, got " + __typeof(pairs));
      } else {
        for (_i = pairs.length; _i--; ) {
          if (typeof pairs[_i] !== "object" || pairs[_i] === null) {
            throw TypeError("Expected " + ("pairs[" + _i + "]") + " to be an Object, got " + __typeof(pairs[_i]));
          } else {
            if (!(pairs[_i].key instanceof Node)) {
              throw TypeError("Expected " + ("pairs[" + _i + "].key") + " to be a " + __name(Node) + ", got " + __typeof(pairs[_i].key));
            }
            if (!(pairs[_i].value instanceof Node)) {
              throw TypeError("Expected " + ("pairs[" + _i + "].value") + " to be a " + __name(Node) + ", got " + __typeof(pairs[_i].value));
            }
            if (pairs[_i].property == null) {
              pairs[_i].property = void 0;
            } else if (typeof pairs[_i].property !== "string") {
              throw TypeError("Expected " + ("pairs[" + _i + "].property") + " to be one of String or undefined, got " + __typeof(pairs[_i].property));
            }
          }
        }
      }
      if (prototype == null) {
        prototype = void 0;
      } else if (!(prototype instanceof Node)) {
        throw TypeError("Expected prototype to be one of " + (__name(Node) + " or undefined") + ", got " + __typeof(prototype));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.pairs = pairs;
      _this.prototype = prototype;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _ObjectNode_prototype = ObjectNode.prototype = __create(_Node_prototype);
    _ObjectNode_prototype.constructor = ObjectNode;
    ObjectNode.displayName = "ObjectNode";
    if (typeof Node.extended === "function") {
      Node.extended(ObjectNode);
    }
    ObjectNode.cappedName = "Object";
    ObjectNode.argNames = ["pairs", "prototype"];
    _ObjectNode_prototype.type = function (o) {
      var _arr, _i, _len, _ref, _ref2, data, key, value;
      if ((_ref = this._type) == null) {
        data = {};
        for (_arr = __toArray(this.pairs), _i = 0, _len = _arr.length; _i < _len; ++_i) {
          key = (_ref2 = _arr[_i]).key;
          value = _ref2.value;
          if (key.isConst()) {
            data[key.constValue()] = value.type(o);
          }
        }
        return this._type = Type.makeObject(data);
      } else {
        return _ref;
      }
    };
    _ObjectNode_prototype.walk = (function () {
      function walkPair(pair, func) {
        var key, value;
        key = func(pair.key);
        value = func(pair.value);
        if (key !== pair.key || value !== pair.value) {
          return { key: key, value: value, property: pair.property };
        } else {
          return pair;
        }
      }
      return function (func) {
        var pairs, prototype;
        pairs = map(this.pairs, walkPair, func);
        if (this.prototype != null) {
          prototype = func(this.prototype);
        } else {
          prototype = this.prototype;
        }
        if (pairs !== this.pairs || prototype !== this.prototype) {
          return ObjectNode(
            this.line,
            this.column,
            this.scope,
            pairs,
            prototype
          );
        } else {
          return this;
        }
      };
    }());
    _ObjectNode_prototype.walkAsync = (function () {
      function walkPair(pair, func, callback) {
        var _once;
        return func(pair.key, (_once = false, function (_e, key) {
          var _once2;
          if (_once) {
            throw Error("Attempted to call function more than once");
          } else {
            _once = true;
          }
          if (_e != null) {
            return callback(_e);
          }
          return func(pair.value, (_once2 = false, function (_e2, value) {
            if (_once2) {
              throw Error("Attempted to call function more than once");
            } else {
              _once2 = true;
            }
            if (_e2 != null) {
              return callback(_e2);
            }
            return callback(null, key !== pair.key || value !== pair.value ? { key: key, value: value, property: pair.property } : pair);
          }));
        }));
      }
      return function (func, callback) {
        var _once, _this;
        _this = this;
        return mapAsync(this.pairs, walkPair, func, (_once = false, function (_e, pairs) {
          if (_once) {
            throw Error("Attempted to call function more than once");
          } else {
            _once = true;
          }
          if (_e != null) {
            return callback(_e);
          }
          return (_this.prototype != null
            ? function (next) {
              var _once2;
              return func(_this.prototype, (_once2 = false, function (_e2, p) {
                if (_once2) {
                  throw Error("Attempted to call function more than once");
                } else {
                  _once2 = true;
                }
                if (_e2 != null) {
                  return callback(_e2);
                }
                return next(p);
              }));
            }
            : function (next) {
              return next(_this.prototype);
            })(function (prototype) {
            return callback(null, pairs !== _this.pairs || prototype !== _this.prototype
              ? ObjectNode(
                _this.line,
                _this.column,
                _this.scope,
                pairs,
                prototype
              )
              : _this);
          });
        }));
      };
    }());
    _ObjectNode_prototype._reduce = (function () {
      function reducePair(pair, o) {
        var key, value;
        key = pair.key.reduce(o);
        value = pair.value.reduce(o).doWrap(o);
        if (key !== pair.key || value !== pair.value) {
          return { key: key, value: value, property: pair.property };
        } else {
          return pair;
        }
      }
      return function (o) {
        var pairs, prototype;
        pairs = map(this.pairs, reducePair, o);
        if (this.prototype != null) {
          prototype = this.prototype.reduce(o);
        } else {
          prototype = this.prototype;
        }
        if (pairs !== this.pairs || prototype !== this.prototype) {
          return ObjectNode(
            this.line,
            this.column,
            this.scope,
            pairs,
            prototype
          );
        } else {
          return this;
        }
      };
    }());
    _ObjectNode_prototype._isNoop = function (o) {
      var _arr, _every, _i, _len, _ref, _ref2, key, value;
      if ((_ref = this.__isNoop) == null) {
        _every = true;
        for (_arr = __toArray(this.pairs), _i = 0, _len = _arr.length; _i < _len; ++_i) {
          key = (_ref2 = _arr[_i]).key;
          value = _ref2.value;
          if (!key.isNoop(o) || !value.isNoop(o)) {
            _every = false;
            break;
          }
        }
        return this.__isNoop = _every;
      } else {
        return _ref;
      }
    };
    _ObjectNode_prototype.isLiteral = function () {
      var _ref, _this;
      _this = this;
      if ((_ref = this._isLiteral) == null) {
        return this._isLiteral = this.prototype == null && (function () {
          var _arr, _every, _i, _len, _ref, key, value;
          _every = true;
          for (_arr = __toArray(_this.pairs), _i = 0, _len = _arr.length; _i < _len; ++_i) {
            key = (_ref = _arr[_i]).key;
            value = _ref.value;
            if (!key.isLiteral() || !value.isLiteral()) {
              _every = false;
              break;
            }
          }
          return _every;
        }());
      } else {
        return _ref;
      }
    };
    _ObjectNode_prototype.literalValue = function () {
      var _arr, _i, _len, _ref, key, result, value;
      if (this.prototype != null) {
        throw Error("Cannot convert object with prototype to a literal");
      }
      result = {};
      for (_arr = __toArray(this.pairs), _i = 0, _len = _arr.length; _i < _len; ++_i) {
        key = (_ref = _arr[_i]).key;
        value = _ref.value;
        result[key.literalValue()] = value.literalValue();
      }
      return result;
    };
    _ObjectNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "ObjectNode",
        this.line,
        this.column,
        this.pairs,
        this.prototype
      );
    };
    return ObjectNode;
  }(Node));
  Node.object = function (index, pairs, prototype) {
    var _arr, _i, _len, _ref, key, keyValue, knownKeys, lastPropertyPair,
        ParserError, property;
    knownKeys = [];
    lastPropertyPair = null;
    for (_arr = __toArray(pairs), _i = 0, _len = _arr.length; _i < _len; ++_i) {
      key = (_ref = _arr[_i]).key;
      property = _ref.property;
      if (key instanceof ConstNode) {
        keyValue = String(key.value);
        if ((property === "get" || property === "set") && lastPropertyPair && lastPropertyPair.property !== property && lastPropertyPair.key === keyValue) {
          lastPropertyPair = null;
          continue;
        } else if (__in(keyValue, knownKeys)) {
          ParserError = require("./parser").ParserError;
          throw ParserError("Duplicate key " + __strnum(quote(keyValue)) + " in object", this, this.indexFromPosition(key.line, key.column));
        }
        knownKeys.push(keyValue);
        if (property === "get" || property === "set") {
          lastPropertyPair = { key: keyValue, property: property };
        } else {
          lastPropertyPair = null;
        }
      } else {
        lastPropertyPair = null;
      }
    }
    return this.Object(index, pairs, prototype);
  };
  Node.objectParam = Node.object;
  Node.Param = ParamNode = (function (Node) {
    var _Node_prototype, _ParamNode_prototype;
    function ParamNode(line, column, scope, ident, defaultValue, spread, isMutable, asType) {
      var _this;
      _this = this instanceof ParamNode ? this : __create(_ParamNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(ident instanceof Node)) {
        throw TypeError("Expected ident to be a " + __name(Node) + ", got " + __typeof(ident));
      }
      if (defaultValue == null) {
        defaultValue = void 0;
      } else if (!(defaultValue instanceof Node)) {
        throw TypeError("Expected defaultValue to be one of " + (__name(Node) + " or undefined") + ", got " + __typeof(defaultValue));
      }
      if (spread == null) {
        spread = false;
      } else if (typeof spread !== "boolean") {
        throw TypeError("Expected spread to be a Boolean, got " + __typeof(spread));
      }
      if (isMutable == null) {
        isMutable = false;
      } else if (typeof isMutable !== "boolean") {
        throw TypeError("Expected isMutable to be a Boolean, got " + __typeof(isMutable));
      }
      if (asType == null) {
        asType = void 0;
      } else if (!(asType instanceof Node)) {
        throw TypeError("Expected asType to be one of " + (__name(Node) + " or undefined") + ", got " + __typeof(asType));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.ident = ident;
      _this.defaultValue = defaultValue;
      _this.spread = spread;
      _this.isMutable = isMutable;
      _this.asType = asType;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _ParamNode_prototype = ParamNode.prototype = __create(_Node_prototype);
    _ParamNode_prototype.constructor = ParamNode;
    ParamNode.displayName = "ParamNode";
    if (typeof Node.extended === "function") {
      Node.extended(ParamNode);
    }
    ParamNode.cappedName = "Param";
    ParamNode.argNames = [
      "ident",
      "defaultValue",
      "spread",
      "isMutable",
      "asType"
    ];
    _ParamNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "ParamNode",
        this.line,
        this.column,
        this.ident,
        this.defaultValue,
        this.spread,
        this.isMutable,
        this.asType
      );
    };
    _ParamNode_prototype.walk = function (f) {
      var asType, defaultValue, ident;
      ident = f(this.ident);
      if (this.defaultValue instanceof Node) {
        defaultValue = f(this.defaultValue);
      } else {
        defaultValue = this.defaultValue;
      }
      if (this.asType instanceof Node) {
        asType = f(this.asType);
      } else {
        asType = this.asType;
      }
      if (ident !== this.ident || defaultValue !== this.defaultValue || asType !== this.asType) {
        return ParamNode(
          this.line,
          this.column,
          this.scope,
          ident,
          defaultValue,
          this.spread,
          this.isMutable,
          asType
        );
      } else {
        return this;
      }
    };
    _ParamNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.ident, (_once = false, function (_e, ident) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return (_this.defaultValue instanceof Node
          ? function (next) {
            var _once2;
            return f(_this.defaultValue, (_once2 = false, function (_e2, defaultValue) {
              if (_once2) {
                throw Error("Attempted to call function more than once");
              } else {
                _once2 = true;
              }
              if (_e2 != null) {
                return callback(_e2);
              }
              return next(defaultValue);
            }));
          }
          : function (next) {
            return next(_this.defaultValue);
          })(function (defaultValue) {
          return (_this.asType instanceof Node
            ? function (next) {
              var _once2;
              return f(_this.asType, (_once2 = false, function (_e2, asType) {
                if (_once2) {
                  throw Error("Attempted to call function more than once");
                } else {
                  _once2 = true;
                }
                if (_e2 != null) {
                  return callback(_e2);
                }
                return next(asType);
              }));
            }
            : function (next) {
              return next(_this.asType);
            })(function (asType) {
            return callback(null, ident !== _this.ident || defaultValue !== _this.defaultValue || asType !== _this.asType
              ? ParamNode(
                _this.line,
                _this.column,
                _this.scope,
                ident,
                defaultValue,
                _this.spread,
                _this.isMutable,
                asType
              )
              : _this);
          });
        });
      }));
    };
    return ParamNode;
  }(Node));
  Node.Regexp = RegexpNode = (function (Node) {
    var _Node_prototype, _RegexpNode_prototype;
    function RegexpNode(line, column, scope, source, flags) {
      var _this;
      _this = this instanceof RegexpNode ? this : __create(_RegexpNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(source instanceof Node)) {
        throw TypeError("Expected source to be a " + __name(Node) + ", got " + __typeof(source));
      }
      if (typeof flags !== "string") {
        throw TypeError("Expected flags to be a String, got " + __typeof(flags));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.source = source;
      _this.flags = flags;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _RegexpNode_prototype = RegexpNode.prototype = __create(_Node_prototype);
    _RegexpNode_prototype.constructor = RegexpNode;
    RegexpNode.displayName = "RegexpNode";
    if (typeof Node.extended === "function") {
      Node.extended(RegexpNode);
    }
    RegexpNode.cappedName = "Regexp";
    RegexpNode.argNames = ["source", "flags"];
    _RegexpNode_prototype.type = function () {
      return Type.regexp;
    };
    _RegexpNode_prototype._isNoop = function (o) {
      return this.text.isNoop(o);
    };
    _RegexpNode_prototype._reduce = function (o) {
      var source;
      source = this.source.reduce(o).doWrap(o);
      if (!source.isConst()) {
        return CallNode(
          this.line,
          this.column,
          this.scope,
          IdentNode(this.line, this.column, this.scope, "RegExp"),
          [
            source,
            ConstNode(this.line, this.column, this.scope, this.flags)
          ]
        );
      } else if (source !== this.source) {
        return RegexpNode(
          this.line,
          this.column,
          this.scope,
          source,
          this.flags
        );
      } else {
        return this;
      }
    };
    _RegexpNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "RegexpNode",
        this.line,
        this.column,
        this.source,
        this.flags
      );
    };
    _RegexpNode_prototype.walk = function (f) {
      var source;
      source = f(this.source);
      if (source !== this.source) {
        return RegexpNode(
          this.line,
          this.column,
          this.scope,
          source,
          this.flags
        );
      } else {
        return this;
      }
    };
    _RegexpNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.source, (_once = false, function (_e, source) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return callback(null, source !== _this.source
          ? RegexpNode(
            _this.line,
            _this.column,
            _this.scope,
            source,
            _this.flags
          )
          : _this);
      }));
    };
    return RegexpNode;
  }(Node));
  Node.Return = ReturnNode = (function (Node) {
    var _Node_prototype, _ReturnNode_prototype;
    function ReturnNode(line, column, scope, node) {
      var _this;
      _this = this instanceof ReturnNode ? this : __create(_ReturnNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (node == null) {
        node = ConstNode(line, column, scope, void 0);
      } else if (!(node instanceof Node)) {
        throw TypeError("Expected node to be a " + __name(Node) + ", got " + __typeof(node));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.node = node;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _ReturnNode_prototype = ReturnNode.prototype = __create(_Node_prototype);
    _ReturnNode_prototype.constructor = ReturnNode;
    ReturnNode.displayName = "ReturnNode";
    if (typeof Node.extended === "function") {
      Node.extended(ReturnNode);
    }
    ReturnNode.cappedName = "Return";
    ReturnNode.argNames = ["node"];
    _ReturnNode_prototype.type = function (o) {
      return this.node.type(o);
    };
    _ReturnNode_prototype.isStatement = function () {
      return true;
    };
    _ReturnNode_prototype._reduce = function (o) {
      var node;
      node = this.node.reduce(o).doWrap(o);
      if (node !== this.node) {
        return ReturnNode(this.line, this.column, this.scope, node);
      } else {
        return this;
      }
    };
    _ReturnNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "ReturnNode",
        this.line,
        this.column,
        this.node
      );
    };
    _ReturnNode_prototype.walk = function (f) {
      var node;
      node = f(this.node);
      if (node !== this.node) {
        return ReturnNode(this.line, this.column, this.scope, node);
      } else {
        return this;
      }
    };
    _ReturnNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.node, (_once = false, function (_e, node) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return callback(null, node !== _this.node ? ReturnNode(_this.line, _this.column, _this.scope, node) : _this);
      }));
    };
    return ReturnNode;
  }(Node));
  Node.Root = RootNode = (function (Node) {
    var _Node_prototype, _RootNode_prototype;
    function RootNode(line, column, scope, file, body, isEmbedded, isGenerator) {
      var _this;
      _this = this instanceof RootNode ? this : __create(_RootNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (file == null) {
        file = void 0;
      } else if (typeof file !== "string") {
        throw TypeError("Expected file to be one of String or undefined, got " + __typeof(file));
      }
      if (!(body instanceof Node)) {
        throw TypeError("Expected body to be a " + __name(Node) + ", got " + __typeof(body));
      }
      if (isEmbedded == null) {
        isEmbedded = false;
      } else if (typeof isEmbedded !== "boolean") {
        throw TypeError("Expected isEmbedded to be a Boolean, got " + __typeof(isEmbedded));
      }
      if (isGenerator == null) {
        isGenerator = false;
      } else if (typeof isGenerator !== "boolean") {
        throw TypeError("Expected isGenerator to be a Boolean, got " + __typeof(isGenerator));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.file = file;
      _this.body = body;
      _this.isEmbedded = isEmbedded;
      _this.isGenerator = isGenerator;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _RootNode_prototype = RootNode.prototype = __create(_Node_prototype);
    _RootNode_prototype.constructor = RootNode;
    RootNode.displayName = "RootNode";
    if (typeof Node.extended === "function") {
      Node.extended(RootNode);
    }
    RootNode.cappedName = "Root";
    RootNode.argNames = ["file", "body", "isEmbedded", "isGenerator"];
    _RootNode_prototype.isStatement = function () {
      return true;
    };
    _RootNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "RootNode",
        this.line,
        this.column,
        this.file,
        this.body,
        this.isEmbedded,
        this.isGenerator
      );
    };
    _RootNode_prototype.walk = function (f) {
      var body;
      body = f(this.body);
      if (body !== this.body) {
        return RootNode(
          this.line,
          this.column,
          this.scope,
          this.file,
          body,
          this.isEmbedded,
          this.isGenerator
        );
      } else {
        return this;
      }
    };
    _RootNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.body, (_once = false, function (_e, body) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return callback(null, body !== _this.body
          ? RootNode(
            _this.line,
            _this.column,
            _this.scope,
            _this.file,
            body,
            _this.isEmbedded,
            _this.isGenerator
          )
          : _this);
      }));
    };
    return RootNode;
  }(Node));
  Node.Spread = SpreadNode = (function (Node) {
    var _Node_prototype, _SpreadNode_prototype;
    function SpreadNode(line, column, scope, node) {
      var _this;
      _this = this instanceof SpreadNode ? this : __create(_SpreadNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(node instanceof Node)) {
        throw TypeError("Expected node to be a " + __name(Node) + ", got " + __typeof(node));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.node = node;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _SpreadNode_prototype = SpreadNode.prototype = __create(_Node_prototype);
    _SpreadNode_prototype.constructor = SpreadNode;
    SpreadNode.displayName = "SpreadNode";
    if (typeof Node.extended === "function") {
      Node.extended(SpreadNode);
    }
    SpreadNode.cappedName = "Spread";
    SpreadNode.argNames = ["node"];
    _SpreadNode_prototype._reduce = function (o) {
      var node;
      node = this.node.reduce(o).doWrap(o);
      if (node !== this.node) {
        return SpreadNode(this.line, this.column, this.scope, node);
      } else {
        return this;
      }
    };
    _SpreadNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "SpreadNode",
        this.line,
        this.column,
        this.node
      );
    };
    _SpreadNode_prototype.walk = function (f) {
      var node;
      node = f(this.node);
      if (node !== this.node) {
        return SpreadNode(this.line, this.column, this.scope, node);
      } else {
        return this;
      }
    };
    _SpreadNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.node, (_once = false, function (_e, node) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return callback(null, node !== _this.node ? SpreadNode(_this.line, _this.column, _this.scope, node) : _this);
      }));
    };
    return SpreadNode;
  }(Node));
  Node.string = function (index, parts) {
    var _i, _i2, _len, concatOp, current, part;
    if (!__isArray(parts)) {
      throw TypeError("Expected parts to be an Array, got " + __typeof(parts));
    } else {
      for (_i = parts.length; _i--; ) {
        if (!(parts[_i] instanceof Node)) {
          throw TypeError("Expected " + ("parts[" + _i + "]") + " to be a " + __name(Node) + ", got " + __typeof(parts[_i]));
        }
      }
    }
    concatOp = this.getMacroByLabel("stringConcat");
    if (!concatOp) {
      throw Error("Cannot use string interpolation until the string-concat operator has been defined");
    }
    if (parts.length === 0) {
      return this.Const(index, "");
    } else if (parts.length === 1) {
      return concatOp.func(
        {
          left: this.Const(index, ""),
          op: "",
          right: parts[0]
        },
        this,
        index,
        this.getLine(index)
      );
    } else {
      current = parts[0];
      for (_i2 = 1, _len = parts.length; _i2 < _len; ++_i2) {
        part = parts[_i2];
        current = concatOp.func(
          { left: current, op: "", right: part },
          this,
          index,
          this.getLine(index)
        );
      }
      return current;
    }
  };
  Node.Super = SuperNode = (function (Node) {
    var _Node_prototype, _SuperNode_prototype;
    function SuperNode(line, column, scope, child, args) {
      var _i, _this;
      _this = this instanceof SuperNode ? this : __create(_SuperNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (child == null) {
        child = void 0;
      } else if (!(child instanceof Node)) {
        throw TypeError("Expected child to be one of " + (__name(Node) + " or undefined") + ", got " + __typeof(child));
      }
      if (!__isArray(args)) {
        throw TypeError("Expected args to be an Array, got " + __typeof(args));
      } else {
        for (_i = args.length; _i--; ) {
          if (!(args[_i] instanceof Node)) {
            throw TypeError("Expected " + ("args[" + _i + "]") + " to be a " + __name(Node) + ", got " + __typeof(args[_i]));
          }
        }
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.child = child;
      _this.args = args;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _SuperNode_prototype = SuperNode.prototype = __create(_Node_prototype);
    _SuperNode_prototype.constructor = SuperNode;
    SuperNode.displayName = "SuperNode";
    if (typeof Node.extended === "function") {
      Node.extended(SuperNode);
    }
    SuperNode.cappedName = "Super";
    SuperNode.argNames = ["child", "args"];
    _SuperNode_prototype._reduce = function (o) {
      var args, child;
      if (this.child != null) {
        child = this.child.reduce(o).doWrap(o);
      } else {
        child = this.child;
      }
      args = map(
        this.args,
        function (node, o) {
          return node.reduce(o).doWrap(o);
        },
        o
      );
      if (child !== this.child || args !== this.args) {
        return SuperNode(
          this.line,
          this.column,
          this.scope,
          child,
          args
        );
      } else {
        return this;
      }
    };
    _SuperNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "SuperNode",
        this.line,
        this.column,
        this.child,
        this.args
      );
    };
    _SuperNode_prototype.walk = function (f) {
      var args, child;
      if (this.child instanceof Node) {
        child = f(this.child);
      } else {
        child = this.child;
      }
      args = map(this.args, f);
      if (child !== this.child || args !== this.args) {
        return SuperNode(
          this.line,
          this.column,
          this.scope,
          child,
          args
        );
      } else {
        return this;
      }
    };
    _SuperNode_prototype.walkAsync = function (f, callback) {
      var _this;
      _this = this;
      return (this.child instanceof Node
        ? function (next) {
          var _once;
          return f(_this.child, (_once = false, function (_e, child) {
            if (_once) {
              throw Error("Attempted to call function more than once");
            } else {
              _once = true;
            }
            if (_e != null) {
              return callback(_e);
            }
            return next(child);
          }));
        }
        : function (next) {
          return next(_this.child);
        })(function (child) {
        var _once;
        return mapAsync(_this.args, f, (_once = false, function (_e, args) {
          if (_once) {
            throw Error("Attempted to call function more than once");
          } else {
            _once = true;
          }
          if (_e != null) {
            return callback(_e);
          }
          return callback(null, child !== _this.child || args !== _this.args
            ? SuperNode(
              _this.line,
              _this.column,
              _this.scope,
              child,
              args
            )
            : _this);
        }));
      });
    };
    return SuperNode;
  }(Node));
  Node.Switch = SwitchNode = (function (Node) {
    var _Node_prototype, _SwitchNode_prototype;
    function SwitchNode(line, column, scope, node, cases, defaultCase, label) {
      var _this;
      _this = this instanceof SwitchNode ? this : __create(_SwitchNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(node instanceof Node)) {
        throw TypeError("Expected node to be a " + __name(Node) + ", got " + __typeof(node));
      }
      if (!__isArray(cases)) {
        throw TypeError("Expected cases to be an Array, got " + __typeof(cases));
      }
      if (defaultCase == null) {
        defaultCase = void 0;
      } else if (!(defaultCase instanceof Node)) {
        throw TypeError("Expected defaultCase to be one of " + (__name(Node) + " or undefined") + ", got " + __typeof(defaultCase));
      }
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.node = node;
      _this.cases = cases;
      _this.defaultCase = defaultCase;
      _this.label = label;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _SwitchNode_prototype = SwitchNode.prototype = __create(_Node_prototype);
    _SwitchNode_prototype.constructor = SwitchNode;
    SwitchNode.displayName = "SwitchNode";
    if (typeof Node.extended === "function") {
      Node.extended(SwitchNode);
    }
    SwitchNode.cappedName = "Switch";
    SwitchNode.argNames = ["node", "cases", "defaultCase", "label"];
    _SwitchNode_prototype.type = function (o) {
      var _arr, _i, _len, _ref, case_, type;
      if ((_ref = this._type) == null) {
        if (this.defaultCase != null) {
          type = this.defaultCase.type(o);
        } else {
          type = Type["undefined"];
        }
        for (_arr = __toArray(this.cases), _i = 0, _len = _arr.length; _i < _len; ++_i) {
          case_ = _arr[_i];
          if (case_.fallthrough) {
            type = type;
          } else {
            type = type.union(case_.body.type(o));
          }
        }
        return this._type = type;
      } else {
        return _ref;
      }
    };
    _SwitchNode_prototype.withLabel = function (label) {
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      return SwitchNode(
        this.line,
        this.column,
        this.scope,
        this.node,
        this.cases,
        this.defaultCase,
        label
      );
    };
    _SwitchNode_prototype.walk = function (f) {
      var cases, defaultCase, label, node;
      node = f(this.node);
      cases = map(this.cases, function (case_) {
        var caseBody, caseNode;
        caseNode = f(case_.node);
        caseBody = f(case_.body);
        if (caseNode !== case_.node || caseBody !== case_.body) {
          return { node: caseNode, body: caseBody, fallthrough: case_.fallthrough };
        } else {
          return case_;
        }
      });
      if (this.defaultCase) {
        defaultCase = f(this.defaultCase);
      } else {
        defaultCase = this.defaultCase;
      }
      if (this.label != null) {
        label = f(this.label);
      } else {
        label = this.label;
      }
      if (node !== this.node || cases !== this.cases || defaultCase !== this.defaultCase || label !== this.label) {
        return SwitchNode(
          this.line,
          this.column,
          this.scope,
          node,
          cases,
          defaultCase,
          label
        );
      } else {
        return this;
      }
    };
    _SwitchNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.node, (_once = false, function (_e, node) {
        var _once2;
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return mapAsync(
          _this.cases,
          function (case_, cb) {
            var _once3;
            return f(case_.node, (_once3 = false, function (_e2, caseNode) {
              var _once4;
              if (_once3) {
                throw Error("Attempted to call function more than once");
              } else {
                _once3 = true;
              }
              if (_e2 != null) {
                return cb(_e2);
              }
              return f(case_.body, (_once4 = false, function (_e3, caseBody) {
                if (_once4) {
                  throw Error("Attempted to call function more than once");
                } else {
                  _once4 = true;
                }
                if (_e3 != null) {
                  return cb(_e3);
                }
                return cb(null, caseNode !== case_.node || caseBody !== case_.body ? { node: caseNode, body: caseBody, fallthrough: case_.fallthrough } : case_);
              }));
            }));
          },
          (_once2 = false, function (_e2, cases) {
            if (_once2) {
              throw Error("Attempted to call function more than once");
            } else {
              _once2 = true;
            }
            if (_e2 != null) {
              return callback(_e2);
            }
            return (_this.defaultCase != null
              ? function (next) {
                var _once3;
                return f(_this.defaultCase, (_once3 = false, function (_e3, x) {
                  if (_once3) {
                    throw Error("Attempted to call function more than once");
                  } else {
                    _once3 = true;
                  }
                  if (_e3 != null) {
                    return callback(_e3);
                  }
                  return next(x);
                }));
              }
              : function (next) {
                return next(_this.defaultCase);
              })(function (defaultCase) {
              return (_this.label != null
                ? function (next) {
                  var _once3;
                  return f(_this.label, (_once3 = false, function (_e3, x) {
                    if (_once3) {
                      throw Error("Attempted to call function more than once");
                    } else {
                      _once3 = true;
                    }
                    if (_e3 != null) {
                      return callback(_e3);
                    }
                    return next(x);
                  }));
                }
                : function (next) {
                  return next(_this.label);
                })(function (label) {
                return callback(null, node !== _this.node || cases !== _this.cases || defaultCase !== _this.defaultCase || label !== _this.label
                  ? SwitchNode(
                    _this.line,
                    _this.column,
                    _this.scope,
                    node,
                    cases,
                    defaultCase,
                    label
                  )
                  : _this);
              });
            });
          })
        );
      }));
    };
    _SwitchNode_prototype.isStatement = function () {
      return true;
    };
    _SwitchNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "SwitchNode",
        this.line,
        this.column,
        this.node,
        this.cases,
        this.defaultCase,
        this.label
      );
    };
    return SwitchNode;
  }(Node));
  Node.SyntaxChoice = SyntaxChoiceNode = (function (Node) {
    var _Node_prototype, _SyntaxChoiceNode_prototype;
    function SyntaxChoiceNode(line, column, scope, choices) {
      var _i, _this;
      _this = this instanceof SyntaxChoiceNode ? this : __create(_SyntaxChoiceNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!__isArray(choices)) {
        throw TypeError("Expected choices to be an Array, got " + __typeof(choices));
      } else {
        for (_i = choices.length; _i--; ) {
          if (!(choices[_i] instanceof Node)) {
            throw TypeError("Expected " + ("choices[" + _i + "]") + " to be a " + __name(Node) + ", got " + __typeof(choices[_i]));
          }
        }
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.choices = choices;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _SyntaxChoiceNode_prototype = SyntaxChoiceNode.prototype = __create(_Node_prototype);
    _SyntaxChoiceNode_prototype.constructor = SyntaxChoiceNode;
    SyntaxChoiceNode.displayName = "SyntaxChoiceNode";
    if (typeof Node.extended === "function") {
      Node.extended(SyntaxChoiceNode);
    }
    SyntaxChoiceNode.cappedName = "SyntaxChoice";
    SyntaxChoiceNode.argNames = ["choices"];
    _SyntaxChoiceNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "SyntaxChoiceNode",
        this.line,
        this.column,
        this.choices
      );
    };
    _SyntaxChoiceNode_prototype.walk = function (f) {
      var choices;
      choices = map(this.choices, f);
      if (choices !== this.choices) {
        return SyntaxChoiceNode(this.line, this.column, this.scope, choices);
      } else {
        return this;
      }
    };
    _SyntaxChoiceNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return mapAsync(this.choices, f, (_once = false, function (_e, choices) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return callback(null, choices !== _this.choices ? SyntaxChoiceNode(_this.line, _this.column, _this.scope, choices) : _this);
      }));
    };
    return SyntaxChoiceNode;
  }(Node));
  Node.SyntaxMany = SyntaxManyNode = (function (Node) {
    var _Node_prototype, _SyntaxManyNode_prototype;
    function SyntaxManyNode(line, column, scope, inner, multiplier) {
      var _this;
      _this = this instanceof SyntaxManyNode ? this : __create(_SyntaxManyNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(inner instanceof Node)) {
        throw TypeError("Expected inner to be a " + __name(Node) + ", got " + __typeof(inner));
      }
      if (typeof multiplier !== "string") {
        throw TypeError("Expected multiplier to be a String, got " + __typeof(multiplier));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.inner = inner;
      _this.multiplier = multiplier;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _SyntaxManyNode_prototype = SyntaxManyNode.prototype = __create(_Node_prototype);
    _SyntaxManyNode_prototype.constructor = SyntaxManyNode;
    SyntaxManyNode.displayName = "SyntaxManyNode";
    if (typeof Node.extended === "function") {
      Node.extended(SyntaxManyNode);
    }
    SyntaxManyNode.cappedName = "SyntaxMany";
    SyntaxManyNode.argNames = ["inner", "multiplier"];
    _SyntaxManyNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "SyntaxManyNode",
        this.line,
        this.column,
        this.inner,
        this.multiplier
      );
    };
    _SyntaxManyNode_prototype.walk = function (f) {
      var inner;
      inner = f(this.inner);
      if (inner !== this.inner) {
        return SyntaxManyNode(
          this.line,
          this.column,
          this.scope,
          inner,
          this.multiplier
        );
      } else {
        return this;
      }
    };
    _SyntaxManyNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.inner, (_once = false, function (_e, inner) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return callback(null, inner !== _this.inner
          ? SyntaxManyNode(
            _this.line,
            _this.column,
            _this.scope,
            inner,
            _this.multiplier
          )
          : _this);
      }));
    };
    return SyntaxManyNode;
  }(Node));
  Node.SyntaxParam = SyntaxParamNode = (function (Node) {
    var _Node_prototype, _SyntaxParamNode_prototype;
    function SyntaxParamNode(line, column, scope, ident, asType) {
      var _this;
      _this = this instanceof SyntaxParamNode ? this : __create(_SyntaxParamNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(ident instanceof Node)) {
        throw TypeError("Expected ident to be a " + __name(Node) + ", got " + __typeof(ident));
      }
      if (asType == null) {
        asType = void 0;
      } else if (!(asType instanceof Node)) {
        throw TypeError("Expected asType to be one of " + (__name(Node) + " or undefined") + ", got " + __typeof(asType));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.ident = ident;
      _this.asType = asType;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _SyntaxParamNode_prototype = SyntaxParamNode.prototype = __create(_Node_prototype);
    _SyntaxParamNode_prototype.constructor = SyntaxParamNode;
    SyntaxParamNode.displayName = "SyntaxParamNode";
    if (typeof Node.extended === "function") {
      Node.extended(SyntaxParamNode);
    }
    SyntaxParamNode.cappedName = "SyntaxParam";
    SyntaxParamNode.argNames = ["ident", "asType"];
    _SyntaxParamNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "SyntaxParamNode",
        this.line,
        this.column,
        this.ident,
        this.asType
      );
    };
    _SyntaxParamNode_prototype.walk = function (f) {
      var asType, ident;
      ident = f(this.ident);
      if (this.asType instanceof Node) {
        asType = f(this.asType);
      } else {
        asType = this.asType;
      }
      if (ident !== this.ident || asType !== this.asType) {
        return SyntaxParamNode(
          this.line,
          this.column,
          this.scope,
          ident,
          asType
        );
      } else {
        return this;
      }
    };
    _SyntaxParamNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.ident, (_once = false, function (_e, ident) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return (_this.asType instanceof Node
          ? function (next) {
            var _once2;
            return f(_this.asType, (_once2 = false, function (_e2, asType) {
              if (_once2) {
                throw Error("Attempted to call function more than once");
              } else {
                _once2 = true;
              }
              if (_e2 != null) {
                return callback(_e2);
              }
              return next(asType);
            }));
          }
          : function (next) {
            return next(_this.asType);
          })(function (asType) {
          return callback(null, ident !== _this.ident || asType !== _this.asType
            ? SyntaxParamNode(
              _this.line,
              _this.column,
              _this.scope,
              ident,
              asType
            )
            : _this);
        });
      }));
    };
    return SyntaxParamNode;
  }(Node));
  Node.SyntaxSequence = SyntaxSequenceNode = (function (Node) {
    var _Node_prototype, _SyntaxSequenceNode_prototype;
    function SyntaxSequenceNode(line, column, scope, params) {
      var _i, _this;
      _this = this instanceof SyntaxSequenceNode ? this : __create(_SyntaxSequenceNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!__isArray(params)) {
        throw TypeError("Expected params to be an Array, got " + __typeof(params));
      } else {
        for (_i = params.length; _i--; ) {
          if (!(params[_i] instanceof Node)) {
            throw TypeError("Expected " + ("params[" + _i + "]") + " to be a " + __name(Node) + ", got " + __typeof(params[_i]));
          }
        }
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.params = params;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _SyntaxSequenceNode_prototype = SyntaxSequenceNode.prototype = __create(_Node_prototype);
    _SyntaxSequenceNode_prototype.constructor = SyntaxSequenceNode;
    SyntaxSequenceNode.displayName = "SyntaxSequenceNode";
    if (typeof Node.extended === "function") {
      Node.extended(SyntaxSequenceNode);
    }
    SyntaxSequenceNode.cappedName = "SyntaxSequence";
    SyntaxSequenceNode.argNames = ["params"];
    _SyntaxSequenceNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "SyntaxSequenceNode",
        this.line,
        this.column,
        this.params
      );
    };
    _SyntaxSequenceNode_prototype.walk = function (f) {
      var params;
      params = map(this.params, f);
      if (params !== this.params) {
        return SyntaxSequenceNode(this.line, this.column, this.scope, params);
      } else {
        return this;
      }
    };
    _SyntaxSequenceNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return mapAsync(this.params, f, (_once = false, function (_e, params) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return callback(null, params !== _this.params ? SyntaxSequenceNode(_this.line, _this.column, _this.scope, params) : _this);
      }));
    };
    return SyntaxSequenceNode;
  }(Node));
  Node.This = ThisNode = (function (Node) {
    var _Node_prototype, _ThisNode_prototype;
    function ThisNode(line, column, scope) {
      var _this;
      _this = this instanceof ThisNode ? this : __create(_ThisNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _ThisNode_prototype = ThisNode.prototype = __create(_Node_prototype);
    _ThisNode_prototype.constructor = ThisNode;
    ThisNode.displayName = "ThisNode";
    if (typeof Node.extended === "function") {
      Node.extended(ThisNode);
    }
    ThisNode.cappedName = "This";
    ThisNode.argNames = [];
    _ThisNode_prototype.cacheable = false;
    _ThisNode_prototype._isNoop = function () {
      return true;
    };
    _ThisNode_prototype.inspect = function (depth) {
      return inspectHelper(depth, "ThisNode", this.line, this.column);
    };
    return ThisNode;
  }(Node));
  Node.Throw = ThrowNode = (function (Node) {
    var _Node_prototype, _ThrowNode_prototype;
    function ThrowNode(line, column, scope, node) {
      var _this;
      _this = this instanceof ThrowNode ? this : __create(_ThrowNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(node instanceof Node)) {
        throw TypeError("Expected node to be a " + __name(Node) + ", got " + __typeof(node));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.node = node;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _ThrowNode_prototype = ThrowNode.prototype = __create(_Node_prototype);
    _ThrowNode_prototype.constructor = ThrowNode;
    ThrowNode.displayName = "ThrowNode";
    if (typeof Node.extended === "function") {
      Node.extended(ThrowNode);
    }
    ThrowNode.cappedName = "Throw";
    ThrowNode.argNames = ["node"];
    _ThrowNode_prototype.type = function () {
      return Type.none;
    };
    _ThrowNode_prototype.isStatement = function () {
      return true;
    };
    _ThrowNode_prototype._reduce = function (o) {
      var node;
      node = this.node.reduce(o).doWrap(o);
      if (node !== this.node) {
        return ThrowNode(this.line, this.column, this.scope, node);
      } else {
        return this;
      }
    };
    _ThrowNode_prototype.doWrap = function (o) {
      return CallNode(
        this.line,
        this.column,
        this.scope,
        IdentNode(this.line, this.column, this.scope, "__throw"),
        [this.node]
      );
    };
    _ThrowNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "ThrowNode",
        this.line,
        this.column,
        this.node
      );
    };
    _ThrowNode_prototype.walk = function (f) {
      var node;
      node = f(this.node);
      if (node !== this.node) {
        return ThrowNode(this.line, this.column, this.scope, node);
      } else {
        return this;
      }
    };
    _ThrowNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.node, (_once = false, function (_e, node) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return callback(null, node !== _this.node ? ThrowNode(_this.line, _this.column, _this.scope, node) : _this);
      }));
    };
    return ThrowNode;
  }(Node));
  Node.Tmp = TmpNode = (function (Node) {
    var _Node_prototype, _TmpNode_prototype;
    function TmpNode(line, column, scope, id, name, _type) {
      var _this;
      _this = this instanceof TmpNode ? this : __create(_TmpNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (typeof id !== "number") {
        throw TypeError("Expected id to be a Number, got " + __typeof(id));
      }
      if (typeof name !== "string") {
        throw TypeError("Expected name to be a String, got " + __typeof(name));
      }
      if (_type == null) {
        _type = Type.any;
      } else if (!(_type instanceof Type)) {
        throw TypeError("Expected _type to be a " + __name(Type) + ", got " + __typeof(_type));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.id = id;
      _this.name = name;
      _this._type = _type;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _TmpNode_prototype = TmpNode.prototype = __create(_Node_prototype);
    _TmpNode_prototype.constructor = TmpNode;
    TmpNode.displayName = "TmpNode";
    if (typeof Node.extended === "function") {
      Node.extended(TmpNode);
    }
    TmpNode.cappedName = "Tmp";
    TmpNode.argNames = ["id", "name", "_type"];
    _TmpNode_prototype.cacheable = false;
    _TmpNode_prototype.type = function () {
      return this._type;
    };
    _TmpNode_prototype._isNoop = function () {
      return true;
    };
    _TmpNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "TmpNode",
        this.line,
        this.column,
        this.id,
        this.name,
        this._type
      );
    };
    _TmpNode_prototype.walk = function (f) {
      return this;
    };
    _TmpNode_prototype.walkAsync = function (f, callback) {
      return callback(null, this);
    };
    return TmpNode;
  }(Node));
  Node.TmpWrapper = TmpWrapperNode = (function (Node) {
    var _Node_prototype, _TmpWrapperNode_prototype;
    function TmpWrapperNode(line, column, scope, node, tmps) {
      var _this;
      _this = this instanceof TmpWrapperNode ? this : __create(_TmpWrapperNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(node instanceof Node)) {
        throw TypeError("Expected node to be a " + __name(Node) + ", got " + __typeof(node));
      }
      if (!__isArray(tmps)) {
        throw TypeError("Expected tmps to be an Array, got " + __typeof(tmps));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.node = node;
      _this.tmps = tmps;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _TmpWrapperNode_prototype = TmpWrapperNode.prototype = __create(_Node_prototype);
    _TmpWrapperNode_prototype.constructor = TmpWrapperNode;
    TmpWrapperNode.displayName = "TmpWrapperNode";
    if (typeof Node.extended === "function") {
      Node.extended(TmpWrapperNode);
    }
    TmpWrapperNode.cappedName = "TmpWrapper";
    TmpWrapperNode.argNames = ["node", "tmps"];
    _TmpWrapperNode_prototype.type = function (o) {
      return this.node.type(o);
    };
    _TmpWrapperNode_prototype.withLabel = function (label, o) {
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      return TmpWrapperNode(
        this.line,
        this.column,
        this.scope,
        this.node.withLabel(label, o),
        this.tmps
      );
    };
    _TmpWrapperNode_prototype._reduce = function (o) {
      var node;
      node = this.node.reduce(o);
      if (this.tmps.length === 0) {
        return node;
      } else if (this.node !== node) {
        return TmpWrapperNode(
          this.line,
          this.column,
          this.scope,
          node,
          this.tmps
        );
      } else {
        return this;
      }
    };
    _TmpWrapperNode_prototype.isStatement = function () {
      return this.node.isStatement();
    };
    _TmpWrapperNode_prototype._isNoop = function (o) {
      return this.node.isNoop(o);
    };
    _TmpWrapperNode_prototype.doWrap = function (o) {
      var node;
      node = this.node.doWrap(o);
      if (node !== this.node) {
        return TmpWrapperNode(
          this.line,
          this.column,
          this.scope,
          node,
          this.tmps
        );
      } else {
        return this;
      }
    };
    _TmpWrapperNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "TmpWrapperNode",
        this.line,
        this.column,
        this.node,
        this.tmps
      );
    };
    _TmpWrapperNode_prototype.walk = function (f) {
      var node;
      node = f(this.node);
      if (node !== this.node) {
        return TmpWrapperNode(
          this.line,
          this.column,
          this.scope,
          node,
          this.tmps
        );
      } else {
        return this;
      }
    };
    _TmpWrapperNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.node, (_once = false, function (_e, node) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return callback(null, node !== _this.node
          ? TmpWrapperNode(
            _this.line,
            _this.column,
            _this.scope,
            node,
            _this.tmps
          )
          : _this);
      }));
    };
    return TmpWrapperNode;
  }(Node));
  Node.TryCatch = TryCatchNode = (function (Node) {
    var _Node_prototype, _TryCatchNode_prototype;
    function TryCatchNode(line, column, scope, tryBody, catchIdent, catchBody, label) {
      var _this;
      _this = this instanceof TryCatchNode ? this : __create(_TryCatchNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(tryBody instanceof Node)) {
        throw TypeError("Expected tryBody to be a " + __name(Node) + ", got " + __typeof(tryBody));
      }
      if (!(catchIdent instanceof Node)) {
        throw TypeError("Expected catchIdent to be a " + __name(Node) + ", got " + __typeof(catchIdent));
      }
      if (!(catchBody instanceof Node)) {
        throw TypeError("Expected catchBody to be a " + __name(Node) + ", got " + __typeof(catchBody));
      }
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.tryBody = tryBody;
      _this.catchIdent = catchIdent;
      _this.catchBody = catchBody;
      _this.label = label;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _TryCatchNode_prototype = TryCatchNode.prototype = __create(_Node_prototype);
    _TryCatchNode_prototype.constructor = TryCatchNode;
    TryCatchNode.displayName = "TryCatchNode";
    if (typeof Node.extended === "function") {
      Node.extended(TryCatchNode);
    }
    TryCatchNode.cappedName = "TryCatch";
    TryCatchNode.argNames = ["tryBody", "catchIdent", "catchBody", "label"];
    _TryCatchNode_prototype.type = function (o) {
      var _ref;
      if ((_ref = this._type) == null) {
        return this._type = this.tryBody.type(o).union(this.catchBody.type(o));
      } else {
        return _ref;
      }
    };
    _TryCatchNode_prototype.isStatement = function () {
      return true;
    };
    _TryCatchNode_prototype._isNoop = function (o) {
      return this.tryBody.isNoop(o);
    };
    _TryCatchNode_prototype.withLabel = function (label) {
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      return TryCatchNode(
        this.line,
        this.column,
        this.scope,
        this.tryBody,
        this.catchIdent,
        this.catchBody,
        label
      );
    };
    _TryCatchNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "TryCatchNode",
        this.line,
        this.column,
        this.tryBody,
        this.catchIdent,
        this.catchBody,
        this.label
      );
    };
    _TryCatchNode_prototype.walk = function (f) {
      var catchBody, catchIdent, label, tryBody;
      tryBody = f(this.tryBody);
      catchIdent = f(this.catchIdent);
      catchBody = f(this.catchBody);
      if (this.label instanceof Node) {
        label = f(this.label);
      } else {
        label = this.label;
      }
      if (tryBody !== this.tryBody || catchIdent !== this.catchIdent || catchBody !== this.catchBody || label !== this.label) {
        return TryCatchNode(
          this.line,
          this.column,
          this.scope,
          tryBody,
          catchIdent,
          catchBody,
          label
        );
      } else {
        return this;
      }
    };
    _TryCatchNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.tryBody, (_once = false, function (_e, tryBody) {
        var _once2;
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return f(_this.catchIdent, (_once2 = false, function (_e2, catchIdent) {
          var _once3;
          if (_once2) {
            throw Error("Attempted to call function more than once");
          } else {
            _once2 = true;
          }
          if (_e2 != null) {
            return callback(_e2);
          }
          return f(_this.catchBody, (_once3 = false, function (_e3, catchBody) {
            if (_once3) {
              throw Error("Attempted to call function more than once");
            } else {
              _once3 = true;
            }
            if (_e3 != null) {
              return callback(_e3);
            }
            return (_this.label instanceof Node
              ? function (next) {
                var _once4;
                return f(_this.label, (_once4 = false, function (_e4, label) {
                  if (_once4) {
                    throw Error("Attempted to call function more than once");
                  } else {
                    _once4 = true;
                  }
                  if (_e4 != null) {
                    return callback(_e4);
                  }
                  return next(label);
                }));
              }
              : function (next) {
                return next(_this.label);
              })(function (label) {
              return callback(null, tryBody !== _this.tryBody || catchIdent !== _this.catchIdent || catchBody !== _this.catchBody || label !== _this.label
                ? TryCatchNode(
                  _this.line,
                  _this.column,
                  _this.scope,
                  tryBody,
                  catchIdent,
                  catchBody,
                  label
                )
                : _this);
            });
          }));
        }));
      }));
    };
    return TryCatchNode;
  }(Node));
  Node.TryFinally = TryFinallyNode = (function (Node) {
    var _Node_prototype, _TryFinallyNode_prototype;
    function TryFinallyNode(line, column, scope, tryBody, finallyBody, label) {
      var _this;
      _this = this instanceof TryFinallyNode ? this : __create(_TryFinallyNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(tryBody instanceof Node)) {
        throw TypeError("Expected tryBody to be a " + __name(Node) + ", got " + __typeof(tryBody));
      }
      if (!(finallyBody instanceof Node)) {
        throw TypeError("Expected finallyBody to be a " + __name(Node) + ", got " + __typeof(finallyBody));
      }
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.tryBody = tryBody;
      _this.finallyBody = finallyBody;
      _this.label = label;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _TryFinallyNode_prototype = TryFinallyNode.prototype = __create(_Node_prototype);
    _TryFinallyNode_prototype.constructor = TryFinallyNode;
    TryFinallyNode.displayName = "TryFinallyNode";
    if (typeof Node.extended === "function") {
      Node.extended(TryFinallyNode);
    }
    TryFinallyNode.cappedName = "TryFinally";
    TryFinallyNode.argNames = ["tryBody", "finallyBody", "label"];
    _TryFinallyNode_prototype.type = function (o) {
      return this.tryBody.type(o);
    };
    _TryFinallyNode_prototype._reduce = function (o) {
      var finallyBody, label, tryBody;
      tryBody = this.tryBody.reduce(o);
      finallyBody = this.finallyBody.reduce(o);
      if (this.label != null) {
        label = this.label.reduce(o);
      } else {
        label = this.label;
      }
      if (finallyBody instanceof NothingNode) {
        return BlockNode(this.line, this.column, this.scopeIf([tryBody], label)).reduce(o);
      } else if (tryBody instanceof NothingNode) {
        return BlockNode(this.line, this.column, this.scopeIf([finallyBody], label)).reduce(o);
      } else if (tryBody !== this.tryBody || finallyBody !== this.finallyBody || label !== this.label) {
        return TryFinallyNode(
          this.line,
          this.column,
          this.scope,
          tryBody,
          finallyBody,
          label
        );
      } else {
        return this;
      }
    };
    _TryFinallyNode_prototype.isStatement = function () {
      return true;
    };
    _TryFinallyNode_prototype._isNoop = function (o) {
      var _ref;
      if ((_ref = this.__isNoop) == null) {
        return this.__isNoop = this.tryBody.isNoop(o) && this.finallyBody.isNoop();
      } else {
        return _ref;
      }
    };
    _TryFinallyNode_prototype.withLabel = function (label) {
      if (label == null) {
        label = null;
      } else if (!(label instanceof IdentNode) && !(label instanceof TmpNode)) {
        throw TypeError("Expected label to be one of " + (__name(IdentNode) + " or " + __name(TmpNode) + " or null") + ", got " + __typeof(label));
      }
      return TryFinallyNode(
        this.line,
        this.column,
        this.scope,
        this.tryBody,
        this.finallyBody,
        label
      );
    };
    _TryFinallyNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "TryFinallyNode",
        this.line,
        this.column,
        this.tryBody,
        this.finallyBody,
        this.label
      );
    };
    _TryFinallyNode_prototype.walk = function (f) {
      var finallyBody, label, tryBody;
      tryBody = f(this.tryBody);
      finallyBody = f(this.finallyBody);
      if (this.label instanceof Node) {
        label = f(this.label);
      } else {
        label = this.label;
      }
      if (tryBody !== this.tryBody || finallyBody !== this.finallyBody || label !== this.label) {
        return TryFinallyNode(
          this.line,
          this.column,
          this.scope,
          tryBody,
          finallyBody,
          label
        );
      } else {
        return this;
      }
    };
    _TryFinallyNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.tryBody, (_once = false, function (_e, tryBody) {
        var _once2;
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return f(_this.finallyBody, (_once2 = false, function (_e2, finallyBody) {
          if (_once2) {
            throw Error("Attempted to call function more than once");
          } else {
            _once2 = true;
          }
          if (_e2 != null) {
            return callback(_e2);
          }
          return (_this.label instanceof Node
            ? function (next) {
              var _once3;
              return f(_this.label, (_once3 = false, function (_e3, label) {
                if (_once3) {
                  throw Error("Attempted to call function more than once");
                } else {
                  _once3 = true;
                }
                if (_e3 != null) {
                  return callback(_e3);
                }
                return next(label);
              }));
            }
            : function (next) {
              return next(_this.label);
            })(function (label) {
            return callback(null, tryBody !== _this.tryBody || finallyBody !== _this.finallyBody || label !== _this.label
              ? TryFinallyNode(
                _this.line,
                _this.column,
                _this.scope,
                tryBody,
                finallyBody,
                label
              )
              : _this);
          });
        }));
      }));
    };
    return TryFinallyNode;
  }(Node));
  Node.TypeFunction = TypeFunctionNode = (function (Node) {
    var _Node_prototype, _TypeFunctionNode_prototype;
    function TypeFunctionNode(line, column, scope, returnType) {
      var _this;
      _this = this instanceof TypeFunctionNode ? this : __create(_TypeFunctionNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(returnType instanceof Node)) {
        throw TypeError("Expected returnType to be a " + __name(Node) + ", got " + __typeof(returnType));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.returnType = returnType;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _TypeFunctionNode_prototype = TypeFunctionNode.prototype = __create(_Node_prototype);
    _TypeFunctionNode_prototype.constructor = TypeFunctionNode;
    TypeFunctionNode.displayName = "TypeFunctionNode";
    if (typeof Node.extended === "function") {
      Node.extended(TypeFunctionNode);
    }
    TypeFunctionNode.cappedName = "TypeFunction";
    TypeFunctionNode.argNames = ["returnType"];
    _TypeFunctionNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "TypeFunctionNode",
        this.line,
        this.column,
        this.returnType
      );
    };
    _TypeFunctionNode_prototype.walk = function (f) {
      var returnType;
      returnType = f(this.returnType);
      if (returnType !== this.returnType) {
        return TypeFunctionNode(this.line, this.column, this.scope, returnType);
      } else {
        return this;
      }
    };
    _TypeFunctionNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.returnType, (_once = false, function (_e, returnType) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return callback(null, returnType !== _this.returnType ? TypeFunctionNode(_this.line, _this.column, _this.scope, returnType) : _this);
      }));
    };
    return TypeFunctionNode;
  }(Node));
  Node.TypeGeneric = TypeGenericNode = (function (Node) {
    var _Node_prototype, _TypeGenericNode_prototype;
    function TypeGenericNode(line, column, scope, basetype, args) {
      var _i, _this;
      _this = this instanceof TypeGenericNode ? this : __create(_TypeGenericNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(basetype instanceof Node)) {
        throw TypeError("Expected basetype to be a " + __name(Node) + ", got " + __typeof(basetype));
      }
      if (!__isArray(args)) {
        throw TypeError("Expected args to be an Array, got " + __typeof(args));
      } else {
        for (_i = args.length; _i--; ) {
          if (!(args[_i] instanceof Node)) {
            throw TypeError("Expected " + ("args[" + _i + "]") + " to be a " + __name(Node) + ", got " + __typeof(args[_i]));
          }
        }
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.basetype = basetype;
      _this.args = args;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _TypeGenericNode_prototype = TypeGenericNode.prototype = __create(_Node_prototype);
    _TypeGenericNode_prototype.constructor = TypeGenericNode;
    TypeGenericNode.displayName = "TypeGenericNode";
    if (typeof Node.extended === "function") {
      Node.extended(TypeGenericNode);
    }
    TypeGenericNode.cappedName = "TypeGeneric";
    TypeGenericNode.argNames = ["basetype", "args"];
    _TypeGenericNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "TypeGenericNode",
        this.line,
        this.column,
        this.basetype,
        this.args
      );
    };
    _TypeGenericNode_prototype.walk = function (f) {
      var args, basetype;
      basetype = f(this.basetype);
      args = map(this.args, f);
      if (basetype !== this.basetype || args !== this.args) {
        return TypeGenericNode(
          this.line,
          this.column,
          this.scope,
          basetype,
          args
        );
      } else {
        return this;
      }
    };
    _TypeGenericNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.basetype, (_once = false, function (_e, basetype) {
        var _once2;
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return mapAsync(_this.args, f, (_once2 = false, function (_e2, args) {
          if (_once2) {
            throw Error("Attempted to call function more than once");
          } else {
            _once2 = true;
          }
          if (_e2 != null) {
            return callback(_e2);
          }
          return callback(null, basetype !== _this.basetype || args !== _this.args
            ? TypeGenericNode(
              _this.line,
              _this.column,
              _this.scope,
              basetype,
              args
            )
            : _this);
        }));
      }));
    };
    return TypeGenericNode;
  }(Node));
  Node.TypeObject = TypeObjectNode = (function (Node) {
    var _Node_prototype, _TypeObjectNode_prototype;
    function TypeObjectNode(line, column, scope, pairs) {
      var _this;
      _this = this instanceof TypeObjectNode ? this : __create(_TypeObjectNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!__isArray(pairs)) {
        throw TypeError("Expected pairs to be an Array, got " + __typeof(pairs));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.pairs = pairs;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _TypeObjectNode_prototype = TypeObjectNode.prototype = __create(_Node_prototype);
    _TypeObjectNode_prototype.constructor = TypeObjectNode;
    TypeObjectNode.displayName = "TypeObjectNode";
    if (typeof Node.extended === "function") {
      Node.extended(TypeObjectNode);
    }
    TypeObjectNode.cappedName = "TypeObject";
    TypeObjectNode.argNames = ["pairs"];
    function reducePair(pair, o) {
      var key, value;
      key = pair.key.reduce(o);
      value = pair.value.reduce(o);
      if (key !== pair.key || value !== pair.value) {
        return { key: key, value: value };
      } else {
        return pair;
      }
    }
    _TypeObjectNode_prototype._reduce = function (o) {
      var pairs;
      pairs = map(this.pairs, reducePair, o);
      if (pairs !== this.pairs) {
        return TypeObjectNode(this.line, this.column, this.scope, pairs);
      } else {
        return this;
      }
    };
    _TypeObjectNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "TypeObjectNode",
        this.line,
        this.column,
        this.pairs
      );
    };
    _TypeObjectNode_prototype.walk = function (f) {
      return this;
    };
    _TypeObjectNode_prototype.walkAsync = function (f, callback) {
      return callback(null, this);
    };
    return TypeObjectNode;
  }(Node));
  Node.TypeUnion = TypeUnionNode = (function (Node) {
    var _Node_prototype, _TypeUnionNode_prototype;
    function TypeUnionNode(line, column, scope, types) {
      var _i, _this;
      _this = this instanceof TypeUnionNode ? this : __create(_TypeUnionNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!__isArray(types)) {
        throw TypeError("Expected types to be an Array, got " + __typeof(types));
      } else {
        for (_i = types.length; _i--; ) {
          if (!(types[_i] instanceof Node)) {
            throw TypeError("Expected " + ("types[" + _i + "]") + " to be a " + __name(Node) + ", got " + __typeof(types[_i]));
          }
        }
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.types = types;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _TypeUnionNode_prototype = TypeUnionNode.prototype = __create(_Node_prototype);
    _TypeUnionNode_prototype.constructor = TypeUnionNode;
    TypeUnionNode.displayName = "TypeUnionNode";
    if (typeof Node.extended === "function") {
      Node.extended(TypeUnionNode);
    }
    TypeUnionNode.cappedName = "TypeUnion";
    TypeUnionNode.argNames = ["types"];
    _TypeUnionNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "TypeUnionNode",
        this.line,
        this.column,
        this.types
      );
    };
    _TypeUnionNode_prototype.walk = function (f) {
      var types;
      types = map(this.types, f);
      if (types !== this.types) {
        return TypeUnionNode(this.line, this.column, this.scope, types);
      } else {
        return this;
      }
    };
    _TypeUnionNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return mapAsync(this.types, f, (_once = false, function (_e, types) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return callback(null, types !== _this.types ? TypeUnionNode(_this.line, _this.column, _this.scope, types) : _this);
      }));
    };
    return TypeUnionNode;
  }(Node));
  Node.Unary = UnaryNode = (function (Node) {
    var _Node_prototype, _UnaryNode_prototype;
    function UnaryNode(line, column, scope, op, node) {
      var _this;
      _this = this instanceof UnaryNode ? this : __create(_UnaryNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (typeof op !== "string") {
        throw TypeError("Expected op to be a String, got " + __typeof(op));
      }
      if (!(node instanceof Node)) {
        throw TypeError("Expected node to be a " + __name(Node) + ", got " + __typeof(node));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.op = op;
      _this.node = node;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _UnaryNode_prototype = UnaryNode.prototype = __create(_Node_prototype);
    _UnaryNode_prototype.constructor = UnaryNode;
    UnaryNode.displayName = "UnaryNode";
    if (typeof Node.extended === "function") {
      Node.extended(UnaryNode);
    }
    UnaryNode.cappedName = "Unary";
    UnaryNode.argNames = ["op", "node"];
    _UnaryNode_prototype.type = (function () {
      var ops;
      ops = {
        "-": Type.number,
        "+": Type.number,
        "--": Type.number,
        "++": Type.number,
        "--post": Type.number,
        "++post": Type.number,
        "!": Type.boolean,
        "~": Type.number,
        "typeof": Type.string,
        "delete": Type.boolean
      };
      return function () {
        var _ref;
        return (__owns.call(ops, _ref = this.op) ? ops[_ref] : void 0) || Type.any;
      };
    }());
    _UnaryNode_prototype._reduce = (function () {
      var constOps, nonconstOps;
      constOps = {
        "-": function (x) {
          return -x;
        },
        "+": function (x) {
          return +x;
        },
        "!": function (x) {
          return !x;
        },
        "~": function (x) {
          return ~x;
        },
        "typeof": function (x) {
          return typeof x;
        }
      };
      nonconstOps = {
        "+": function (node, o) {
          if (node.type(o).isSubsetOf(Type.number)) {
            return node;
          }
        },
        "-": function (node) {
          var _ref;
          if (node instanceof UnaryNode) {
            if ((_ref = node.op) === "-" || _ref === "+") {
              return UnaryNode(
                this.line,
                this.column,
                this.scope,
                node.op === "-" ? "+" : "-",
                node.node
              );
            }
          } else if (node instanceof BinaryNode) {
            if ((_ref = node.op) === "-" || _ref === "+") {
              return BinaryNode(
                this.line,
                this.column,
                this.scope,
                node.left,
                node.op === "-" ? "+" : "-",
                node.right
              );
            } else if ((_ref = node.op) === "*" || _ref === "/") {
              return BinaryNode(
                this.line,
                this.column,
                this.scope,
                UnaryNode(
                  node.left.line,
                  node.left.column,
                  node.left.scope,
                  "-",
                  node.left
                ),
                node.op,
                node.right
              );
            }
          }
        },
        "!": (function () {
          var invertibleBinaryOps;
          invertibleBinaryOps = {
            "<": ">=",
            "<=": ">",
            ">": "<=",
            ">=": "<",
            "==": "!=",
            "!=": "==",
            "===": "!==",
            "!==": "===",
            "&&": function (x, y) {
              return BinaryNode(
                this.line,
                this.column,
                this.scope,
                UnaryNode(
                  x.line,
                  x.column,
                  x.scope,
                  "!",
                  x
                ),
                "||",
                UnaryNode(
                  y.line,
                  y.column,
                  y.scope,
                  "!",
                  y
                )
              );
            },
            "||": function (x, y) {
              return BinaryNode(
                this.line,
                this.column,
                this.scope,
                UnaryNode(
                  x.line,
                  x.column,
                  x.scope,
                  "!",
                  x
                ),
                "&&",
                UnaryNode(
                  y.line,
                  y.column,
                  y.scope,
                  "!",
                  y
                )
              );
            }
          };
          return function (node, o) {
            var invert;
            if (node instanceof UnaryNode) {
              if (node.op === "!" && node.node.type(o).isSubsetOf(Type.boolean)) {
                return node.node;
              }
            } else if (node instanceof BinaryNode && __owns.call(invertibleBinaryOps, node.op)) {
              invert = invertibleBinaryOps[node.op];
              if (typeof invert === "function") {
                return invert.call(this, node.left, node.right);
              } else {
                return BinaryNode(
                  this.line,
                  this.column,
                  this.scope,
                  node.left,
                  invert,
                  node.right
                );
              }
            }
          };
        }()),
        "typeof": (function () {
          var objectType;
          objectType = Type["null"].union(Type.object).union(Type.arrayLike).union(Type.regexp).union(Type.date).union(Type.error);
          return function (node, o) {
            var type;
            if (node.isNoop(o)) {
              type = node.type(o);
              if (type.isSubsetOf(Type.number)) {
                return ConstNode(this.line, this.column, this.scope, "number");
              } else if (type.isSubsetOf(Type.string)) {
                return ConstNode(this.line, this.column, this.scope, "string");
              } else if (type.isSubsetOf(Type.boolean)) {
                return ConstNode(this.line, this.column, this.scope, "boolean");
              } else if (type.isSubsetOf(Type["undefined"])) {
                return ConstNode(this.line, this.column, this.scope, "undefined");
              } else if (type.isSubsetOf(Type["function"])) {
                return ConstNode(this.line, this.column, this.scope, "function");
              } else if (type.isSubsetOf(objectType)) {
                return ConstNode(this.line, this.column, this.scope, "object");
              }
            }
          };
        }())
      };
      return function (o) {
        var node, op, result;
        node = this.node.reduce(o).doWrap(o);
        op = this.op;
        if (node.isConst() && __owns.call(constOps, op)) {
          return ConstNode(this.line, this.column, this.scope, constOps[op](node.constValue()));
        }
        if (__owns.call(nonconstOps, op)) {
          result = nonconstOps[op].call(this, node, o);
        }
        if (result != null) {
          return result.reduce(o);
        }
        if (node !== this.node) {
          return UnaryNode(
            this.line,
            this.column,
            this.scope,
            op,
            node
          );
        } else {
          return this;
        }
      };
    }());
    _UnaryNode_prototype._isNoop = function (o) {
      var _ref, _ref2;
      if ((_ref = this.__isNoop) == null) {
        return this.__isNoop = (_ref2 = this.op) !== "++" && _ref2 !== "--" && _ref2 !== "++post" && _ref2 !== "--post" && _ref2 !== "delete" && this.node.isNoop(o);
      } else {
        return _ref;
      }
    };
    _UnaryNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "UnaryNode",
        this.line,
        this.column,
        this.op,
        this.node
      );
    };
    _UnaryNode_prototype.walk = function (f) {
      var node;
      node = f(this.node);
      if (node !== this.node) {
        return UnaryNode(
          this.line,
          this.column,
          this.scope,
          this.op,
          node
        );
      } else {
        return this;
      }
    };
    _UnaryNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.node, (_once = false, function (_e, node) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return callback(null, node !== _this.node
          ? UnaryNode(
            _this.line,
            _this.column,
            _this.scope,
            _this.op,
            node
          )
          : _this);
      }));
    };
    return UnaryNode;
  }(Node));
  Node.Var = VarNode = (function (Node) {
    var _Node_prototype, _VarNode_prototype;
    function VarNode(line, column, scope, ident, isMutable) {
      var _this;
      _this = this instanceof VarNode ? this : __create(_VarNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(ident instanceof IdentNode) && !(ident instanceof TmpNode)) {
        throw TypeError("Expected ident to be one of " + (__name(IdentNode) + " or " + __name(TmpNode)) + ", got " + __typeof(ident));
      }
      if (isMutable == null) {
        isMutable = false;
      } else if (typeof isMutable !== "boolean") {
        throw TypeError("Expected isMutable to be a Boolean, got " + __typeof(isMutable));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.ident = ident;
      _this.isMutable = isMutable;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _VarNode_prototype = VarNode.prototype = __create(_Node_prototype);
    _VarNode_prototype.constructor = VarNode;
    VarNode.displayName = "VarNode";
    if (typeof Node.extended === "function") {
      Node.extended(VarNode);
    }
    VarNode.cappedName = "Var";
    VarNode.argNames = ["ident", "isMutable"];
    _VarNode_prototype.type = function () {
      return Type["undefined"];
    };
    _VarNode_prototype._reduce = function (o) {
      var ident;
      ident = this.ident.reduce(o);
      if (ident !== this.ident) {
        return VarNode(
          this.line,
          this.column,
          this.scope,
          ident,
          this.isMutable
        );
      } else {
        return this;
      }
    };
    _VarNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "VarNode",
        this.line,
        this.column,
        this.ident,
        this.isMutable
      );
    };
    _VarNode_prototype.walk = function (f) {
      var ident;
      ident = f(this.ident);
      if (ident !== this.ident) {
        return VarNode(
          this.line,
          this.column,
          this.scope,
          ident,
          this.isMutable
        );
      } else {
        return this;
      }
    };
    _VarNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.ident, (_once = false, function (_e, ident) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return callback(null, ident !== _this.ident
          ? VarNode(
            _this.line,
            _this.column,
            _this.scope,
            ident,
            _this.isMutable
          )
          : _this);
      }));
    };
    return VarNode;
  }(Node));
  Node.Yield = YieldNode = (function (Node) {
    var _Node_prototype, _YieldNode_prototype;
    function YieldNode(line, column, scope, node) {
      var _this;
      _this = this instanceof YieldNode ? this : __create(_YieldNode_prototype);
      if (typeof line !== "number") {
        throw TypeError("Expected line to be a Number, got " + __typeof(line));
      }
      if (typeof column !== "number") {
        throw TypeError("Expected column to be a Number, got " + __typeof(column));
      }
      if (!(node instanceof Node)) {
        throw TypeError("Expected node to be a " + __name(Node) + ", got " + __typeof(node));
      }
      _this.line = line;
      _this.column = column;
      _this.scope = scope;
      _this._reduced = void 0;
      _this._macroExpanded = void 0;
      _this._macroExpandAlled = void 0;
      _this.node = node;
      return _this;
    }
    _Node_prototype = Node.prototype;
    _YieldNode_prototype = YieldNode.prototype = __create(_Node_prototype);
    _YieldNode_prototype.constructor = YieldNode;
    YieldNode.displayName = "YieldNode";
    if (typeof Node.extended === "function") {
      Node.extended(YieldNode);
    }
    YieldNode.cappedName = "Yield";
    YieldNode.argNames = ["node"];
    _YieldNode_prototype.type = function () {
      return Type.any;
    };
    _YieldNode_prototype._reduce = function (o) {
      var node;
      node = this.node.reduce(o).doWrap(o);
      if (node !== this.node) {
        return YieldNode(this.line, this.column, this.scope, node);
      } else {
        return this;
      }
    };
    _YieldNode_prototype.inspect = function (depth) {
      return inspectHelper(
        depth,
        "YieldNode",
        this.line,
        this.column,
        this.node
      );
    };
    _YieldNode_prototype.walk = function (f) {
      var node;
      node = f(this.node);
      if (node !== this.node) {
        return YieldNode(this.line, this.column, this.scope, node);
      } else {
        return this;
      }
    };
    _YieldNode_prototype.walkAsync = function (f, callback) {
      var _once, _this;
      _this = this;
      return f(this.node, (_once = false, function (_e, node) {
        if (_once) {
          throw Error("Attempted to call function more than once");
        } else {
          _once = true;
        }
        if (_e != null) {
          return callback(_e);
        }
        return callback(null, node !== _this.node ? YieldNode(_this.line, _this.column, _this.scope, node) : _this);
      }));
    };
    return YieldNode;
  }(Node));
  module.exports = Node;
}.call(this, typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this));