const puppeteer = require('puppeteer');

module.exports = async function ScrapGas(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector('#formPrincipal');
  //Pegar todos os dados da nfc

  let invoice = await page.evaluate(() => {
    //Extrair cada produto da tabela
    var company = document
      .querySelector('#page-content-wrapper .container .table tr > th > h4')
      .textContent.replace(/(\r\n\t|\n|\r|\t)/gm, '');
    let cnpj = document
      .querySelector('#page-content-wrapper .container .table tbody > tr > td')
      .textContent.replace(/(\r\n\t|\n|\r|\t)/gm, '')
      .split('-,')[0]
      .split(':')[1];
    let address = document
      .querySelector(
        '#page-content-wrapper .container .table tbody tr:nth-child(2)',
      )
      .textContent.replace(/(\r\n\t|\n|\r|\t)/gm, '')
      .split('-')[0];
    let city = document
      .querySelector(
        '#page-content-wrapper .container .table tbody tr:nth-child(2)',
      )
      .textContent.replace(/(\r\n\t|\n|\r|\t)/gm, '')
      .split('-')[1]
      .split(',')[0];

    let key = document
      .querySelector('#collapseTwo .table tbody tr')
      .textContent.replace(/(\r\n\t|\n|\r|\t)/gm, '');
    let bruteDate = document
      .querySelector('#collapse4')
      .textContent.replace(/(\r\n\t|\n|\r|\t)/gm, '')
      .split('Emissão')[1];
    let buyDate = bruteDate.substring(
      0,
      bruteDate.lastIndexOf('Valor total do'),
    );
    let testDate = buyDate.substring(buyDate.length - 19);
    let [day, month, year] = testDate.split('/');
    let date = `${month}/${day}/${year}`;

    let tableProducts = document.querySelector('#myTable');

    let items = Array.from(tableProducts.children);
    // Loop sobre cada produto, pegando as informações
    let products = items.map((item) => {
      let name = item
        .querySelector('tr > td:nth-child(1)')
        .textContent.replace(/(\r\n\t|\n|\r|\t)/gm, '');
      let quant = item
        .querySelector('tr > td:nth-child(2)')
        .textContent.split(': ')[1];
      let unit = item
        .querySelector('tr > td:nth-child(3)')
        .textContent.split(': ')[1];
      let itemPrice = item
        .querySelector('tr > td:nth-child(4)')
        .textContent.replace(/[,]+/g, '.')
        .split('R$ ')[1];
      let price = itemPrice / quant;
      return {
        name,
        price,
        date,
      };
    });
    return { company, address, city, cnpj, key, date, products };
  });
  await browser.close(); // Fechar o navegador quando tudo for concluido
  return { invoice }; //retorna todos os detalhes da nfe
};
