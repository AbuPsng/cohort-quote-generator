//***** DOM selection *****/
const mainContainerMain = document.getElementById("main-container");
const quoteParagraph = document.getElementById("quote");
const quoteWriterSpan = document.getElementById("quote-writer");
const newQuoteBtn = document.getElementById("new-quote-btn");
const copyQuoteBtn = document.getElementById("copy-btn");
const shareQuoteBtn = document.getElementById("share-btn");
const exportQuoteBtn = document.getElementById("export-btn");

//***** variable Declaration *****/

let imagePath = "";

//***** Functions Declaration *****/

//to fetch new quote
async function fetchNewQuote() {
  try {
    //fetching data from api
    const response = await fetch(
      "https://api.freeapi.app/api/v1/public/quotes/quote/random"
    );

    //checking if response is resolve or rejected
    if (!response.ok) {
      throw new Error("Error while fetching quote");
    }

    //converting response to object using .json() method
    const { data } = await response.json();
    const randomNumberImage = Math.floor(Math.random() * 30);

    imagePath = `./assets/images/${randomNumberImage}.jpg`;

    //changing quote and writer to new data
    quoteParagraph.innerText = `" ${data.content} "`;
    quoteWriterSpan.innerText = `${data.author}`;

    //putting values on twitter share
    shareQuoteBtn.addEventListener("click", () => {
      console.log("first");
      const link = document.createElement("a");
      link.href =
        "https://twitter.com/intent/tweet?text=" +
        data.content +
        " By " +
        data.author;
      link.target = "_blank";
      link.click();
    });

    //changing background image
    mainContainerMain.style.background = `url("${imagePath}")`;
    mainContainerMain.style.backgroundSize = "cover";
    mainContainerMain.style.backgroundRepeat = `no-repeat`;
    mainContainerMain.style.backgroundPosition = "center";
  } catch (error) {
    alert("Error while fetching data");
  }
}

//copy quote
function addQuoteToClipboard() {
  //copying the quote to clipboard
  navigator.clipboard.writeText(quoteParagraph.innerText);
}

async function captureScreenshot() {
  const canvas = await html2canvas(mainContainerMain);
  const imgData = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = imgData;
  link.download = "screenshot.png";
  link.click();
}

fetchNewQuote();

//*****Assigning funtion to their respective element *****/

newQuoteBtn.addEventListener("click", fetchNewQuote);
copyQuoteBtn.addEventListener("click", addQuoteToClipboard);
exportQuoteBtn.addEventListener("click", () => {
  captureScreenshot();
});
//***** *****/
