import DB from "../../DB";
import Monster from "../monster/Monster";
import getTemplate from "./template";

export default class MonsterList {
  constructor(data) {
    this.domElt = document.querySelector(data.el);
    DB.setApiURL(data.apiURL);
    this.monsters = [];
    this.loadMonsters();
  }

  async loadMonsters() {
    const monsters = await DB.findAll();
    this.monsters = monsters.map((monster) => new Monster(monster));
    this.render();
  }

  getMonstersCount() {
    return this.monsters.length;
  }

  renderMonstersCount() {
    this.domElt.querySelector(".monsters-count").innerText =
      this.getMonstersCount();
  }

  async addMonster(data) {
    const monster = await DB.create(data);
    const newMonster = new Monster(monster);
    this.monsters.push(newMonster);
    this.listDomElt.append(newMonster.render());
    this.renderMonstersCount();
  }

  async deleteOneById(id) {
    await DB.deleteOneById(id);
    this.monsters.splice(
      this.monsters.findIndex((monster) => monster.id == id),
      1
    );
    this.domElt.querySelector(`[data-id='${id}']`).remove();
    this.renderMonstersCount();
  }

  render() {
    this.domElt.innerHTML = getTemplate();
    this.listDomElt = this.domElt.querySelector(".monsters-table tbody");
    this.monsters.forEach((monster) => this.listDomElt.append(monster.render()));
    this.renderMonstersCount();
    this.initEvents();
  }

  initEvents() {
    this.domElt.querySelector(".btn-add").addEventListener("click", () => {
      const data = {
        name: this.domElt.querySelector(".new-name").value,
        type: this.domElt.querySelector(".new-type").value,
        dangerLevel: Number(this.domElt.querySelector(".new-danger").value),
        year: Number(this.domElt.querySelector(".new-year").value),
      };
      if (!Monster.isValid(data)) return;
      this.addMonster(data);
      this.domElt.querySelector(".new-name").value = "";
      this.domElt.querySelector(".new-danger").value = "";
      this.domElt.querySelector(".new-year").value = "";
    });

    this.listDomElt.addEventListener("monster:deleted", async (e) => {
      await this.deleteOneById(e.detail.id);
    });
  }
}