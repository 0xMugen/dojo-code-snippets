import * as vscode from 'vscode';

export function getCDMSnippet(triggerString: string): vscode.CompletionItem {
    const traits = ['Drop', 'Serde'];
    if (triggerString.includes('.clone')) traits.unshift('Clone');
    if (triggerString.includes('.copy')) traits.unshift('Copy');
    
    const traitsString = traits.join(', ');
    
    const snippetCompletion = new vscode.CompletionItem(triggerString);
    snippetCompletion.insertText = new vscode.SnippetString(
`#[derive(${traitsString})]
#[dojo::model]
pub struct \${1:ModelName} {
    \${2:// Add your fields here}
}`
    );
    snippetCompletion.documentation = new vscode.MarkdownString(`Create a new Dojo model struct with ${traitsString} traits`);
    return snippetCompletion;
}

export function getCDMTraitCompletions(currentTraits: string): vscode.CompletionItem[] {
    const availableTraits = ['clone', 'copy'];
    const completions: vscode.CompletionItem[] = [];

    for (const trait of availableTraits) {
        if (!currentTraits.includes(trait)) {
            const completion = new vscode.CompletionItem(trait);
            completion.kind = vscode.CompletionItemKind.Keyword;
            completion.insertText = trait;
            completion.documentation = new vscode.MarkdownString(`Add ${trait} trait to the Dojo model struct`);
            completions.push(completion);
        }
    }

    return completions;
}