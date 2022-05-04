const initApp = () => {
  
  const searchForm = document.querySelector("[aria-live='searchForm']");
  const dataPresentation = document.querySelector(
    "[aria-live='dataPresentation']"
  );
  const noSymbol = document.querySelector("[aria-live='noSymbol']");
  const loader = document.querySelector("[aria-live='loader']");
  const symbolName = document.querySelector("[aria-live='symbolName']");
  const symbolShort = document.querySelector("[aria-live='symbolShort']");
  const lastPrice = document.querySelector("[aria-live='lastPrice']");
  const change = document.querySelector("[aria-live='change']");
  const changePercent = document.querySelector("[aria-live='changePercent']");
  const timestamp = document.querySelector("[aria-live='timestamp']");
  const high = document.querySelector("[aria-live='high']");
  const low = document.querySelector("[aria-live='low']");
  const open = document.querySelector("[aria-live='open']");
  const volume = document.querySelector("[aria-live='volume']");
  const marketCap = document.querySelector("[aria-live='marketCap']");
console.log(marketCap)
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const searchFormInput = document.querySelector(
      "[aria-live='searchFormInput']"
    );
    const value = searchFormInput.value;
    if (value === "") {
      return;
    } else {
      loader.style.display = "block";
      getQuote(value.toUpperCase());
    }
  });

  const handleNumbers = (number) => {
    return ((number * 100) / 100).toFixed(2);
  };

  const numberFormatter = (number) => {
    if (number > 999 && number < 1000000) {
      return (number / 1000).toFixed(1) + "K";
    } else if (number > 1000000 && number < 1000000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number > 1000000000) {
      return (number / 1000000000).toFixed(1) + "B";
    } else if (number < 900) {
      return number;
    }
  };

  const addZero = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };

  const handleTimestamp = (date) => {
    const newDate = new Date(date);
    const hours = addZero(newDate.getHours());
    const hoursAMPM = hours > 12 ? hours % 12 : hours;
    const minutes = addZero(newDate.getMinutes());
    const seconds = addZero(newDate.getSeconds());
    return `${hoursAMPM}:${minutes}:${seconds} ${hours > 12 ? `PM` : `AM`}`;
  };

  const populateData = (data) => {
    dataPresentation.style.display = "block";
    dataPresentation.setAttribute("aria-hidden", false);
    symbolName.innerHTML = data.Name;
    symbolShort.innerHTML = `(${data.Symbol})`;
    lastPrice.innerHTML = handleNumbers(data.LastPrice);
    change.innerHTML = handleNumbers(data.Change);
    changePercent.innerHTML = `(${handleNumbers(data.ChangePercent)}%)`;
    timestamp.innerHTML = `As of ${handleTimestamp(data.Timestamp)} ET`;
    high.innerHTML = data.High;
    low.innerHTML = data.Low;
    open.innerHTML = data.Open;
    volume.innerHTML =
      data.Volume !== null ? numberFormatter(data.Volume) : "-";
    marketCap.innerHTML =
      data.MarketCap !== null ? numberFormatter(data.MarketCap) : "-";
      console.log(data.Name)
  };
  
  const clearData = () => {
    noSymbol.style.display = "none";
    dataPresentation.style.display = "none";
    dataPresentation.setAttribute("aria-hidden", true);
    symbolName.innerHTML = "";
    symbolShort.innerHTML = "";
    lastPrice.innerHTML = "";
    change.innerHTML = "";
    changePercent.innerHTML = "";
    timestamp.innerHTML = "";
    high.innerHTML = "";
    low.innerHTML = "";
    open.innerHTML = "";
    volume.innerHTML = "";
    marketCap.innerHTML ="";
  }
  
  const isInvalidData = () => {
    noSymbol.style.display = "block";
    dataPresentation.style.display = "none";
    dataPresentation.setAttribute("aria-hidden", false);
  }

  const getQuote = async (value) => {
    try {
      clearData();
      const response = await window.getQuote(value);
      console.log(response.data);
      populateData(response.data);
    } catch (e) {
      isInvalidData();
    } finally {
      loader.style.display = "none";
    }
  };
};

window.addEventListener("load", initApp());