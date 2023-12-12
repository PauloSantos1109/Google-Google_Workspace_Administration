function moveDevices() {
    var cb = {
     customerId: 'my_customer',
     orgUnitPath:'/Retenção/Teste (Paulo Santos)/Scratch Day',
     deviceIds: '8a28ea42-028a-469e-adbf-e6ca7afe5a1c'
    };  
     var moveCb = AdminDirectory.Chromeosdevices.moveDevicesToOu(cb,cb.customerId,cb.orgUnitPath);
   
     console.log('ATRIBUIÇÃO CONCLUIDA')
   }
   