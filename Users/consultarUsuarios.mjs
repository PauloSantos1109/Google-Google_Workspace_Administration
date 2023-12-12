function listAllUsers() {
    var ss = SpreadsheetApp.getActive();
    var pageToken, page, count = 0;
    var listArray = [];
    listArray.push(['full name', 'first name', 'last name', 'email', 'department', 'ID'])
    do {
      page = AdminDirectory.Users.list({
        domain: '***',
        orderBy: 'givenName',
        maxResults: 1000,
        pageToken: pageToken
      });
      var users = page.users;
      if (users) {
        for (var i = 0; i < users.length; i++) {
          var user = users[i];
          listArray.push([user.name.fullName, user.name.givenName, user.name.familyName, user.primaryEmail, user.organizations, user.id,]);
        }
      }
      pageToken = page.nextPageToken;
      break; // This means you only get one page
    } while (pageToken);
    try {
      var outputSheet = ss.getSheetByName('allMembers');
      outputSheet.getDataRange();
    } catch(err) {
      var outputSheet = ss.insertSheet('allMembers', 2);
    }
    outputSheet.getDataRange().clear();
    outputSheet.getRange(1, 1, listArray.length, listArray[0].length).setValues(listArray);
    outputSheet.getRange(1, 6, outputSheet.getLastRow(), 4).setHorizontalAlignment("center");
    outputSheet.getRange(1, 1, outputSheet.getLastRow(), 1).setHorizontalAlignment("center");
    var width = [150, 150, 180, 250, 250, 200];
    
  }