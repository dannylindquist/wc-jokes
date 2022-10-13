import { jokeStore } from "./favoriteStore.js";
window.customElements.define(
  "joke-view",
  class extends HTMLElement {
    connectedCallback() {
      this.jokeText = this.querySelector("#joke");
      this.button = this.querySelector(":scope button[type=submit]");
      this.button.addEventListener("click", () => {
        this.fetchJoke();
      });
      this.favoriteButton = this.querySelector(":scope button[data-name=favorite]");
      this.favoriteButton.addEventListener('click', () => {
        this.addFavorite();
      })
      this.fetchJoke();
    }
    disconnectedCallback() {
      console.log("we've disconnected");
    }
    async fetchJoke() {
      this.button.disabled = true;
      const res = await fetch("https://icanhazdadjoke.com", {
        headers: {
          accept: "application/json",
        },
      });
      const data = await res.json();
      this.currentJoke = data;
      this.jokeText.textContent = data.joke;
      this.button.disabled = false;
      if(jokeStore.favorites.find(x => x.id === data.id)) {
        this.favoriteButton.querySelector('svg').classList.add('fill-red-300');
      } else {
        this.favoriteButton.querySelector('svg').classList.remove('fill-red-300');
      }
    }
    addFavorite() {
      jokeStore.addFavorite(this.currentJoke);
      this.favoriteButton.querySelector('svg').classList.add('fill-red-300');
    }
  }
);
