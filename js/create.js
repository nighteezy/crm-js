function createTableCell(text, className, innerHTML = null) {
    const cell = document.createElement('td');
    cell.textContent = text;
    cell.className = className;
    if (innerHTML) {
        cell.innerHTML = innerHTML;
    }
    return cell;
}

function createButton(text, className, clickHandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = className;
    button.addEventListener('click', clickHandler);
    return button;
}
const createContacts = (contacts, container) => {
    const contactContainer = document.createElement('div');
    const maxContactsShows = 4;

    contactContainer.classList.add('table-row__contacts', 'contacts');

    const count = contacts.length > maxContactsShows ? maxContactsShows : contacts.length;
    for (let i = 0; i < count; i++) {
        contactContainer.append(addContact(contacts[i]));
    }

    if (contacts.length > maxContactsShows) {
        const contact = document.createElement('div');

        contact.classList.add('contacts__item_more');
        contact.textContent = '+' + (contacts.length - maxContactsShows);
        contactContainer.append(contact);
        contact.addEventListener('click', () => {
        contact.remove();
        for (let i = maxContactsShows; i < contacts.length; i++) {
            contactContainer.append(addContact(contacts[i]));
        }
        });
    }
    container.append(contactContainer);
};

const getDate = (date) => {
    const getMonth = date.getMonth() + 1;
    const year = date.getFullYear();
    const month = getMonth < 10 ? '0' + getMonth : getMonth;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    const time =
        `${date.getHours() < 10 ? '0' + date.getHours() :
        date.getHours()}:${date.getMinutes() < 10 ?
            '0' + date.getMinutes() : date.getMinutes()}`
    return `${day}.${month}.${year} <span class = 'table-row__time'>${time}</span>`;
};

export default function createTableRow(user) {
const row = document.createElement('tr');
row.classList.add('table-row', 'table-body__row');

row.append(
    createTableCell(user.id, 'table-row__elem table-row__elem_id'),
    createTableCell(
    `<a class="table-row__elem-link" href="client.html?id=${user.id}">${user.surname} ${user.name} ${user.lastName}</a>`,
    'table-row__elem table-row__elem_fullname',
    ),
    createTableCell(getDate(new Date(user.createdAt)), 'table-row__elem table-row__elem_createDate'),
    createTableCell(getDate(new Date(user.updatedAt)), 'table-row__elem table-row__elem_lastUpdateDate'),
    createTableCell('', 'table-row__elem table-row__elem_contacts'), // contacts
    createTableCell('', 'table-row__elem table-buttons') // buttons
);

const actions = {
    changeButton: createButton(
        'Изменить',
        'table-buttons__button table-buttons__button_change',
    async () => {
        await modals.mainModal(TYPE.change, user.id);
    }
    ),
    deleteButton: createButton(
        'Удалить',
        'table-buttons__button table-buttons__button_delete',
    async () => {
        modals.deleteUser(user.id);
    }
    )
};

row.querySelector('.table-row__elem_contacts').innerHTML = createContacts(user.contacts); // Заполняем контакты
row.querySelector('.table-buttons').append(actions.changeButton, actions.deleteButton); // Добавляем кнопки

return row;
}