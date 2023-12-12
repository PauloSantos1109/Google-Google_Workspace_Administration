function fatherStart() {
    function allDevices() {
        const options = {
          customerId: 'my_customer',
          maxResults: 100,
          projection: 'full',
          orderBy: 'serialNumber'
        }
  
      let devices = [];
      let configSheets, sheet, device, page;
  
      configSheets = SpreadsheetApp.getActiveSpreadsheet();
      
      sheet = configSheets.getSheetByName('DB - Devices') || configSheets.insertSheet('DB - Devices', 1);
  
      devices.push(['Identify', 'Serial', 'Ultimos usuarios', 'Usuario Provisonador', 'ID', 'Data do provisonamento ISO 8601', 'Data da ultima utilização ISO 8601', 'Unidade Organizacional'])
  
      do {
        page = AdminDirectory.Chromeosdevices.list(options.customerId, options)
  
        function formatarDataISO8601(dataISO) {
          const data = new Date(dataISO);
          
          const dia = data.getDate();
          const mes = data.getMonth() + 1; // Lembre-se que os meses em JavaScript são indexados de 0 a 11
          const ano = data.getFullYear();
          
          const horas = data.getHours();
          const minutos = data.getMinutes();
          const segundos = data.getSeconds();
          
          const dataFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
          
          return dataFormatada;
        }
  
        page.chromeosdevices.forEach(function(deviceInfo) {
            const formattedLastEnrollmentTime = formatarDataISO8601(deviceInfo.lastEnrollmentTime);
            const formattedLastSync = formatarDataISO8601(deviceInfo.lastSync);

            devices.push([
                deviceInfo.annotatedAssetId,
                deviceInfo.serialNumber,
                deviceInfo.recentUsers,
                deviceInfo.annotatedUser,
                deviceInfo.deviceId,
                formattedLastEnrollmentTime,
                formattedLastSync,
                deviceInfo.orgUnitPath
            ]);
        });
  
        if (page.nextPageToken) {
            options.pageToken = page.nextPageToken;
        }
  
      }while(page.nextPageToken)
      sheet.getRange(2,1,devices.length,devices[0].length).setValues(devices);
    } /* Funcionando */

    function uEOrganiz(){
      const ueList = {
        type:'ALL_INCLUDING_PARENT',

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

    uEOrganiz();


  }