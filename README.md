This PoC project is a Playwright-based automated test suite designed to verify the lead conversion process within Salesforce. 
The test script ensures that leads can be successfully created and converted into accounts while also identifying defects in the application, such as the incorrect rejection of a valid lead source.

**Test scenario**
1. Login to Salesforce
  - Navigate to the login page.
  - Login as sC admin using credentials stored in GitHub Secrets (SALESFORCE_USERNAME, SALESFORCE_PASSWORD).
  - Login on behalf of a Salesforce user "Testing Inflow."

2. Lead Creation and Conversion
Lead data is predefined and used as parameters in tests.
  - A new lead is added via AddNewLeadHelper.
  - The lead is then converted into an account using ConvertLeadHelper.

3. Validation
  - The test is expected to pass for a lead with a valid LeadSources.event.
  - The test is expected to fail for a lead with LeadSources.media, highlighting a defect in the application where this source should be accepted but is incorrectly rejected.
  
  Using parameterized tests allows us to verify the same scenario with different data sets without duplicating tests.

  At the moment tests are running in desktop version of Chrome, but other options, such as mobile devices emulators, other major browsers are available in playwright.config.ts.

  Tests runtime is less than 3 minutes including browser installation for each run.<br/>
  Tests took a bit more that a day to write, since they were started from scratch. It should be faster in the future.

  **Project Structure**

  *tests/* <br/>
      Main test script that executes the conversion validation.<br/>
      
  *helpers/*<br/>
      Contains utility classes for login, navigation, lead creation, and conversion.<br/>
      
  *pages/*<br/>
      Contains page objects representing different pages in the application, following the Page Object Model (POM) design pattern.<br/>
      
  *constants.ts* <br/>
      Stores predefined values for lead sources and accounts.<br/>
      
  *models.ts*<br/>
      Defines the IAccount interface, which represents the structure of an account object used in tests.

  
