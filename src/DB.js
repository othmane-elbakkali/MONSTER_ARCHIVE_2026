export default class DB {
  static setApiURL(data) {
    this.apiURL = data;
  }

  static async findAll() {
    const response = await fetch(this.apiURL + "monsters");
    return response.json();
  }

  static async create(data) {
    const response = await fetch(this.apiURL + "monsters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        type: data.type,
        dangerLevel: data.dangerLevel,
        year: data.year,
      }),
    });
    return response.json();
  }

  static async updateOne(monster) {
    const response = await fetch(this.apiURL + "monsters/" + monster.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: monster.name,
        type: monster.type,
        dangerLevel: monster.dangerLevel,
        year: monster.year,
      }),
    });
    return response.json();
  }

  static async deleteOneById(id) {
    const response = await fetch(this.apiURL + "monsters/" + id, {
      method: "DELETE",
    });
    return response.json();
  }
}