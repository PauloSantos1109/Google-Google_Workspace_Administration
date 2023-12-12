function moveOu() {
    const option = {
      orgUnitPath: '/Organizational Units'
    }
  
    var sheetConfig, sheet, rangeID;
      rangeID = [];
      sheetConfig = SpreadsheetApp.getActiveSpreadsheet();
      sheet = sheetConfig.getSheetByName('Controller') || sheetConfig.insertSheet('Controller', 1);
  
      const values = sheet.getDataRange().getValues();
  
      // imprimimos linha a linha os valores das colunas separados por ‘ ’
      for (var row = 0; row < values.length; row++) {
  
        rangeID.push(values[row][2])}
        
        //console.log(values[1][2]);}
        console.log(rangeID)
      
  }