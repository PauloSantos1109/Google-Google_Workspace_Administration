function uEOrganiz() {
    const ueList = {
      type:'All',
  
    }
    var sheetConfig, sheet, uE, unidades, uEList;
  
    uEList = [];
  
    sheetConfig = SpreadsheetApp.getActiveSpreadsheet();
    sheet = sheetConfig.getSheetByName('UE') || sheetConfig.insertSheet('UE', 1);
  
    uEList.push(['ID UE', 'Caminho', 'Descrição', 'Nome']);
  
    unidades = AdminDirectory.Orgunits.list('my_customer', ueList);
  
    unidades.organizationUnits.forEach((uE) => {
      uEList.push([uE.orgUnitId, uE.orgUnitPath, uE.description, uE.name])
    })
    
  
    sheet.getRange(2,1,uEList.length,uEList[0].length).setValues(uEList);
  
  }