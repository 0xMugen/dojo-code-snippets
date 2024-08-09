import * as vscode from 'vscode';

export function getCDSSnippet(fileName: string): vscode.CompletionItem {
    const pascalCaseFileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
    
    const snippetCompletion = new vscode.CompletionItem('cds');
    snippetCompletion.insertText = new vscode.SnippetString(
`#[dojo::interface]
trait I${pascalCaseFileName} {
    \${1:// Add your trait methods here}
}

#[dojo::contract]
mod ${fileName} {
    use super::I${pascalCaseFileName};

    #[abi(embed_v0)]
    impl ${pascalCaseFileName}Impl of I${pascalCaseFileName}<ContractState> {
        \${2:// Implement your trait methods here}
    }
    \${0}
}`
    );
    snippetCompletion.documentation = new vscode.MarkdownString("Create a new Dojo system structure");
    return snippetCompletion;
}