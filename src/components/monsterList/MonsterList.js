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

  render() {
    this.domElt.innerHTML = getTemplate();
    this.listDomElt = this.domElt.querySelector(".monsters-table tbody");
    this.monsters.forEach((monster) => this.listDomElt.append(monster.render()));
    this.renderMonstersCount();
  }
}