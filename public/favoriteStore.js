class FavoriteStore extends EventTarget {
  constructor() {
    super();
    this.favorites = [];
  }
  loadFavorites() {
    const stored = localStorage.getItem("favorites");
    this.favorites = stored ? JSON.parse(stored) : [];
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
