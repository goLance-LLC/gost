const { el } = require('./utils');

const navigation = el('navigation');
const toggleButton = el('toggle-button', navigation);
const activeClassName = 'shown';

toggleButton.addEventListener('click', () => {
  const navClassList = navigation.classList;

  navClassList[navClassList.contains(activeClassName) ? 'remove' : 'add'](activeClassName);
});
