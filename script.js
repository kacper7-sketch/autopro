
document.addEventListener("DOMContentLoaded", () => {

    const elementy = document.querySelectorAll(
        "#start h2, #start p, #start a, " +
        "#uslugi h2, #uslugi li, " +
        "#cennik h2, .cennik-pozycja, " +
        "#kontakt h2, #formularz-wizyty"
    );

    const obserwator = new IntersectionObserver(
        (wpisy) => {
            wpisy.forEach((wpis) => {
                if (wpis.isIntersecting) {
                    wpis.target.classList.add("widoczny");
                    obserwator.unobserve(wpis.target);
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    elementy.forEach((element) => {
        element.classList.add("animacja");
        obserwator.observe(element);
    });

});

/* OBSŁUGA MENU MOBILNEGO */

const przyciskMenu =
    document.querySelector(".menu-toggle");

const menu =
    document.querySelector("#menu");

if (przyciskMenu && menu) {

    function zamknijMenu() {
        menu.classList.remove("otwarte");

        przyciskMenu.setAttribute(
            "aria-expanded", "false"
        );

        przyciskMenu.setAttribute(
            "aria-label", "Otwórz menu"
        );
    }

    przyciskMenu.addEventListener("click", () => {
        const otwarte =
            menu.classList.toggle("otwarte");

        przyciskMenu.setAttribute(
            "aria-expanded", String(otwarte)
        );

        przyciskMenu.setAttribute(
            "aria-label",
            otwarte ? "Zamknij menu" : "Otwórz menu"
        );
    });

    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", zamknijMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            zamknijMenu();
        }
    });
}

/* BLOKADA DAT Z PRZESZŁOŚCI */
const dataWizyty = document.getElementById("data");
if (dataWizyty) {
    const dzis = new Date();
    const lokalnaData = [dzis.getFullYear(), String(dzis.getMonth() + 1).padStart(2, "0"), String(dzis.getDate()).padStart(2, "0")].join("-");
    dataWizyty.min = lokalnaData;
}
