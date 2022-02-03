import { InvoiceService } from "./services/invoice.service.js";
import { StepperComponent } from "./components/stepper.js";

window.addEventListener('DOMContentLoaded', main);

function main() {

    console.info("DOM Loaded");

    withComponentApproach();
    //withBasicApproach();

}

function withComponentApproach() {
    const service = new InvoiceService();

    const stepper = new StepperComponent(
        document.querySelector(".js-stepper"),
        {
            onLastSubmit: (event, forms) => {
                event.preventDefault();

                const datas = Array.from(forms)
                    .map((form) => Object.fromEntries(new FormData(form)))
                    .reduce((prev, acc) => {
                        return { ...prev, ...acc };
                    });

                service.create(datas);
            }
        }
    );
}

function withBasicApproach() {

    const service = new InvoiceService();
    const sections = Array.from(
        document.querySelectorAll(".js-stepper__step"));

    const onSubmit = (event, sections, index) => {

        const nextSection = sections[index + 1];

        nextSection.style.display = null;

        setTimeout(() => nextSection.classList.remove("section--disabled"), 0);

        nextSection
            .querySelector(".js-stepper__submit-action")
            .disabled = false;
    }


    const onLastSubmit = (event, sections) => {

        event.preventDefault();

        const datas = sections
            .map((section) => section.querySelector(".js-stepper__form"))
            .map((form) => Object.fromEntries(new FormData(form)))
            .reduce((prev, acc) => {
                return { ...prev, ...acc };
            });

        service.create(datas);
    }

    sections.slice(1).forEach((section) => {
        section.style.display = "none";
        section.classList.add("section--disabled");
        section.querySelector(".js-stepper__submit-action").disabled = true;
    });

    sections.slice(0, -1).forEach((section, index) => {
        section.addEventListener("submit", (event) => onSubmit(event, sections, index));
    });

    sections.at(-1).addEventListener("submit", (event) => onLastSubmit(event, sections));

}
