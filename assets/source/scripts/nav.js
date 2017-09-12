const { el, touchEvent } = require('./utils');
const Headroom = require('headroom.js');

const initDynamicHeader = () => {
  const mainNavElement = el('main-nav');

  const headroom = new Headroom(mainNavElement, {
    classes: {
      initial: 'main',
      pinned: 'pinned',
      unpinned: 'unpinned',
      top: 'topped',
      notTop: 'untopped',
    },
    offset: 50,
    tolerance: 10,
  });

  headroom.init();
};

const initMenuButtonClick = () => {
  const menuElement = el('main-nav-menu');
  const mobileNavElement = el('mobile-nav');
  const closeNavElementClassList = el('mobile-nav-close').classList;

  const rootClassList = document.documentElement.classList;

  window.addEventListener(touchEvent, event => {
    const { target } = event;

    const navShown = rootClassList.contains('nav');

    const clickedOnMenu = menuElement.contains(target) || (mobileNavElement.contains(target));

    if (navShown && !clickedOnMenu) {
      event.preventDefault();
      event.stopPropagation();
    }

    rootClassList[clickedOnMenu ? 'add' : 'remove']('nav');
    closeNavElementClassList[clickedOnMenu ? 'add' : 'remove']('open');
  });
};

const initNavSearchBox = () => {
  const searchBoxElement = el('search-box');
  const searchIconElement = el('search-icon', searchBoxElement);
  const searchFieldElement = el('search-field', searchBoxElement);
  const searchDropdownElement = el('search-dropdown', searchBoxElement);
  const optionElements = Array.from(searchDropdownElement.children);

  const activeClass = 'active';
  const openedClass = 'opened';
  let searchType = 'hire';

  searchIconElement.addEventListener(touchEvent, () => {
    searchBoxElement.classList.toggle(openedClass);
  });

  optionElements.forEach(activeOptionElement => {
    activeOptionElement.addEventListener(touchEvent, event => {
      event.preventDefault();

      optionElements.forEach(optionElement => {
        optionElement.classList.remove(activeClass);
      });

      activeOptionElement.classList.add(activeClass);
      searchBoxElement.classList.remove(openedClass);
      searchFieldElement.setAttribute('placeholder', `Find ${activeOptionElement.textContent}`);
      searchType = activeOptionElement.dataset.value;
    });
  });

  searchBoxElement.addEventListener('submit', event => {
    event.preventDefault();

    const searchValue = searchFieldElement.value;

    window.location = `https://golance.com/${searchType}/?query=${searchValue}`;
  });

  window.addEventListener(touchEvent, event => {
    const { target } = event;

    const clickedOnSearchBox = searchBoxElement.contains(target);

    if (clickedOnSearchBox) {
      return;
    }

    searchBoxElement.classList.remove(openedClass);
  });
};

exports.init = () => {
  initDynamicHeader();
  initMenuButtonClick();
  initNavSearchBox();
};
