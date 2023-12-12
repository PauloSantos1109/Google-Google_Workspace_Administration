function deviceList() {
    const options = {
        maxResults: 100,
        projection: 'full',
        orderBy: 'serialNumber'
    }
    var devices = [];
    var sheetConfig, sheet, device, page;

    sheetConfig = SpreadsheetApp.getActiveSpreadsheet();
    sheet = sheetConfig.getSheetByName('Base Devices') || sheetConfig.insertSheet('Base Devices', 1);

    devices.push(['Identificador', 'Serial', 'Ultimos usuarios', 'Usuario Provisonador', 'ID', 'Data do provisonamento ISO 8601', 'Data da ultima utilização ISO 8601', 'Unidade Organizacional'])

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




    do {
        page = AdminDirectory.Chromeosdevices.list('my_customer', options);
        
        page.chromeosdevices.forEach(function(device)  {            
            devices.push([
                device.annotatedAssetId,
                device.serialNumber,
                device.recentUsers,
                device.annotatedUser,
                device.deviceId,
                formatarDataISO8601(device.lastEnrollmentTime),
                formatarDataISO8601(device.lastSync),
                device.orgUnitPath               
            ])
        });

        if (page.nextPageToken) {
            options.pageToken = page.nextPageToken;
        }
        
    } while (page.nextPageToken)

    sheet.getRange(2,1,devices.length,devices[0].length).setValues(devices);
}