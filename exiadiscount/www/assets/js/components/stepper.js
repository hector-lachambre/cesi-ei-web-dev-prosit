import { Component } from "./component.js";

export class StepperComponent extends Component {

    _state = {
        steps: []
    };


    constructor(element, props = {}) {
        super(element, props);
        this.initState(props);
    }


    initState(props) {
        this._element
            .querySelectorAll(".js-stepper__step")
            .forEach(section => {

                this.setState({
                    steps: [
                        ...this._state.steps,
                        {
                            section: section,
                            validated: false
                        }
                    ]
                });

                section.addEventListener('submit', () => this._validateSection(section));
            });

        this._state.steps.at(-1).section.addEventListener(
            'submit',
            (e) => props.onLastSubmit(e, this._element.querySelectorAll(".js-stepper__form"))
        );
    }


    render() {

        this._state.steps.forEach((step, index) => {

            if (index === 0) return;

            const lastStep = this._state.steps[index - 1];

            step.section.style.display = lastStep.validated ? null : "none";
            step.section
                .querySelector(".js-stepper__submit-action")
                .disabled = !lastStep.validated;

            setTimeout(() => step.section.classList.toggle("section--disabled", !lastStep.validated), 0);

        });

    }


    _validateSection(section) {
        let updated = this._state.steps
            .find((item) => item.section === section);

        updated.validated = true;

        this.setState({
            steps: [...this._state.steps]
        });
    }

}