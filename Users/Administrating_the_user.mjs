function getDomainUsersList() {
    var users = [];
  
    users.push(["name", "email", "departament"])
    var options = {
      domain: '***', // Google Workspace domain name
      customer: 'my_customer',
      maxResults: 100,
      projection: 'basic', // Fetch basic details of users
      viewType: 'domain_public',
      orderBy: 'email', // Sort results by users
    };
  
    do {
      var response = AdminDirectory.Users.list(options);
      response.users.forEach(function (user) {
        users.push([user.name.fullName, user.primaryEmail, [user.organizations].filter((e) => "departament")]);
      });
  
      // For domains with many users, the results are paged
      if (response.nextPageToken) {
        options.pageToken = response.nextPageToken;
      }
    } while (response.nextPageToken);
  
    // Insert data in a spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Users') || ss.insertSheet('Users', 1);
    sheet.getRange(1, 1, users.length, users[0].length).setValues(users);
  }