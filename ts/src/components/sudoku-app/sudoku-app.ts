import { Component } from '../component';

export class SudokuApp extends Component {
    
    protected getTemplate(): HTMLTemplateElement  {

        const template = document.createElement('template');
        template.innerHTML = require('./sudoku-app.html');
        return template;
    }
}

customElements.define('sudoku-app', SudokuApp);