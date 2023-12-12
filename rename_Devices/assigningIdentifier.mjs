function start () {

    var controller = AdminDirectory.Chromeosdevices;
    var contador;
  
    /* Buscar informação da planilha */
    const buscarId = (iD) => {
        var iD = [];  
        sheetConfig = SpreadsheetApp.getActiveSpreadsheet();  
        sheet = sheetConfig.getSheetByName('controller') || sheetConfig.insertSheet('controller', 1);  
        const values = sheet.getDataRange().getValues();  
        for (var row = 1; row < values.length; row++) {iD.push(values[row] [0])}
         return iD}
  
      const buscarPatri = (identify) => {
        var identify = [];
        sheetConfig = SpreadsheetApp.getActiveSpreadsheet();  
        sheet = sheetConfig.getSheetByName('controller') || sheetConfig.insertSheet('controller', 1);  
        const values = sheet.getDataRange().getValues();  
        for (var row = 1; row < values.length; row++) {identify.push(values[row] [2])}
        return identify}
      /* Fim da busca */
      function enviar(dispo,ptr){
        let subObject = {
          deviceId: dispo,
          annotatedAssetId: ptr
        }
      controller.patch(subObject, option.customerId, subObject.deviceId).annotatedAssetId;
    }
  
   let option = {
      customerId: 'my_customer',
      deviceId:[],
      annotatedAssetId:[],    
    }
  
    option.deviceId = buscarId();
    option.annotatedAssetId = buscarPatri()
    
    for (var i = 0; i < option.deviceId.length; i++) {
      enviar(option.deviceId[i], option.annotatedAssetId[i])
      console.info(`${i} de ${option.deviceId.length}`)
    }
    console.log(`FINALIZADO!!! Atribuido ${i} identifys` )
  
  
  }