/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */
import {Component} from "../../../src/cm-web-modules/app/Component.js"
import {Observe} from "../../../src/cm-web-modules/observe/Observe.js";
import {EventUtils} from "../../../src/cm-web-modules/utils/EventUtils.js";

export class ListOutputComponent extends Component {
    constructor(app, element, props) {
        super(app, element, props)
        this.actions = {
            "check": (event) => {
                for (const todo of app.state.todos) {
                    if (todo.id === parseInt(event.target.dataset.id, 10)) {
                        todo.done = event.target.checked
                        break
                    }
                }
            }
        }
        EventUtils.delegate(element, "change", "input[type='checkbox']", (event) => {
            this.actions.check(event)
        })
        Observe.property(app.state, "todos", () => {
            let html = ""
            for (const value of app.state.todos) {
                html += `<li><label><input data-id="${value.id}" type="checkbox" ${(value.done ? "checked" : "")} />${value.text}</label></li>`
            }
            element.innerHTML = html
        })
    }
}