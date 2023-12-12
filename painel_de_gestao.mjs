function painelDeGestao() {
    /* Controle de status de execução do Script */
    let statusScript = false;
  
    /* Controle de status de execução do Script */
    const config = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = config.getSheetByName("PAINEL")
    /* ************************************************** */
  
    /* ******** Declarações de Objetos de controle ******** */
    /* Controle de ações */
    const controlAction = {
      semAcao: "Sem Ação",
      mvDisOu: "Mover dispositivo para outro OU",
      identificador: "identificador"
    }
    /* Controle de valores na planilha */
    const controleConfig = {
      status: sheets.getRange(6,1).getValue(),
      textAtual: sheets.getRange(2,5)
    }
    /* Controle de execução */
    const textControl = {
      text0: "Pronto para atuação",
      text1: "Em execução",
    }
    /* ************************************************** */
  
  
  /* ******** LOOP DE AÇÕES ******** */
    do{
      /* Execução */
      
      /* ******** */
  
  
      /* Classificando status do execução */
      /*            Buscando ação         */
  
      switch (controleConfig.status) {
  
      case controlAction.mvDisOu:
  
        /* Se for para mover os dispositivos para */
        /*       Outra unidade organizacional     */
  
          statusScript = false;
          sheets.getRange(1,1).setValue(1)
          
          break;
      case controlAction.identificador:
  
          /* Colocar patrimonio nos Chromebooks*/
          sheets.getRange(2,5).setValue(textControl.text1)
          if(sheets.getRange(2,5).getValue()!== textControl.text1){
          sheets.getRange(2,5).setValue(textControl.text1)}
          
          statusScript = false;
          sheets.getRange(1,1).setValue(2)
          
  
          atrib();
          break;
  
      default:
          /* Sem Ação*/
          sheets.getRange(2,5).setValue(textControl.text1)
          if(sheets.getRange(2,5).getValue()!== textControl.text1){
          sheets.getRange(2,5).setValue(textControl.text1)}
  
          statusScript = false;
          sheets.getRange(1,1).setValue(3)
          
        
      }
      
    }
    while(statusScript === true)
  
    sheets.getRange(2,5).setValue(textControl.text0)
  
    /* ************************************************** */
  
    /* Função atribuir patrimonio */
    
    function atrib() {
  
    var controller = AdminDirectory.Chromeosdevices;
    var contador;
  
    /* Buscar informação da planilha */
    const buscarId = (iD) => {
        var iD = [];  
        sheetConfig = SpreadsheetApp.getActiveSpreadsheet();  
        sheet = sheetConfig.getSheetByName('Controle') || sheetConfig.insertSheet('Controle', 1);  
        const values = sheet.getDataRange().getValues();  
        for (var row = 1; row < values.length; row++) {iD.push(values[row] [0])}
         return iD}
  
      const buscarPatri = (patrimonio) => {
        var patrimonio = [];
        sheetConfig = SpreadsheetApp.getActiveSpreadsheet();  
        sheet = sheetConfig.getSheetByName('Controle') || sheetConfig.insertSheet('Controle', 1);  
        const values = sheet.getDataRange().getValues();  
        for (var row = 1; row < values.length; row++) {patrimonio.push(values[row] [2])}
        return patrimonio}
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
    console.log(`FINALIZADO!!! Atribuido ${i} Patrimonios` )
  
  
  }
  }