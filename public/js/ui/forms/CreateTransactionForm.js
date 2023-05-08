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
      const accountsList = this.element.querySelector('select.accounts-select');
      accountsList.innerHTML = '';
      Account.list(data, (err, response) => {
        if (response.success) {
          let result = data.reduce((acc) => {
            response.data.forEach((value) => {
              acc += `<option value="${value.id}">${value.name}</option>`;
              return acc;
            })
          });
          accountsList.innerHTML = result;
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