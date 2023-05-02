const { response } = require("express");

/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const data = User.current();
    if (data) {
      const accountsList = Array.from(document.querySelectorAll('.accounts-select'));
      Account.list(data, (err, response) => {
        if (response.success === true) {
          let option;
          for(let i = 0; i < response.data.length; i++) {
            option += `<option value="${response.data[i].id}">${response.data[i].name}</option>`;
            accountsList[0].innerHTML = option;
            accountsList[1].innerHTML = option;
          }
        }
      })
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response && response.success === true) {
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
        this.element.reset();
        App.update();
      }
    })
  }
}