export default function getTemplate(monster) {
  return `
    <tr data-id="${monster.id}">
      <td>${monster.name}</td>
    </tr>
  `;
}