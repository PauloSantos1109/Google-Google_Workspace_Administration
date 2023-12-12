function moveDevices() {
    var cb = {
     customerId: 'my_customer',
     orgUnitPath:'/Organizational_unit_name',
     deviceIds: 'SSID_TO_DEVICE'
    };  
     var moveCb = AdminDirectory.Chromeosdevices.moveDevicesToOu(cb,cb.customerId,cb.orgUnitPath);
   
     console.log('ATRIBUIÇÃO CONCLUIDA')
   }
   