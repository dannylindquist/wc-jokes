import { jokeStore } from './favoriteStore.js';
window.customElements.define(
  "joke-favorites",
  class extends HTMLElement {
    connectedCallback() {
      this.template = this.querySelector(":scope template");
      this.removeChild(this.template);
      jokeStore.addEventListener('update', this._storeUpdate.bind(this));
      this.addEventListener('click', this._handleOnClick)
      this._render();
    }
    _handleOnClick(e) {
      let button = e.target;
      if(e.target.nodeName !== 'button') {
        button = e.target.closest("button[data-action='remove-joke']");
      }
      
      if(button) {
        const jokeId = button.closest('[data-joke]').dataset.joke;
        jokeStore.removeFavorite(jokeId);
      }
    }
    _storeUpdate(event) {
      this._render();
    }
    _clearChildren() {
      while(this.firstChild) {
        this.removeChild(this.firstChild);
      }
    }
    _render() {
      this._clearChildren();
      for(const fav of jokeStore.favorites) {
        const node = document.importNode(this.template.content, true)
        node.firstElementChild.dataset.joke = fav.id;
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
