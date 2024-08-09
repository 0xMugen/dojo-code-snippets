import * as vscode from 'vscode';
import * as path from 'path';
import { getCDMSnippet, getCDMTraitCompletions } from './snippets/cdmSnippet';
import { getCDSSnippet } from './snippets/cdsSnippet';

export function activate(context: vscode.ExtensionContext) {
    console.log('Cairo Dojo extension is now active!');

    const provider = vscode.languages.registerCompletionItemProvider(
        { scheme: 'file', language: 'cairo' },
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const linePrefix = document.lineAt(position).text.substr(0, position.character);
                console.log(`Line prefix: "${linePrefix}"`);

                const completionItems: vscode.CompletionItem[] = [];

                if (linePrefix.startsWith('cdm')) {
                    if (linePrefix.endsWith('.')) {
                        // Provide trait autocompletion
                        return getCDMTraitCompletions(linePrefix);
                    } else {
                        // Provide full snippet
                        console.log('Providing cdm snippet');
                        completionItems.push(getCDMSnippet(linePrefix.trim()));
                    }
                }
                
                if (linePrefix.endsWith('cds')) {
                    console.log('Providing cds snippet');
                    const fileName = path.parse(document.fileName).name;
                    console.log(`File name: ${fileName}`);
                    completionItems.push(getCDSSnippet(fileName));
                }

                if (completionItems.length === 0) {
                    console.log('No matching snippet found');
                }

                return completionItems;
            }
        },
        'c', 'd', 'm', 's', '.' // Trigger the completion on 'c', 'd', 'm', 's', and '.'
    );

    context.subscriptions.push(provider);
}

export function deactivate() {}