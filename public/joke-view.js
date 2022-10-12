import { jokeStore } from "./favoriteStore.js";
window.customElements.define(
  "joke-view",
  class extends HTMLElement {
    connectedCallback() {
      this.jokeText = this.querySelector("#joke");
      this.button = this.querySelector(":scope button[type=submit]");
      console.log(this.children);
      this.button.addEventListener("click", () => {
        this.fetchJoke();
      });
      this.fetchJoke();
    }
    async fetchJoke() {
      this.button.disabled = true;
      const res = await fetch("https://icanhazdadjoke.com", {
        headers: {
          accept: "application/json",
        },
      });
      const data = await res.json();
      this.currentJoke = data.joke;
      this.jokeText.textContent = data.joke;
      this.button.disabled = false;
    }
    addFavorite() {
      jokeStore.addFavorite(this.currentJoke);
    }
  }
);
