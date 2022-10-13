class FavoriteStore extends EventTarget {
  constructor() {
    super();
    this.favorites = [];
  }
  loadFavorites() {
    const stored = localStorage.getItem("favorites");
    this.favorites = stored ? JSON.parse(stored) : [];
  }
  removeFavorite(jokeId) {
    this.favorites = this.favorites.filter(x => x.id !== jokeId);
    this.write();
    this.dispatchEvent(new CustomEvent('update', {
      detail: {
        type: 'remove',
        data: jokeId
      }
    }))
  }
  addFavorite(joke) {
    this.favorites.push(joke);
    this.write();
    this.dispatchEvent(
      new CustomEvent("update", {
        detail: {
          type: 'add',
          data: joke
        }
      })
    );
  }
  write() {
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }
}
const jokeStore = new FavoriteStore();
jokeStore.loadFavorites();
export { jokeStore };
