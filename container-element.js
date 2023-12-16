class ResponsiveElement extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.stats = [
        { name: "Carte 1", color: "#3498db" },
        { name: "Carte 2", color: "#2ecc71" },
        { name: "Carte 3", color: "#e74c3c" },
        { name: "Carte 4", color: "#f39c12" },
      ];
  
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./styles.css">
        <div class="data-section">
        </div>
        <form id="addStatForm">
          <label for="statName">Carte Name:</label>
          <input type="text" id="statName" required>
          <label for="statColor">Carte Color:</label>
          <input type="color" id="statColor" value="#3498db" required>
          <button type="submit">Ajouter une carte</button>
        </form>
      `;
  
      this.shadowRoot.getElementById('addStatForm').addEventListener('submit', this.addStat.bind(this));
      this.updateDataPresentation();
    }
  
    addStat(event) {
      event.preventDefault();
  
      const statNameInput = this.shadowRoot.getElementById('statName');
      const statColorInput = this.shadowRoot.getElementById('statColor');
  
      const newStat = {
        name: statNameInput.value,
        color: statColorInput.value,
      };
      this.stats.push(newStat);
      this.updateDataPresentation();
      statNameInput.value = '';
      statColorInput.value = '#3498db';
    }
  
    updateDataPresentation() {
      const dataSection = this.shadowRoot.querySelector('.data-section');
      dataSection.innerHTML = '';
      this.stats.forEach((stat, index) => {
        const dataCard = document.createElement('div');
        dataCard.className = 'data-card';
        dataCard.dataset.stat = stat.name;
        dataCard.innerHTML = `
          <button class="delete-button" data-index="${index}">X</button>
          <h2>${stat.name}</h2>
          <div class="bar-chart">
            <div class="bar" style="flex: ${Math.random()}; background-color: ${stat.color}"></div>
          </div>
          <div class="details">Details about ${stat.name}.</div>
        `;
        dataCard.style.backgroundColor = stat.color;
        dataSection.appendChild(dataCard);
        dataCard.addEventListener('click', this.showDetails.bind(this));
        dataCard.querySelector('.delete-button').addEventListener('click', this.deleteStat.bind(this));
      });
    }
  
    showDetails(event) {
      const dataCard = event.currentTarget;
      const details = dataCard.querySelector('.details');
      details.classList.toggle('fade-in');
      setTimeout(() => {
        details.classList.toggle('fade-in');
      }, 3000);
    }
  
    deleteStat(event) {
      const index = event.currentTarget.dataset.index;
      this.stats.splice(index, 1);
      this.updateDataPresentation();
    }
  }
  
  customElements.define('responsive-element', ResponsiveElement);
  