import { InvoiceService } from "./services/invoice.service.js";
import { StepperComponent } from "./components/stepper.js";

window.addEventListener('DOMContentLoaded', main);

function main() {

    console.info("DOM Loaded");

    // A simple way to develop JS components without external dependencies.
    // This approach helps to better understand component-oriented frameworks like Angular, React, Vue.js... 
    // It doesn't include all the behaviors of these frameworks but it should help you develop with them.

    withComponentApproach();


    // A more classic approach without using components.

    // withBasicApproach();
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

                const feedback = document.querySelector(".js-feedback");

                feedback.innerHTML = "Une facture a bien été crée, malheureusement le service de gestion des factures n'est pas encore disponible :/"
                feedback.classList.add("feedback--active", "feedback--error");

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
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

        if (!nextSection) return;

        nextSection.style.display = null;

        // Let the only JS thread remove <display> property
        setTimeout(() => nextSection.classList.remove("section--disabled"), 0);

        nextSection
            .querySelector(".js-stepper__submit-action")
            .disabled = false;

        setTimeout(() => sections[index + 1].scrollIntoView({behavior: "smooth"}), 0);
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

        const feedback = document.querySelector(".js-feedback");

        feedback.innerHTML = "Une facture a bien été crée, malheureusement le service de gestion des factures n'est pas encore disponible :/"
        feedback.classList.add("feedback--active", "feedback--error");

        setTimeout(() => window.scrollTo({
            top: 0,
            behavior: 'smooth',
        }), 0);
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
