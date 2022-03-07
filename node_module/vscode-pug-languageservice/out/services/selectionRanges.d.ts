import type * as html from 'vscode-html-languageservice';
import type * as vscode from 'vscode-languageserver';
import type { PugDocument } from '../pugDocument';
export declare function register(htmlLs: html.LanguageService): (pugDoc: PugDocument, posArr: vscode.Position[]) => vscode.SelectionRange[];
