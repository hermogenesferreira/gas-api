const puppeteer = require('puppeteer');
var moment = require('moment'); // require

(module.exports = async function ScrapNfc(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://portalsped.fazenda.mg.gov.br/portalnfce/sistema/qrcode.xhtml?p=' + url);
  await page.waitForSelector('#formPrincipal');
  //Pegar todos os dados da nfc

  let nfe_detail = await page.evaluate(() => {
    //Extrair cada produto da tabela
    let company = document.querySelector("#page-content-wrapper .container .table tr > th > h4").textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
    let address = document.querySelector("#page-content-wrapper .container .table tbody tr:nth-child(2)").textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
    let key = document.querySelector("#collapseTwo .table tbody tr").textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
    let bruteDate = document.querySelector("#collapse4").textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "").split('Emissão')[1];
    let date = bruteDate.substring(0, bruteDate.lastIndexOf('Valor total do'));
    let formatDate = date.substring(date.length - 19);
    let [day, month, year] = formatDate.split('/');
    let buyDate = `${month}/${day}/${year}`;

    let products = document.querySelector("#myTable");

    let items = Array.from(products.children);
    // Loop sobre cada produto, pegando as informações
    let nfe_info = items.map(item => {
      let name = item.querySelector("tr > td:nth-child(1)").textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
      let quant = item.querySelector("tr > td:nth-child(2)").textContent.split(': ')[1]
      let unit = item.querySelector("tr > td:nth-child(3)").textContent.split(': ')[1];
      let price = item.querySelector("tr > td:nth-child(4)").textContent.replace(/[,]+/g, ".").split('R$ ')[1];
      return {company, address, key, buyDate, formatDate, name, quant, unit, price};
    });
    return nfe_info;
  });
  await browser.close();// Fechar o navegador quando tudo for concluido
  return nfe_detail; //retorna todos os detalhes da nfe
});
