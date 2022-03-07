"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
function register({ sourceFiles }) {
    return (uri, range) => {
        const sourceFile = sourceFiles.get(uri);
        if (!sourceFile)
            return;
        const tsResult = getTsResult(sourceFile);
        if (tsResult !== undefined)
            return tsResult;
        // precede html for support inline css service
        const cssResult = getCssResult(sourceFile);
        if (cssResult !== undefined)
            return cssResult;
        const htmlResult = getHtmlResult(sourceFile);
        if (htmlResult !== undefined)
            return htmlResult;
        const pugResult = getPugResult(sourceFile);
        if (pugResult !== undefined)
            return pugResult;
        return {
            language: 'vue',
            document: undefined,
            sourceMap: undefined,
            range,
        };
        function getTsResult(sourceFile) {
            for (const sourceMap of sourceFile.getTsSourceMaps()) {
                for (const [tsRange] of sourceMap.getMappedRanges(range.start, range.end)) {
                    return {
                        sourceMap,
                        language: sourceMap.mappedDocument.languageId,
                        document: sourceMap.mappedDocument,
                        range: tsRange,
                    };
                }
            }
        }
        function getHtmlResult(sourceFile) {
            for (const sourceMap of sourceFile.getHtmlSourceMaps()) {
                for (const [htmlRange] of sourceMap.getMappedRanges(range.start, range.end)) {
                    return {
                        sourceMap,
                        language: sourceMap.mappedDocument.languageId,
                        document: sourceMap.mappedDocument,
                        range: htmlRange,
                    };
                }
            }
        }
        function getPugResult(sourceFile) {
            for (const sourceMap of sourceFile.getPugSourceMaps()) {
                for (const [pugRange] of sourceMap.getMappedRanges(range.start, range.end)) {
                    return {
                        sourceMap,
                        language: sourceMap.mappedDocument.languageId,
                        document: sourceMap.mappedDocument,
                        range: pugRange,
                    };
                }
            }
        }
        function getCssResult(sourceFile) {
            for (const sourceMap of sourceFile.getCssSourceMaps()) {
                for (const [cssRange] of sourceMap.getMappedRanges(range.start, range.end)) {
                    return {
                        sourceMap,
                        language: sourceMap.mappedDocument.languageId,
                        document: sourceMap.mappedDocument,
                        range: cssRange,
                    };
                }
            }
        }
    };
}
exports.register = register;
//# sourceMappingURL=embeddedDocument.js.map