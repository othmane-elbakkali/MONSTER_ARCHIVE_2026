import getTemplate from "./template";

export default class Monster {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.dangerLevel = data.dangerLevel;
    this.year = data.year;
    this.domElt = null;
  }

  static isValid(data) {
    return (
      data.name !== "" &&
      data.dangerLevel >= 1 &&
      data.dangerLevel <= 5 &&
      data.year >= 1950 &&
      data.year <= 1969
    );
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = getTemplate(this);
    this.domElt = template.content.firstElementChild;
    return this.domElt;
  }
}