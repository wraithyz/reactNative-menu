import axios from 'axios';

let tayMenu = [];
let tamkMenu = [];
let ttyMenu = [];
let today = new Date();

function getRestaurantMenu(path, juvenes) {
  return new Promise((resolve, reject) => {
    axios.get(path)
      .then((response) => {
        if (juvenes) {
          const fixedjson1 = response.data.replace(/"}\);/g, '}');
          const fixedjson3 = fixedjson1.slice(1, 6) + fixedjson1.slice(7);
          const finalData = fixedjson3.replace(/\\/g, '');
          return resolve(JSON.parse(finalData));
        }
        return resolve(response.data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

function parseAmica(data, restaurantName, uniMenu) {
  let menu = [];
  for (let today of data.MenusForDays[0].SetMenus) {
    let courses = [];
    for (let foods of today.Components) {
      const foodName = foods.substring(0, foods.indexOf('('));
      const foodDiets = foods.substring(foods.indexOf('(') + 1, foods.length - 2);
      courses.push({
        name: foodName,
        diets: foodDiets,
      })
    }
    const foodCategory = today.Name.substring(0, today.Name.indexOf(',') - 2);
    const foodPrice = today.Name.substring(today.Name.indexOf(',') - 1);
    menu.push({
      category: foodCategory,
      price: foodPrice,
      courses: courses,
    })
  }
  uniMenu.push({
    restaurant: restaurantName,
    menu: menu
  });
}

function parseSodexo(data, restaurantName, uniMenu) {
  let menu = [];
  for (let today of data.courses) {
    let courses = [];
    courses.push({
      name: today.title_fi,
      diets: today.properties,
    })
    menu.push({
      category: today.category,
      price: today.price,
      courses: courses,
    })
  }
  uniMenu.push({
    restaurant: restaurantName,
    menu: menu
  });
}

function parseJuvenes(data, restaurantName, uniMenu) {
  let menu = [];
  for (let today of data.d.MealOptions) {
    let courses = [];
    for (let food of today.MenuItems) {
      if (food.Name.length === 0) {
        continue;
      }
      courses.push({
        name: food.Name,
        diets: food.Diets,
      })
    }
    menu.push({
      category: today.Name,
      price: '',
      courses: courses,
    })
  }
  uniMenu.push({
    restaurant: restaurantName,
    menu: menu
  });
}

function getTayMenu() {
  return new Promise((resolve, reject) => {
    // 3 = fusion
    // 5 = vegebar
    // 52 = staff
    // 60 = normaali
    const testi = `http://www.sodexo.fi/ruokalistat/output/weekly_json/92/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}/fi`;
    console.log(testi);
    const tayAmica = getRestaurantMenu(`http://www.amica.fi/modules/json/json/Index?costNumber=0815&language=fi&firstDay=${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
    const taySodexo = getRestaurantMenu('http://www.sodexo.fi/ruokalistat/output/daily_json/92/2016/09/26/fi');
    const tayJuvenes = getRestaurantMenu('http://www.juvenes.fi/DesktopModules/Talents.LunchMenu/LunchMenuServices.asmx/GetMenuByWeekday?KitchenId=13&MenuTypeId=60&Week=39&Weekday=1&lang=%27fi%27&format=json', true);
    const tayJuvenesVege = getRestaurantMenu('http://www.juvenes.fi/DesktopModules/Talents.LunchMenu/LunchMenuServices.asmx/GetMenuByWeekday?KitchenId=13&MenuTypeId=5&Week=39&Weekday=1&lang=%27fi%27&format=json', true);
    const tayJuvenesFusion = getRestaurantMenu('http://www.juvenes.fi/DesktopModules/Talents.LunchMenu/LunchMenuServices.asmx/GetMenuByWeekday?KitchenId=13&MenuTypeId=3&Week=39&Weekday=1&lang=%27fi%27&format=json', true);
    Promise.all([tayAmica, taySodexo, tayJuvenes, tayJuvenesVege, tayJuvenesFusion])
      .then((data) => {
        if (data) {
          parseAmica(data[0], "Amica Minerva (Pinni B)", tayMenu);
          parseSodexo(data[1], "Sodexo Linna", tayMenu);
          parseJuvenes(data[2], "Juvenes ravintola (Päätalo)", tayMenu);
          parseJuvenes(data[3], "Juvenes VegeBar (Yläkerta)", tayMenu);
          parseJuvenes(data[4], "Juvenes Fusion Kitchen", tayMenu);
          return resolve(tayMenu);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/*function getTtyMenu() {
  return new Promise((resolve, reject) => {
    if (ttyMenu.length !== 0) {
      return resolve(ttyMenu);
    } else {
      // 3 = fusion
      // 5 = vegebar
      // 52 = staff
      // 60 = normaali
      // 77 = såås bar
      const ttyAmica = getRestaurantMenu('www.amica.fi', '/modules/json/json/Index?costNumber=0812&language=fi&firstDay=2016-10-3');
      const ttySodexo = getRestaurantMenu('www.sodexo.fi', '/ruokalistat/output/daily_json/12812/2016/09/26/fi');
      const ttyJuvenes = getRestaurantMenu('www.juvenes.fi', '/DesktopModules/Talents.LunchMenu/LunchMenuServices.asmx/GetMenuByWeekday?KitchenId=6&MenuTypeId=60&Week=39&Weekday=1&lang=%27fi%27&format=json', true);
      const ttyJuvenesBar = getRestaurantMenu('www.juvenes.fi', '/DesktopModules/Talents.LunchMenu/LunchMenuServices.asmx/GetMenuByWeekday?KitchenId=60038&MenuTypeId=77&Week=39&Weekday=1&lang=%27fi%27&format=json', true);
      const ttyJuvenesFusion = getRestaurantMenu('www.juvenes.fi', '/DesktopModules/Talents.LunchMenu/LunchMenuServices.asmx/GetMenuByWeekday?KitchenId=60038&MenuTypeId=3&Week=39&Weekday=1&lang=%27fi%27&format=json', true);
      Promise.all([ttyAmica, ttySodexo, ttyJuvenes, ttyJuvenesBar, ttyJuvenesFusion])
      .then((data) => {
        if (data) {
          parseAmica(data[0], "Amica Reaktori (Kampusareena)", ttyMenu);
          parseSodexo(data[1], "Sodexo Hertsi (Tietotalo)", ttyMenu);
          parseJuvenes(data[2], "Juvenes Newton (Konetalo)", ttyMenu);
          parseJuvenes(data[3], "Juvenes Café Konehuone SÅÅS BAR", ttyMenu);
          parseJuvenes(data[4], "Juvenes Café Konehuone Fuzion Kitchen", ttyMenu);
          return resolve(ttyMenu);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  });
}*/

export function fetchTayMenu() {
  return function (dispatch) {
    axios.get('http://ec2-52-29-236-223.eu-central-1.compute.amazonaws.com/api/tay')
      .then((response) => {
        dispatch({ type: 'FETCH_TAY_MENU_FULFILLED', payload: response });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_TAY_MENU_REJECTED', payload: err });
      });
  };
}

function getTodaysTayMenu() {
  return new Promise((resolve, reject) => {
    const tayAmica = getRestaurantMenu(`http://www.amica.fi/modules/json/json/Index?costNumber=0815&language=fi&firstDay=${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
    const taySodexo = getRestaurantMenu(`http://www.sodexo.fi/ruokalistat/output/weekly_json/92/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}/fi`);
    const tayJuvenes = getRestaurantMenu('http://www.juvenes.fi/DesktopModules/Talents.LunchMenu/LunchMenuServices.asmx/GetMenuByWeekday?KitchenId=13&MenuTypeId=60&Week=39&Weekday=1&lang=%27fi%27&format=json', true);
    const tayJuvenesVege = getRestaurantMenu('http://www.juvenes.fi/DesktopModules/Talents.LunchMenu/LunchMenuServices.asmx/GetMenuByWeekday?KitchenId=13&MenuTypeId=5&Week=39&Weekday=1&lang=%27fi%27&format=json', true);
    const tayJuvenesFusion = getRestaurantMenu('http://www.juvenes.fi/DesktopModules/Talents.LunchMenu/LunchMenuServices.asmx/GetMenuByWeekday?KitchenId=13&MenuTypeId=3&Week=39&Weekday=1&lang=%27fi%27&format=json', true);
    Promise.all([tayAmica, taySodexo, tayJuvenes, tayJuvenesVege, tayJuvenesFusion])
      .then((data) => {
        if (data) {
          parseAmica(data[0], "Amica Minerva (Pinni B)", tayMenu);
          parseSodexo(data[1], "Sodexo Linna", tayMenu);
          parseJuvenes(data[2], "Juvenes ravintola (Päätalo)", tayMenu);
          parseJuvenes(data[3], "Juvenes VegeBar (Yläkerta)", tayMenu);
          parseJuvenes(data[4], "Juvenes Fusion Kitchen", tayMenu);
          return resolve(tayMenu);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function fetchTodaysTayMenu() {
  return function (dispatch) {
    getTodaysTayMenu()
      .then((response) => {
        dispatch({ type: 'FETCH_TAY_MENU_FULFILLED', payload: response });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_TAY_MENU_REJECTED', payload: err });
      });
  };
}
