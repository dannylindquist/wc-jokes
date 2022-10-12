import { jokeStore } from './favoriteStore.js';
window.customElements.define(
  "joke-favorites",
  class extends HTMLElement {
    connectedCallback() {
      this.template = this.querySelector(":scope template");
      this.removeChild(this.template);
      jokeStore.addEventListener('update', this._storeUpdate.bind(this));
      this._render();
    }
    _storeUpdate(event) {
      console.log(event);
    }
    _clearChildren() {
      while(this.firstChild) {
        this.removeChild(this.firstChild);
      }
    }
    _render() {
      this._clearChildren();
      for(const fav of jokeStore.favorites) {
        console.log(fav)
        const node = document.importNode(this.template.content, true)
        const nodes = Array.from(node.querySelectorAll('[data-prop]'));
        for(const n of nodes) {
          if(fav[n.dataset.prop]) {
            n.innerText = fav[n.dataset.prop];
          }
        }
        this.appendChild(node);
      }
    }
  }
);
