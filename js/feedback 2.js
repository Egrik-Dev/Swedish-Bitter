// ---- СОЗДАЁМ МОКИ ----

const russianTextsReviews = [
  `Если время от времени употреблять горечь, то вообще не будет болеть ОРЗ или ангинами.
  Младшему сыну я развожу раствор слабее (горечь, вода), он с удовольствием пьет,
  иногда даже сам просит сделать ему горечь.
  Только делаю меньше половины стакана, чтобы малыш смог выпить.
  `,
  `Этот сбор действительно очень хорошая вещь.
  Я его приобрела по совету своей тёти.
  Замечательно помогает при зубной боли, а также я его постоянно принимаю при простуде.
  Помогает хорошо и нет никакой химии.
  `,
  `Моя семья на протяжение многих лет пользуется шведской горечью.
  При болях в горле мы полоскаем горечью.
  Когда температура я даю горечь и при этом мы не пользуемся таблетками.
  `,
  `Я покупаю уже готовый сбор шведский бальзам.
  Отказались от многих лекарственных препаратов благодаря бальзаму.
  Так что могу только посоветовать самим попробовать, это стоит того.
  `,
  `Недавно мне порекомендовали попить Шведскую горечь для избавления от моих проблем с печенью.
  Я уже научилась не доверять сразу людям, а сначала проверить информацию.
  Прочитав то, что пишут о Шведской горечи я как то очень удивилась.
  Такое ощущение что настойка может помочь от практически всех заболеваний.
  И не нужно держать вдома здоровенную аптеку, нужно просто иметь вдома Шведскую горечь
  `,
  `Замечательный бальзам, просто бесценный! Я им пользуюсь много лет!
  Он помогал и помогает нам при простудных заболеваниях
  (1 ст. лож. бальзама на кружку не очень горячего чая и туда добавить мёд - особенно на ночь!!!)
  Но когда мы пропили с детьми по 2 курса (каждый день по 3 раза в день) и мы всю зиму не болели,
  а в городе была эпидемия и закрывались школы и сады на карантин.
  Так же обрабатываем бальзамчиком любые ранки, очень хорошая дезинфекция, быстро заживает
  `,
  `Это действительно незаменимая вещь и ещё и природная, натуральная, без химии!!!!
  От него никому ещё не было плохо! Если только рюмочку чистого бальзама хлабыснули сразу
  (вообще-то это не смешно ведь так действительно можно умереть, не говоря уже о температуре...)
  `
];

const foreignTextsReviews = [
  `Exfoliation in the shower, then using this right after the shower and applied
  consistently before bed other days took care of 80% of the KP on my legs.
  On top of looking better, my skin feels super soft. The smell is fine to me,
  it's not great but inoffensive - it's faint and doesn't stick around once the lotion is absorbed.
  `,
  `I’ve been using this for two days and have seen improvement already in my skin,
  especially the pesky little bumps on my arms and legs, so that’s why
  I gave it two stars. The downside is that it smells SO strongly like ranch dressing!
  The bottle says it is fragrance free but there’s a strong smell when you apply it and it
  smells exactly like ranch! It can be covered up with some perfume or cologne but everyone
  I have asked says it smells like a bottle of Hidden Valley dressing, so that’s pretty
  disappointing and gross.
  `,
  `This supplement has done me a world of good. I have suffered from weak digestion for many years.
  A small sip of Swedish bitters before each meal makes a noticeable difference
  in the speed and comfort of my digestion.
  And when I foolishly eat too much, a big sip almost magically relieves most of that
  uncomfortable bloated feeling.
  `,
  `I have many problems in my intestine, colitis,
  very easy to get diarrhea and makes a lot of gas which is very embarrassing. After taking this bitter,
  diarrhea & gas stopped! What a relief. I have to take this rest of my life.
  `,
  `When mixed with an ounce of water and about 1/2 teaspoon of bitters,
  sipped slowly approximately 20 minutes before eating,
  this product greatly enhances the digestive abilities of my system.
  `
];

const russianNames = [`Наталья`, `Евгения`, `Ангелина`, `Аноним`, `Елена`, `Юля`, `Кристина`];
const foreignNames = [`Lucy`, `Natalie`, `Angella`, `Donna`, `Christina`];

// Создаём мапу по языкам
const Language = {
  RUSSIAN: `russian`,
  FOREIGN: `foreign`
};

// Создаём мапу с кол-во отзывов
const TotalReviews = {
  RUSSIAN: 7,
  FOREIGN: 5
}

// Функция генерации случайного числа
const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

// Функция которая будет удалить не нужные элементы массива
const delItemArray = (indexStart, quantityItems, arr) => {
  arr.splice(indexStart, quantityItems);
}

// Делаем функцию которая будет возвращать объект с 1 отзывом
const generateReview = (arrReviews, arrNames) => {

  const indexReview = getRandomInteger(0, arrReviews.length - 1);
  const indexName = getRandomInteger(0, arrNames.length - 1);

  const review = {
    comment: arrReviews[indexReview],
    name: arrNames[indexName]
  };

  delItemArray(indexReview, 1, arrReviews);
  delItemArray(indexName, 1, arrNames);

  return review
};

// Функция для генерация массива с объектами отзывов
const generateReviews = (arrReviews, arrNames, quantity) => {
  return new Array(quantity)
  .fill(``)
  .map(() => generateReview(arrReviews, arrNames))
}

const arrRusReviews = generateReviews(russianTextsReviews, russianNames, TotalReviews.RUSSIAN);
const arrForeignReviews = generateReviews(foreignTextsReviews, foreignNames, TotalReviews.FOREIGN);







// ---- РЕНДЕРИМ СТАРТОВЫЕ КОММЕНТЫ ----

// Удаляем блок заглушку
const nojsBlockElement = document.querySelector(`.feedback__nojs-block`)
nojsBlockElement.remove();

// Определяем константы по кол-ву стартовых комментов
const MOBILE_QUANTITY_REVIEWS = 2;
const DESKTOP_QUANTITY_REVIEWS = 4;

// Обозначим максимальный вьюпорт
const MIN_DESKTOP_WIDTH = 1200;

// Находим блоки куда будем аппендить отзывы
const russianContainerElement = document.querySelector(`.feedback__reviews-list--russian`);
const foreignContainerElement = document.querySelector(`.feedback__reviews-list--foreign`);

// Создаём контейнер для корректной вставки в HTML
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// Функция создающая разметку отзыва
const generateMarkupReview = (review) => {
  const {comment, name} = review;

  return (`<li class="feedback__item-review">
  <blockquote class="feedback__review">
    <p class="feedback__review-text">
    ${comment}
    </p>
    <cite class="feedback__review-name">${name}</cite>
  </blockquote>
</li>`)
};

// Функция аппендит отзывы
const appendReviews = (arrReviews, quantity, container) => {
  arrReviews.forEach((item, index) => {
    if (index < quantity) {
      container.append(createElement(generateMarkupReview(item)));
    }
  })
  delItemArray(0, quantity, arrReviews);
}

const renderStartReviews = () => {
  const quantityReviews = (clientWidth >= MIN_DESKTOP_WIDTH) ? DESKTOP_QUANTITY_REVIEWS : MOBILE_QUANTITY_REVIEWS;
  appendReviews(arrRusReviews, quantityReviews, russianContainerElement);
  appendReviews(arrForeignReviews, quantityReviews, foreignContainerElement);
}

renderStartReviews();





// ---- РЕНДЕРИМ ОСТАВШИЕСЯ КОММЕНТЫ ----

let currentTab = Language.RUSSIAN;
const russianReviewsElement = document.querySelector(`.feedback__input-russian`);
const foreignReviewsElement = document.querySelector(`.feedback__input-foreign`);
const readMoreBtn = document.querySelector(`.feedback__btn-more-reviews`);

// Разблокируем кнопку "Читать ещё отзывы"
readMoreBtn.removeAttribute(`disabled`);

// Функция которая дизеблит кнопку "Читать ещё отзывы" при нажатии на вкладки языков и устанавливает флаг
const CheckDisabledBtn = (arr, flag) => {
  currentTab = flag;

  if (arr.length > 0) {
    readMoreBtn.removeAttribute(`disabled`);
  } else {
    readMoreBtn.setAttribute(`disabled`, `disabled`);
  }
}

russianReviewsElement.addEventListener(`click`, () => CheckDisabledBtn(arrRusReviews, Language.RUSSIAN))
foreignReviewsElement.addEventListener(`click`, () => CheckDisabledBtn(arrForeignReviews, Language.FOREIGN))

// Функция аппендит оставшиеся отзывы
const appendRemaindReviews = (lang) => {
  switch (lang) {
    case Language.RUSSIAN:
      appendReviews(arrRusReviews, arrRusReviews.length, russianContainerElement);
      break;
    case Language.FOREIGN:
      appendReviews(arrForeignReviews, arrForeignReviews.length, foreignContainerElement);
      break;

    default:
      console.log("Нет больше отзывов!");
  }
}

// Вешаем слушателя на кнопку "Читать ещё отзывы"
readMoreBtn.addEventListener(`click`, () => {
  appendRemaindReviews(currentTab);
  readMoreBtn.setAttribute(`disabled`, `disabled`);
})
