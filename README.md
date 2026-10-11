# The Pavement Barbershop: концепт сайту (головна + меню)

Статичний сайт без збірки. Світла тема з бордовим акцентом, шрифти DM Sans (інтерфейс) і Fraunces (заголовки), обидва лежать у `assets/fonts`.

## Структура

```
index.html               Головна (відгуки одразу під першим екраном)
services/ barbers/ gallery/ pricing/ about/ contact/   Сторінки меню (index.html у кожній)
assets/css/tokens.css    Кольори, шрифти, відступи (генерується з конфігу)
assets/css/base.css      Компоненти й розкладка
assets/js/config.js      Години роботи для статусу Open/Closed
assets/js/site.js        Меню, статус, фільтри галереї, карусель, форма (демо)
robots.txt               Disallow: / (демо)
.nojekyll                Потрібен для GitHub Pages
```

## Перегляд

- Локально: двічі клікніть `index.html`, або в цій папці `python -m http.server 8000` і відкрийте http://localhost:8000
- GitHub Pages: Settings, Pages, Deploy from branch, `main`, `/ (root)`.
- Cloudflare Pages: підключіть репозиторій, build command порожня, output directory `/`.

## Реальні дані (з Google Maps)

Назва, адреса 8 Worple Road SW19 4DA, телефон 020 8946 2744, рейтинг 4.9 за 1 149 відгуків, години (пн-пт 9:15-19:30, сб 9:00-18:30, нд 10:30-17:30), чотири короткі уривки відгуків дослівно, імена майстрів із відгуків (Alexi, Aleksander, Mehdi).

## Перед показом власнику

- Жовто-бордові підкреслені тексти в дужках (`[£XX]`, `[Specialty]`, `[rating]`, `[email address]`, `@handle`, політики) це плейсхолдери.
- Імена майстрів узято з відгуків, їх треба підтвердити. Послуги (Haircut, Skin fade, Beard trim, Haircut and beard) виведено з відгуків, ціни не вказано.
- Кнопка «Book now» і «Call» ведуть на дзвінок (`tel:`).
- На сторінках `noindex`. Для бойового запуску прибрати його і вміст `robots.txt`.
- Репозиторій краще тримати приватним, бо в ньому реальна назва й телефон бізнесу.
