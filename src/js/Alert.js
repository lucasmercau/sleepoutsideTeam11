class Alert {
    constructor() {
        this.alert = [];
    }

    loadAlerts() {
        try {
            const alertsData = require("../alert.json");
            this.alert = alertsData;
        } catch (error) {
            // Do nothing
        }
    }

    createAlertSection() {
        if (this.alert.length > 0) {
            const alertSection = document.createElement("section");
            alertSection.className = "alert-list";

            this.alerts.forEach((alert) => {
                const alertParagraph = document.createElement("p");
                alertParagraph.textContent = alert.message;

                if (alert.background) {
                    alertParagraph.style.backgroundColor = alert.background;
                }

                if (alert.color) {
                    alertParagraph.style.color = alert.color;
                }

                alertSection.appendChild(alertParagraph);
            });

            document.querySelector("main").prepend(alertSection);
        }
    }
}

export default Alert;