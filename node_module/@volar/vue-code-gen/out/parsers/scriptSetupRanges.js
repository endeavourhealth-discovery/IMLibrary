"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartEnd = exports.findBindingVars = exports.parseBindingRanges = exports.parseScriptSetupRanges = void 0;
function parseScriptSetupRanges(ts, ast) {
    let withDefaultsArg;
    let propsRuntimeArg;
    let propsTypeArg;
    let emitsRuntimeArg;
    let emitsTypeArg;
    let emitsTypeNums = -1;
    const bindings = parseBindingRanges(ts, ast, false);
    const typeBindings = parseBindingRanges(ts, ast, true);
    ast.forEachChild(node => {
        visitNode(node);
    });
    return {
        bindings,
        typeBindings,
        withDefaultsArg,
        propsRuntimeArg,
        propsTypeArg,
        emitsRuntimeArg,
        emitsTypeArg,
        emitsTypeNums,
    };
    function _getStartEnd(node) {
        return getStartEnd(node, ast);
    }
    function visitNode(node) {
        var _a;
        if (ts.isCallExpression(node)
            && ts.isIdentifier(node.expression)) {
            const callText = node.expression.getText(ast);
            if (callText === 'defineProps' || callText === 'defineEmits') {
                if (node.arguments.length) {
                    const runtimeArg = node.arguments[0];
                    if (callText === 'defineProps') {
                        propsRuntimeArg = _getStartEnd(runtimeArg);
                    }
                    else {
                        emitsRuntimeArg = _getStartEnd(runtimeArg);
                    }
                }
                else if ((_a = node.typeArguments) === null || _a === void 0 ? void 0 : _a.length) {
                    const typeArg = node.typeArguments[0];
                    if (callText === 'defineProps') {
                        propsTypeArg = _getStartEnd(typeArg);
                    }
                    else {
                        emitsTypeArg = _getStartEnd(typeArg);
                        if (ts.isTypeLiteralNode(typeArg)) {
                            emitsTypeNums = typeArg.members.length;
                        }
                    }
                }
            }
            else if (callText === 'withDefaults') {
                if (node.arguments.length >= 2) {
                    const arg = node.arguments[1];
                    withDefaultsArg = _getStartEnd(arg);
                }
            }
        }
        node.forEachChild(child => visitNode(child));
    }
}
exports.parseScriptSetupRanges = parseScriptSetupRanges;
function parseBindingRanges(ts, sourceFile, isType) {
    const bindings = [];
    sourceFile.forEachChild(node => {
        if (!isType) {
            if (ts.isVariableStatement(node)) {
                for (const node_2 of node.declarationList.declarations) {
                    const vars = _findBindingVars(node_2.name);
                    for (const _var of vars) {
                        bindings.push(_var);
                    }
                }
            }
            else if (ts.isFunctionDeclaration(node)) {
                if (node.name && ts.isIdentifier(node.name)) {
                    bindings.push(_getStartEnd(node.name));
                }
            }
            else if (ts.isClassDeclaration(node)) {
                if (node.name) {
                    bindings.push(_getStartEnd(node.name));
                }
            }
            else if (ts.isEnumDeclaration(node)) {
                bindings.push(_getStartEnd(node.name));
            }
        }
        else {
            if (ts.isTypeAliasDeclaration(node)) {
                bindings.push(_getStartEnd(node.name));
            }
            else if (ts.isInterfaceDeclaration(node)) {
                bindings.push(_getStartEnd(node.name));
            }
        }
        if (ts.isImportDeclaration(node)) {
            if (node.importClause && (isType || !node.importClause.isTypeOnly)) {
                if (node.importClause.name) {
                    bindings.push(_getStartEnd(node.importClause.name));
                }
                if (node.importClause.namedBindings) {
                    if (ts.isNamedImports(node.importClause.namedBindings)) {
                        for (const element of node.importClause.namedBindings.elements) {
                            bindings.push(_getStartEnd(element.name));
                        }
                    }
                    else if (ts.isNamespaceImport(node.importClause.namedBindings)) {
                        bindings.push(_getStartEnd(node.importClause.namedBindings.name));
                    }
                }
            }
        }
    });
    return bindings;
    function _getStartEnd(node) {
        return getStartEnd(node, sourceFile);
    }
    function _findBindingVars(left) {
        return findBindingVars(ts, left, sourceFile);
    }
}
exports.parseBindingRanges = parseBindingRanges;
function findBindingVars(ts, left, sourceFile) {
    const vars = [];
    worker(left);
    return vars;
    function worker(_node) {
        if (ts.isIdentifier(_node)) {
            vars.push(getStartEnd(_node, sourceFile));
        }
        // { ? } = ...
        // [ ? ] = ...
        else if (ts.isObjectBindingPattern(_node) || ts.isArrayBindingPattern(_node)) {
            for (const property of _node.elements) {
                if (ts.isBindingElement(property)) {
                    worker(property.name);
                }
            }
        }
        // { foo: ? } = ...
        else if (ts.isPropertyAssignment(_node)) {
            worker(_node.initializer);
        }
        // { foo } = ...
        else if (ts.isShorthandPropertyAssignment(_node)) {
            vars.push(getStartEnd(_node.name, sourceFile));
        }
        // { ...? } = ...
        // [ ...? ] = ...
        else if (ts.isSpreadAssignment(_node) || ts.isSpreadElement(_node)) {
            worker(_node.expression);
        }
    }
}
exports.findBindingVars = findBindingVars;
function getStartEnd(node, sourceFile) {
    // TODO: high cost
    const start = node.getStart(sourceFile);
    const end = node.getEnd();
    return {
        start: start,
        end: end,
    };
}
exports.getStartEnd = getStartEnd;
//# sourceMappingURL=scriptSetupRanges.js.map